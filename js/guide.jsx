/* ═══════════════════════════════════════════════════════════════════
   IN-APP GUIDE  ·  bilingual "how it works" overlay
   Shows BOTH languages for every feature so anyone understands.
═══════════════════════════════════════════════════════════════════ */
const { C: GC } = window.NAV;

const GUIDE_ITEMS = [
  { id:"command", icon:"flag", accent:GC.navy,
    en:"Command Center", ar:"مركز القيادة",
    enD:"A live institutional dashboard: a risk heatmap of every department against the six policy domains, an accreditation-readiness score, and alerts for critical gaps. Click any cell to update it.",
    arD:"لوحة قيادة مؤسسية حيّة: خريطة حرارية لكل قسم مقابل المجالات الستة، ومؤشّر جاهزية للاعتماد، وإنذارات للفجوات الحرجة. اضغط أي خلية لتحديثها." },
  { id:"decision", icon:"compass", accent:GC.royal,
    en:"Can I use AI?", ar:"هل أستطيع استخدامه؟",
    enD:"A guided 3-step check — who you are, what you're working on, how you'd use AI — that returns a clear verdict with an exact to-do list and the policies behind it.",
    arD:"فحص موجّه من ٣ خطوات — من أنت، بمَ تعمل، كيف تستخدم الذكاء الاصطناعي — يعطيك حُكماً واضحاً مع قائمة بما عليك فعله والسياسات المستند إليها." },
  { id:"declaration", icon:"doc", accent:GC.orange,
    en:"Declaration Generator", ar:"مولّد الإعلان",
    enD:"Fill a short form and get a print-ready bilingual AI-use declaration with a unique QR verification code — copy it or save as PDF to attach to your work.",
    arD:"املأ نموذجاً قصيراً لتحصل على إقرار ثنائي اللغة جاهز للطباعة برمز QR للتحقّق — انسخه أو احفظه PDF لإرفاقه بعملك." },
  { id:"compliance", icon:"gauge", accent:GC.rust,
    en:"Compliance Checker", ar:"مدقّق الامتثال",
    enD:"Track a department against all 29 policies with three states each. An animated ring shows mandatory compliance, and your progress is saved automatically.",
    arD:"تابع تطبيق كل البنود الـ٢٩ بثلاث حالات لكل بند. حلقة متحرّكة تُظهر نسبة الامتثال الإلزامي، ويُحفظ تقدّمك تلقائياً." },
  { id:"library", icon:"grid", accent:GC.blue,
    en:"Policy Library", ar:"مكتبة السياسات",
    enD:"All 29 statements in plain language — searchable and filterable by domain and tier — each with a practical example of how to apply it.",
    arD:"كل البنود الـ٢٩ بلغة واضحة — قابلة للبحث والتصفية حسب المجال والمستوى — مع مثال تطبيقي لكل بند." },
  { id:"assistant", icon:"spark", accent:GC.amber,
    en:"AI Assistant", ar:"المساعد الذكي",
    enD:"Ask any question about the policy in Arabic or English. The assistant answers grounded in all 29 statements and points you to the relevant ones.",
    arD:"اسأل أي سؤال عن السياسة بالعربية أو الإنجليزية. يجيب المساعد استناداً إلى البنود الـ٢٩ ويرشدك إلى المعنيّ منها." },
  { id:"faq", icon:"info", accent:GC.blue,
    en:"FAQ & common situations", ar:"الأسئلة الشائعة والمواقف",
    enD:"Quick answers to the most common AI-usage questions, plus scenario-based case studies inside the decision guide — ideal for those new to the policy.",
    arD:"إجابات سريعة لأكثر أسئلة استخدام الذكاء الاصطناعي شيوعاً، مع حالات دراسية واقعية داخل دليل القرار — مثالية لمن هم جدد على السياسة." },
];

function GuideOverlay({ lang, onClose, go }) {
  const isAr = lang === "ar";
  React.useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, []);

  const openFeature = id => { onClose(); go(id); };

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:200,
      background:"rgba(20,22,40,.55)", backdropFilter:"blur(6px)", WebkitBackdropFilter:"blur(6px)",
      display:"flex", alignItems:"flex-start", justifyContent:"center", padding:"clamp(16px,4vh,56px) 16px",
      overflowY:"auto", animation:"fadeIn .25s ease both" }}>
      <div onClick={e => e.stopPropagation()} className="fade-in" style={{ width:"100%", maxWidth:740,
        background:GC.paper, borderRadius:24, overflow:"hidden", boxShadow:"0 40px 100px -40px rgba(0,0,0,.6)",
        border:`1px solid ${GC.line}` }}>

        {/* header */}
        <div style={{ position:"relative", overflow:"hidden", background:GC.navy, color:GC.white,
          padding:"30px 30px 26px" }}>
          <div style={{ position:"absolute", insetInlineEnd:-40, top:-50, width:180, height:180,
            borderRadius:"50%", background:`radial-gradient(circle, ${GC.orange}40, transparent 65%)` }} />
          <div style={{ position:"relative", display:"flex", alignItems:"flex-start",
            justifyContent:"space-between", gap:16 }}>
            <div>
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:600,
                letterSpacing:2, textTransform:"uppercase", color:GC.amber, marginBottom:9 }}>
                {isAr ? "دليل الاستخدام" : "How it works"}</div>
              <h2 style={{ fontFamily:"'Newsreader',serif", fontSize:"clamp(24px,3.4vw,30px)",
                fontWeight:600, lineHeight:1.18, letterSpacing:-.5, marginBottom:8 }}>
                {isAr ? "ما الذي يفعله هذا النظام؟" : "What does this system do?"}</h2>
              <p style={{ fontSize:13.5, color:"rgba(255,255,255,.72)", lineHeight:1.6, maxWidth:520 }}>
                {isAr
                  ? "يحوّل ٢٩ توصية توافقية حول نزاهة الذكاء الاصطناعي إلى نظام عملي. كل أداة موضّحة أدناه بالعربية والإنجليزية."
                  : "It turns 29 expert-consensus recommendations on AI integrity into a working system. Every tool is explained below in Arabic and English."}</p>
            </div>
            <button onClick={onClose} aria-label="Close" style={{ flexShrink:0, width:38, height:38,
              borderRadius:11, background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.2)",
              color:GC.white, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Glyph name="close" size={18} stroke={GC.white} width={2} />
            </button>
          </div>
        </div>

        {/* feature list */}
        <div style={{ padding:"22px clamp(18px,3vw,26px) 26px", display:"flex", flexDirection:"column", gap:12 }}>
          {GUIDE_ITEMS.map((it, i) => (
            <div key={it.id} style={{ display:"flex", gap:15, alignItems:"flex-start",
              background:GC.white, border:`1px solid ${GC.line}`, borderRadius:15, padding:"16px 17px",
              borderInlineStart:`4px solid ${it.accent}` }}>
              <div style={{ width:46, height:46, borderRadius:13, background:`${it.accent}14`, color:it.accent,
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Glyph name={it.icon} size={24} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"baseline", gap:9, flexWrap:"wrap", marginBottom:7 }}>
                  <span style={{ fontFamily:"'Newsreader',serif", fontSize:18, fontWeight:600,
                    color:GC.ink }}>{isAr ? it.ar : it.en}</span>
                  <span style={{ fontSize:13, color:GC.warm }}>{isAr ? it.en : it.ar}</span>
                </div>
                <p dir="rtl" style={{ fontSize:13.5, color:GC.slate, lineHeight:1.65, textAlign:"right",
                  marginBottom:6 }}>{it.arD}</p>
                <p dir="ltr" style={{ fontSize:13, color:GC.slate, lineHeight:1.6, textAlign:"left",
                  fontStyle:"italic", opacity:.92 }}>{it.enD}</p>
                <button onClick={() => openFeature(it.id)} style={{ marginTop:11, display:"inline-flex",
                  alignItems:"center", gap:7, background:"none", border:"none", cursor:"pointer",
                  color:it.accent, fontSize:13, fontWeight:600, padding:0 }}>
                  {isAr ? "افتح الأداة" : "Open this tool"}
                  <Glyph name={isAr ? "arrowL" : "arrowR"} size={15} stroke={it.accent} />
                </button>
              </div>
            </div>
          ))}

          <div style={{ marginTop:4, padding:"15px 17px", borderRadius:13, background:`${GC.orange}10`,
            border:`1px solid ${GC.orange}28`, display:"flex", gap:12, alignItems:"flex-start" }}>
            <span style={{ color:GC.orange, flexShrink:0, marginTop:1 }}><Glyph name="globe" size={20} /></span>
            <div style={{ fontSize:13, color:GC.ink, lineHeight:1.6 }}>
              {isAr
                ? <><b>نصيحة:</b> استخدم زر <b>«ع / EN»</b> أعلى الصفحة للتبديل بين العربية والإنجليزية في أي وقت — تتبدّل الواجهة بالكامل واتجاه القراءة معها.</>
                : <><b>Tip:</b> use the <b>"ع / EN"</b> button at the top to switch between Arabic and English anytime — the whole interface and reading direction flip with it.</>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { GuideOverlay });
