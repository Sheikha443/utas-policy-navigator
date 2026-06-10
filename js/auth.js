/* ═══════════════════════════════════════════════════════════════════
   AUTH + LOCAL DATABASE  ·  window.AUTH
   A self-contained client-side "database" on localStorage.
   ───────────────────────────────────────────────────────────────────
   PROTOTYPE NOTE: passwords are lightly hashed for demo only — this is
   NOT production-grade security. For a real deployment, replace the
   storage layer with a backend (see AUTH.sendRealEmail stub below).
═══════════════════════════════════════════════════════════════════ */
(function () {
  const DB_USERS = "utas_db_users_v1";
  const DB_SUBS  = "utas_db_subs_v1";
  const SESSION  = "utas_session_v1";

  /* ── tiny helpers ─────────────────────────────────────────── */
  const read = (k, fb) => { try { return JSON.parse(localStorage.getItem(k)) ?? fb; } catch (e) { return fb; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const uid = () => "U" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const code6 = () => String(Math.floor(100000 + Math.random() * 900000));
  function hash(str) { // lightweight, non-cryptographic (demo only)
    let h = 5381; for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
    return "h" + h.toString(36);
  }
  const norm = (e) => (e || "").trim().toLowerCase();

  /* ── data access ──────────────────────────────────────────── */
  const allUsers = () => read(DB_USERS, {});
  const getUser  = (email) => allUsers()[norm(email)] || null;
  function saveUser(u) { const all = allUsers(); all[norm(u.email)] = u; write(DB_USERS, all); return u; }

  /* ── email (DEMO MODE) ────────────────────────────────────────
     In demo mode we don't actually send mail (a static file can't).
     We surface the code inside the app's "mock inbox". The real-email
     hook below is ready to wire to EmailJS / a backend later.        */
  function sendVerification(user) {
    const code = code6();
    user.pendingCode = code;
    user.codeSentAt = Date.now();
    saveUser(user);
    // Try real email if a sender was configured; otherwise demo inbox.
    if (typeof AUTH.sendRealEmail === "function" && AUTH._realEmailEnabled) {
      try { AUTH.sendRealEmail(user.email, code, user.name); } catch (e) {}
    }
    return code; // returned so the UI can show it in demo mode
  }

  /* ── auth flows ───────────────────────────────────────────── */
  function register({ name, studentId, email, password, branch, department }) {
    email = norm(email);
    if (!name || !email || !password) return { ok: false, err: "missing" };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, err: "email" };
    if (password.length < 6) return { ok: false, err: "weak" };
    if (getUser(email)) return { ok: false, err: "exists" };
    const user = {
      id: uid(), name: name.trim(), studentId: (studentId || "").trim(), email,
      pass: hash(password), verified: false, createdAt: Date.now(),
      branch: branch || "Nizwa", department: department || "",
    };
    saveUser(user);
    const code = sendVerification(user);
    return { ok: true, user: publicUser(user), demoCode: code };
  }

  function resend(email) {
    const u = getUser(email); if (!u) return { ok: false, err: "nouser" };
    if (u.verified) return { ok: false, err: "already" };
    return { ok: true, demoCode: sendVerification(u) };
  }

  function verify(email, code) {
    const u = getUser(email); if (!u) return { ok: false, err: "nouser" };
    if (u.verified) return { ok: true, user: publicUser(u) };
    if (String(code).trim() !== u.pendingCode) return { ok: false, err: "badcode" };
    u.verified = true; u.pendingCode = null; u.verifiedAt = Date.now();
    saveUser(u); setSession(u);
    return { ok: true, user: publicUser(u) };
  }

  function login(email, password) {
    const u = getUser(email); if (!u) return { ok: false, err: "nouser" };
    if (u.pass !== hash(password)) return { ok: false, err: "badpass" };
    if (!u.verified) return { ok: false, err: "unverified", email: u.email };
    setSession(u);
    return { ok: true, user: publicUser(u) };
  }

  function publicUser(u) {
    return { id: u.id, name: u.name, studentId: u.studentId, email: u.email,
      branch: u.branch, department: u.department, verified: u.verified };
  }

  /* ── session ──────────────────────────────────────────────── */
  function setSession(u) { write(SESSION, { email: norm(u.email), at: Date.now() }); }
  function current() { const s = read(SESSION, null); if (!s) return null; const u = getUser(s.email); return u ? publicUser(u) : null; }
  function logout() { localStorage.removeItem(SESSION); }

  /* ── submissions (detector history) ───────────────────────── */
  const allSubs = () => read(DB_SUBS, {});
  function listSubs(email) { return (allSubs()[norm(email)] || []).slice().sort((a, b) => b.at - a.at); }
  function addSub(email, sub) {
    const all = allSubs(); const key = norm(email);
    const rec = { id: "S" + Date.now().toString(36), at: Date.now(), ...sub };
    all[key] = [rec, ...(all[key] || [])].slice(0, 30); write(DB_SUBS, all); return rec;
  }
  function stats() {
    const users = Object.values(allUsers());
    let subs = 0; Object.values(allSubs()).forEach(a => subs += a.length);
    return { users: users.length, verified: users.filter(u => u.verified).length, submissions: subs };
  }

  window.AUTH = {
    register, resend, verify, login, logout, current,
    listSubs, addSub, stats,
    _realEmailEnabled: false, // flip true after wiring sendRealEmail
    /* Stub: plug a real provider here (EmailJS / SendGrid via backend),
       then set AUTH._realEmailEnabled = true.
       sendRealEmail(toEmail, code, name) → e.g.
         emailjs.send("service","template",{ to_email:toEmail, code, name }) */
    sendRealEmail: null,
  };
})();
