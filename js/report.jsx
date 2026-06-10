/* ═══════════════════════════════════════════════════════════════════
   DETECTION REPORT  ·  window.DetectionReport
   Renders the full analysis: AI-suspicion gauge, verdict, violated
   policies, highlighted suspicious sentences, recommendations, and a
   printable certificate.
═══════════════════════════════════════════════════════════════════ */
const { C: RC, P: RP, TIER: RTIER } = window.NAV;
const RPMAP = Object.fromEntries(RP.map(p => [p.id, p]));

const VERDICT_CFG = {
  compliant:        { en:"Compliant", ar:"ملتزم", color:"#2E7D5B", bg:"#EAF5EF", icon:"check",
    descEn:"This submission meets the integrity policy.", descAr:"هذا العمل مستوفٍ لسياسة النزاهة." },
  needs_declaration:{ en:"Needs declaration", ar:"يحتاج إعلان", color:RC.orange, bg:"#FFF1E0", icon:"alert",
    descEn:"AI use is likely — submit a declaration to comply.", descAr:"يُرجّح استخدام الذكاء الاصطناعي — قدّم إعلاناً للامتثال." },
  violation:        { en:"Violation", ar:"مخالف", color:RC.rust, bg:"#FBECE4", icon:"alert",
    descEn:"Likely undeclared AI use — this breaches the policy.", descAr:"يُرجّح استخدام ذكاء اصطناعي غير معلَن — هذا يخالف السياسة." },
};

function Gauge({ value, lang }) {
  const isAr = lang === "ar";
  const r = 80, circ = Math.PI * r; // half circle
  const pct = Math.max(0, Math.min(100, value));
  const off = circ - (circ * pct) / 100;
  const col = pct >= 55 ? RC.rust : pct >= 35 ? RC.orange : "#2E7D5B";
  const label = pct >= 55 ? (isAr ? "مرتفع" : "High") : pct >= 35 ? (isAr ? "متوسط" : "Medium") : (isAr ? "منخفض" : "Low");
  return (
    <div style={{ position:"relative", width:210, height:128, flexShrink:0, margin:"0 auto" }}>
      <svg width="210" height="128" viewBox="0 0 210 128">
        <path d="M20 116 A85 85 0 0 1 190 116" fill="none" stroke={RC.cream} strokeWidth="16" strokeLinecap="round"/>
        <path d="M20 116 A85 85 0 0 1 190 116" fill="none" stroke={col} strokeWidth="16" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={off}
          style={{ transition:"stroke-dashoffset 1.1s cubic-bezier(.3,.8,.3,1), stroke .5s" }} />
      </svg>
      <div style={{ position:"absolute", inset:0, top:34, display:"flex", flexDirection:"column", alignItems:"center" }}>
        <div style={{ fontFamily:"'Newsreader',serif", fontSize:46, fontWeight:600, color:col, lineHeight:1 }}>
          {isAr ? pct.toLocaleString("ar-EG") : pct}<span style={{ fontSize:22 }}>%</span></div>
        <div style={{ fontSize:12.5, fontWeight:600, color:col, marginTop:3 }}>{label}</div>
      </div>
    </div>
  );
}

function highlightText(text, suspicious, lang) {
  if (!text) return null;
  const isAr = lang === "ar";
  const quotes = (suspicious || []).map(s => (s.text || "").trim()).filter(q => q.length > 6);
  if (!quotes.length) {
    const clip = text.slice(0, 900);
    return <span>{clip}{text.length > 900 ? "…" : ""}</span>;
  }
  // Build a regex of escaped quotes
  const esc = quotes.map(q => q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  let re; try { re = new RegExp("(" + esc.join("|") + ")", "g"); } catch (e) { re = null; }
  const clip = text.slice(0, 2400);
  if (!re) return <span>{clip}</span>;
  const parts = clip.split(re);
  return parts.map((part, i) => {
    const hit = quotes.some(q => q === part.trim());
    return hit
      ? <mark key={i} style={{ background:`${RC.rust}26`, color:RC.ink, padding:"1px 3px", borderRadius:4,
          borderBottom:`2px solid ${RC.rust}`, fontWeight:500 }}>{part}</mark>
      : <span key={i}>{part}</span>;
  });
}

function DetectionReport({ result, text, user, lang, onPrint }) {
  const isAr = lang === "ar";
  const V = VERDICT_CFG[result.verdict] || VERDICT_CFG.compliant;
  const h = result.heuristic || {};
  const ai = result.ai;
  const violated = (ai?.violatedPolicies || []).filter(id => RPMAP[id]);
  const recs = ai ? (isAr ? ai.recommendationsAr : ai.recommendationsEn) || [] : [];
  const suspicious = ai?.suspiciousSentences || [];
  const reportId = "RPT-" + (result.at || Date.now()).toString(36).toUpperCase().slice(-7);

  return (
    <div className="fade-in" id="detection-report">
      {/* ── headline band ── */}
      <div style={{ background:RC.white, borderRadius:22, border:`1px solid ${RC.line}`, overflow:"hidden",
        boxShadow:"0 24px 60px -38px rgba(32,35,58,.4)", marginBottom:20 }}>
        <div style={{ background:V.bg, padding:"26px 28px", borderBottom:`1px solid ${V.color}22`,
          display:"flex", gap:26, alignItems:"center", flexWrap:"wrap", justifyContent:"center" }}>
          <Gauge value={result.aiLikelihood} lang={lang} />
          <div style={{ flex:"1 1 280px", minWidth:240 }}>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:600,
              letterSpacing:2, textTransform:"uppercase", color:RC.warm, marginBottom:8 }}>
              {isAr ? "نسبة الاشتباه بالذكاء الاصطناعي" : "AI suspicion level"}</div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"8px 16px",
              borderRadius:99, background:V.color, color:RC.white, marginBottom:12,
              boxShadow:`0 10px 24px -10px ${V.color}` }}>
              <Glyph name={V.icon} size={19} stroke={RC.white} width={2.2} />
              <span style={{ fontSize:16, fontWeight:700 }}>{isAr ? V.ar : V.en}</span>
            </div>
            <p style={{ fontSize:14.5, color:RC.ink, lineHeight:1.6, marginBottom:4 }}>
              {ai ? (isAr ? ai.summaryAr : ai.summaryEn) : (isAr ? V.descAr : V.descEn)}</p>
            <div style={{ fontSize:12, color:RC.warm, marginTop:8, display:"flex", gap:14, flexWrap:"wrap" }}>
              <span>{isAr ? "المعرّف" : "ID"}: <b style={{ fontFamily:"'IBM Plex Mono',monospace", color:RC.slate }}>{reportId}</b></span>
              <span>{isAr ? "الكلمات" : "Words"}: <b style={{ color:RC.slate }}>{isAr ? (h.wc||0).toLocaleString("ar-EG") : h.wc||0}</b></span>
              <span>{isAr ? "المحرّك" : "Engine"}: <b style={{ color:RC.slate }}>{result.source === "ai+heuristics" ? (isAr?"ذكاء + مؤشرات":"AI + signals") : (isAr?"مؤشرات":"signals")}</b></span>
            </div>
          </div>
        </div>
      </div>

      {/* ── grid: violated policies + recommendations ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))", gap:16, marginBottom:20 }}>
        {/* violated */}
        <div style={{ background:RC.white, borderRadius:18, border:`1px solid ${RC.line}`, padding:"20px 22px" }}>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:600, letterSpacing:2,
            textTransform:"uppercase", color:RC.rust, marginBottom:15 }}>
            {isAr ? "البنود المتأثّرة" : "Policies affected"}</div>
          {violated.length ? (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {violated.map(id => {
                const p = RPMAP[id], tc = RTIER[p.t];
                return (
                  <div key={id} style={{ display:"flex", gap:11, alignItems:"flex-start",
                    padding:"11px 13px", background:RC.paper, borderRadius:11,
                    borderInlineStart:`4px solid ${tc.border}` }}>
                    <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontWeight:700, fontSize:13,
                      color:RC.navy, flexShrink:0 }}>{id}</span>
                    <span style={{ fontSize:13, color:RC.ink, lineHeight:1.45 }}>{isAr ? p.ar : p.short}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ display:"flex", alignItems:"center", gap:10, color:"#2E7D5B", fontSize:14 }}>
              <Glyph name="check" size={20} stroke="#2E7D5B" width={2.2} />
              {isAr ? "لا توجد بنود مخالفة." : "No policy violations found."}</div>
          )}
        </div>

        {/* recommendations */}
        <div style={{ background:RC.white, borderRadius:18, border:`1px solid ${RC.line}`, padding:"20px 22px" }}>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:600, letterSpacing:2,
            textTransform:"uppercase", color:RC.royal, marginBottom:15 }}>
            {isAr ? "توصيات لك" : "Recommendations"}</div>
          {(recs.length ? recs : [isAr ? "لا توجد إجراءات مطلوبة." : "No action required."]).map((rec, i) => (
            <div key={i} style={{ display:"flex", gap:11, alignItems:"flex-start", marginBottom:11 }}>
              <span style={{ width:22, height:22, borderRadius:7, background:`${RC.royal}14`, color:RC.royal,
                fontSize:12, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center",
                flexShrink:0, fontFamily:"'IBM Plex Mono',monospace", marginTop:1 }}>{i + 1}</span>
              <span style={{ fontSize:13.5, color:RC.ink, lineHeight:1.55 }}>{rec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── supporting signals ── */}
      <div style={{ background:RC.white, borderRadius:18, border:`1px solid ${RC.line}`, padding:"20px 22px", marginBottom:20 }}>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:600, letterSpacing:2,
          textTransform:"uppercase", color:RC.warm, marginBottom:15 }}>
          {isAr ? "المؤشرات التحليلية الداعمة" : "Supporting analytical signals"}</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", gap:12, marginBottom:16 }}>
          {[
            { l:isAr?"درجة المؤشرات":"Signal score", v: h.score!=null ? h.score+"%" : "—" },
            { l:isAr?"تذبذب الجمل":"Burstiness", v: h.burstiness!=null ? h.burstiness : "—" },
            { l:isAr?"تنوّع المفردات":"Lexical div.", v: h.ttr!=null ? h.ttr : "—" },
            { l:isAr?"متوسط طول الجملة":"Avg sentence", v: h.avgLen!=null ? h.avgLen : "—" },
          ].map((m, i) => (
            <div key={i} style={{ background:RC.paper, borderRadius:12, padding:"13px 14px", textAlign:"center" }}>
              <div style={{ fontFamily:"'Newsreader',serif", fontSize:24, fontWeight:600, color:RC.navy }}>{m.v}</div>
              <div style={{ fontSize:11, color:RC.warm, marginTop:4 }}>{m.l}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {(h.reasons || []).map((r, i) => (
            <div key={i} style={{ display:"flex", gap:9, alignItems:"flex-start", fontSize:13, color:RC.slate, lineHeight:1.5 }}>
              <span style={{ color:RC.orange, flexShrink:0, marginTop:2 }}>•</span>{bi(r, lang)}</div>
          ))}
        </div>
      </div>

      {/* ── highlighted text ── */}
      <div style={{ background:RC.white, borderRadius:18, border:`1px solid ${RC.line}`, padding:"20px 22px", marginBottom:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14, gap:12, flexWrap:"wrap" }}>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:600, letterSpacing:2,
            textTransform:"uppercase", color:RC.warm }}>{isAr ? "النص مع إبراز المشتبه به" : "Text with flagged passages"}</div>
          {suspicious.length > 0 && (
            <span style={{ fontSize:12, color:RC.rust, fontWeight:600 }}>
              <mark style={{ background:`${RC.rust}26`, padding:"1px 6px", borderRadius:4 }}>
                {isAr ? `${suspicious.length} مقطع مُبرَز` : `${suspicious.length} flagged`}</mark></span>
          )}
        </div>
        <div dir={isAr ? "rtl" : "ltr"} style={{ fontSize:13.5, color:RC.ink, lineHeight:2,
          maxHeight:280, overflowY:"auto", background:RC.paper, borderRadius:12, padding:"16px 18px",
          whiteSpace:"pre-wrap", textAlign: isAr ? "right" : "left" }}>
          {highlightText(text, suspicious, lang)}
        </div>
      </div>

      {/* ── actions ── */}
      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
        <button onClick={() => onPrint(result, text, user, reportId)} className="shine" style={{
          display:"inline-flex", alignItems:"center", gap:10, background:RC.navy, color:RC.white,
          border:"none", borderRadius:12, padding:"14px 24px", fontSize:15, fontWeight:600, cursor:"pointer",
          boxShadow:"0 14px 30px -14px rgba(36,48,144,.8)" }}>
          <Glyph name="print" size={18} stroke={RC.white} />
          {isAr ? "اطبع التقرير / الشهادة" : "Print report / certificate"}
        </button>
      </div>
    </div>
  );
}

/* ── printable certificate (opens new window) ──────────────────── */
function printCertificate(result, text, user, reportId, lang) {
  const isAr = lang === "ar";
  const V = VERDICT_CFG[result.verdict] || VERDICT_CFG.compliant;
  const ai = result.ai;
  const violated = (ai?.violatedPolicies || []).filter(id => RPMAP[id]);
  const recs = ai ? (isAr ? ai.recommendationsAr : ai.recommendationsEn) || [] : [];
  const dt = new Date(result.at || Date.now()).toLocaleString(isAr ? "ar-OM" : "en-GB");
  const w = window.open("", "_blank"); if (!w) return;
  const esc = s => String(s || "").replace(/[&<>]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;" }[c]));
  w.document.write(`<!doctype html><html lang="${isAr?'ar':'en'}" dir="${isAr?'rtl':'ltr'}"><head><meta charset="utf-8">
  <title>UTAS AI Integrity Report · ${reportId}</title>
  <style>
   @import url('https://fonts.googleapis.com/css2?family=Newsreader:wght@500;600&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap');
   *{box-sizing:border-box;margin:0;padding:0}
   body{font-family:'IBM Plex Sans Arabic',sans-serif;color:#20233A;max-width:760px;margin:40px auto;padding:0 36px;line-height:1.7}
   .top{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #243090;padding-bottom:18px;margin-bottom:6px}
   h1{font-family:'Newsreader',serif;font-weight:600;font-size:26px;color:#243090}
   .sub{color:#8C8678;font-size:12.5px;margin-top:4px}
   .badge{display:inline-block;padding:7px 16px;border-radius:99px;color:#fff;font-weight:700;font-size:15px;background:${V.color}}
   .score{font-family:'Newsreader',serif;font-size:54px;font-weight:600;color:${V.color};line-height:1}
   .row{display:flex;gap:30px;align-items:center;margin:26px 0;padding:22px;background:${V.bg};border-radius:16px}
   .mono{font-family:'IBM Plex Mono',monospace}
   h2{font-size:13px;text-transform:uppercase;letter-spacing:1.5px;color:#8C8678;margin:26px 0 12px;font-weight:600}
   .pol{display:flex;gap:10px;padding:9px 12px;background:#FAF7F1;border-inline-start:4px solid #243090;border-radius:9px;margin-bottom:8px;font-size:13.5px}
   ol{padding-inline-start:20px}li{margin-bottom:7px;font-size:13.5px}
   .meta{display:flex;gap:24px;flex-wrap:wrap;font-size:12.5px;color:#5B6276;margin-top:8px}
   .foot{margin-top:34px;border-top:1px solid #E0D8C8;padding-top:16px;font-size:11.5px;color:#8C8678;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px}
   @media print{body{margin:0}.row{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
  </style></head><body>
   <div class="top">
     <div><h1>${isAr?"تقرير نزاهة الذكاء الاصطناعي":"AI Integrity Report"}</h1>
       <div class="sub">${isAr?"جامعة التقنية والعلوم التطبيقية — نزوى":"University of Technology and Applied Sciences — Nizwa"}</div></div>
     <div style="text-align:${isAr?'left':'right'}"><div class="mono" style="font-size:13px;color:#243090;font-weight:600">${reportId}</div>
       <div class="sub">${dt}</div></div>
   </div>
   <div class="row">
     <div style="text-align:center"><div class="score">${result.aiLikelihood}%</div>
       <div style="font-size:12px;color:#8C8678">${isAr?"اشتباه بالذكاء الاصطناعي":"AI suspicion"}</div></div>
     <div><span class="badge">${isAr?V.ar:V.en}</span>
       <p style="margin-top:12px;font-size:14px">${esc(ai?(isAr?ai.summaryAr:ai.summaryEn):(isAr?V.descAr:V.descEn))}</p></div>
   </div>
   <div class="meta">
     <span>${isAr?"الطالب":"Student"}: <b>${esc(user?.name)||"—"}</b></span>
     <span>${isAr?"الرقم الجامعي":"ID"}: <b>${esc(user?.studentId)||"—"}</b></span>
     <span>${isAr?"العمل":"Work"}: <b>${esc(result.ctx?.title)||"—"}</b></span>
     <span>${isAr?"أعلن الذكاء الاصطناعي":"Declared AI"}: <b>${result.ctx?.declaredAI?(isAr?"نعم":"Yes"):(isAr?"لا":"No")}</b></span>
   </div>
   ${violated.length?`<h2>${isAr?"البنود المتأثّرة":"Policies affected"}</h2>${violated.map(id=>`<div class="pol"><b class="mono">${id}</b> ${esc(isAr?RPMAP[id].ar:RPMAP[id].short)}</div>`).join("")}`:`<h2>${isAr?"البنود":"Policies"}</h2><p style="color:#2E7D5B;font-size:14px">✓ ${isAr?"لا توجد بنود مخالفة":"No violations found"}</p>`}
   ${recs.length?`<h2>${isAr?"التوصيات":"Recommendations"}</h2><ol>${recs.map(r=>`<li>${esc(r)}</li>`).join("")}</ol>`:""}
   <div class="foot"><span>${isAr?"وُلِّد آلياً عبر نظام UTAS AI Integrity OS · للمراجعة الأكاديمية":"Generated by UTAS AI Integrity OS · for academic review"}</span>
     <span class="mono">${reportId}</span></div>
   <script>setTimeout(()=>window.print(),400)<\/script>
  </body></html>`);
  w.document.close();
}

Object.assign(window, { DetectionReport, printCertificate, VERDICT_CFG });
