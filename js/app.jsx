/* ═══════════════════════════════════════════════════════════════════
   APP SHELL  ·  navigation · language · routing
═══════════════════════════════════════════════════════════════════ */
const { C: AC, T: AT } = window.NAV;

function App() {
  const [lang, setLang] = React.useState(() => localStorage.getItem("utas_lang") || "ar");
  const [route, setRoute] = React.useState("home");
  const [routeArg, setRouteArg] = React.useState(null);
  const [guideOpen, setGuideOpen] = React.useState(false);
  const isAr = lang === "ar";

  React.useEffect(() => {
    localStorage.setItem("utas_lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? "rtl" : "ltr";
  }, [lang]);

  const go = (r, arg = null) => {
    setRoute(r); setRouteArg(arg);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const NAV_ITEMS = [
    { id:"home",        t:AT.nav_home,      icon:"layers" },
    { id:"command",     t:AT.nav_command,   icon:"flag" },
    { id:"decision",    t:AT.nav_decision,  icon:"compass" },
    { id:"declaration", t:AT.nav_decl,      icon:"doc" },
    { id:"compliance",  t:AT.nav_comp,      icon:"gauge" },
    { id:"library",     t:AT.nav_lib,       icon:"grid" },
    { id:"assistant",   t:AT.nav_assistant, icon:"spark" },
    { id:"portal",      t:AT.nav_portal,    icon:"shield" },
  ];

  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", background:AC.paper }}>
      {/* ── TOP BAR ── */}
      <header style={{ position:"sticky", top:0, zIndex:50, background:"rgba(250,247,241,.88)",
        backdropFilter:"blur(14px)", borderBottom:`1px solid ${AC.line}` }}>
        <div style={{ maxWidth:1120, margin:"0 auto", padding:"0 clamp(16px,3vw,28px)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:16, height:68 }}>
            {/* brand */}
            <button onClick={() => go("home")} style={{ display:"flex", alignItems:"center", gap:12,
              background:"none", border:"none", cursor:"pointer", flexShrink:0 }}>
              <LogoMark size={38} />
              <div style={{ textAlign:isAr?"right":"left", lineHeight:1.18 }}>
                <div style={{ fontFamily:"'Newsreader',serif", fontSize:16.5, fontWeight:600,
                  color:AC.ink, letterSpacing:-.3, whiteSpace:"nowrap" }}>{bi(AT.brand, lang)}</div>
                <div style={{ fontSize:10.5, color:AC.warm, fontWeight:500, letterSpacing:.2,
                  whiteSpace:"nowrap" }}>
                  {isAr ? "التقنية والعلوم التطبيقية — نزوى" : "UTAS — Nizwa"}</div>
              </div>
            </button>

            {/* desktop nav */}
            <nav className="topnav" style={{ display:"flex", gap:2, marginInlineStart:"auto",
              alignItems:"center" }}>
              {NAV_ITEMS.map(n => {
                const active = route === n.id;
                return (
                  <button key={n.id} onClick={() => go(n.id)} title={bi(n.t, lang)} style={{
                    display:"flex", alignItems:"center", gap:7, padding:"8px 11px", borderRadius:10,
                    background: active ? AC.white : "transparent", cursor:"pointer", border:"none",
                    color: active ? AC.navy : AC.slate, fontSize:13, whiteSpace:"nowrap",
                    fontWeight: active ? 600 : 500, transition:"all .16s",
                    boxShadow: active ? "0 2px 8px rgba(32,35,58,.08)" : "none" }}
                    onMouseEnter={e=>{ if(!active) e.currentTarget.style.color=AC.ink; }}
                    onMouseLeave={e=>{ if(!active) e.currentTarget.style.color=AC.slate; }}>
                    <Glyph name={n.icon} size={17} width={active?1.9:1.6} />
                    <span className="navlabel">{bi(n.t, lang)}</span>
                  </button>
                );
              })}
            </nav>

            {/* guide + lang toggle */}
            <button onClick={() => setGuideOpen(true)}
              title={isAr ? "دليل الاستخدام" : "How it works"} style={{
              marginInlineStart:8, display:"inline-flex", alignItems:"center", gap:7, flexShrink:0,
              background:AC.white, color:AC.navy, border:`1.5px solid ${AC.line}`, borderRadius:99,
              padding:"7px 14px", fontSize:13, fontWeight:600, cursor:"pointer", transition:"all .16s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=AC.orange;e.currentTarget.style.color=AC.orange;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=AC.line;e.currentTarget.style.color=AC.navy;}}>
              <Glyph name="info" size={16} />
              <span className="navlabel">{isAr ? "دليل" : "Guide"}</span>
            </button>
            <button onClick={() => setLang(isAr ? "en" : "ar")} style={{
              marginInlineStart:8, display:"inline-flex", alignItems:"center", gap:7, flexShrink:0,
              background:AC.navy, color:AC.white, border:"none", borderRadius:99, padding:"8px 15px",
              fontSize:13, fontWeight:600, cursor:"pointer", letterSpacing:.3 }}>
              <Glyph name="globe" size={16} stroke={AC.white} />
              {isAr ? "EN" : "ع"}
            </button>
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <main style={{ flex:1, maxWidth:1120, width:"100%", margin:"0 auto",
        padding:"clamp(24px,4vw,44px) clamp(16px,3vw,28px) 60px" }}>
        {route === "home" && <Home lang={lang} go={go} />}
        {route === "command" && <CommandCenter lang={lang} go={go} />}
        {route === "decision" && <DecisionModule lang={lang} go={go} />}
        {route === "declaration" && <DeclarationModule lang={lang} />}
        {route === "compliance" && <ComplianceModule lang={lang} initialFilter={routeArg?.filter} />}
        {route === "library" && <LibraryModule lang={lang} initialDomain={routeArg?.domain} />}
        {route === "assistant" && <Assistant lang={lang} />}
        {route === "portal" && <StudentPortal lang={lang} go={go} />}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:`1px solid ${AC.line}`, background:AC.cream }}>
        <div style={{ maxWidth:1120, margin:"0 auto", padding:"28px clamp(16px,3vw,28px)",
          display:"flex", gap:20, flexWrap:"wrap", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:13 }}>
            <LogoMark size={32} />
            <div style={{ fontSize:12, color:AC.warm, lineHeight:1.6, maxWidth:520 }}>
              {isAr
                ? "مُرشد سياسة الذكاء الاصطناعي التوليدي · مبني على إجماع الخبراء من دراسة دلفاي (٢٠٢٦)"
                : "GenAI Policy Navigator · Built on expert consensus from a Delphi study (2026)"}
            </div>
          </div>
        </div>
      </footer>

      {guideOpen && <GuideOverlay lang={lang} go={go} onClose={() => setGuideOpen(false)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
