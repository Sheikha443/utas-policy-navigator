/* ═══════════════════════════════════════════════════════════════════
   CLOUD ADAPTER  ·  window.CLOUD   (Firebase Auth + Firestore)
   Loads the Firebase SDK only when a config is present, and implements
   the same shape as the local AUTH layer (but async).
   Real central database + real email verification, zero backend.
═══════════════════════════════════════════════════════════════════ */
(function () {
  const cfg = window.FIREBASE_CONFIG || {};
  const configured = !!(cfg.apiKey && cfg.projectId);
  const CLOUD = { configured, ready: false, _user: null, _cbs: [] };

  const SDK = [
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js",
  ];
  function loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = src; s.onload = res; s.onerror = () => rej(new Error("load " + src));
      document.head.appendChild(s);
    });
  }
  async function loadSDK() { for (const s of SDK) await loadScript(s); }

  function publicUser(u, profile) {
    profile = profile || {};
    return { id: u.uid, name: profile.name || u.displayName || "", studentId: profile.studentId || "",
      email: u.email, department: profile.department || "", branch: profile.branch || "Nizwa",
      verified: u.emailVerified };
  }

  async function init() {
    if (!configured) return;
    try {
      await loadSDK();
      if (!firebase.apps.length) firebase.initializeApp(cfg);
      CLOUD.auth = firebase.auth();
      CLOUD.dbf = firebase.firestore();
      await new Promise((resolve) => {
        CLOUD.auth.onAuthStateChanged(async (u) => {
          if (u) {
            let profile = {};
            try { const snap = await CLOUD.dbf.collection("users").doc(u.uid).get(); profile = snap.data() || {}; } catch (e) {}
            CLOUD._user = u.emailVerified ? publicUser(u, profile) : null;
          } else CLOUD._user = null;
          CLOUD.ready = true;
          CLOUD._cbs.forEach(cb => { try { cb(CLOUD._user); } catch (e) {} });
          resolve();
        });
      });
    } catch (e) {
      CLOUD.configured = false; // fall back to local if SDK fails
      CLOUD.initError = String(e);
    }
  }

  async function register({ name, studentId, email, password, department, branch }) {
    try {
      const cred = await CLOUD.auth.createUserWithEmailAndPassword(email.trim(), password);
      await CLOUD.dbf.collection("users").doc(cred.user.uid).set({
        name: (name || "").trim(), studentId: (studentId || "").trim(), email: email.trim().toLowerCase(),
        department: department || "", branch: branch || "Nizwa", createdAt: Date.now(),
      });
      await cred.user.sendEmailVerification();
      return { ok: true, needsEmailVerify: true };
    } catch (e) {
      const c = e.code || "";
      if (c.includes("email-already-in-use")) return { ok: false, err: "exists" };
      if (c.includes("invalid-email")) return { ok: false, err: "email" };
      if (c.includes("weak-password")) return { ok: false, err: "weak" };
      return { ok: false, err: "cloud", msg: e.message };
    }
  }

  async function resend() {
    try { if (CLOUD.auth.currentUser) { await CLOUD.auth.currentUser.sendEmailVerification(); return { ok: true }; } }
    catch (e) {}
    return { ok: false };
  }

  // For cloud mode "verify" = reload the user and check the email link was clicked.
  async function verify() {
    try {
      const u = CLOUD.auth.currentUser;
      if (!u) return { ok: false, err: "nouser" };
      await u.reload();
      if (u.emailVerified) {
        let profile = {};
        try { const snap = await CLOUD.dbf.collection("users").doc(u.uid).get(); profile = snap.data() || {}; } catch (e) {}
        CLOUD._user = publicUser(u, profile);
        return { ok: true, user: CLOUD._user };
      }
      return { ok: false, err: "notyet" };
    } catch (e) { return { ok: false, err: "cloud" }; }
  }

  async function login(email, password) {
    try {
      const cred = await CLOUD.auth.signInWithEmailAndPassword(email.trim(), password);
      await cred.user.reload();
      if (!cred.user.emailVerified) { await cred.user.sendEmailVerification(); return { ok: false, err: "unverified", email }; }
      let profile = {};
      try { const snap = await CLOUD.dbf.collection("users").doc(cred.user.uid).get(); profile = snap.data() || {}; } catch (e) {}
      CLOUD._user = publicUser(cred.user, profile);
      return { ok: true, user: CLOUD._user };
    } catch (e) {
      const c = e.code || "";
      if (c.includes("user-not-found")) return { ok: false, err: "nouser" };
      if (c.includes("wrong-password") || c.includes("invalid-credential")) return { ok: false, err: "badpass" };
      return { ok: false, err: "cloud", msg: e.message };
    }
  }

  function current() { return CLOUD._user; }
  async function logout() { try { await CLOUD.auth.signOut(); } catch (e) {} CLOUD._user = null; }
  function onChange(cb) { CLOUD._cbs.push(cb); }

  async function addSub(email, sub) {
    const u = CLOUD.auth.currentUser; if (!u) return sub;
    const rec = { at: Date.now(), ...sub };
    try { const ref = await CLOUD.dbf.collection("users").doc(u.uid).collection("subs").add(rec); rec.id = ref.id; }
    catch (e) { rec.id = "S" + Date.now().toString(36); }
    return rec;
  }
  async function listSubs() {
    const u = CLOUD.auth.currentUser; if (!u) return [];
    try {
      const snap = await CLOUD.dbf.collection("users").doc(u.uid).collection("subs").orderBy("at", "desc").limit(30).get();
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { return []; }
  }

  Object.assign(CLOUD, { init, register, resend, verify, login, current, logout, onChange, addSub, listSubs });
  window.CLOUD = CLOUD;
})();
