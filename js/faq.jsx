/* ═══════════════════════════════════════════════════════════════════
   FAQ  ·  Common AI-usage situations   (window.FAQModule)
   Added per reviewer feedback to support students & faculty new to
   GenAI policy.
═══════════════════════════════════════════════════════════════════ */
const { C: FC, P: FP } = window.NAV;
const FPMAP = Object.fromEntries(FP.map(p => [p.id, p]));

function FaqItem({ item, lang, open, onToggle }) {
  const isAr = lang === "ar";
  return (
    <div style={{ background:FC.white, borderRadius:14, border:`1px solid ${open?FC.royal:FC.line}`,
      overflow:"hidden", transition:"border-color .2s" }}>
      <button onClick={onToggle} style={{ width:"100%", textAlign:isAr?"right":"left", background:"none",
        border:"none", cursor:"pointer", padding:"16px 18px", display:"flex", gap:13, alignItems:"center" }}>
        <span style={{ width:26, height:26, borderRadius:8, flexShrink:0, background: open?FC.royal:`${FC.royal}12`,
          color: open?FC.white:FC.royal, display:"flex", alignItems:"center", justifyContent:"center",
          fontFamily:"'Newsreader',serif", fontSize:16, fontWeight:600 }}>؟</span>
        <span style={{ flex:1, fontSize:15, fontWeight:600, color:FC.ink, lineHeight:1.4 }}>
          {isAr?item.qAr:item.qEn}</span>
        <Glyph name={open?"arrowL":"arrowR"} size={17} style={{ color:FC.warm, flexShrink:0,
          transform: open?"rotate(90deg)":"none", transition:"transform .25s" }} />
      </button>
      {open && (
        <div className="fade-in" style={{ padding:"0 18px 18px", marginInlineStart:39 }}>
          <p style={{ fontSize:14, color:FC.ink, lineHeight:1.7, marginBottom:12 }}>{isAr?item.aAr:item.aEn}</p>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {item.refs.map(id => {
              const p = FPMAP[id]; if (!p) return null;
              return (
                <span key={id} style={{ display:"inline-flex", alignItems:"center", gap:7, background:FC.paper,
                  border:`1px solid ${FC.line}`, borderRadius:9, padding:"5px 11px", fontSize:12 }}>
                  <b style={{ fontFamily:"'IBM Plex Mono',monospace", color:FC.navy }}>{id}</b>
                  <span style={{ color:FC.slate }}>{isAr?p.ar:p.short}</span>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function FAQModule({ lang, go }) {
  const isAr = lang === "ar";
  const { FAQ_CATS, FAQS } = window.SCEN;
  const [cat, setCat] = React.useState("all");
  const [q, setQ] = React.useState("");
  const [open, setOpen] = React.useState(null);

  const results = React.useMemo(() => {
    const ql = q.trim().toLowerCase();
    return FAQS.filter(f => {
      if (cat !== "all" && f.cat !== cat) return false;
      if (!ql) return true;
      return [f.qEn, f.qAr, f.aEn, f.aAr].join(" ").toLowerCase().includes(ql);
    });
  }, [cat, q]);

  return (
    <div className="fade-in">
      <Eyebrow color={FC.royal}>{isAr ? "مساعدة" : "Help"}</Eyebrow>
      <h2 style={hHead}>{isAr ? "أسئلة شائعة · مواقف استخدام شائعة" : "FAQ · Common AI-usage situations"}</h2>
      <p style={{ ...hSub, maxWidth:620 }}>
        {isAr ? "إجابات سريعة وواضحة لأكثر الأسئلة شيوعاً عن استخدام الذكاء الاصطناعي — للطلاب وهيئة التدريس الجدد على هذه السياسات."
              : "Quick, clear answers to the most common questions about using AI — for students and faculty new to these policies."}</p>

      {/* search */}
      <div style={{ position:"relative", marginBottom:16, maxWidth:520 }}>
        <span style={{ position:"absolute", insetInlineStart:15, top:"50%", transform:"translateY(-50%)",
          color:FC.warm, pointerEvents:"none" }}><Glyph name="search" size={18} /></span>
        <input value={q} onChange={e=>setQ(e.target.value)}
          placeholder={isAr ? "ابحث في الأسئلة…" : "Search questions…"}
          style={{ width:"100%", padding:"13px 16px", paddingInlineStart:46, borderRadius:12,
            border:`1.5px solid ${FC.line}`, background:FC.white, fontSize:14.5, color:FC.ink,
            fontFamily:"'IBM Plex Sans Arabic',sans-serif", outline:"none" }}
          onFocus={e=>e.target.style.borderColor=FC.royal} onBlur={e=>e.target.style.borderColor=FC.line} />
      </div>

      {/* category chips */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:24 }}>
        <button onClick={()=>setCat("all")} style={chip(cat==="all")}>{isAr?"الكل":"All"}</button>
        {FAQ_CATS.map(c => (
          <button key={c.id} onClick={()=>setCat(c.id)} style={chip(cat===c.id, c.col)}>
            <Glyph name={c.icon} size={15} stroke={cat===c.id?FC.white:c.col} />{isAr?c.ar:c.en}</button>
        ))}
      </div>

      {/* list */}
      <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
        {results.map((f, i) => (
          <FaqItem key={i} item={f} lang={lang} open={open===i} onToggle={()=>setOpen(o=>o===i?null:i)} />
        ))}
        {!results.length && (
          <div style={{ textAlign:"center", padding:"44px 20px", color:FC.warm }}>
            <Glyph name="search" size={30} style={{ margin:"0 auto 12px" }} />
            <div style={{ fontSize:14.5 }}>{isAr?"لا توجد نتائج مطابقة":"No matching questions"}</div>
          </div>
        )}
      </div>

      {/* still need help */}
      <div style={{ marginTop:26, background:FC.navy, borderRadius:18, padding:"22px 24px", color:FC.white,
        display:"flex", gap:18, alignItems:"center", flexWrap:"wrap", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", insetInlineEnd:-30, top:-40, width:140, height:140, borderRadius:"50%",
          background:`radial-gradient(circle, ${FC.orange}44, transparent 65%)` }} />
        <div style={{ position:"relative", flex:"1 1 240px" }}>
          <div style={{ fontFamily:"'Newsreader',serif", fontSize:20, fontWeight:600, marginBottom:5 }}>
            {isAr?"لم تجد إجابتك؟":"Still need help?"}</div>
          <div style={{ fontSize:13.5, color:"rgba(255,255,255,.72)", lineHeight:1.6 }}>
            {isAr?"اسأل المساعد الذكي، أو افحص حالتك في دليل القرار.":"Ask the AI assistant, or check your case in the decision guide."}</div>
        </div>
        <div style={{ position:"relative", display:"flex", gap:10, flexWrap:"wrap" }}>
          <button onClick={()=>go("assistant")} style={{ display:"inline-flex", alignItems:"center", gap:8,
            background:FC.orange, color:FC.white, border:"none", borderRadius:11, padding:"12px 20px",
            fontSize:14, fontWeight:600, cursor:"pointer" }}>
            <Glyph name="spark" size={16} stroke={FC.white} />{isAr?"المساعد الذكي":"AI Assistant"}</button>
          <button onClick={()=>go("decision")} style={{ display:"inline-flex", alignItems:"center", gap:8,
            background:"rgba(255,255,255,.1)", color:FC.white, border:"1px solid rgba(255,255,255,.24)",
            borderRadius:11, padding:"12px 20px", fontSize:14, fontWeight:600, cursor:"pointer" }}>
            {isAr?"دليل القرار":"Decision guide"}</button>
        </div>
      </div>
    </div>
  );
}

function chip(active, col) {
  const c = col || FC.navy;
  return { display:"inline-flex", alignItems:"center", gap:7, padding:"8px 15px", borderRadius:99,
    fontSize:13, fontWeight:600, cursor:"pointer", transition:"all .16s",
    background: active ? c : FC.white, color: active ? FC.white : FC.slate,
    border:`1.5px solid ${active ? c : FC.line}` };
}

window.FAQModule = FAQModule;
