/* ═══════════════════════════════════════════════════════════════════
   COMMAND CENTER  ·  institutional governance dashboard
═══════════════════════════════════════════════════════════════════ */
const { C: CC, DOMAINS: CDOM } = window.NAV;
const { DEPTS, DKEYS, BRANCHES, load: osLoad, save: osSave, reset: osReset,
        deptScore, domainScore, overall, band, alerts: osAlerts } = window.OS;

/* ── Semicircular readiness gauge ───────────────────────────── */
function ReadinessGauge({ value, lang }) {
  const v = useCountUp(value, { duration: 1600 });
  const isAr = lang === "ar";
  const R = 88, CX = 110, CY = 110;
  const a0 = Math.PI, a1 = 0;                       // 180° → 0°
  const ang = a0 + (a1 - a0) * (v / 100);
  const pt = (a, r = R) => [CX + r * Math.cos(a), CY - r * Math.sin(a)];
  const [sx, sy] = pt(a0), [ex, ey] = pt(ang);
  const large = (a0 - ang) > Math.PI ? 1 : 0;
  const b = band(value);
  const segs = [[0,50,"#C8472B"],[50,65,"#E46C24"],[65,80,"#C98A1E"],[80,100,"#2E7D5B"]];

  return (
    <div style={{ position:"relative", width:220, height:150, flexShrink:0 }}>
      <svg width="220" height="150" viewBox="0 0 220 130">
        {/* track segments */}
        {segs.map(([s, e, col], i) => {
          const as = a0 + (a1 - a0) * (s / 100), ae = a0 + (a1 - a0) * (e / 100);
          const [x1, y1] = pt(as), [x2, y2] = pt(ae);
          const lg = (as - ae) > Math.PI ? 1 : 0;
          return <path key={i} d={`M ${x1} ${y1} A ${R} ${R} 0 ${lg} 1 ${x2} ${y2}`}
            fill="none" stroke={col} strokeWidth="13" strokeLinecap="butt" opacity={.22} />;
        })}
        {/* value arc */}
        <path d={`M ${sx} ${sy} A ${R} ${R} 0 ${large} 1 ${ex} ${ey}`}
          fill="none" stroke={b.color} strokeWidth="13" strokeLinecap="round"
          style={{ transition:"all .25s" }} />
        {/* needle hub */}
        <circle cx={CX} cy={CY} r="6" fill={CC.navy} />
        <line x1={CX} y1={CY} x2={ex} y2={ey} stroke={CC.navy} strokeWidth="3.5" strokeLinecap="round" />
      </svg>
      <div style={{ position:"absolute", inset:0, top:54, display:"flex", flexDirection:"column",
        alignItems:"center", pointerEvents:"none" }}>
        <span style={{ fontFamily:"'Newsreader',serif", fontSize:42, fontWeight:600, color:CC.ink,
          lineHeight:1, letterSpacing:-1 }}>{isAr ? v.toLocaleString("ar-EG") : v}
          <span style={{ fontSize:20 }}>%</span></span>
        <span style={{ fontSize:12, fontWeight:700, color:b.color, marginTop:6, letterSpacing:.3 }}>
          {b[lang]}</span>
      </div>
    </div>
  );
}

/* ── KPI tile ───────────────────────────────────────────────── */
function Kpi({ label, value, suffix, sub, color, lang, delay }) {
  const v = useCountUp(value, { duration: 1300, delay });
  const isAr = lang === "ar";
  return (
    <div style={{ background:CC.white, border:`1px solid ${CC.line}`, borderRadius:15, padding:"17px 18px",
      borderTop:`3px solid ${color}` }}>
      <div style={{ fontSize:11.5, color:CC.warm, fontWeight:600, letterSpacing:.3, marginBottom:9 }}>{label}</div>
      <div style={{ fontFamily:"'Newsreader',serif", fontSize:32, fontWeight:600, color:CC.ink, lineHeight:1,
        display:"flex", alignItems:"baseline", gap:3 }}>
        {isAr ? v.toLocaleString("ar-EG") : v}{suffix && <span style={{ fontSize:16, color:CC.slate }}>{suffix}</span>}
      </div>
      {sub && <div style={{ fontSize:12, color:CC.slate, marginTop:8 }}>{sub}</div>}
    </div>
  );
}

/* ── Radar chart (6 domains, one department) ────────────────── */
function Radar({ matrix, deptId, lang }) {
  const isAr = lang === "ar";
  const S = 230, c = S / 2, R = 78;
  const N = DKEYS.length;
  const ptAt = (i, r) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / N;
    return [c + r * Math.cos(a), c + r * Math.sin(a)];
  };
  const vals = DKEYS.map(d => matrix[deptId][d]);
  const poly = vals.map((v, i) => ptAt(i, (v / 100) * R).join(",")).join(" ");
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg width="100%" viewBox={`0 0 ${S} ${S}`} style={{ maxWidth:300, margin:"0 auto", display:"block" }}>
      {rings.map((rr, i) => (
        <polygon key={i} points={DKEYS.map((_, k) => ptAt(k, rr * R).join(",")).join(" ")}
          fill="none" stroke={CC.line} strokeWidth="1" />
      ))}
      {DKEYS.map((d, i) => {
        const [x, y] = ptAt(i, R);
        const [lx, ly] = ptAt(i, R + 16);
        return (
          <g key={d}>
            <line x1={c} y1={c} x2={x} y2={y} stroke={CC.line} strokeWidth="1" />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
              fontFamily="'IBM Plex Mono',monospace" fontSize="10" fontWeight="600"
              fill={CDOM[d].col}>{d}</text>
          </g>
        );
      })}
      <polygon points={poly} fill={`${CC.royal}26`} stroke={CC.royal} strokeWidth="2.5"
        strokeLinejoin="round" style={{ transition:"all .6s cubic-bezier(.3,.8,.3,1)" }} />
      {vals.map((v, i) => {
        const [x, y] = ptAt(i, (v / 100) * R);
        return <circle key={i} cx={x} cy={y} r="3.5" fill={CC.royal}
          style={{ transition:"all .6s cubic-bezier(.3,.8,.3,1)" }} />;
      })}
    </svg>
  );
}

function CommandCenter({ lang, go }) {
  const isAr = lang === "ar";
  const [matrix, setMatrix] = React.useState(osLoad);
  const [sel, setSel] = React.useState(null);          // {dept, domain}
  const [radarDept, setRadarDept] = React.useState(DEPTS[0].id);
  React.useEffect(() => { osSave(matrix); }, [matrix]);

  const ov = overall(matrix);
  const ovBand = band(ov);
  const alerts = osAlerts(matrix, lang);
  const strongDomain = [...DKEYS].sort((a, b) => domainScore(matrix, b) - domainScore(matrix, a))[0];
  const weakDomain = [...DKEYS].sort((a, b) => domainScore(matrix, a) - domainScore(matrix, b))[0];
  const setCell = (dept, domain, v) =>
    setMatrix(m => ({ ...m, [dept]: { ...m[dept], [domain]: Math.max(0, Math.min(100, v)) } }));

  const cellColor = v => {
    const b = band(v);
    return { bg: `${b.color}`, op: 0.12 + (v / 100) * 0.72 };
  };

  return (
    <div className="fade-in">
      <Eyebrow color={CC.navy}>{isAr ? "النظام · مركز القيادة" : "OS · Command Center"}</Eyebrow>
      <h2 style={{ ...hHead, marginBottom:6 }}>{isAr ? "مركز قيادة نزاهة الذكاء الاصطناعي" : "AI Integrity Command Center"}</h2>
      <p style={{ ...hSub, maxWidth:640 }}>
        {isAr ? "صورة حيّة لامتثال الجامعة عبر الأقسام والمجالات الستة. اضغط أي خانة لتعديل قيمتها — تُحفَظ تلقائياً."
              : "A live picture of institutional compliance across departments and the six domains. Click any cell to adjust — saved automatically."}
      </p>

      {/* ── top band: gauge + KPIs ── */}
      <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:20, marginBottom:18,
        alignItems:"stretch" }} className="cc-top">
        <div style={{ background:CC.white, border:`1px solid ${CC.line}`, borderRadius:18,
          padding:"20px 26px", display:"flex", flexDirection:"column", alignItems:"center",
          justifyContent:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:14, insetInlineStart:18, fontFamily:"'IBM Plex Mono',monospace",
            fontSize:10.5, fontWeight:600, letterSpacing:1.5, textTransform:"uppercase", color:CC.warm }}>
            {isAr ? "مؤشر الجاهزية للاعتماد" : "Accreditation readiness"}</div>
          <ReadinessGauge value={ov} lang={lang} />
          <div style={{ marginTop:4, fontSize:12.5, color:CC.slate, textAlign:"center", maxWidth:200 }}>
            {isAr ? `الفرع: نزوى · ${DEPTS.length} أقسام` : `Branch: Nizwa · ${DEPTS.length} departments`}</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:13 }}>
          <Kpi label={isAr ? "أعلى مجال" : "Strongest domain"} value={domainScore(matrix, strongDomain)}
            suffix="%" color="#2E7D5B" lang={lang} delay={200}
            sub={`${strongDomain} · ${bi(CDOM[strongDomain], lang)}`} />
          <Kpi label={isAr ? "أضعف مجال" : "Weakest domain"} value={domainScore(matrix, weakDomain)}
            suffix="%" color={CC.rust} lang={lang} delay={320}
            sub={`${weakDomain} · ${bi(CDOM[weakDomain], lang)}`} />
          <Kpi label={isAr ? "فجوات حرجة" : "Critical gaps"} value={alerts.filter(a => a.level === "critical").length}
            color="#C8472B" lang={lang} delay={440}
            sub={isAr ? "بنود تحت ٤٢٪" : "cells below 42%"} />
          <Kpi label={isAr ? "ترتيب الفرع" : "Branch rank"}
            value={[...BRANCHES].sort((a,b)=>b.score-a.score).findIndex(x=>x.self)+1}
            suffix={isAr ? ` / ${BRANCHES.length}` : ` / ${BRANCHES.length}`} color={CC.royal} lang={lang} delay={560}
            sub={isAr ? "بين الفروع" : "among branches"} />
        </div>
      </div>

      {/* ── heatmap + side column ── */}
      <div style={{ display:"grid", gridTemplateColumns:"1.55fr 1fr", gap:18, marginBottom:18 }} className="cc-mid">
        {/* HEATMAP */}
        <div style={{ background:CC.white, border:`1px solid ${CC.line}`, borderRadius:18, padding:"20px 20px 22px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, gap:10, flexWrap:"wrap" }}>
            <h3 style={cardTitle}>{isAr ? "خريطة المخاطر" : "Risk heatmap"}</h3>
            <div style={{ display:"flex", gap:12, alignItems:"center", fontSize:11, color:CC.warm }}>
              {[["#C8472B",isAr?"حرج":"Critical"],["#E46C24",isAr?"خطر":"At risk"],["#C98A1E",isAr?"مسار":"On track"],["#2E7D5B",isAr?"قوي":"Strong"]].map(([c,l])=>(
                <span key={l} style={{ display:"inline-flex", alignItems:"center", gap:5 }}>
                  <span style={{ width:10, height:10, borderRadius:3, background:c }} />{l}</span>
              ))}
            </div>
          </div>

          {/* editor bar */}
          {sel && (
            <div className="fade-in" style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14,
              padding:"12px 15px", background:CC.paper, border:`1px solid ${CC.line}`, borderRadius:12, flexWrap:"wrap" }}>
              <div style={{ fontSize:13, fontWeight:600, color:CC.ink }}>
                <span style={{ fontFamily:"'IBM Plex Mono',monospace", color:CDOM[sel.domain].col, marginInlineEnd:7 }}>{sel.domain}</span>
                {bi(DEPTS.find(d=>d.id===sel.dept), lang)} · {bi(CDOM[sel.domain], lang)}
              </div>
              <input type="range" min="0" max="100" value={matrix[sel.dept][sel.domain]}
                onChange={e => setCell(sel.dept, sel.domain, +e.target.value)}
                style={{ flex:"1 1 160px", accentColor:CC.navy }} />
              <span style={{ fontFamily:"'Newsreader',serif", fontSize:22, fontWeight:600,
                color:band(matrix[sel.dept][sel.domain]).color, minWidth:54, textAlign:"center" }}>
                {matrix[sel.dept][sel.domain]}%</span>
              <button onClick={() => setSel(null)} style={miniBtn}>{isAr ? "إغلاق" : "Done"}</button>
            </div>
          )}

          {/* grid */}
          <div style={{ overflowX:"auto" }}>
            <div style={{ display:"grid",
              gridTemplateColumns:`minmax(120px,1.4fr) repeat(${DKEYS.length}, minmax(40px,1fr)) minmax(58px,.8fr)`,
              gap:5, minWidth:440 }}>
              {/* header row */}
              <div />
              {DKEYS.map(d => (
                <div key={d} title={bi(CDOM[d], lang)} style={{ textAlign:"center", fontFamily:"'IBM Plex Mono',monospace",
                  fontSize:11, fontWeight:700, color:CDOM[d].col, paddingBottom:4 }}>{d}</div>
              ))}
              <div style={{ textAlign:"center", fontSize:10.5, fontWeight:600, color:CC.warm, alignSelf:"end", paddingBottom:4 }}>
                {isAr ? "القسم" : "Dept"}</div>
              {/* dept rows */}
              {DEPTS.map(dp => {
                const ds = deptScore(matrix, dp.id);
                return (
                  <React.Fragment key={dp.id}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:12.5, fontWeight:600,
                      color:CC.ink, paddingInlineEnd:6, minWidth:0 }}>
                      <span style={{ color:CDOM.D1 && CC.slate, flexShrink:0, color:CC.navy }}><Glyph name={dp.glyph} size={16} /></span>
                      <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{bi(dp, lang)}</span>
                    </div>
                    {DKEYS.map(d => {
                      const v = matrix[dp.id][d];
                      const { bg, op } = cellColor(v);
                      const isSel = sel && sel.dept === dp.id && sel.domain === d;
                      return (
                        <button key={d} onClick={() => setSel({ dept:dp.id, domain:d })}
                          title={`${bi(dp,lang)} · ${bi(CDOM[d],lang)}: ${v}%`}
                          style={{ aspectRatio:"1.6/1", minHeight:34, border: isSel ? `2.5px solid ${CC.navy}` : "1px solid #ffffff",
                            borderRadius:7, cursor:"pointer", position:"relative", overflow:"hidden",
                            background:"transparent", padding:0, transition:"transform .12s",
                            transform: isSel ? "scale(1.06)" : "none" }}
                          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
                          onMouseLeave={e=>e.currentTarget.style.transform=isSel?"scale(1.06)":"none"}>
                          <span style={{ position:"absolute", inset:0, background:bg, opacity:op }} />
                          <span style={{ position:"relative", fontSize:11.5, fontWeight:700,
                            color: op > 0.5 ? "#fff" : CC.ink }}>{v}</span>
                        </button>
                      );
                    })}
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
                      fontFamily:"'Newsreader',serif", fontSize:16, fontWeight:600, color:band(ds).color }}>{ds}</div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div style={{ marginTop:14, fontSize:11.5, color:CC.warm }}>
            {isAr ? "💡 الأرقام تجريبية — تمثّل آلية النظام. اضبطها لتحاكي بيانات قسمك."
                  : "💡 Demo figures illustrating the system. Adjust them to mirror your department's data."}</div>
        </div>

        {/* SIDE: alerts */}
        <div style={{ background:CC.white, border:`1px solid ${CC.line}`, borderRadius:18, padding:"20px" }}>
          <h3 style={{ ...cardTitle, marginBottom:14 }}>{isAr ? "إنذارات الفجوات" : "Gap alerts"}</h3>
          {alerts.length === 0 && (
            <div style={{ fontSize:13, color:"#2E7D5B", padding:"20px 0", textAlign:"center" }}>
              {isAr ? "لا فجوات حرجة 🎉" : "No critical gaps 🎉"}</div>
          )}
          <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
            {alerts.map((a, i) => {
              const col = a.level === "critical" ? "#C8472B" : CC.rust;
              return (
                <button key={i} onClick={() => { setSel({ dept:a.dept.id, domain:a.domain }); setRadarDept(a.dept.id);
                  window.scrollTo({ top: 0, behavior:"smooth" }); }}
                  style={{ textAlign:isAr?"right":"left", background:`${col}0E`, border:`1px solid ${col}33`,
                    borderInlineStart:`3px solid ${col}`, borderRadius:10, padding:"10px 12px", cursor:"pointer",
                    display:"flex", alignItems:"center", gap:11, transition:"background .15s" }}
                  onMouseEnter={e=>e.currentTarget.style.background=`${col}1A`}
                  onMouseLeave={e=>e.currentTarget.style.background=`${col}0E`}>
                  <span style={{ fontFamily:"'Newsreader',serif", fontSize:20, fontWeight:600, color:col, minWidth:34 }}>{a.v}%</span>
                  <span style={{ flex:1, minWidth:0 }}>
                    <span style={{ display:"block", fontSize:12.5, fontWeight:600, color:CC.ink }}>{bi(a.dept, lang)}</span>
                    <span style={{ display:"block", fontSize:11.5, color:CC.slate }}>
                      <span style={{ fontFamily:"'IBM Plex Mono',monospace", color:CDOM[a.domain].col }}>{a.domain}</span> · {bi(CDOM[a.domain], lang)}</span>
                  </span>
                  <span style={{ fontSize:10, fontWeight:700, color:col, textTransform:"uppercase", letterSpacing:.5 }}>
                    {a.level === "critical" ? (isAr?"حرج":"Crit") : (isAr?"خطر":"Warn")}</span>
                </button>
              );
            })}
          </div>
          <button onClick={() => go("assistant")} style={{ marginTop:16, width:"100%", display:"inline-flex",
            alignItems:"center", justifyContent:"center", gap:8, background:CC.navy, color:"#fff", border:"none",
            borderRadius:11, padding:"12px", fontSize:13.5, fontWeight:600, cursor:"pointer" }}>
            <Glyph name="spark" size={16} stroke="#fff" />
            {isAr ? "اسأل المساعد كيف أعالجها" : "Ask the assistant how to fix these"}</button>
        </div>
      </div>

      {/* ── radar + branch comparison ── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:18 }} className="cc-bot">
        {/* RADAR */}
        <div style={{ background:CC.white, border:`1px solid ${CC.line}`, borderRadius:18, padding:"20px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6, gap:10, flexWrap:"wrap" }}>
            <h3 style={cardTitle}>{isAr ? "رادار الجاهزية" : "Readiness radar"}</h3>
            <select value={radarDept} onChange={e => setRadarDept(e.target.value)}
              style={{ padding:"7px 11px", borderRadius:9, border:`1.5px solid ${CC.line}`, background:CC.paper,
                fontSize:13, fontWeight:600, color:CC.navy, fontFamily:"'IBM Plex Sans Arabic',sans-serif", cursor:"pointer" }}>
              {DEPTS.map(d => <option key={d.id} value={d.id}>{bi(d, lang)}</option>)}
            </select>
          </div>
          <Radar matrix={matrix} deptId={radarDept} lang={lang} />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginTop:8 }}>
            {DKEYS.map(d => (
              <div key={d} style={{ display:"flex", alignItems:"center", gap:7, fontSize:11.5, color:CC.slate }}>
                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontWeight:700, color:CDOM[d].col }}>{d}</span>
                <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{bi(CDOM[d], lang)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BRANCH COMPARE */}
        <div style={{ background:CC.white, border:`1px solid ${CC.line}`, borderRadius:18, padding:"20px" }}>
          <h3 style={{ ...cardTitle, marginBottom:18 }}>{isAr ? "مقارنة الفروع" : "Branch comparison"}</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {[...BRANCHES].map(b => ({ ...b, score: b.self ? ov : b.score }))
              .sort((a, b) => b.score - a.score).map(b => {
              const bb = band(b.score);
              return (
                <div key={b.id}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ fontSize:13, fontWeight: b.self ? 700 : 500, color: b.self ? CC.navy : CC.slate,
                      display:"flex", alignItems:"center", gap:7 }}>
                      {bi(b, lang)}
                      {b.self && <span style={{ fontSize:10, fontWeight:700, color:CC.orange, background:`${CC.orange}1A`,
                        padding:"1px 7px", borderRadius:99 }}>{isAr ? "فرعنا" : "OURS"}</span>}
                    </span>
                    <span style={{ fontFamily:"'Newsreader',serif", fontSize:15, fontWeight:600, color:bb.color }}>{b.score}%</span>
                  </div>
                  <div style={{ height:9, borderRadius:99, background:CC.cream, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${b.score}%`, borderRadius:99,
                      background: b.self ? `linear-gradient(90deg,${CC.orange},${CC.rust})` : bb.color,
                      transition:"width .8s cubic-bezier(.3,.8,.3,1)",
                      boxShadow: b.self ? `0 0 0 1px ${CC.orange}` : "none" }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop:18, paddingTop:16, borderTop:`1px solid ${CC.line}`,
            display:"flex", gap:10, flexWrap:"wrap" }}>
            <button onClick={() => { if (confirm(isAr?"إعادة كل البيانات للوضع الافتراضي؟":"Reset all data to defaults?")) setMatrix(osReset()); }}
              style={miniBtn}>{isAr ? "إعادة تعيين البيانات" : "Reset data"}</button>
            <button onClick={() => go("compliance")} style={{ ...miniBtn, background:CC.navy, color:"#fff", border:"none" }}>
              {isAr ? "افتح مدقّق الامتثال" : "Open compliance checker"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardTitle = { fontFamily:"'Newsreader',serif", fontSize:18, fontWeight:600, color:"#20233A", margin:0 };
const miniBtn = { padding:"9px 14px", borderRadius:9, fontSize:12.5, fontWeight:600, cursor:"pointer",
  background:"#fff", color:"#5B6276", border:"1.5px solid #E0D8C8", fontFamily:"'IBM Plex Sans Arabic',sans-serif" };

Object.assign(window, { CommandCenter });
