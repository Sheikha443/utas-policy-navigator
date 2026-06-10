/* ═══════════════════════════════════════════════════════════════════
   MODULE 3 — COMPLIANCE CHECKER  (localStorage-persisted)
═══════════════════════════════════════════════════════════════════ */
const { C: MC, P: MP, DOMAINS: MDOM, TIER: MTIER } = window.NAV;
const STORE_KEY = "utas_compliance_v1";

const CSTATUS = [
  { en:"Not started", ar:"لم يبدأ",     bg:"#F2EEE6", color:MC.warm,    border:MC.line },
  { en:"In progress", ar:"قيد التنفيذ", bg:"#FFF1E0", color:"#B45A12",  border:MC.orange },
  { en:"Implemented", ar:"مُطبَّق",      bg:"#EAF5EF", color:"#2E7D5B",  border:"#2E7D5B" },
];

function Ring({ pct, color, lang }) {
  const r = 42, circ = 2 * Math.PI * r;
  return (
    <div style={{ position:"relative", width:104, height:104, flexShrink:0 }}>
      <svg width="104" height="104" viewBox="0 0 104 104">
        <circle cx="52" cy="52" r={r} fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="8" />
        <circle cx="52" cy="52" r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={circ - (circ * pct) / 100}
          transform="rotate(-90 52 52)" style={{ transition:"stroke-dashoffset .8s cubic-bezier(.3,.8,.3,1)" }} />
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontFamily:"'Newsreader',serif", fontSize:30, fontWeight:600, color:MC.white,
          lineHeight:1 }}>{pct}<span style={{ fontSize:16 }}>%</span></span>
      </div>
    </div>
  );
}

function ComplianceModule({ lang, initialFilter }) {
  const isAr = lang === "ar";
  const [status, setStatus] = React.useState(() => {
    try { const s = JSON.parse(localStorage.getItem(STORE_KEY)); if (s) return s; } catch (e) {}
    return Object.fromEntries(MP.map(p => [p.id, 0]));
  });
  const [filter, setFilter] = React.useState(initialFilter || "all");

  React.useEffect(() => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(status)); } catch (e) {}
  }, [status]);

  const cycle = id => setStatus(s => ({ ...s, [id]: ((s[id] || 0) + 1) % 3 }));
  const setAll = v => setStatus(Object.fromEntries(MP.map(p => [p.id, v])));

  const t1 = MP.filter(p => p.t === 1);
  const t1done = t1.filter(p => status[p.id] === 2).length;
  const pct = Math.round((t1done / t1.length) * 100);
  const allDone = MP.filter(p => status[p.id] === 2).length;

  const grouped = React.useMemo(() => {
    const g = {};
    MP.filter(p => filter === "all" || p.d === filter || String(p.t) === filter)
      .forEach(p => { (g[p.d] = g[p.d] || []).push(p); });
    return g;
  }, [filter]);

  const filters = [
    ["all", isAr ? "الكل" : "All"],
    ...Object.entries(MDOM).map(([k, v]) => [k, k]),
    ["1", isAr ? "إلزامي" : "Tier 1"],
    ["2", isAr ? "موصى به" : "Tier 2"],
    ["3", isAr ? "استشاري" : "Tier 3"],
  ];

  return (
    <div className="fade-in">
      <Eyebrow color={MC.rust}>{isAr ? "وحدة 03" : "Module 03"}</Eyebrow>

      {/* score card */}
      <div style={{ background:MC.navy, borderRadius:22, padding:"26px 30px", marginBottom:24,
        position:"relative", overflow:"hidden", boxShadow:"0 24px 56px -34px rgba(36,48,144,.7)" }}>
        <div style={{ position:"absolute", insetInlineEnd:-30, bottom:-50, opacity:.5, pointerEvents:"none" }}>
          <GeoMotif size={170} style={{ transform: isAr ? "scaleX(-1)" : "none" }} />
        </div>
        <div style={{ position:"relative", display:"flex", alignItems:"center", gap:26, flexWrap:"wrap" }}>
          <Ring pct={pct} color={MC.orange} lang={lang} />
          <div style={{ flex:"1 1 240px" }}>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:600,
              letterSpacing:2, textTransform:"uppercase", color:"rgba(255,255,255,.55)", marginBottom:9 }}>
              {isAr ? "امتثال المستوى الإلزامي" : "Tier 1 mandatory compliance"}</div>
            <div style={{ fontFamily:"'Newsreader',serif", fontSize:"clamp(20px,2.6vw,26px)",
              color:MC.white, lineHeight:1.25, marginBottom:6 }}>
              {isAr ? `طُبِّق ${t1done} من ${t1.length} بنداً إلزامياً` : `${t1done} of ${t1.length} mandatory policies implemented`}</div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,.6)" }}>
              {isAr ? `${allDone} من ٢٩ بنداً مكتمل إجمالاً · يُحفَظ تلقائياً` : `${allDone} of 29 total complete · saved automatically`}</div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {CSTATUS.map((s, i) => {
              const n = MP.filter(p => (status[p.id] || 0) === i).length;
              return (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:9, fontSize:12.5 }}>
                  <span style={{ width:9, height:9, borderRadius:99, background:s.border }} />
                  <span style={{ color:"rgba(255,255,255,.72)" }}>{bi(s, lang)}:
                    <b style={{ color:MC.white, marginInlineStart:5 }}>{n}</b></span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* controls */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:22, flexWrap:"wrap" }}>
        <div style={{ display:"flex", gap:7, flexWrap:"wrap", flex:1 }}>
          {filters.map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)} style={{
              padding:"7px 14px", borderRadius:99, fontSize:12.5, fontWeight:600, cursor:"pointer",
              fontFamily: /^D\d/.test(v) ? "'IBM Plex Mono',monospace" : "inherit",
              background: filter === v ? MC.navy : MC.white,
              color: filter === v ? MC.white : MC.slate,
              border:`1.5px solid ${filter === v ? MC.navy : MC.line}`, transition:"all .16s" }}>{l}</button>
          ))}
        </div>
        <button onClick={() => setAll(0)} style={{ padding:"7px 13px", borderRadius:99, fontSize:12.5,
          fontWeight:600, cursor:"pointer", background:MC.white, color:MC.warm,
          border:`1.5px solid ${MC.line}` }}>{isAr ? "إعادة تعيين" : "Reset all"}</button>
      </div>

      {/* policy cards by domain */}
      {Object.entries(grouped).map(([dk, pols]) => {
        const dom = MDOM[dk];
        const dDone = pols.filter(p => status[p.id] === 2).length;
        return (
          <div key={dk} style={{ marginBottom:30 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:15 }}>
              <div style={{ width:38, height:38, borderRadius:11, background:`${dom.col}14`,
                color:dom.col, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Glyph name={dom.glyph} size={21} /></div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Newsreader',serif", fontSize:18, fontWeight:600, color:MC.ink }}>
                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:13, color:dom.col,
                    marginInlineEnd:8 }}>{dk}</span>{bi(dom, lang)}</div>
              </div>
              <span style={{ fontSize:12.5, color:MC.warm, fontWeight:600 }}>{dDone}/{pols.length}</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:13 }}>
              {pols.map(p => {
                const s = status[p.id] || 0, sc = CSTATUS[s], tc = MTIER[p.t];
                return (
                  <div key={p.id} style={{ background:MC.white, borderRadius:14, padding:"16px 17px",
                    border:`1px solid ${MC.line}`, borderInlineStart:`4px solid ${tc.border}`,
                    transition:"box-shadow .2s", display:"flex", flexDirection:"column", gap:9 }}
                    onMouseEnter={e=>e.currentTarget.style.boxShadow="0 10px 26px -16px rgba(32,35,58,.3)"}
                    onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:8 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontWeight:700,
                          fontSize:13, color:MC.navy }}>{p.id}</span>
                        <TierBadge tier={p.t} lang={lang} />
                      </div>
                      <button onClick={() => cycle(p.id)} style={{ padding:"5px 12px", borderRadius:99,
                        fontSize:12, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap",
                        background:sc.bg, color:sc.color, border:`1.5px solid ${sc.border}`,
                        transition:"all .16s", display:"inline-flex", alignItems:"center", gap:6 }}>
                        {s === 2 && <Glyph name="check" size={13} stroke={sc.color} width={2.5} />}
                        {bi(sc, lang)}
                      </button>
                    </div>
                    <div style={{ fontWeight:600, fontSize:14, color:MC.ink, lineHeight:1.35 }}>
                      {isAr ? p.ar : p.short}</div>
                    <div style={{ fontSize:13, color:MC.slate, lineHeight:1.55 }}>
                      {isAr ? p.plainAr : p.plain}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

Object.assign(window, { ComplianceModule });
