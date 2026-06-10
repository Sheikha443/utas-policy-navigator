/* ═══════════════════════════════════════════════════════════════════
   MODULE 1 — DECISION TREE  ("Can I use AI?")
═══════════════════════════════════════════════════════════════════ */
const { C: DC, P: DP, ROLES: DROLES, CONTEXTS: DCTX, AI_USES: DUSES, getVerdict: DVERDICT, T: DT } = window.NAV;
const DPMAP = Object.fromEntries(DP.map(p => [p.id, p]));

function StepDots({ step, lang }) {
  const labels = lang === "ar"
    ? ["دورك", "السياق", "الاستخدام", "النتيجة"]
    : ["Your role", "Context", "AI usage", "Result"];
  return (
    <div style={{ display:"flex", alignItems:"center", marginBottom:34, maxWidth:560 }}>
      {labels.map((l, i) => (
        <React.Fragment key={i}>
          <div style={{ display:"flex", alignItems:"center", gap:9, flexShrink:0 }}>
            <div style={{
              width:30, height:30, borderRadius:99, display:"flex", alignItems:"center",
              justifyContent:"center", fontSize:12.5, fontWeight:700, flexShrink:0,
              fontFamily:"'IBM Plex Mono',monospace", transition:"all .3s",
              background: i < step ? DC.navy : i === step ? DC.orange : DC.cream,
              color: i <= step ? DC.white : DC.warm,
              boxShadow: i === step ? `0 0 0 4px ${DC.orange}26` : "none" }}>
              {i < step ? "✓" : i + 1}
            </div>
            <span className="dotlabel" style={{ fontSize:12.5, fontWeight:600, whiteSpace:"nowrap",
              color: i === step ? DC.ink : i < step ? DC.navy : DC.warm }}>{l}</span>
          </div>
          {i < labels.length - 1 && (
            <div style={{ flex:1, height:2, margin:"0 10px", borderRadius:2,
              background: i < step ? DC.navy : DC.line, transition:"background .3s", minWidth:14 }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function ChoiceCard({ it, onPick, lang, big, i }) {
  const [h, setH] = React.useState(false);
  const accent = it.v === "none" ? "#2E7D5B" : DC.royal;
  return (
    <button onClick={() => onPick(it.v)}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        textAlign:lang==="ar"?"right":"left", background:DC.white,
        border:`1.5px solid ${h ? accent : DC.line}`, borderRadius:15,
        padding:big ? "22px 20px" : "17px 18px", cursor:"pointer",
        transition:"all .22s cubic-bezier(.2,.7,.3,1)",
        transform: h ? "translateY(-3px)" : "none",
        boxShadow: h ? `0 14px 30px -16px ${accent}99` : "none",
        animationDelay:`${i*0.04}s`, display:"flex", gap:14, alignItems:"center" }}>
      {it.glyph && (
        <div style={{ width:big?48:40, height:big?48:40, borderRadius:12, flexShrink:0,
          background:`${accent}12`, color:accent, display:"flex", alignItems:"center",
          justifyContent:"center", transition:"all .2s", transform:h?"scale(1.06)":"none" }}>
          <Glyph name={it.glyph} size={big?26:22} />
        </div>
      )}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontWeight:600, fontSize:big?16:14.5, color:DC.ink,
          marginBottom:3, lineHeight:1.25 }}>{bi(it, lang)}</div>
        <div style={{ fontSize:12.5, color:DC.slate, lineHeight:1.3 }}>
          {lang === "ar" ? it.en : it.ar}</div>
      </div>
      <Glyph name={lang==="ar"?"arrowL":"arrowR"} size={17}
        style={{ color: h ? accent : DC.line, transition:"color .2s", flexShrink:0 }} />
    </button>
  );
}

function ChoiceGrid({ items, onPick, lang, big }) {
  return (
    <div className="fade-in" style={{ display:"grid",
      gridTemplateColumns:`repeat(auto-fit,minmax(${big?200:190}px,1fr))`, gap:13 }}>
      {items.map((it, i) => (
        <ChoiceCard key={it.v} it={it} onPick={onPick} lang={lang} big={big} i={i} />
      ))}
    </div>
  );
}

function Verdict({ result, lang, reset, go }) {
  const isAr = lang === "ar";
  const toneBg = { green:"#EAF5EF", amber:"#FFF3E3", rust:"#FBECE4" }[result.tone];
  return (
    <div className="fade-in">
      <div style={{ background:DC.white, borderRadius:22, overflow:"hidden",
        border:`1px solid ${DC.line}`, boxShadow:"0 24px 60px -36px rgba(32,35,58,.4)", marginBottom:22 }}>
        {/* banner */}
        <div style={{ background:toneBg, padding:"30px 30px 26px", borderBottom:`1px solid ${result.color}22`,
          display:"flex", alignItems:"flex-start", gap:18, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", insetInlineEnd:-26, top:-26, width:130, height:130,
            borderRadius:99, background:`${result.color}14` }} />
          <div style={{ width:54, height:54, borderRadius:16, background:result.color, color:DC.white,
            display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
            boxShadow:`0 10px 24px -8px ${result.color}` }}>
            <Glyph name={result.icon} size={28} width={2.2} stroke={DC.white} />
          </div>
          <div style={{ position:"relative" }}>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:600,
              letterSpacing:2, textTransform:"uppercase", color:result.color, marginBottom:7 }}>
              {result.type === "clear" ? (isAr?"لا يلزم إجراء":"No action needed")
                : result.type === "caution" ? (isAr?"تنبيه":"Caution")
                : (isAr?"مسموح بشروط":"Conditionally permitted")}
            </div>
            <div style={{ fontFamily:"'Newsreader',serif", fontSize:"clamp(22px,3vw,28px)", fontWeight:600,
              color:DC.ink, lineHeight:1.2, marginBottom:5 }}>
              {isAr ? result.titleAr : result.title}</div>
            <div style={{ fontSize:13.5, color:DC.slate, fontStyle:"italic" }}>
              {isAr ? result.title : result.titleAr}</div>
          </div>
        </div>
        {/* actions */}
        <div style={{ padding:"26px 30px 30px" }}>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:600,
            letterSpacing:2, textTransform:"uppercase", color:DC.warm, marginBottom:16 }}>
            {isAr ? "ما عليك فعله" : "What you must do"}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
            {result.actions.map((a, i) => (
              <div key={i} style={{ display:"flex", gap:13, alignItems:"flex-start" }}>
                <div style={{ width:24, height:24, borderRadius:8, background:`${result.color}15`,
                  color:result.color, display:"flex", alignItems:"center", justifyContent:"center",
                  flexShrink:0, fontFamily:"'IBM Plex Mono',monospace", fontSize:12, fontWeight:700,
                  marginTop:1 }}>{i + 1}</div>
                <div style={{ flex:1 }}>
                  <span style={{ fontSize:14.5, color:DC.ink, lineHeight:1.55 }}>{bi(a, lang)}</span>
                  {a.ref && <span style={{ marginInlineStart:8, fontFamily:"'IBM Plex Mono',monospace",
                    fontSize:11, fontWeight:600, color:result.color, background:`${result.color}12`,
                    padding:"1px 7px", borderRadius:6, whiteSpace:"nowrap" }}>{a.ref}</span>}
                </div>
              </div>
            ))}
          </div>

          {result.policies.length > 0 && (
            <div style={{ marginTop:24, paddingTop:20, borderTop:`1px solid ${DC.line}` }}>
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:600,
                letterSpacing:2, textTransform:"uppercase", color:DC.warm, marginBottom:13 }}>
                {isAr ? "السياسات المرجعية" : "Policy basis"}</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:9 }}>
                {result.policies.map(id => {
                  const pol = DPMAP[id];
                  return (
                    <div key={id} style={{ display:"flex", alignItems:"center", gap:9,
                      background:DC.paper, border:`1px solid ${DC.line}`, borderRadius:10,
                      padding:"8px 13px", maxWidth:260 }}>
                      <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontWeight:700,
                        fontSize:12.5, color:DC.navy }}>{id}</span>
                      <span style={{ fontSize:12.5, color:DC.slate, lineHeight:1.3 }}>
                        {isAr ? pol.ar : pol.short}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
        <button onClick={reset} style={{
          display:"inline-flex", alignItems:"center", gap:9, background:DC.white, color:DC.navy,
          border:`1.5px solid ${DC.line}`, borderRadius:11, padding:"13px 22px", fontSize:14,
          fontWeight:600, cursor:"pointer" }}>
          <Glyph name="arrowL" size={16} />{bi(DT.restart, lang)}
        </button>
        {result.type !== "clear" && (
          <button onClick={() => go("declaration")} style={{
            display:"inline-flex", alignItems:"center", gap:9, background:DC.navy, color:DC.white,
            border:"none", borderRadius:11, padding:"13px 24px", fontSize:14, fontWeight:600,
            cursor:"pointer", boxShadow:"0 10px 24px -12px rgba(36,48,144,.8)" }}>
            {isAr ? "أنشئ الإعلان" : "Generate declaration"}
            <Glyph name={lang==="ar"?"arrowL":"arrowR"} size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

function DecisionModule({ lang, go }) {
  const isAr = lang === "ar";
  const [step, setStep] = React.useState(0);
  const [role, setRole] = React.useState(null);
  const [ctx, setCtx] = React.useState(null);
  const [result, setResult] = React.useState(null);

  const reset = () => { setStep(0); setRole(null); setCtx(null); setResult(null); };
  const prompts = isAr
    ? ["مَن أنت؟", "بمَ تعمل؟", "كيف تستخدم الذكاء الاصطناعي؟"]
    : ["Who are you?", "What are you working on?", "How are you using AI?"];

  return (
    <div className="fade-in">
      <StepDots step={step} lang={lang} />

      {step === 0 && (
        <>
          <h2 style={hHead}>{prompts[0]}</h2>
          <p style={hSub}>{isAr ? "إجابتك تحدّد الإرشاد الذي ستحصل عليه." : "Your answer shapes the guidance you receive."}</p>
          <ChoiceGrid items={DROLES} lang={lang} big onPick={v => { setRole(v); setStep(1); }} />
        </>
      )}

      {step === 1 && role && (
        <>
          <h2 style={hHead}>{prompts[1]}</h2>
          <p style={hSub}>{isAr ? "اختر السياق الأقرب إلى عملك." : "Choose the context closest to your work."}</p>
          <ChoiceGrid items={DCTX[role] || []} lang={lang} onPick={v => { setCtx(v); setStep(2); }} />
          <BackBtn lang={lang} onClick={() => { setStep(0); setRole(null); }} />
        </>
      )}

      {step === 2 && (
        <>
          <h2 style={hHead}>{prompts[2]}</h2>
          <p style={hSub}>{isAr ? "اختر ما ينطبق على استخدامك." : "Select what applies to your use."}</p>
          <ChoiceGrid items={DUSES} lang={lang} onPick={v => {
            setResult(DVERDICT(role, v === "none" ? v : ctx, v)); setStep(3); }} />
          <BackBtn lang={lang} onClick={() => { setStep(1); setCtx(null); }} />
        </>
      )}

      {step === 3 && result && <Verdict result={result} lang={lang} reset={reset} go={go} />}
    </div>
  );
}

function BackBtn({ lang, onClick }) {
  return (
    <button onClick={onClick} style={{ marginTop:22, display:"inline-flex", alignItems:"center", gap:8,
      background:"none", border:"none", color:DC.slate, fontSize:13.5, fontWeight:600, cursor:"pointer" }}>
      <Glyph name={lang==="ar"?"arrowR":"arrowL"} size={16} />{bi(window.NAV.T.back, lang)}
    </button>
  );
}

Object.assign(window, { DecisionModule });
