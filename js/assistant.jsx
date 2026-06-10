/* ═══════════════════════════════════════════════════════════════════
   POLICY AI ASSISTANT  ·  grounded in the 29 statements
═══════════════════════════════════════════════════════════════════ */
const { C: AIC, P: AIP, DOMAINS: AIDOM } = window.NAV;

/* Compact policy context for grounding */
function buildContext() {
  return AIP.map(p => `${p.id} [${AIDOM[p.d].en}, Tier ${p.t}]: ${p.plain}`).join("\n");
}

const SUGGESTED = [
  { en:"Can students use ChatGPT for assignments?", ar:"هل يمكن للطلاب استخدام ChatGPT في الواجبات؟" },
  { en:"What must I disclose when I use AI?",        ar:"ماذا يجب أن أُفصِح عنه عند استخدام الذكاء الاصطناعي؟" },
  { en:"Can AI be a co-author on a paper?",          ar:"هل يمكن أن يكون الذكاء الاصطناعي مؤلفاً مشاركاً؟" },
  { en:"How do I handle student data with AI tools?", ar:"كيف أتعامل مع بيانات الطلاب في أدوات الذكاء الاصطناعي؟" },
  { en:"Is AI-detection software reliable for grading?", ar:"هل برامج كشف الذكاء الاصطناعي موثوقة للتقييم؟" },
];

function Bubble({ role, children, lang }) {
  const isUser = role === "user";
  return (
    <div style={{ display:"flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom:14 }}>
      {!isUser && (
        <div style={{ width:34, height:34, borderRadius:10, background:AIC.navy, color:"#fff", flexShrink:0,
          display:"flex", alignItems:"center", justifyContent:"center", marginInlineEnd:10, marginTop:2 }}>
          <Glyph name="spark" size={18} stroke="#fff" /></div>
      )}
      <div style={{ maxWidth:"76%", background: isUser ? AIC.navy : AIC.white,
        color: isUser ? "#fff" : AIC.ink, border: isUser ? "none" : `1px solid ${AIC.line}`,
        borderRadius:16, borderTopInlineStart: isUser ? 16 : 4, borderTopInlineEnd: isUser ? 4 : 16,
        padding:"13px 16px", fontSize:14.5, lineHeight:1.65, whiteSpace:"pre-wrap",
        boxShadow: isUser ? "0 8px 20px -10px rgba(36,48,144,.5)" : "0 1px 2px rgba(32,35,58,.04)" }}>
        {children}
      </div>
    </div>
  );
}

/* Render assistant text + highlight Sxx policy refs as chips */
function RichText({ text, lang }) {
  const parts = text.split(/(S\d{1,2})/g);
  const ids = new Set(AIP.map(p => p.id));
  return <span>{parts.map((seg, i) =>
    ids.has(seg)
      ? <span key={i} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:12.5, fontWeight:700,
          color:AIC.navy, background:`${AIC.royal}18`, padding:"1px 6px", borderRadius:6, margin:"0 1px" }}>{seg}</span>
      : <React.Fragment key={i}>{seg}</React.Fragment>
  )}</span>;
}

function Assistant({ lang }) {
  const isAr = lang === "ar";
  const [msgs, setMsgs] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, busy]);

  async function ask(q) {
    const question = (q ?? input).trim();
    if (!question || busy) return;
    setErr(false);
    setMsgs(m => [...m, { role:"user", text:question }]);
    setInput("");
    setBusy(true);

    const sys = `You are the UTAS Nizwa AI-policy assistant. Answer ONLY using the university's 29 GenAI academic-integrity policy statements below. Be concise, practical and warm. Cite the relevant policy codes (e.g. S2, S16) inline. If asked in Arabic, answer fully in Arabic; if in English, answer in English. If something is outside these policies, say so briefly and suggest contacting the quality office.

POLICIES:
${buildContext()}`;

    try {
      const reply = await window.claude.complete({
        messages: [
          { role:"user", content: `${sys}\n\nUSER QUESTION (${isAr ? "Arabic" : "English"}): ${question}` },
        ],
      });
      setMsgs(m => [...m, { role:"assistant", text: (reply || "").trim() || (isAr?"تعذّر توليد إجابة.":"No answer generated.") }]);
    } catch (e) {
      setErr(true);
      setMsgs(m => [...m, { role:"assistant", text: isAr
        ? "تعذّر الوصول إلى المساعد الآن. جرّب مجدداً بعد قليل، أو راجع مكتبة السياسات."
        : "Couldn't reach the assistant right now. Try again shortly, or check the Policy Library." }]);
    } finally { setBusy(false); }
  }

  return (
    <div className="fade-in">
      <Eyebrow color={AIC.royal}>{isAr ? "النظام · المساعد الذكي" : "OS · AI Assistant"}</Eyebrow>
      <h2 style={{ ...hHead, marginBottom:6 }}>{isAr ? "مساعد السياسات الذكي" : "Policy AI Assistant"}</h2>
      <p style={{ ...hSub, maxWidth:640 }}>
        {isAr ? "اسأل بأي صيغة عن سياسة الذكاء الاصطناعي في الجامعة — يجيب المساعد مستنداً إلى البنود الـ٢٩ ويذكر مراجعها."
              : "Ask anything about the university's AI policy — the assistant answers grounded in all 29 statements and cites them."}
      </p>

      <div style={{ background:AIC.white, border:`1px solid ${AIC.line}`, borderRadius:20, overflow:"hidden",
        display:"flex", flexDirection:"column", height:"min(620px,72vh)",
        boxShadow:"0 20px 50px -34px rgba(32,35,58,.4)" }}>
        {/* messages */}
        <div ref={scrollRef} style={{ flex:1, overflowY:"auto", padding:"22px 22px 8px",
          background:`linear-gradient(${AIC.paper},${AIC.white})` }}>
          {msgs.length === 0 && (
            <div style={{ textAlign:"center", padding:"24px 10px 18px", color:AIC.warm }}>
              <div style={{ width:56, height:56, borderRadius:16, background:AIC.navy, margin:"0 auto 14px",
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Glyph name="spark" size={28} stroke="#fff" /></div>
              <div style={{ fontFamily:"'Newsreader',serif", fontSize:19, color:AIC.ink, marginBottom:6 }}>
                {isAr ? "كيف أساعدك في سياسة الذكاء الاصطناعي؟" : "How can I help with the AI policy?"}</div>
              <div style={{ fontSize:13, maxWidth:420, margin:"0 auto", lineHeight:1.6 }}>
                {isAr ? "اختر سؤالاً شائعاً أو اكتب سؤالك." : "Pick a common question, or type your own."}</div>
            </div>
          )}
          {msgs.map((m, i) => (
            <Bubble key={i} role={m.role} lang={lang}>
              {m.role === "assistant" ? <RichText text={m.text} lang={lang} /> : m.text}
            </Bubble>
          ))}
          {busy && (
            <Bubble role="assistant" lang={lang}>
              <span className="typing"><i></i><i></i><i></i></span>
            </Bubble>
          )}
        </div>

        {/* suggested chips */}
        {msgs.length === 0 && (
          <div style={{ padding:"0 18px 12px", display:"flex", gap:8, flexWrap:"wrap" }}>
            {SUGGESTED.map((s, i) => (
              <button key={i} onClick={() => ask(bi(s, lang))} style={{ fontSize:12.5, fontWeight:500,
                padding:"8px 13px", borderRadius:99, background:AIC.paper, color:AIC.navy,
                border:`1px solid ${AIC.line}`, cursor:"pointer", transition:"all .15s" }}
                onMouseEnter={e=>{e.currentTarget.style.background=AIC.cream;e.currentTarget.style.borderColor=AIC.royal;}}
                onMouseLeave={e=>{e.currentTarget.style.background=AIC.paper;e.currentTarget.style.borderColor=AIC.line;}}>
                {bi(s, lang)}</button>
            ))}
          </div>
        )}

        {/* input */}
        <div style={{ borderTop:`1px solid ${AIC.line}`, padding:"14px 16px", background:AIC.white,
          display:"flex", gap:10, alignItems:"flex-end" }}>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={1}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(); } }}
            placeholder={isAr ? "اكتب سؤالك هنا…" : "Type your question…"}
            style={{ flex:1, resize:"none", maxHeight:120, padding:"11px 14px", borderRadius:12,
              border:`1.5px solid ${AIC.line}`, background:AIC.paper, fontSize:14.5, color:AIC.ink,
              fontFamily:"'IBM Plex Sans Arabic',sans-serif", outline:"none", lineHeight:1.5 }}
            onFocus={e=>e.target.style.borderColor=AIC.royal} onBlur={e=>e.target.style.borderColor=AIC.line} />
          <button onClick={() => ask()} disabled={busy || !input.trim()} style={{
            width:46, height:46, borderRadius:12, flexShrink:0, border:"none",
            background: busy || !input.trim() ? AIC.line : AIC.orange, color:"#fff",
            cursor: busy || !input.trim() ? "default" : "pointer", display:"flex", alignItems:"center",
            justifyContent:"center", transition:"background .2s",
            boxShadow: busy || !input.trim() ? "none" : "0 8px 20px -8px rgba(252,132,36,.7)" }}>
            <Glyph name={isAr ? "arrowL" : "arrowR"} size={20} stroke="#fff" width={2.2} />
          </button>
        </div>
      </div>

      <div style={{ marginTop:13, fontSize:11.5, color:AIC.warm, textAlign:"center", lineHeight:1.6 }}>
        {isAr ? "المساعد للاسترشاد فقط ويستند إلى السياسات الـ٢٩ — وليس بديلاً عن القرار الرسمي للجنة الجودة."
              : "Guidance only, grounded in the 29 policies — not a substitute for an official quality-committee decision."}
      </div>
    </div>
  );
}

Object.assign(window, { Assistant });
