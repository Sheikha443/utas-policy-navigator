/* ═══════════════════════════════════════════════════════════════════
   MODULE 2 — DECLARATION GENERATOR
═══════════════════════════════════════════════════════════════════ */
const { C: LC } = window.NAV;

const PURPOSE_OPTS = [
  { v:"brainstorming", en:"Brainstorming ideas",    ar:"العصف الذهني للأفكار" },
  { v:"drafting",      en:"Drafting text",          ar:"صياغة النص" },
  { v:"editing",       en:"Editing / proofreading", ar:"التحرير والتدقيق" },
  { v:"translation",   en:"Translation",            ar:"الترجمة" },
  { v:"analysis",      en:"Data / source analysis", ar:"تحليل البيانات أو المصادر" },
];
const TOOL_OPTS = ["ChatGPT", "Microsoft Copilot", "Gemini", "Claude", "Grammarly", "Other"];
const EXTENT_OPTS = [
  { v:"<20%",   en:"Less than 20%", ar:"أقل من ٢٠٪" },
  { v:"20–50%", en:"20 – 50%",      ar:"٢٠ – ٥٠٪" },
  { v:">50%",   en:"More than 50%", ar:"أكثر من ٥٠٪" },
];

function Field({ label, labelAr, lang, children }) {
  return (
    <label style={{ display:"block", marginBottom:15 }}>
      <span style={{ display:"block", fontSize:11.5, fontWeight:600, color:LC.slate,
        textTransform:"uppercase", letterSpacing:1, marginBottom:6,
        fontFamily:"'IBM Plex Sans Arabic',sans-serif" }}>
        {lang === "ar" ? labelAr : label}</span>
      {children}
    </label>
  );
}

const fieldStyle = {
  width:"100%", padding:"11px 13px", borderRadius:10, border:`1.5px solid ${LC.line}`,
  background:LC.white, fontSize:14.5, color:LC.ink, fontFamily:"'IBM Plex Sans Arabic',sans-serif",
  outline:"none", transition:"border-color .18s",
};

/* Stable verification ID from declaration content */
function makeVid(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  const s = (h >>> 0).toString(36).toUpperCase().padStart(8, "0").slice(0, 8);
  return `UTAS-AI-${s.slice(0, 4)}-${s.slice(4, 8)}`;
}

/* QR code (qrcode-generator global) */
function QrCode({ text, size = 132 }) {
  const url = React.useMemo(() => {
    try { const qr = window.qrcode(0, "M"); qr.addData(text); qr.make(); return qr.createDataURL(6, 0); }
    catch (e) { return null; }
  }, [text]);
  if (!url) return <div style={{ width:size, height:size, borderRadius:10, background:LC.cream,
    display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:LC.warm }}>QR</div>;
  return <img src={url} width={size} height={size} alt="verification QR"
    style={{ borderRadius:10, display:"block", imageRendering:"pixelated" }} />;
}

function DeclarationModule({ lang }) {
  const isAr = lang === "ar";
  const todayStr = new Date().toLocaleDateString("en-GB");
  const [f, setF] = React.useState({
    name:"", role:"student", work:"", course:"", department:"",
    tool:"ChatGPT", purpose:"brainstorming", extent:"<20%", date:"",
  });
  const [copied, setCopied] = React.useState(false);
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const purposeAr = PURPOSE_OPTS.find(p => p.v === f.purpose)?.ar || f.purpose;

  const dEn = `AI USE DECLARATION — UTAS Nizwa

I, ${f.name || "[Name]"}, in my capacity as ${f.role === "student" ? "a student" : "a faculty member"}, declare that I used ${f.tool} for ${PURPOSE_OPTS.find(p=>p.v===f.purpose)?.en.toLowerCase()} in preparing "${f.work || "[Work title]"}"${f.course ? ` for ${f.course}` : ""}${f.department ? `, ${f.department} Department` : ""}. The AI contribution accounted for approximately ${f.extent} of the total work. The intellectual content, original ideas, and arguments are my own. I have reviewed all AI-generated content for accuracy and take full responsibility for this submission.

Signature: _______________     Date: ${f.date || todayStr}`;

  const dAr = `إقرار استخدام الذكاء الاصطناعي — جامعة التقنية والعلوم التطبيقية، نزوى

أنا، ${f.name || "[الاسم]"}، بصفتي ${f.role === "student" ? "طالباً/طالبةً" : "عضواً في هيئة التدريس"}، أُقرُّ بأنني استخدمتُ ${f.tool} في ${purposeAr} عند إعداد "${f.work || "[عنوان العمل]"}"${f.course ? ` لمقرر ${f.course}` : ""}${f.department ? `، قسم ${f.department}` : ""}. وقد بلغت مساهمة الذكاء الاصطناعي ما يقارب ${f.extent} من إجمالي العمل. أما المحتوى الفكري والأفكار الأصلية والحجج فهي من عندي. وقد راجعتُ دقّة كل ما أنتجه الذكاء الاصطناعي، وأتحمّل المسؤولية الكاملة عن هذا العمل.

التوقيع: _______________     التاريخ: ${f.date || todayStr}`;

  const copyBoth = () => {
    navigator.clipboard?.writeText(dEn + "\n\n— — —\n\n" + dAr);
    setCopied(true); setTimeout(() => setCopied(false), 1800);
  };

  /* Verification stamp */
  const vid = makeVid(`${f.name}|${f.role}|${f.work}|${f.tool}|${f.purpose}|${f.extent}|${f.date || todayStr}`);
  const qrPayload = `UTAS NIZWA · AI USE DECLARATION
ID: ${vid}
Name: ${f.name || "[Name]"}
Work: ${f.work || "[Work title]"}
Tool: ${f.tool} | ${f.purpose} | ${f.extent}
Date: ${f.date || todayStr}
Verified under UTAS GenAI policy (S4, S5, S28).`;

  const printDecl = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    let qrUrl = "";
    try { const qr = window.qrcode(0, "M"); qr.addData(qrPayload); qr.make(); qrUrl = qr.createDataURL(6, 0); } catch (e) {}
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>AI Declaration — UTAS · ${vid}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,500;0,600;1,500&family=IBM+Plex+Sans+Arabic:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
        body{font-family:'IBM Plex Sans Arabic',sans-serif;color:#20233A;max-width:720px;margin:44px auto;padding:0 32px;line-height:1.85;}
        .hd{display:flex;align-items:center;justify-content:space-between;gap:16px;border-bottom:3px solid #FC8424;padding-bottom:14px;margin-bottom:6px;}
        h1{font-family:'Newsreader',serif;font-weight:600;font-size:25px;color:#243090;margin:0;}
        .sub{color:#8C8678;font-size:13px;margin-bottom:30px;}
        .doc{white-space:pre-wrap;font-size:14.5px;margin-bottom:24px;padding:24px;background:#FAF7F1;border:1px solid #E0D8C8;border-radius:12px;}
        .rtl{direction:rtl;text-align:right;}
        .stamp{display:flex;align-items:center;gap:20px;padding:20px 24px;border:1.5px solid #243090;border-radius:14px;background:#fff;margin-top:8px;}
        .stamp img{width:120px;height:120px;border-radius:8px;}
        .stamp .vid{font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:18px;color:#243090;letter-spacing:1px;}
        .stamp .lbl{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#8C8678;margin-bottom:4px;}
        .stamp .note{font-size:12px;color:#5B6276;margin-top:8px;max-width:340px;}
        @media print{body{margin:0;}.doc{background:#fff;}}
      </style></head><body>
      <div class="hd"><h1>AI Use Declaration · إقرار استخدام الذكاء الاصطناعي</h1></div>
      <div class="sub">University of Technology and Applied Sciences — Nizwa</div>
      <div class="doc">${dEn.replace(/</g,"&lt;")}</div>
      <div class="doc rtl">${dAr.replace(/</g,"&lt;")}</div>
      <div class="stamp">
        ${qrUrl ? `<img src="${qrUrl}" alt="QR"/>` : ""}
        <div>
          <div class="lbl">Verification ID · رمز التحقّق</div>
          <div class="vid">${vid}</div>
          <div class="note">Scan to view the declaration summary. Attach this page to your submission. · امسح الرمز لعرض ملخّص الإقرار، وأرفِق هذه الصفحة بعملك.</div>
        </div>
      </div>
      <script>setTimeout(()=>window.print(),400)<\/script>
      </body></html>`);
    w.document.close();
  };

  const docCard = (title, color, text, rtl) => (
    <div style={{ background:LC.white, borderRadius:16, border:`1px solid ${LC.line}`,
      overflow:"hidden", boxShadow:"0 1px 2px rgba(32,35,58,.04)" }}>
      <div style={{ padding:"12px 18px", background:`${color}0E`, borderBottom:`1px solid ${color}22`,
        display:"flex", alignItems:"center", gap:9 }}>
        <span style={{ width:7, height:7, borderRadius:99, background:color }} />
        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:600,
          letterSpacing:1.5, textTransform:"uppercase", color }}>{title}</span>
      </div>
      <pre dir={rtl ? "rtl" : "ltr"} style={{ margin:0, padding:"20px 22px", fontSize:13.5,
        lineHeight:rtl ? 2.05 : 1.85, color:LC.ink, whiteSpace:"pre-wrap",
        fontFamily:"'IBM Plex Sans Arabic',sans-serif", textAlign:rtl ? "right" : "left" }}>{text}</pre>
    </div>
  );

  return (
    <div className="fade-in">
      <Eyebrow color={LC.orange}>{isAr ? "وحدة 02" : "Module 02"}</Eyebrow>
      <h2 style={hHead}>{isAr ? "مولّد إقرار استخدام الذكاء الاصطناعي" : "AI Use Declaration Generator"}</h2>
      <p style={{ ...hSub, maxWidth:600 }}>
        {isAr ? "املأ الحقول لإنشاء إقرار ثنائي اللغة جاهز للطباعة — مبني على البندين S4 وS5."
              : "Fill in the fields to generate a print-ready, bilingual declaration — built on policies S4 and S5."}
      </p>

      <div style={{ display:"grid", gridTemplateColumns:"minmax(280px,0.85fr) minmax(300px,1.15fr)",
        gap:24, alignItems:"start" }} className="decl-grid">
        {/* ── FORM ── */}
        <div style={{ background:LC.white, borderRadius:18, border:`1px solid ${LC.line}`,
          padding:"24px 22px", position:"sticky", top:20 }}>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:600,
            letterSpacing:2, textTransform:"uppercase", color:LC.warm, marginBottom:18 }}>
            {isAr ? "بياناتك" : "Your details"}</div>

          <Field label="Full name" labelAr="الاسم الكامل" lang={lang}>
            <input style={fieldStyle} value={f.name} onChange={e => set("name", e.target.value)}
              onFocus={e=>e.target.style.borderColor=LC.royal} onBlur={e=>e.target.style.borderColor=LC.line}
              placeholder={isAr ? "الاسم الكامل" : "Full name"} />
          </Field>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <Field label="I am a…" labelAr="أنا…" lang={lang}>
              <select style={fieldStyle} value={f.role} onChange={e => set("role", e.target.value)}>
                <option value="student">{isAr ? "طالب/طالبة" : "Student"}</option>
                <option value="faculty">{isAr ? "هيئة تدريس" : "Faculty"}</option>
              </select>
            </Field>
            <Field label="AI tool" labelAr="الأداة" lang={lang}>
              <select style={fieldStyle} value={f.tool} onChange={e => set("tool", e.target.value)}>
                {TOOL_OPTS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Work title" labelAr="عنوان العمل" lang={lang}>
            <input style={fieldStyle} value={f.work} onChange={e => set("work", e.target.value)}
              onFocus={e=>e.target.style.borderColor=LC.royal} onBlur={e=>e.target.style.borderColor=LC.line}
              placeholder={isAr ? "مثال: تقرير مشروع التخرّج" : "e.g. Final project report"} />
          </Field>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <Field label="Course (optional)" labelAr="المقرر (اختياري)" lang={lang}>
              <input style={fieldStyle} value={f.course} onChange={e => set("course", e.target.value)}
                onFocus={e=>e.target.style.borderColor=LC.royal} onBlur={e=>e.target.style.borderColor=LC.line} />
            </Field>
            <Field label="Department" labelAr="القسم" lang={lang}>
              <input style={fieldStyle} value={f.department} onChange={e => set("department", e.target.value)}
                onFocus={e=>e.target.style.borderColor=LC.royal} onBlur={e=>e.target.style.borderColor=LC.line} />
            </Field>
          </div>

          <Field label="AI was used for…" labelAr="استُخدم الذكاء الاصطناعي في…" lang={lang}>
            <select style={fieldStyle} value={f.purpose} onChange={e => set("purpose", e.target.value)}>
              {PURPOSE_OPTS.map(p => <option key={p.v} value={p.v}>{isAr ? p.ar : p.en}</option>)}
            </select>
          </Field>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <Field label="AI contribution" labelAr="نسبة المساهمة" lang={lang}>
              <select style={fieldStyle} value={f.extent} onChange={e => set("extent", e.target.value)}>
                {EXTENT_OPTS.map(o => <option key={o.v} value={o.v}>{isAr ? o.ar : o.en}</option>)}
              </select>
            </Field>
            <Field label="Date" labelAr="التاريخ" lang={lang}>
              <input type="date" style={fieldStyle} value={f.date} onChange={e => set("date", e.target.value)} />
            </Field>
          </div>
        </div>

        {/* ── PREVIEW ── */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {docCard(isAr ? "النص الإنجليزي" : "English declaration", LC.royal, dEn, false)}
          {docCard(isAr ? "النص العربي" : "Arabic declaration", LC.orange, dAr, true)}

          {/* verification stamp */}
          <div style={{ background:LC.navy, borderRadius:16, padding:"18px 20px", color:"#fff",
            display:"flex", alignItems:"center", gap:18, position:"relative", overflow:"hidden",
            boxShadow:"0 16px 40px -22px rgba(36,48,144,.8)" }}>
            <div style={{ position:"absolute", insetInlineEnd:-26, bottom:-30, width:120, height:120,
              borderRadius:99, background:"rgba(252,132,36,.16)", pointerEvents:"none" }} />
            <div style={{ background:"#fff", padding:8, borderRadius:12, flexShrink:0 }}>
              <QrCode text={qrPayload} size={108} />
            </div>
            <div style={{ position:"relative", minWidth:0 }}>
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:2,
                textTransform:"uppercase", color:"rgba(255,255,255,.6)", marginBottom:6 }}>
                {isAr ? "رمز التحقّق" : "Verification ID"}</div>
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:19, fontWeight:600,
                letterSpacing:1, marginBottom:9 }}>{vid}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,.72)", lineHeight:1.55, maxWidth:230 }}>
                {isAr ? "يُولَّد تلقائياً من بيانات الإقرار. امسح الرمز لعرض الملخّص — يربط السياسة بالممارسة (S4 · S5 · S28)."
                      : "Auto-generated from your details. Scan to view the summary — links policy to practice (S4 · S5 · S28)."}</div>
            </div>
          </div>

          <div style={{ display:"flex", gap:11, flexWrap:"wrap" }}>
            <button onClick={copyBoth} style={{
              flex:"1 1 160px", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:9,
              background: copied ? "#2E7D5B" : LC.navy, color:LC.white, border:"none", borderRadius:11,
              padding:"13px 20px", fontSize:14, fontWeight:600, cursor:"pointer", transition:"background .2s" }}>
              <Glyph name={copied ? "check" : "copy"} size={17} stroke={LC.white} />
              {copied ? (isAr ? "تم النسخ" : "Copied!") : (isAr ? "نسخ النصّين" : "Copy both")}
            </button>
            <button onClick={printDecl} style={{
              flex:"1 1 160px", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:9,
              background:LC.orange, color:LC.white, border:"none", borderRadius:11,
              padding:"13px 20px", fontSize:14, fontWeight:600, cursor:"pointer",
              boxShadow:"0 10px 24px -12px rgba(252,132,36,.8)" }}>
              <Glyph name="print" size={17} stroke={LC.white} />
              {isAr ? "طباعة / حفظ PDF" : "Print / Save PDF"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DeclarationModule });
