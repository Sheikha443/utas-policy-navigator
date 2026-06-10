/* ═══════════════════════════════════════════════════════════════════
   INSTITUTION DATA LAYER  ·  UTAS AI Integrity OS
   Demo (editable + persisted) compliance state for the Command Center.
   Numbers are simulated in-browser — NOT a live database.
═══════════════════════════════════════════════════════════════════ */
(function () {
  const STORE = "utas_os_matrix_v1";

  /* Departments at UTAS Nizwa (demo) */
  const DEPTS = [
    { id:"ENG", en:"Engineering",            ar:"الهندسة",              staff:64, glyph:"shield" },
    { id:"IT",  en:"Information Technology",  ar:"تقنية المعلومات",      staff:58, glyph:"grid" },
    { id:"BUS", en:"Business Studies",        ar:"الدراسات التجارية",    staff:71, glyph:"layers" },
    { id:"SCI", en:"Applied Sciences",        ar:"العلوم التطبيقية",     staff:46, glyph:"spark" },
    { id:"FND", en:"Foundation Program",      ar:"البرنامج التأسيسي",    staff:52, glyph:"book" },
    { id:"PHM", en:"Pharmacy & Health",       ar:"الصيدلة والصحة",       staff:33, glyph:"crescent" },
  ];

  /* Domain keys aligned with NAV.DOMAINS (D1..D6) */
  const DKEYS = ["D1","D2","D3","D4","D5","D6"];

  /* Seed compliance matrix [deptId][domain] = 0..100 (demo, varied) */
  const SEED = {
    ENG: { D1:88, D2:82, D3:74, D4:69, D5:61, D6:78 },
    IT:  { D1:94, D2:90, D3:86, D4:91, D5:80, D6:72 },
    BUS: { D1:72, D2:66, D3:58, D4:54, D5:49, D6:63 },
    SCI: { D1:80, D2:77, D3:71, D4:64, D5:55, D6:69 },
    FND: { D1:63, D2:58, D3:44, D4:42, D5:38, D6:57 },
    PHM: { D1:84, D2:79, D3:81, D4:88, D5:67, D6:74 },
  };

  /* Peer branches for comparison (demo) */
  const BRANCHES = [
    { id:"NZW", en:"Nizwa",    ar:"نزوى",      score:72, self:true },
    { id:"MCT", en:"Muscat",   ar:"مسقط",      score:79 },
    { id:"IBR", en:"Ibri",     ar:"عبري",      score:64 },
    { id:"SUR", en:"Sur",      ar:"صور",       score:58 },
    { id:"SLL", en:"Salalah",  ar:"صلالة",     score:69 },
  ];

  function load() {
    try { const s = JSON.parse(localStorage.getItem(STORE)); if (s) return s; } catch (e) {}
    return JSON.parse(JSON.stringify(SEED));
  }
  function save(m) { try { localStorage.setItem(STORE, JSON.stringify(m)); } catch (e) {} }
  function reset() { try { localStorage.removeItem(STORE); } catch (e) {} return JSON.parse(JSON.stringify(SEED)); }

  /* Domain weights — mandatory-heavy domains weigh more toward readiness */
  const WEIGHTS = { D1:1.3, D2:1.2, D3:1.1, D4:1.3, D5:1.0, D6:1.1 };

  function deptScore(m, id) {
    const row = m[id]; let num = 0, den = 0;
    DKEYS.forEach(d => { num += (row[d] || 0) * WEIGHTS[d]; den += WEIGHTS[d]; });
    return Math.round(num / den);
  }
  function domainScore(m, d) {
    const vals = DEPTS.map(dp => m[dp.id][d] || 0);
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }
  function overall(m) {
    return Math.round(DEPTS.map(dp => deptScore(m, dp.id)).reduce((a, b) => a + b, 0) / DEPTS.length);
  }

  /* Risk band for a 0..100 value */
  function band(v) {
    if (v >= 80) return { key:"strong",  en:"Strong",     ar:"قوي",      color:"#2E7D5B" };
    if (v >= 65) return { key:"onTrack",  en:"On track",   ar:"في المسار", color:"#C98A1E" };
    if (v >= 50) return { key:"atRisk",   en:"At risk",    ar:"معرّض للخطر", color:"#E46C24" };
    return            { key:"critical", en:"Critical",   ar:"حرج",      color:"#C8472B" };
  }

  /* Generate alerts: lowest mandatory-domain cells */
  function alerts(m, lang) {
    const out = [];
    DEPTS.forEach(dp => DKEYS.forEach(d => {
      const v = m[dp.id][d];
      if (v < 50) out.push({ dept:dp, domain:d, v, level: v < 42 ? "critical" : "warn" });
    }));
    return out.sort((a, b) => a.v - b.v).slice(0, 6);
  }

  window.OS = { DEPTS, DKEYS, BRANCHES, load, save, reset, deptScore, domainScore, overall, band, alerts, WEIGHTS };
})();
