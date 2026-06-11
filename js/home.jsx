/* ═══════════════════════════════════════════════════════════════════
   HOME / DASHBOARD  ·  award-grade animated landing
═══════════════════════════════════════════════════════════════════ */
const { C: HC, TIER: HTIER, DOMAINS: HDOM, P: HP, T: HT } = window.NAV;

/* animated count-up stat */
function CountStat({ target, suffix, label, lang, accent, delay }) {
  const v = useCountUp(target, { delay, duration: 1500 });
  const isAr = lang === "ar";
  const disp = isAr ? v.toLocaleString("ar-EG") : v;
  return (
    <div style={{ textAlign: isAr ? "right" : "left", flex: "1 1 0", minWidth: 78 }}>
      <div style={{ fontFamily:"'Newsreader',serif", fontSize:"clamp(36px,5.2vw,56px)", fontWeight:600,
        color: accent || HC.white, lineHeight:1, letterSpacing:-1.5, display:"flex",
        alignItems:"baseline", gap:2, justifyContent: isAr ? "flex-end" : "flex-start" }}>
        {disp}{suffix && <span style={{ fontSize:"0.5em", opacity:.8 }}>{suffix}</span>}
      </div>
      <div style={{ fontSize:12.5, color:"rgba(255,255,255,.6)", marginTop:9, fontWeight:500,
        letterSpacing:.2 }}>{label}</div>
    </div>
  );
}

/* floating real-logo mark on a frosted chip (clean, recognizable) */
function Shard({ cls, size, style, opacity = 1 }) {
  return (
    <div className={cls} style={{ position:"absolute", ...style, pointerEvents:"none",
      padding:size*0.34, borderRadius:size*0.32, background:"rgba(255,255,255,.07)",
      border:"1px solid rgba(255,255,255,.16)", backdropFilter:"blur(8px)",
      WebkitBackdropFilter:"blur(8px)", boxShadow:"0 30px 60px -24px rgba(0,0,0,.5)" }}>
      <img src={logoSrc()} alt="" width={size}
        style={{ display:"block", opacity }} />
    </div>
  );
}

/* soft abstract orb for depth (NOT the logo) */
function Orb({ cls, style, color, size }) {
  return (
    <div className={cls} style={{ position:"absolute", width:size, height:size, borderRadius:"50%",
      border:`1.5px solid ${color}`, ...style, pointerEvents:"none" }} />
  );
}

function Hero({ lang, go }) {
  const isAr = lang === "ar";
  const plx1 = useParallax(20), plx2 = useParallax(-14), plx3 = useParallax(30);

  return (
    <section data-parallax-root style={{ position:"relative", overflow:"hidden", background:HC.navy,
      borderRadius:30, padding:"clamp(38px,5.4vw,72px)", color:HC.white, marginBottom:34,
      boxShadow:"0 40px 90px -50px rgba(36,48,144,.85)", isolation:"isolate" }}>

      {/* aurora glows */}
      <div className="aurora-a" style={{ position:"absolute", insetInlineEnd:"-10%", top:"-30%",
        width:"60%", height:"120%", background:`radial-gradient(circle, ${HC.orange}40, transparent 62%)`,
        filter:"blur(20px)", pointerEvents:"none", zIndex:0 }} />
      <div className="aurora-b" style={{ position:"absolute", insetInlineStart:"-15%", bottom:"-40%",
        width:"55%", height:"110%", background:`radial-gradient(circle, ${HC.royal}66, transparent 60%)`,
        filter:"blur(20px)", pointerEvents:"none", zIndex:0 }} />

      {/* fine grid texture */}
      <div style={{ position:"absolute", inset:0, opacity:.5, zIndex:0, pointerEvents:"none",
        backgroundImage:`linear-gradient(${HC.sky}14 1px,transparent 1px),linear-gradient(90deg,${HC.sky}14 1px,transparent 1px)`,
        backgroundSize:"54px 54px", maskImage:"radial-gradient(120% 100% at 50% 0%,#000,transparent 72%)",
        WebkitMaskImage:"radial-gradient(120% 100% at 50% 0%,#000,transparent 72%)" }} />

      {/* floating real logo on frosted chip + abstract orbs */}
      <div ref={plx1}><Shard cls="float-a" size={isAr ? 96 : 108}
        style={{ top:"14%", insetInlineEnd:"9%" }} opacity={1} /></div>
      <Orb cls="float-b" size={120} color={`${HC.amber}55`}
        style={{ top:"58%", insetInlineEnd:"34%" }} />
      <Orb cls="spin-slow" size={230} color={`${HC.orange}26`}
        style={{ bottom:"-16%", insetInlineEnd:"2%" }} />
      <div ref={plx3} style={{ position:"absolute", bottom:"-14%", insetInlineStart:"6%", zIndex:0 }}>
        <svg className="spin-slow" width="150" height="150" viewBox="0 0 100 100" fill="none" style={{ opacity:.16 }}>
          <circle cx="50" cy="50" r="46" stroke={HC.amber} strokeWidth="1" strokeDasharray="3 6"/>
          <circle cx="50" cy="50" r="30" stroke={HC.orange} strokeWidth="1"/>
        </svg>
      </div>

      <div style={{ position:"relative", zIndex:2, maxWidth:680 }}>
        <div className="pop" style={{ animationDelay:".05s", display:"inline-flex", alignItems:"center",
          gap:10, padding:"8px 15px", borderRadius:99, background:"rgba(255,255,255,.07)",
          border:"1px solid rgba(255,255,255,.16)", fontSize:12.5, fontWeight:500,
          color:"rgba(255,255,255,.88)", marginBottom:28, backdropFilter:"blur(6px)" }}>
          <span className="pulse-dot" style={{ width:7, height:7, borderRadius:99, background:HC.orange }} />
          {isAr ? "مبني على دراسة دلفاي ٢٠٢٦ — إجماع الخبراء" : "Built on the 2026 Delphi expert-consensus study"}
        </div>

        <h1 className="pop" style={{ animationDelay:".16s", fontFamily:"'Newsreader',serif", fontWeight:600,
          lineHeight:1.02, fontSize:"clamp(40px,6.6vw,76px)", letterSpacing:-2, marginBottom:22 }}>
          {isAr
            ? <>سياسة الذكاء الاصطناعي،<br/><span style={{ position:"relative", display:"inline-block" }}>
                <em style={{ color:HC.amber, fontStyle:"italic" }}>واضحةً وقابلة للتطبيق.</em>
                <Underline /></span></>
            : <>AI policy made<br/><span style={{ position:"relative", display:"inline-block" }}>
                <em style={{ color:HC.amber, fontStyle:"italic" }}>clear and usable.</em>
                <Underline /></span></>}
        </h1>

        <p className="pop" style={{ animationDelay:".28s", fontSize:"clamp(15px,1.85vw,18.5px)",
          color:"rgba(255,255,255,.74)", lineHeight:1.7, maxWidth:528, marginBottom:36 }}>
          {isAr
            ? "نظامٌ تطبيقي متكامل يحوّل ٢٩ توصية توافقية حول النزاهة الأكاديمية إلى ممارسة حيّة: من قمرة قيادة مؤسسية، إلى إعلانات موثّقة، إلى مساعد ذكي — لجامعة التقنية والعلوم التطبيقية بنزوى."
            : "An applied system that turns 29 expert-consensus academic-integrity recommendations into living practice: an institutional cockpit, verifiable declarations, and an AI assistant — for UTAS Nizwa."}
        </p>

        <div className="pop" style={{ animationDelay:".4s", display:"flex", gap:13, flexWrap:"wrap",
          marginBottom:50 }}>
          <button className="shine" onClick={() => go("decision")} style={{
            display:"inline-flex", alignItems:"center", gap:11, background:HC.orange, color:HC.white,
            border:"none", borderRadius:13, padding:"16px 28px", fontSize:15.5, fontWeight:600,
            cursor:"pointer", boxShadow:"0 16px 36px -12px rgba(252,132,36,.75)", transition:"transform .2s" }}
            onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"}
            onMouseLeave={e=>e.currentTarget.style.transform="none"}>
            {bi(HT.cta_start, lang)}
            <Glyph name={isAr ? "arrowL" : "arrowR"} size={19} />
          </button>
          <button onClick={() => go("library")} style={{
            display:"inline-flex", alignItems:"center", gap:10, background:"rgba(255,255,255,.07)",
            color:HC.white, border:"1px solid rgba(255,255,255,.24)", borderRadius:13,
            padding:"16px 26px", fontSize:15.5, fontWeight:600, cursor:"pointer",
            transition:"all .2s", backdropFilter:"blur(6px)" }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.16)";e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.07)";e.currentTarget.style.transform="none";}}>
            {bi(HT.cta_explore, lang)}
          </button>
        </div>

        <div className="pop" style={{ animationDelay:".52s", display:"flex", gap:14, flexWrap:"wrap",
          maxWidth:580, borderTop:"1px solid rgba(255,255,255,.13)", paddingTop:28 }}>
          <CountStat target={29} label={bi(HT.stat_policies, lang)} lang={lang} delay={650} />
          <CountStat target={6}  label={bi(HT.stat_domains, lang)}  lang={lang} delay={780} />
          <CountStat target={3}  label={bi(HT.stat_tiers, lang)}    lang={lang} delay={910} />
          <CountStat target={2}  label={bi(HT.stat_langs, lang)}    lang={lang} accent={HC.amber} delay={1040} />
        </div>
      </div>
    </section>
  );
}

function Underline() {
  return (
    <svg viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true"
      style={{ position:"absolute", insetInlineStart:0, bottom:-6, width:"100%", height:10 }}>
      <path d="M2 8 Q 80 2 150 6 T 298 5" fill="none" stroke={HC.orange} strokeWidth="3"
        strokeLinecap="round" style={{ transformOrigin:"left", animation:"drawLine .9s ease 1s both" }} />
    </svg>
  );
}

function ToolCard({ icon, kicker, title, desc, accent, onClick, lang, index }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        position:"relative", overflow:"hidden", textAlign:lang==="ar"?"right":"left",
        background:HC.white, border:`1px solid ${hover ? accent : HC.line}`, borderRadius:20,
        padding:"28px 24px 24px", cursor:"pointer", transition:"all .28s cubic-bezier(.2,.7,.3,1)",
        transform: hover ? "translateY(-6px)" : "none",
        boxShadow: hover ? `0 26px 50px -22px ${accent}88` : "0 1px 2px rgba(32,35,58,.04)",
        display:"flex", flexDirection:"column", gap:15, minHeight:198 }}>
      {/* corner wash */}
      <div style={{ position:"absolute", top:-34, insetInlineEnd:-34, width:130, height:130,
        borderRadius:99, background:`${accent}10`, transition:"all .35s",
        transform: hover ? "scale(1.4)" : "scale(1)" }} />
      {/* base accent line that grows */}
      <div style={{ position:"absolute", bottom:0, insetInlineStart:0, height:3, background:accent,
        width: hover ? "100%" : "0%", transition:"width .35s cubic-bezier(.2,.7,.3,1)" }} />

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", position:"relative" }}>
        <div style={{ width:52, height:52, borderRadius:15, background: hover ? accent : `${accent}14`,
          display:"flex", alignItems:"center", justifyContent:"center", color: hover ? HC.white : accent,
          transition:"all .28s", transform: hover ? "scale(1.08) rotate(-4deg)" : "none" }}>
          <Glyph name={icon} size={27} width={1.7} stroke={hover ? HC.white : accent} />
        </div>
        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:14, color: hover ? accent : HC.line,
          fontWeight:600, transition:"color .25s" }}>0{index}</span>
      </div>
      <div style={{ position:"relative" }}>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10.5, fontWeight:600,
          letterSpacing:2, textTransform:"uppercase", color:accent, marginBottom:8 }}>{bi(kicker, lang)}</div>
        <div style={{ fontFamily:"'Newsreader',serif", fontSize:22, fontWeight:600, color:HC.ink,
          marginBottom:8, lineHeight:1.18 }}>{bi(title, lang)}</div>
        <div style={{ fontSize:13.5, color:HC.slate, lineHeight:1.6 }}>{bi(desc, lang)}</div>
      </div>
      <div style={{ position:"relative", display:"flex", alignItems:"center", gap:8, color:accent,
        fontSize:13.5, fontWeight:600, marginTop:"auto",
        transform: hover ? (lang==="ar" ? "translateX(-5px)" : "translateX(5px)") : "none",
        transition:"transform .28s" }}>
        {lang==="ar" ? "ابدأ الآن" : "Open tool"}
        <Glyph name={lang==="ar" ? "arrowL" : "arrowR"} size={16} />
      </div>
    </button>
  );
}

function DomainStrip({ lang, go }) {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(158px,1fr))", gap:1,
      background:HC.line, borderRadius:16, overflow:"hidden", border:`1px solid ${HC.line}` }}>
      {Object.entries(HDOM).map(([k, d]) => {
        const count = HP.filter(p => p.d === k).length;
        return (
          <button key={k} onClick={() => go("library", { domain:k })} style={{
            background:HC.white, border:"none", padding:"20px 17px", cursor:"pointer",
            textAlign:lang==="ar"?"right":"left", transition:"all .22s", position:"relative",
            display:"flex", flexDirection:"column", gap:11, overflow:"hidden" }}
            onMouseEnter={e=>{e.currentTarget.style.background=HC.paper;e.currentTarget.querySelector(".dbar").style.width="100%";}}
            onMouseLeave={e=>{e.currentTarget.style.background=HC.white;e.currentTarget.querySelector(".dbar").style.width="0%";}}>
            <div className="dbar" style={{ position:"absolute", top:0, insetInlineStart:0, height:3,
              width:"0%", background:d.col, transition:"width .3s cubic-bezier(.2,.7,.3,1)" }} />
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ color:d.col }}><Glyph name={d.glyph} size={23} /></span>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:HC.warm }}>{k}</span>
            </div>
            <div style={{ fontSize:13.5, fontWeight:600, color:HC.ink, lineHeight:1.35 }}>{bi(d, lang)}</div>
            <div style={{ fontSize:11.5, color:HC.warm }}>{count} {lang==="ar"?"بنود":"statements"}</div>
          </button>
        );
      })}
    </div>
  );
}

function Home({ lang, go }) {
  const isAr = lang === "ar";
  const t1 = HP.filter(p => p.t === 1).length;

  const tools = [
    { icon:"flag", accent:HC.navy, route:"command",
      kicker:{ en:"Institution", ar:"مؤسسي" },
      title:{ en:"Command Center", ar:"مركز القيادة" },
      desc:{ en:"A live readiness gauge, risk heatmap and alerts across every department — the institutional cockpit.",
             ar:"مؤشر جاهزية حيّ وخريطة مخاطر وإنذارات عبر كل الأقسام — قمرة القيادة المؤسسية." } },
    { icon:"compass", accent:HC.royal, route:"decision",
      kicker:{ en:"Guided check", ar:"فحص موجَّه" },
      title:{ en:"Can I use AI?", ar:"هل أستطيع استخدامه؟" },
      desc:{ en:"Answer three quick questions and get tailored, policy-backed guidance for your exact situation.",
             ar:"أجب عن ثلاثة أسئلة سريعة واحصل على إرشاد مخصّص مدعوم بالسياسة لحالتك بالضبط." } },
    { icon:"doc", accent:HC.orange, route:"declaration",
      kicker:{ en:"Generator", ar:"مولِّد" },
      title:{ en:"Declaration generator", ar:"مولّد الإعلان" },
      desc:{ en:"Bilingual, print-ready AI-use declarations with a unique verification ID and QR stamp.",
             ar:"إعلانات ثنائية اللغة جاهزة للطباعة برمز تحقّق فريد ووسم QR." } },
    { icon:"gauge", accent:HC.rust, route:"compliance",
      kicker:{ en:"Tracker", ar:"متتبِّع" },
      title:{ en:"Compliance checker", ar:"مدقّق الامتثال" },
      desc:{ en:"Track your department's progress against all 29 policies. Your status is saved automatically.",
             ar:"تتبّع تقدّم قسمك مقابل السياسات الـ٢٩ كاملةً. تُحفَظ حالتك تلقائياً." } },
    { icon:"grid", accent:HC.blue, route:"library",
      kicker:{ en:"Reference", ar:"مرجع" },
      title:{ en:"Policy library", ar:"مكتبة السياسات" },
      desc:{ en:"Browse, search and filter all 29 plain-language policy statements across six domains.",
             ar:"تصفّح وابحث وصفِّ كل بنود السياسة الـ٢٩ بلغة واضحة عبر ستة مجالات." } },
    { icon:"spark", accent:HC.amber, route:"assistant",
      kicker:{ en:"AI", ar:"ذكاء اصطناعي" },
      title:{ en:"Policy AI Assistant", ar:"المساعد الذكي" },
      desc:{ en:"Ask anything in Arabic or English — answers grounded in the 29 policies, with citations.",
             ar:"اسأل بالعربية أو الإنجليزية — إجابات مستندة إلى البنود الـ٢٩ مع ذكر مراجعها." } },
  ];

  return (
    <div className="fade-in">
      <Hero lang={lang} go={go} />

      {/* ── featured: Student Portal + AI Detector ── */}
      <Reveal>
        <button onClick={() => go("portal")} data-parallax-root style={{ width:"100%", textAlign:"start",
          position:"relative", overflow:"hidden", background:`linear-gradient(110deg, ${HC.rust}, ${HC.orange})`,
          border:"none", borderRadius:24, padding:"clamp(26px,3.6vw,40px)", cursor:"pointer", color:HC.white,
          marginBottom:46, boxShadow:"0 30px 64px -36px rgba(228,108,36,.8)", display:"flex",
          alignItems:"center", gap:26, flexWrap:"wrap" }}
          onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"}
          onMouseLeave={e=>e.currentTarget.style.transform="none"}>
          <div style={{ position:"absolute", insetInlineEnd:-40, top:-60, width:220, height:220,
            borderRadius:"50%", background:"rgba(255,255,255,.12)" }} />
          <div style={{ position:"absolute", insetInlineEnd:"22%", bottom:-70, width:150, height:150,
            borderRadius:"50%", background:"rgba(255,255,255,.08)" }} />
          <div style={{ position:"relative", width:66, height:66, borderRadius:18, flexShrink:0,
            background:"rgba(255,255,255,.16)", border:"1px solid rgba(255,255,255,.28)",
            display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(6px)" }}>
            <Glyph name="shield" size={34} stroke={HC.white} width={1.7} />
          </div>
          <div style={{ position:"relative", flex:"1 1 320px" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"5px 12px", borderRadius:99,
              background:"rgba(255,255,255,.18)", fontSize:11.5, fontWeight:600, letterSpacing:1,
              marginBottom:12 }}>
              <span className="pulse-dot" style={{ width:6, height:6, borderRadius:99, background:HC.white }} />
              {isAr ? "جديد · نظام كامل" : "NEW · Full system"}</div>
            <h2 style={{ fontFamily:"'Newsreader',serif", fontSize:"clamp(24px,3.2vw,34px)", fontWeight:600,
              lineHeight:1.12, letterSpacing:-.6, marginBottom:10 }}>
              {isAr ? "بوابة الطالب + كاشف الذكاء الاصطناعي" : "Student Portal + AI Detector"}</h2>
            <p style={{ fontSize:"clamp(14px,1.6vw,16px)", color:"rgba(255,255,255,.86)", lineHeight:1.6,
              maxWidth:560 }}>
              {isAr ? "سجّل بحساب، فعّله بالبريد، ثم ارفع ملفك (PDF) ليفحصه كاشف ذكاء اصطناعي خاص بالكلية مقابل سياسات النزاهة الـ٢٩ — مع تقرير وشهادة قابلة للطباعة."
                    : "Register, verify by email, then upload your PDF for a college-grade AI detector to check against the 29 integrity policies — with a printable report & certificate."}</p>
          </div>
          <div style={{ position:"relative", display:"inline-flex", alignItems:"center", gap:9,
            background:HC.white, color:HC.rust, borderRadius:12, padding:"14px 24px", fontSize:15,
            fontWeight:700, flexShrink:0 }}>
            {isAr ? "ادخل البوابة" : "Enter portal"}
            <Glyph name={isAr ? "arrowL" : "arrowR"} size={18} stroke={HC.rust} />
          </div>
        </button>
      </Reveal>

      <section style={{ marginBottom:46 }}>
        <Reveal><Eyebrow color={HC.orange}>{isAr ? "ستّ أدوات · نظام واحد" : "Six tools · one system"}</Eyebrow>
          <h2 style={{ fontFamily:"'Newsreader',serif", fontSize:"clamp(26px,3.2vw,36px)", fontWeight:600,
            color:HC.ink, marginBottom:26, letterSpacing:-.8 }}>
            {isAr ? "اختر نقطة البداية" : "Pick your starting point"}
          </h2>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(246px,1fr))", gap:17 }}>
          {tools.map((t, i) => (
            <Reveal key={t.route} delay={i * 80}>
              <ToolCard {...t} lang={lang} index={i + 1} onClick={() => go(t.route)} />
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ marginBottom:46 }}>
        <Reveal><Eyebrow color={HC.rust}>{isAr ? "جديد · تعلَّم بالمثال" : "New · Learn by example"}</Eyebrow>
          <h2 style={{ fontFamily:"'Newsreader',serif", fontSize:"clamp(26px,3.2vw,36px)", fontWeight:600,
            color:HC.ink, marginBottom:24, letterSpacing:-.8 }}>
            {isAr ? "حالات واقعية وأسئلة شائعة" : "Real cases & common questions"}
          </h2>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:17 }}>
          <Reveal>
            <ToolCard icon="book" accent={HC.royal} lang={lang} index={5} onClick={()=>go("decision")}
              kicker={{en:"Case studies",ar:"حالات دراسية"}}
              title={{en:"Learn from real scenarios",ar:"تعلَّم من مواقف حقيقية"}}
              desc={{en:"Six academic case studies showing exactly how the policies apply — inside the decision guide.",
                     ar:"ست حالات أكاديمية تبيّن بالضبط كيف تُطبَّق السياسات — داخل دليل القرار."}} />
          </Reveal>
          <Reveal delay={80}>
            <ToolCard icon="info" accent={HC.blue} lang={lang} index={6} onClick={()=>go("faq")}
              kicker={{en:"FAQ",ar:"أسئلة شائعة"}}
              title={{en:"Common AI-usage questions",ar:"أسئلة استخدام الذكاء الاصطناعي"}}
              desc={{en:"Quick, plain answers to the questions students and faculty ask most about GenAI policy.",
                     ar:"إجابات سريعة وواضحة لأكثر ما يسأله الطلاب وهيئة التدريس عن سياسة الذكاء الاصطناعي."}} />
          </Reveal>
        </div>
      </section>

      <section>
        <Reveal><Eyebrow color={HC.royal}>{isAr ? "ستة مجالات" : "Six domains"}</Eyebrow>
          <h2 style={{ fontFamily:"'Newsreader',serif", fontSize:"clamp(26px,3.2vw,36px)", fontWeight:600,
            color:HC.ink, marginBottom:10, letterSpacing:-.8 }}>
            {isAr ? "كيف تُنظَّم السياسة" : "How the policy is organised"}
          </h2>
          <p style={{ fontSize:14.5, color:HC.slate, marginBottom:24, maxWidth:560, lineHeight:1.6 }}>
            {isAr
              ? `يندرج كل بند ضمن ستة مجالات وثلاثة مستويات أولوية. ${t1} بنداً منها إلزامية بلغت إجماع الخبراء الكامل.`
              : `Every statement sits within six domains and three priority tiers. ${t1} of them are mandatory and reached full expert consensus.`}
          </p>
        </Reveal>
        <Reveal delay={120}><DomainStrip lang={lang} go={go} /></Reveal>
      </section>
    </div>
  );
}

Object.assign(window, { Home });
