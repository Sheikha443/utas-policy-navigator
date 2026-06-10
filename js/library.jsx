/* ═══════════════════════════════════════════════════════════════════
   MODULE 4 — POLICY LIBRARY (browse / search / filter)
═══════════════════════════════════════════════════════════════════ */
const { C: BC, P: BP, DOMAINS: BDOM, TIER: BTIER } = window.NAV;

function PolicyRow({ p, lang, open, onToggle }) {
  const isAr = lang === "ar";
  const dom = BDOM[p.d], tc = BTIER[p.t];
  return (
    <div style={{ background:BC.white, borderRadius:14, border:`1px solid ${open ? dom.col : BC.line}`,
      borderInlineStart:`4px solid ${tc.border}`, overflow:"hidden", transition:"border-color .2s" }}>
      <button onClick={onToggle} style={{ width:"100%", textAlign:isAr?"right":"left", background:"none",
        border:"none", cursor:"pointer", padding:"15px 18px", display:"flex", alignItems:"center", gap:14 }}>
        <div style={{ width:36, height:36, borderRadius:10, background:`${dom.col}13`, color:dom.col,
          display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <Glyph name={dom.glyph} size={19} /></div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3, flexWrap:"wrap" }}>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontWeight:700, fontSize:12.5,
              color:BC.navy }}>{p.id}</span>
            <TierBadge tier={p.t} lang={lang} />
          </div>
          <div style={{ fontWeight:600, fontSize:14.5, color:BC.ink, lineHeight:1.3 }}>
            {isAr ? p.ar : p.short}</div>
        </div>
        <Glyph name={open ? "arrowL" : "arrowR"} size={18}
          style={{ color:BC.warm, flexShrink:0, transform: open ? "rotate(90deg)" : "none",
            transition:"transform .25s" }} />
      </button>
      {open && (
        <div className="fade-in" style={{ padding:"0 18px 18px 18px", marginInlineStart:50 }}>
          <p style={{ fontSize:14, color:BC.ink, lineHeight:1.65, marginBottom:13 }}>
            {isAr ? p.plainAr : p.plain}</p>
          <div style={{ background:BC.paper, borderRadius:10, padding:"12px 15px",
            borderInlineStart:`3px solid ${BC.orange}` }}>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10.5, fontWeight:600,
              letterSpacing:1.5, textTransform:"uppercase", color:BC.orange,
              display:"block", marginBottom:5 }}>{isAr ? "مثال" : "Example"}</span>
            <span style={{ fontSize:13, color:BC.slate, lineHeight:1.55, fontStyle:"italic" }}>
              {isAr ? p.exAr : p.ex}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function LibraryModule({ lang, initialDomain }) {
  const isAr = lang === "ar";
  const [q, setQ] = React.useState("");
  const [dom, setDom] = React.useState(initialDomain || "all");
  const [tier, setTier] = React.useState("all");
  const [open, setOpen] = React.useState({});

  const results = React.useMemo(() => {
    const ql = q.trim().toLowerCase();
    return BP.filter(p => {
      if (dom !== "all" && p.d !== dom) return false;
      if (tier !== "all" && String(p.t) !== tier) return false;
      if (!ql) return true;
      return [p.id, p.short, p.ar, p.plain, p.plainAr].join(" ").toLowerCase().includes(ql);
    });
  }, [q, dom, tier]);

  const pill = (active, label, onClick, mono) => (
    <button onClick={onClick} style={{ padding:"7px 14px", borderRadius:99, fontSize:12.5, fontWeight:600,
      cursor:"pointer", fontFamily: mono ? "'IBM Plex Mono',monospace" : "inherit",
      background: active ? BC.navy : BC.white, color: active ? BC.white : BC.slate,
      border:`1.5px solid ${active ? BC.navy : BC.line}`, transition:"all .16s" }}>{label}</button>
  );

  return (
    <div className="fade-in">
      <Eyebrow color={BC.navy}>{isAr ? "وحدة 04" : "Module 04"}</Eyebrow>
      <h2 style={hHead}>{isAr ? "مكتبة السياسات" : "Policy Library"}</h2>
      <p style={{ ...hSub, maxWidth:600 }}>
        {isAr ? "تصفّح بنود السياسة الـ٢٩ كاملةً بلغة واضحة. ابحث أو صفِّ حسب المجال والمستوى."
              : "Browse all 29 plain-language policy statements. Search, or filter by domain and tier."}</p>

      {/* search */}
      <div style={{ position:"relative", marginBottom:16, maxWidth:520 }}>
        <span style={{ position:"absolute", insetInlineStart:15, top:"50%", transform:"translateY(-50%)",
          color:BC.warm, pointerEvents:"none" }}><Glyph name="search" size={18} /></span>
        <input value={q} onChange={e => setQ(e.target.value)}
          placeholder={isAr ? "ابحث في السياسات…" : "Search policies…"}
          style={{ width:"100%", padding:"13px 16px", paddingInlineStart:46, borderRadius:12,
            border:`1.5px solid ${BC.line}`, background:BC.white, fontSize:14.5, color:BC.ink,
            fontFamily:"'IBM Plex Sans Arabic',sans-serif", outline:"none" }}
          onFocus={e=>e.target.style.borderColor=BC.royal} onBlur={e=>e.target.style.borderColor=BC.line} />
      </div>

      {/* filters */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:10 }}>
        {pill(dom === "all", isAr ? "كل المجالات" : "All domains", () => setDom("all"))}
        {Object.keys(BDOM).map(k => pill(dom === k, k, () => setDom(k), true))}
      </div>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", marginBottom:22 }}>
        {pill(tier === "all", isAr ? "كل المستويات" : "All tiers", () => setTier("all"))}
        {[1, 2, 3].map(t => pill(tier === String(t), BTIER[t][isAr ? "ar" : "en"], () => setTier(String(t))))}
        <span style={{ marginInlineStart:"auto", fontSize:12.5, color:BC.warm, fontWeight:600 }}>
          {results.length} {isAr ? "نتيجة" : "results"}</span>
      </div>

      {/* results */}
      <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
        {results.map(p => (
          <PolicyRow key={p.id} p={p} lang={lang} open={!!open[p.id]}
            onToggle={() => setOpen(o => ({ ...o, [p.id]: !o[p.id] }))} />
        ))}
        {results.length === 0 && (
          <div style={{ textAlign:"center", padding:"50px 20px", color:BC.warm }}>
            <Glyph name="search" size={32} style={{ margin:"0 auto 12px" }} />
            <div style={{ fontSize:14.5 }}>{isAr ? "لا توجد نتائج مطابقة" : "No matching policies"}</div>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { LibraryModule });
