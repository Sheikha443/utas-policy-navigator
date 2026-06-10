/* ═══════════════════════════════════════════════════════════════════
   STUDENT DASHBOARD + DETECTION FLOW  ·  window.StudentPortal
═══════════════════════════════════════════════════════════════════ */
const { C: SC } = window.NAV;

/* ── extract text from an uploaded file ─────────────────────────── */
async function extractText(file) {
  const name = (file.name || "").toLowerCase();
  if (name.endsWith(".pdf") || file.type === "application/pdf") {
    if (!window.pdfjsLib) throw new Error("pdfjs-missing");
    const buf = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: buf }).promise;
    let out = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const tc = await page.getTextContent();
      out += tc.items.map(it => it.str).join(" ") + "\n";
    }
    return out.trim();
  }
  return (await file.text()).trim();
}

function StepPill({ done, label, icon, onClick }) {
  return (
    <button onClick={onClick} disabled={!onClick} style={{
      display:"flex", alignItems:"center", gap:10, padding:"12px 15px", borderRadius:13,
      background: done ? "#EAF5EF" : SC.white, border:`1.5px solid ${done ? "#2E7D5B33" : SC.line}`,
      cursor: onClick ? "pointer" : "default", textAlign:"start", flex:"1 1 160px", transition:"all .16s" }}>
      <span style={{ width:30, height:30, borderRadius:9, flexShrink:0, display:"flex", alignItems:"center",
        justifyContent:"center", background: done ? "#2E7D5B" : `${SC.navy}10`, color: done ? "#fff" : SC.navy }}>
        {done ? <Glyph name="check" size={16} stroke="#fff" width={2.4} /> : <Glyph name={icon} size={16} />}
      </span>
      <span style={{ fontSize:13, fontWeight:600, color: done ? "#2E7D5B" : SC.ink, lineHeight:1.3 }}>{label}</span>
    </button>
  );
}

function Dashboard({ user, lang, go, onLogout }) {
  const isAr = lang === "ar";
  const [text, setText] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [meta, setMeta] = React.useState({ title:"", course:"", declaredAI:false, purpose:"" });
  const [drag, setDrag] = React.useState(false);
  const [phase, setPhase] = React.useState(null); // extracting|heuristics|ai|done
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [history, setHistory] = React.useState([]);
  const fileRef = React.useRef(null);
  const setM = (k, v) => setMeta(m => ({ ...m, [k]: v }));

  React.useEffect(() => {
    let m = true;
    Promise.resolve(window.DB.listSubs(user.email)).then(h => { if (m) setHistory(h || []); });
    return () => { m = false; };
  }, []);

  const onFile = async (file) => {
    if (!file) return;
    setError(null); setResult(null); setPhase("extracting"); setFileName(file.name);
    try {
      const t = await extractText(file);
      if (!t || t.length < 40) { setError(isAr ? "تعذّر قراءة نص كافٍ من الملف. جرّب لصق النص يدوياً." : "Couldn't read enough text from the file. Try pasting text instead."); setPhase(null); return; }
      setText(t);
      if (!meta.title) setM("title", file.name.replace(/\.[^.]+$/, ""));
      setPhase(null);
    } catch (e) {
      setError(isAr ? "تعذّرت قراءة الملف. تأكّد أنه PDF نصّي (وليس صورة ممسوحة)." : "Could not read the file. Ensure it's a text-based PDF (not a scan).");
      setPhase(null);
    }
  };

  const analyze = async () => {
    if (text.trim().length < 40) { setError(isAr ? "أدخل نصاً أطول للتحليل (٤٠ كلمة على الأقل)." : "Provide more text to analyse (40+ words)."); return; }
    setError(null); setResult(null); setPhase("heuristics");
    const r = await window.DETECT.run(text, meta, (p) => {
      if (p === "ai_start") setPhase("ai");
    });
    setPhase("done"); setResult(r);
    await window.DB.addSub(user.email, {
      title: meta.title, course: meta.course, declaredAI: meta.declaredAI,
      aiLikelihood: r.aiLikelihood, verdict: r.verdict, source: r.source,
    });
    const h = await window.DB.listSubs(user.email);
    setHistory(h || []);
    setTimeout(() => document.getElementById("detection-report")?.scrollIntoView?.({ behavior:"smooth", block:"start" }), 120);
  };

  const reset = () => { setText(""); setFileName(""); setResult(null); setPhase(null); setError(null);
    setMeta({ title:"", course:"", declaredAI:false, purpose:"" }); };

  const phaseLabel = {
    extracting:isAr?"جارٍ قراءة الملف…":"Reading file…",
    heuristics:isAr?"تحليل المؤشرات…":"Analysing signals…",
    ai:isAr?"الذكاء الاصطناعي يفحص مقابل السياسات…":"AI checking against policy…",
  };

  return (
    <div className="fade-in">
      {/* welcome bar */}
      <div style={{ display:"flex", alignItems:"center", gap:16, flexWrap:"wrap", marginBottom:24,
        background:SC.white, border:`1px solid ${SC.line}`, borderRadius:18, padding:"18px 22px" }}>
        <div style={{ width:48, height:48, borderRadius:14, background:SC.navy, color:SC.white, flexShrink:0,
          display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Newsreader',serif",
          fontSize:22, fontWeight:600 }}>{(user.name||"?").trim().charAt(0).toUpperCase()}</div>
        <div style={{ flex:1, minWidth:180 }}>
          <div style={{ fontFamily:"'Newsreader',serif", fontSize:20, fontWeight:600, color:SC.ink }}>
            {isAr ? `مرحباً، ${user.name}` : `Welcome, ${user.name}`}</div>
          <div style={{ fontSize:12.5, color:SC.warm }}>{user.email}{user.studentId?` · ${user.studentId}`:""}</div>
        </div>
        <span style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:12.5, fontWeight:600,
          color:"#2E7D5B", background:"#EAF5EF", padding:"6px 12px", borderRadius:99 }}>
          <Glyph name="check" size={14} stroke="#2E7D5B" width={2.4}/>{isAr?"مفعّل":"Verified"}</span>
        <button onClick={onLogout} style={{ background:SC.white, color:SC.slate, border:`1.5px solid ${SC.line}`,
          borderRadius:10, padding:"8px 15px", fontSize:13, fontWeight:600, cursor:"pointer" }}>
          {isAr?"خروج":"Log out"}</button>
      </div>

      {/* journey steps */}
      <div style={{ display:"flex", gap:11, flexWrap:"wrap", marginBottom:26 }}>
        <StepPill done label={isAr?"تفعيل الحساب":"Account verified"} icon="check" />
        <StepPill label={isAr?"افحص حالتك":"Check your case"} icon="compass" onClick={()=>go("decision")} />
        <StepPill label={isAr?"أنشئ الإعلان":"Create declaration"} icon="doc" onClick={()=>go("declaration")} />
        <StepPill done={!!result} label={isAr?"افحص ملفك":"Scan your file"} icon="gauge" />
      </div>

      {/* upload card */}
      <div style={{ background:SC.white, borderRadius:20, border:`1px solid ${SC.line}`, padding:"24px 24px 26px",
        marginBottom:24 }}>
        <Eyebrow color={SC.rust}>{isAr?"كاشف الذكاء الاصطناعي":"AI Detector"}</Eyebrow>
        <h2 style={{ fontFamily:"'Newsreader',serif", fontSize:"clamp(22px,2.8vw,28px)", fontWeight:600,
          color:SC.ink, marginBottom:6, letterSpacing:-.4 }}>
          {isAr ? "ارفع عملك للفحص" : "Upload your work for analysis"}</h2>
        <p style={{ fontSize:14, color:SC.slate, marginBottom:20, lineHeight:1.55 }}>
          {isAr ? "ارفع ملف PDF (نصّي) أو الصق النص. يُحلَّل مقابل سياسات النزاهة الـ٢٩." : "Upload a (text-based) PDF or paste your text. It's analysed against the 29 integrity policies."}</p>

        {/* dropzone */}
        <div onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)}
          onDrop={e=>{e.preventDefault();setDrag(false);onFile(e.dataTransfer.files[0]);}}
          onClick={()=>fileRef.current?.click()}
          style={{ border:`2px dashed ${drag?SC.orange:SC.line}`, borderRadius:15, padding:"28px 20px",
            textAlign:"center", cursor:"pointer", background: drag?`${SC.orange}08`:SC.paper,
            transition:"all .18s", marginBottom:16 }}>
          <input ref={fileRef} type="file" accept=".pdf,.txt" style={{ display:"none" }}
            onChange={e=>onFile(e.target.files[0])} />
          <div style={{ width:50, height:50, borderRadius:14, background:`${SC.rust}12`, color:SC.rust,
            display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>
            <Glyph name="doc" size={26} /></div>
          {fileName ? (
            <div style={{ fontSize:14.5, fontWeight:600, color:SC.navy }}>📎 {fileName}</div>
          ) : (
            <>
              <div style={{ fontSize:14.5, fontWeight:600, color:SC.ink, marginBottom:4 }}>
                {isAr ? "اسحب ملف PDF هنا أو اضغط للاختيار" : "Drag a PDF here, or click to choose"}</div>
              <div style={{ fontSize:12.5, color:SC.warm }}>PDF · TXT</div>
            </>
          )}
        </div>

        {/* paste fallback */}
        <details style={{ marginBottom:18 }}>
          <summary style={{ fontSize:13, color:SC.slate, fontWeight:600, cursor:"pointer", marginBottom:8 }}>
            {isAr ? "أو الصق النص يدوياً" : "Or paste text manually"}</summary>
          <textarea value={text} onChange={e=>setText(e.target.value)} rows={5}
            placeholder={isAr?"الصق نص عملك هنا…":"Paste your work text here…"}
            style={{ ...window.pInput, resize:"vertical", lineHeight:1.6, marginTop:6 }} />
        </details>

        {/* meta */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
          <window.PField label={isAr?"عنوان العمل":"Work title"} lang={lang}>
            <input style={window.pInput} value={meta.title} onChange={e=>setM("title",e.target.value)} />
          </window.PField>
          <window.PField label={isAr?"المقرر (اختياري)":"Course (optional)"} lang={lang}>
            <input style={window.pInput} value={meta.course} onChange={e=>setM("course",e.target.value)} />
          </window.PField>
        </div>

        <label style={{ display:"flex", alignItems:"flex-start", gap:11, cursor:"pointer", marginBottom:20,
          padding:"13px 15px", background:SC.paper, borderRadius:12, border:`1px solid ${SC.line}` }}>
          <input type="checkbox" checked={meta.declaredAI} onChange={e=>setM("declaredAI",e.target.checked)}
            style={{ width:18, height:18, marginTop:1, accentColor:SC.navy, flexShrink:0 }} />
          <span style={{ fontSize:13.5, color:SC.ink, lineHeight:1.5 }}>
            {isAr ? "أُقرّ بأنني استخدمت أدوات الذكاء الاصطناعي في هذا العمل وأرغب في الإفصاح عن ذلك."
                  : "I declare that I used AI tools in this work and wish to disclose it."}</span>
        </label>

        {error && (
          <div style={{ background:`${SC.rust}12`, border:`1px solid ${SC.rust}33`, color:SC.rust,
            borderRadius:11, padding:"11px 14px", fontSize:13.5, marginBottom:16, display:"flex", gap:9 }}>
            <Glyph name="alert" size={16} stroke={SC.rust} />{error}</div>
        )}

        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          <button onClick={analyze} disabled={!!phase && phase!=="done"} className="shine" style={{
            display:"inline-flex", alignItems:"center", gap:10, background: phase&&phase!=="done"?SC.slate:SC.rust,
            color:SC.white, border:"none", borderRadius:12, padding:"14px 26px", fontSize:15, fontWeight:600,
            cursor: phase&&phase!=="done"?"wait":"pointer", boxShadow:"0 14px 30px -14px rgba(228,108,36,.8)" }}>
            {phase && phase!=="done"
              ? <><Spinner/>{phaseLabel[phase]}</>
              : <><Glyph name="gauge" size={18} stroke={SC.white} />{isAr?"افحص الآن":"Analyse now"}</>}
          </button>
          {(result || text) && (
            <button onClick={reset} style={{ background:SC.white, color:SC.slate, border:`1.5px solid ${SC.line}`,
              borderRadius:12, padding:"14px 22px", fontSize:14, fontWeight:600, cursor:"pointer" }}>
              {isAr?"ملف جديد":"New file"}</button>
          )}
        </div>
      </div>

      {/* report */}
      {result && (
        <DetectionReport result={result} text={text} user={user} lang={lang}
          onPrint={(res,txt,usr,rid)=>window.printCertificate(res,txt,usr,rid,lang)} />
      )}

      {/* history */}
      {history.length > 0 && (
        <div style={{ marginTop:30 }}>
          <Eyebrow color={SC.navy}>{isAr?"سجلّ الفحوصات":"Scan history"}</Eyebrow>
          <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
            {history.map(s => {
              const V = window.VERDICT_CFG[s.verdict] || window.VERDICT_CFG.compliant;
              return (
                <div key={s.id} style={{ display:"flex", alignItems:"center", gap:13, background:SC.white,
                  border:`1px solid ${SC.line}`, borderRadius:13, padding:"12px 16px" }}>
                  <span style={{ width:40, height:40, borderRadius:10, flexShrink:0, background:V.bg, color:V.color,
                    display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Newsreader',serif",
                    fontSize:15, fontWeight:600 }}>{s.aiLikelihood}%</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:14, fontWeight:600, color:SC.ink, whiteSpace:"nowrap",
                      overflow:"hidden", textOverflow:"ellipsis" }}>{s.title || (isAr?"بدون عنوان":"Untitled")}</div>
                    <div style={{ fontSize:11.5, color:SC.warm }}>
                      {new Date(s.at).toLocaleDateString(isAr?"ar-OM":"en-GB")}</div>
                  </div>
                  <span style={{ fontSize:12.5, fontWeight:600, color:V.color, background:V.bg,
                    padding:"5px 11px", borderRadius:99, whiteSpace:"nowrap" }}>{isAr?V.ar:V.en}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Spinner() {
  return <span style={{ width:16, height:16, borderRadius:"50%", border:"2.5px solid rgba(255,255,255,.4)",
    borderTopColor:"#fff", display:"inline-block", animation:"spinNav .7s linear infinite" }} />;
}

let _portalInitPromise = null;

function PortalBooting({ lang }) {
  const isAr = lang === "ar";
  return (
    <div style={{ minHeight:320, display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", gap:16 }}>
      <span style={{ width:34, height:34, borderRadius:"50%", border:"3px solid "+SC.line,
        borderTopColor:SC.navy, display:"inline-block", animation:"spinNav .8s linear infinite" }} />
      <div style={{ fontSize:14, color:SC.slate, fontWeight:600 }}>
        {isAr ? "جارٍ الاتصال بقاعدة البيانات…" : "Connecting to database…"}</div>
    </div>
  );
}

function StudentPortal({ lang, go }) {
  const [user, setUser] = React.useState(() => window.DB.current());
  const [booting, setBooting] = React.useState(() => window.DB.mode === "cloud" && !window.DB.initialized);

  React.useEffect(() => {
    let m = true;
    _portalInitPromise = _portalInitPromise || window.DB.init();
    _portalInitPromise.then(() => { if (m) { setUser(window.DB.current()); setBooting(false); } });
    return () => { m = false; };
  }, []);

  if (booting) return <PortalBooting lang={lang} />;
  if (!user) return <AuthFlow lang={lang} onAuthed={setUser} />;
  return <Dashboard user={user} lang={lang} go={go}
    onLogout={async () => { await window.DB.logout(); setUser(null); }} />;
}

window.StudentPortal = StudentPortal;
