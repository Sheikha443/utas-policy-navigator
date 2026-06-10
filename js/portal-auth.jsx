/* ═══════════════════════════════════════════════════════════════════
   STUDENT PORTAL  ·  window.StudentPortal
   Register → email verify (demo) → dashboard → upload PDF → AI report
═══════════════════════════════════════════════════════════════════ */
const { C: PC } = window.NAV;

const pInput = {
  width:"100%", padding:"12px 14px", borderRadius:11, border:`1.5px solid ${PC.line}`,
  background:PC.white, fontSize:14.5, color:PC.ink, fontFamily:"'IBM Plex Sans Arabic',sans-serif",
  outline:"none", transition:"border-color .18s",
};
const errMsg = {
  missing:{ar:"يرجى تعبئة كل الحقول",en:"Please fill all fields"},
  email:{ar:"بريد إلكتروني غير صالح",en:"Invalid email address"},
  weak:{ar:"كلمة المرور ٦ أحرف على الأقل",en:"Password must be 6+ characters"},
  exists:{ar:"هذا البريد مسجّل مسبقاً",en:"This email is already registered"},
  nouser:{ar:"لا يوجد حساب بهذا البريد",en:"No account with this email"},
  badcode:{ar:"رمز التحقّق غير صحيح",en:"Incorrect verification code"},
  badpass:{ar:"كلمة المرور غير صحيحة",en:"Incorrect password"},
  unverified:{ar:"الحساب غير مفعّل — أدخل الرمز",en:"Account not verified — enter the code"},
  notyet:{ar:"لم نتحقّق بعد — افتح رابط التفعيل في بريدك أولاً",en:"Not verified yet — open the link in your email first"},
  cloud:{ar:"تعذّر الاتصال بقاعدة البيانات. حاول مجدداً",en:"Couldn't reach the database. Try again"},
};

function PField({ label, children, lang }) {
  return (
    <label style={{ display:"block", marginBottom:13 }}>
      <span style={{ display:"block", fontSize:11.5, fontWeight:600, color:PC.slate, marginBottom:6,
        letterSpacing:.2 }}>{label}</span>
      {children}
    </label>
  );
}

/* ════════════════════════ AUTH FLOW ════════════════════════ */
function AuthFlow({ lang, onAuthed }) {
  const isAr = lang === "ar";
  const [mode, setMode] = React.useState("register"); // register | login | verify
  const [form, setForm] = React.useState({ name:"", studentId:"", email:"", password:"", code:"" });
  const [err, setErr] = React.useState(null);
  const [demoCode, setDemoCode] = React.useState(null);
  const [busy, setBusy] = React.useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const showErr = (e) => setErr(errMsg[e] ? bi(errMsg[e], lang) : (isAr ? "حدث خطأ" : "Something went wrong"));
  const isCloud = (window.DB ? window.DB.mode : "local") === "cloud";

  const doRegister = async () => {
    setErr(null); setBusy(true);
    const r = await window.DB.register(form);
    setBusy(false);
    if (!r.ok) return showErr(r.err);
    if (r.demoCode) setDemoCode(r.demoCode);
    setMode("verify");
  };
  const doVerify = async () => {
    setErr(null); setBusy(true);
    const r = await window.DB.verify(form.email, form.code);
    setBusy(false);
    if (!r.ok) return showErr(r.err);
    onAuthed(r.user);
  };
  const doLogin = async () => {
    setErr(null); setBusy(true);
    const r = await window.DB.login(form.email, form.password);
    setBusy(false);
    if (r.ok) return onAuthed(r.user);
    if (r.err === "unverified") {
      const rs = await window.DB.resend(form.email);
      if (rs.demoCode) setDemoCode(rs.demoCode);
      setMode("verify"); return showErr("unverified");
    }
    showErr(r.err);
  };
  const resend = async () => { setBusy(true); const r = await window.DB.resend(form.email); setBusy(false); if (r.demoCode) setDemoCode(r.demoCode); };

  const tabBtn = (m, label) => (
    <button onClick={() => { setMode(m); setErr(null); }} style={{
      flex:1, padding:"11px", borderRadius:10, border:"none", cursor:"pointer", fontSize:14, fontWeight:600,
      background: mode === m ? PC.white : "transparent", color: mode === m ? PC.navy : PC.slate,
      boxShadow: mode === m ? "0 2px 8px rgba(32,35,58,.08)" : "none", transition:"all .16s" }}>{label}</button>
  );

  return (
    <div style={{ maxWidth:920, margin:"0 auto", display:"grid",
      gridTemplateColumns:"1fr 1fr", gap:30, alignItems:"center" }} className="auth-grid">
      {/* left promo */}
      <div className="auth-promo" style={{ position:"relative", overflow:"hidden", background:PC.navy,
        color:PC.white, borderRadius:24, padding:"40px 34px", minHeight:430,
        display:"flex", flexDirection:"column", justifyContent:"space-between",
        boxShadow:"0 34px 80px -44px rgba(36,48,144,.8)" }}>
        <div style={{ position:"absolute", insetInlineEnd:-50, top:-60, width:200, height:200, borderRadius:"50%",
          background:`radial-gradient(circle, ${PC.orange}40, transparent 65%)` }} />
        <div style={{ position:"relative" }}>
          <LogoMark size={46} />
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:600, letterSpacing:2,
            textTransform:"uppercase", color:PC.amber, margin:"26px 0 12px" }}>
            {isAr ? "بوابة الطالب" : "Student Portal"}</div>
          <h2 style={{ fontFamily:"'Newsreader',serif", fontSize:"clamp(26px,3.4vw,34px)", fontWeight:600,
            lineHeight:1.15, letterSpacing:-.5, marginBottom:16 }}>
            {isAr ? "سجّل، ارفع عملك، واحصل على تقرير نزاهة فوري." : "Register, upload your work, get an instant integrity report."}</h2>
          <p style={{ fontSize:14.5, color:"rgba(255,255,255,.72)", lineHeight:1.65, maxWidth:340 }}>
            {isAr ? "كاشف ذكاء اصطناعي خاص بالكلية يفحص ملفك مقابل سياسات النزاهة الـ٢٩ ويخبرك إن كنت ملتزماً."
                  : "A college-grade AI detector checks your file against the 29 integrity policies and tells you if you comply."}</p>
        </div>
        <div style={{ position:"relative", display:"flex", gap:20, flexWrap:"wrap", marginTop:24,
          borderTop:"1px solid rgba(255,255,255,.14)", paddingTop:22 }}>
          {[[isAr?"تسجيل آمن":"Secure sign-up","🔐"],[isAr?"تحقّق بالبريد":"Email verify","✉️"],[isAr?"تقرير + شهادة":"Report + cert","📄"]].map((x,i)=>(
            <div key={i} style={{ fontSize:12.5, color:"rgba(255,255,255,.8)" }}><div style={{fontSize:20,marginBottom:4}}>{x[1]}</div>{x[0]}</div>
          ))}
        </div>
      </div>

      {/* right card */}
      <div style={{ background:PC.white, borderRadius:24, border:`1px solid ${PC.line}`, padding:"30px 30px 34px",
        boxShadow:"0 20px 50px -34px rgba(32,35,58,.3)" }}>
        {/* database mode badge */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:18, fontSize:11.5,
          fontWeight:600, color: isCloud ? "#2E7D5B" : "#B45A12",
          background: isCloud ? "#EAF5EF" : "#FFF1E0", border:`1px solid ${isCloud?"#2E7D5B33":"#FC842433"}`,
          borderRadius:99, padding:"6px 13px", width:"fit-content" }}>
          <span style={{ width:7, height:7, borderRadius:99, background: isCloud ? "#2E7D5B" : PC.orange }} />
          {isCloud
            ? (isAr ? "متصل بقاعدة البيانات السحابية" : "Connected to cloud database")
            : (isAr ? "وضع تجريبي محلي (بيانات هذا الجهاز)" : "Local demo mode (this device only)")}
        </div>
        {!isCloud && (
          <p style={{ fontSize:11.5, color:PC.warm, marginTop:-10, marginBottom:18, lineHeight:1.5 }}>
            {isAr
              ? "لتفعيل قاعدة بيانات حقيقية مشتركة وبريد فعلي، راجع ملف «إعداد-قاعدة-البيانات.md»."
              : "To enable a real shared database & email, see «إعداد-قاعدة-البيانات.md»."}
          </p>
        )}

        {mode !== "verify" && (
          <div style={{ display:"flex", gap:4, padding:4, background:PC.cream, borderRadius:13, marginBottom:24 }}>
            {tabBtn("register", isAr ? "حساب جديد" : "Sign up")}
            {tabBtn("login", isAr ? "تسجيل دخول" : "Log in")}
          </div>
        )}

        {err && (
          <div style={{ background:`${PC.rust}12`, border:`1px solid ${PC.rust}33`, color:PC.rust,
            borderRadius:11, padding:"10px 14px", fontSize:13.5, fontWeight:500, marginBottom:16,
            display:"flex", alignItems:"center", gap:9 }}>
            <Glyph name="alert" size={16} stroke={PC.rust} />{err}</div>
        )}

        {mode === "register" && <>
          <PField label={isAr ? "الاسم الكامل" : "Full name"} lang={lang}>
            <input style={pInput} value={form.name} onChange={e=>set("name",e.target.value)}
              onFocus={e=>e.target.style.borderColor=PC.royal} onBlur={e=>e.target.style.borderColor=PC.line}/>
          </PField>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <PField label={isAr ? "الرقم الجامعي" : "Student ID"} lang={lang}>
              <input style={pInput} value={form.studentId} onChange={e=>set("studentId",e.target.value)}
                onFocus={e=>e.target.style.borderColor=PC.royal} onBlur={e=>e.target.style.borderColor=PC.line}/>
            </PField>
            <PField label={isAr ? "القسم" : "Department"} lang={lang}>
              <input style={pInput} value={form.department||""} onChange={e=>set("department",e.target.value)}
                onFocus={e=>e.target.style.borderColor=PC.royal} onBlur={e=>e.target.style.borderColor=PC.line}/>
            </PField>
          </div>
          <PField label={isAr ? "البريد الإلكتروني" : "Email"} lang={lang}>
            <input style={pInput} type="email" value={form.email} onChange={e=>set("email",e.target.value)}
              placeholder="name@utas.edu.om"
              onFocus={e=>e.target.style.borderColor=PC.royal} onBlur={e=>e.target.style.borderColor=PC.line}/>
          </PField>
          <PField label={isAr ? "كلمة المرور" : "Password"} lang={lang}>
            <input style={pInput} type="password" value={form.password} onChange={e=>set("password",e.target.value)}
              onFocus={e=>e.target.style.borderColor=PC.royal} onBlur={e=>e.target.style.borderColor=PC.line}/>
          </PField>
          <PrimaryBtn onClick={doRegister} lang={lang}>{isAr ? "أنشئ الحساب" : "Create account"}</PrimaryBtn>
        </>}

        {mode === "login" && <>
          <PField label={isAr ? "البريد الإلكتروني" : "Email"} lang={lang}>
            <input style={pInput} type="email" value={form.email} onChange={e=>set("email",e.target.value)}
              onFocus={e=>e.target.style.borderColor=PC.royal} onBlur={e=>e.target.style.borderColor=PC.line}/>
          </PField>
          <PField label={isAr ? "كلمة المرور" : "Password"} lang={lang}>
            <input style={pInput} type="password" value={form.password} onChange={e=>set("password",e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter")doLogin();}}
              onFocus={e=>e.target.style.borderColor=PC.royal} onBlur={e=>e.target.style.borderColor=PC.line}/>
          </PField>
          <PrimaryBtn onClick={doLogin} lang={lang}>{isAr ? "دخول" : "Log in"}</PrimaryBtn>
        </>}

        {mode === "verify" && <>
          <div style={{ textAlign:"center", marginBottom:6 }}>
            <div style={{ width:56, height:56, borderRadius:16, background:`${PC.orange}14`, color:PC.orange,
              display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
              <Glyph name="globe" size={28} stroke={PC.orange} /></div>
            <h3 style={{ fontFamily:"'Newsreader',serif", fontSize:23, fontWeight:600, color:PC.ink, marginBottom:7 }}>
              {isAr ? "تحقّق من بريدك" : "Verify your email"}</h3>
            <p style={{ fontSize:13.5, color:PC.slate, lineHeight:1.6, marginBottom:4 }}>
              {isCloud
                ? (isAr ? "أرسلنا رابط تفعيل إلى" : "We sent a verification link to")
                : (isAr ? "أرسلنا رمزاً مكوّناً من ٦ أرقام إلى" : "We sent a 6-digit code to")}<br/>
              <b style={{ color:PC.navy }}>{form.email}</b></p>
          </div>

          {isCloud ? (
            /* ── CLOUD: email-link verification ── */
            <>
              <div style={{ background:`${PC.royal}0E`, border:`1px solid ${PC.royal}28`, borderRadius:13,
                padding:"15px 16px", margin:"10px 0 18px", fontSize:13.5, color:PC.ink, lineHeight:1.7 }}>
                <b style={{ color:PC.navy }}>{isAr ? "الخطوات:" : "Steps:"}</b>
                <ol style={{ margin:"8px 0 0", paddingInlineStart:20 }}>
                  <li>{isAr ? "افتح بريدك الإلكتروني." : "Open your email inbox."}</li>
                  <li>{isAr ? "اضغط رابط التفعيل في الرسالة." : "Click the verification link in the message."}</li>
                  <li>{isAr ? "ارجع هنا واضغط الزر بالأسفل." : "Come back here and press the button below."}</li>
                </ol>
              </div>
              <PrimaryBtn onClick={doVerify} lang={lang}>
                {busy ? "…" : (isAr ? "لقد فعّلت — تابِع" : "I've verified — continue")}</PrimaryBtn>
              <button onClick={resend} disabled={busy} style={{ width:"100%", marginTop:12, background:"none",
                border:"none", color:PC.slate, fontSize:13, fontWeight:600, cursor:"pointer" }}>
                {isAr ? "إعادة إرسال الرابط" : "Resend link"}</button>
            </>
          ) : (
            /* ── LOCAL: demo 6-digit code ── */
            <>
              {demoCode && (
                <div style={{ background:`${PC.amber}12`, border:`1px dashed ${PC.amber}`, borderRadius:13,
                  padding:"13px 15px", margin:"6px 0 18px", display:"flex", alignItems:"center", gap:12 }}>
                  <span style={{ fontSize:22 }}>📧</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:11, fontWeight:600, color:"#B45A12", letterSpacing:.3, marginBottom:3 }}>
                      {isAr ? "صندوق وارد تجريبي (الوضع الحالي)" : "Demo inbox (current mode)"}</div>
                    <div style={{ fontSize:13, color:PC.ink }}>
                      {isAr ? "رمزك هو:" : "Your code is:"} <b style={{ fontFamily:"'IBM Plex Mono',monospace",
                        fontSize:18, color:PC.navy, letterSpacing:3, marginInlineStart:4 }}>{demoCode}</b></div>
                  </div>
                  <button onClick={()=>set("code",demoCode)} style={{ background:PC.amber, color:PC.white, border:"none",
                    borderRadius:8, padding:"7px 12px", fontSize:12.5, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap" }}>
                    {isAr ? "إدخال" : "Fill"}</button>
                </div>
              )}
              <PField label={isAr ? "رمز التحقّق" : "Verification code"} lang={lang}>
                <input style={{ ...pInput, fontFamily:"'IBM Plex Mono',monospace", fontSize:22, letterSpacing:8,
                  textAlign:"center" }} maxLength={6} value={form.code}
                  onChange={e=>set("code",e.target.value.replace(/\D/g,""))}
                  onKeyDown={e=>{if(e.key==="Enter")doVerify();}}
                  onFocus={e=>e.target.style.borderColor=PC.royal} onBlur={e=>e.target.style.borderColor=PC.line}/>
              </PField>
              <PrimaryBtn onClick={doVerify} lang={lang}>{isAr ? "تفعيل الحساب" : "Verify & continue"}</PrimaryBtn>
              <button onClick={resend} style={{ width:"100%", marginTop:12, background:"none", border:"none",
                color:PC.slate, fontSize:13, fontWeight:600, cursor:"pointer" }}>
                {isAr ? "إعادة إرسال الرمز" : "Resend code"}</button>
            </>
          )}
        </>}
      </div>
    </div>
  );
}

function PrimaryBtn({ onClick, lang, children }) {
  return (
    <button onClick={onClick} className="shine" style={{ width:"100%", marginTop:8,
      display:"inline-flex", alignItems:"center", justifyContent:"center", gap:9, background:PC.navy,
      color:PC.white, border:"none", borderRadius:12, padding:"14px", fontSize:15, fontWeight:600,
      cursor:"pointer", boxShadow:"0 14px 30px -14px rgba(36,48,144,.8)" }}>
      {children}<Glyph name={lang==="ar"?"arrowL":"arrowR"} size={18} stroke={PC.white} />
    </button>
  );
}

window.AuthFlow = AuthFlow;
window.PrimaryBtn = PrimaryBtn;
window.pInput = pInput;
window.PField = PField;
