/* ═══════════════════════════════════════════════════════════════════
   UNIFIED DATA LAYER  ·  window.DB
   One async API the UI talks to. Routes to the cloud (Firebase) when a
   config is present, otherwise to the local demo database (AUTH).
═══════════════════════════════════════════════════════════════════ */
(function () {
  const cloudOn = () => !!(window.CLOUD && window.CLOUD.configured);

  const DB = {
    get mode() { return cloudOn() ? "cloud" : "local"; },
    initialized: false,

    async init() {
      if (cloudOn()) { try { await window.CLOUD.init(); } catch (e) {} }
      this.initialized = true;
      return this.mode;
    },

    async register(d) { return cloudOn() ? window.CLOUD.register(d) : window.AUTH.register(d); },
    async resend(email) { return cloudOn() ? window.CLOUD.resend(email) : window.AUTH.resend(email); },
    async verify(email, code) { return cloudOn() ? window.CLOUD.verify(email, code) : window.AUTH.verify(email, code); },
    async login(email, password) { return cloudOn() ? window.CLOUD.login(email, password) : window.AUTH.login(email, password); },
    async logout() { return cloudOn() ? window.CLOUD.logout() : window.AUTH.logout(); },

    current() { return cloudOn() ? window.CLOUD.current() : window.AUTH.current(); },
    onAuthChange(cb) { if (cloudOn()) window.CLOUD.onChange(cb); },

    async addSub(email, sub) { return cloudOn() ? window.CLOUD.addSub(email, sub) : window.AUTH.addSub(email, sub); },
    async listSubs(email) { return cloudOn() ? window.CLOUD.listSubs(email) : window.AUTH.listSubs(email); },
  };

  window.DB = DB;
})();
