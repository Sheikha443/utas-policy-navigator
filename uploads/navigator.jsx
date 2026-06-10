import { useState, useMemo } from "react";

/* ═══════════════════════════════════════════════════
   PALETTE & FONTS
═══════════════════════════════════════════════════ */
const C = {
  navy:"#0F2A47", sienna:"#B85C38", gold:"#C9A876",
  rust:"#8B3A2E", sage:"#5C7A52", paper:"#FAF7F2",
  slate:"#5A6B7A", warm:"#8B7E6E", line:"#C9C0AE",
  cream:"#EFE9DC", white:"#FFFFFF",
};
const TIER_CFG = {
  1:{ label:"Mandatory",    labelAr:"إلزامي",   bg:"#EBF0F5", border:C.navy,   text:C.navy   },
  2:{ label:"Recommended",  labelAr:"موصى به",  bg:"#FBF5E6", border:C.gold,   text:"#7A5C1E" },
  3:{ label:"Advisory",     labelAr:"استشاري",  bg:"#F7EDEC", border:C.rust,   text:C.rust   },
};

/* ═══════════════════════════════════════════════════
   POLICY DATA  (29 statements, plain-language, bilingual)
═══════════════════════════════════════════════════ */
const DOMAINS = {
  D1:{ name:"Transparency & Disclosure",      ar:"الشفافية والإفصاح",            icon:"👁", col:C.navy   },
  D2:{ name:"Authorship & Accountability",    ar:"التأليف والمساءلة",            icon:"✍", col:C.navy   },
  D3:{ name:"Quality Assurance & Safety",     ar:"ضمان الجودة والسلامة",         icon:"✅", col:C.navy   },
  D4:{ name:"Data Privacy & Security",        ar:"خصوصية البيانات وأمنها",       icon:"🔒", col:C.sienna },
  D5:{ name:"AI Literacy & Training",         ar:"محو الأمية والتدريب",          icon:"📚", col:C.slate  },
  D6:{ name:"UTAS Nizwa & Omani Context",     ar:"سياق UTAS نزوى والسياق العُماني",icon:"🌙", col:C.sage   },
};

const P = [
  {id:"S1",d:"D1",t:1,
    short:"Faculty disclose AI use",
    ar:"إفصاح هيئة التدريس عن استخدام الذكاء الاصطناعي",
    plain:"Every faculty member must explicitly state when AI tools helped create their teaching materials, research, or communications.",
    ex:"Say 'ChatGPT assisted with these lecture notes' at the start of class."},
  {id:"S2",d:"D1",t:1,
    short:"Students declare AI assistance",
    ar:"إعلان الطلاب عن المساعدة بالذكاء الاصطناعي",
    plain:"Students must inform faculty whenever AI contributed to submitted work — regardless of how small the contribution.",
    ex:"Even using AI only to check grammar still requires a declaration."},
  {id:"S3",d:"D1",t:1,
    short:"Define disclosure thresholds",
    ar:"تحديد معايير الإفصاح بوضوح",
    plain:"UTAS policy must state precisely what counts as sufficient disclosure so no student or faculty member is left guessing.",
    ex:"Define 'AI tools' to include ChatGPT, Grammarly, Copilot, and equivalent tools."},
  {id:"S4",d:"D1",t:1,
    short:"Standardised disclosure templates",
    ar:"نماذج إفصاح موحّدة لجميع الأقسام",
    plain:"All UTAS departments use the same AI disclosure form to ensure consistent expectations institution-wide.",
    ex:"One universal template eliminates confusion between different faculties."},
  {id:"S5",d:"D1",t:1,
    short:"Specify AI contribution extent",
    ar:"تحديد نطاق مساهمة الذكاء الاصطناعي",
    plain:"Declarations must state not just that AI was used, but what it did and approximately how much it contributed.",
    ex:"'I used ChatGPT for brainstorming the introduction — roughly 20% of ideas.'"},

  {id:"S6",d:"D2",t:1,
    short:"Human authors bear full responsibility",
    ar:"المؤلف البشري يتحمل المسؤولية الكاملة",
    plain:"Using AI does not reduce your accountability. You are responsible for every statement in your work — AI errors are your errors.",
    ex:"A hallucinated citation submitted without verification is your academic responsibility."},
  {id:"S7",d:"D2",t:2,
    short:"AI cannot be listed as co-author",
    ar:"لا يُدرج الذكاء الاصطناعي كمؤلف مشارك",
    plain:"Only humans who hold intellectual and ethical responsibility may hold authorship. Acknowledge AI in your methods section.",
    ex:"Write 'We used GPT-4 for data summarisation' in methods — not in the author list."},
  {id:"S8",d:"D2",t:1,
    short:"Faculty verify AI content accuracy",
    ar:"التحقق من دقة محتوى الذكاء الاصطناعي",
    plain:"Faculty using AI must personally verify that all AI-generated content is factually accurate before sharing it.",
    ex:"Check every AI-generated reference — 'hallucinated' citations are a documented risk."},
  {id:"S9",d:"D2",t:1,
    short:"Students responsible for AI-assisted work",
    ar:"مسؤولية الطلاب عن أعمالهم المعتمدة على الذكاء الاصطناعي",
    plain:"Students must understand and be able to defend any AI-assisted submission. 'The AI wrote it' is not an acceptable explanation.",
    ex:"Be prepared to discuss your AI-assisted work in class or viva at any time."},

  {id:"S10",d:"D3",t:2,
    short:"Define AI boundaries per assessment type",
    ar:"تحديد حدود استخدام الذكاء الاصطناعي لكل نوع تقييم",
    plain:"Each assessment must specify clearly whether AI is permitted, in what capacity, and to what extent.",
    ex:"Exams: no AI. Reflective essays: no AI. Research reports: brainstorming only."},
  {id:"S11",d:"D3",t:2,
    short:"AI detection tools: supplementary evidence only",
    ar:"أدوات الكشف عن الذكاء الاصطناعي: إشارة مساعدة فقط",
    plain:"AI detection tools (like Turnitin AI) can flag concerns but cannot be the sole evidence for any misconduct decision.",
    ex:"A 70% AI score triggers an investigation — it does not equal a verdict of misconduct."},
  {id:"S12",d:"D3",t:1,
    short:"Periodic AI policy audit",
    ar:"مراجعة دورية لتطبيق سياسة الذكاء الاصطناعي",
    plain:"UTAS must regularly audit whether AI policies are being consistently followed across all departments.",
    ex:"Annual QA review includes an AI-integrity compliance report per department."},
  {id:"S13",d:"D3",t:2,
    short:"Train faculty to identify AI content",
    ar:"تدريب هيئة التدريس على تحديد محتوى الذكاء الاصطناعي",
    plain:"Faculty should receive practical training on recognising patterns and signals of AI-generated academic work.",
    ex:"Workshops with side-by-side comparisons of AI-generated vs human writing samples."},
  {id:"S14",d:"D3",t:3,
    short:"Discipline-specific AI restrictions (advisory)",
    ar:"قيود الذكاء الاصطناعي الخاصة بكل تخصص",
    plain:"Some programmes — clinical, legal, creative — may need stricter AI rules than the general policy, to be set at department level.",
    ex:"Nursing assessments may prohibit AI-assisted care plan writing entirely."},
  {id:"S15",d:"D3",t:1,
    short:"Integrate AI integrity into QA frameworks",
    ar:"دمج نزاهة الذكاء الاصطناعي في إطار ضمان الجودة",
    plain:"AI integrity requirements must be formally built into UTAS programme review, accreditation, and quality assurance processes.",
    ex:"Programme review checklist includes: 'Is the AI-integrity policy current and accessible?'"},

  {id:"S16",d:"D4",t:1,
    short:"No personal data in public AI tools",
    ar:"حظر تحميل البيانات الشخصية على أدوات الذكاء الاصطناعي العامة",
    plain:"It is strictly prohibited to upload any student's name, ID, grades, or personal information into publicly accessible AI tools.",
    ex:"Never paste a student's assignment with their name into ChatGPT for marking assistance."},
  {id:"S17",d:"D4",t:2,
    short:"Anonymise data before AI processing",
    ar:"إخفاء هوية البيانات قبل المعالجة بالذكاء الاصطناعي",
    plain:"If data must be processed by AI, all personally identifying information must be removed or replaced first.",
    ex:"Replace 'Student: Fatma Al-Said, ID 12345' with 'Student A' before any AI processing."},
  {id:"S18",d:"D4",t:1,
    short:"Comply with Omani Data Protection Law",
    ar:"الامتثال لقانون حماية البيانات الشخصية العُماني",
    plain:"All AI tool use at UTAS must comply with Royal Decree 6/2022 — Oman's Personal Data Protection Law.",
    ex:"Verify AI vendors meet Omani data sovereignty requirements before institutional adoption."},
  {id:"S19",d:"D4",t:1,
    short:"Institutional licences for approved AI tools",
    ar:"تراخيص مؤسسية لأدوات الذكاء الاصطناعي المعتمدة",
    plain:"UTAS should provide licensed institutional AI tools so staff and students are not forced to use unvetted public tools.",
    ex:"A Microsoft Copilot institutional licence with a UTAS data-handling agreement."},

  {id:"S20",d:"D5",t:1,
    short:"Mandatory faculty AI literacy module",
    ar:"وحدة إلزامية لمحو أمية الذكاء الاصطناعي لهيئة التدريس",
    plain:"Every faculty member must complete a foundational AI literacy module covering capabilities, limitations, and responsible use principles.",
    ex:"A 3-hour self-paced module completed before the start of each academic year."},
  {id:"S21",d:"D5",t:1,
    short:"Student AI orientation at programme entry",
    ar:"توجيه الطلاب الجدد حول الاستخدام المسؤول للذكاء الاصطناعي",
    plain:"Every new student must receive structured AI orientation — covering UTAS policy and responsible use — as part of their induction.",
    ex:"First-week 'AI in your studies' session with the UTAS declaration process walk-through."},
  {id:"S22",d:"D5",t:1,
    short:"Library AI literacy resources",
    ar:"موارد محو الأمية في الذكاء الاصطناعي عبر المكتبة",
    plain:"UTAS Library and academic support teams develop and maintain accessible, current resources helping all staff and students navigate AI responsibly.",
    ex:"An 'AI & Academic Integrity' guide on the library website, updated each semester."},
  {id:"S23",d:"D5",t:3,
    short:"Annual faculty training hours (advisory)",
    ar:"ساعات التدريب السنوية لأعضاء هيئة التدريس (توجيهي)",
    plain:"A specific annual training-hour requirement was discussed but remains advisory — the appropriate amount varies by role and context.",
    ex:"Recommended: at least 4 hours of AI-related professional development per year."},
  {id:"S24",d:"D5",t:1,
    short:"AI ethics embedded in curriculum",
    ar:"دمج أخلاقيات الذكاء الاصطناعي في المناهج الدراسية",
    plain:"AI ethics and responsible use must be woven into courses across all programmes — not treated as a standalone topic only.",
    ex:"Business Ethics includes an AI bias module. Computer Science includes AI governance."},
  {id:"S25",d:"D5",t:1,
    short:"Train-the-trainer for department coordinators",
    ar:"برنامج تدريب المدرّبين لمنسقي الأقسام",
    plain:"Department coordinators should be trained as AI literacy champions, creating a knowledge multiplier across their units.",
    ex:"Coordinators complete an advanced AI literacy programme and receive facilitation resources."},

  {id:"S26",d:"D6",t:1,
    short:"Align with Oman Vision 2040",
    ar:"التوافق مع رؤية عُمان 2040",
    plain:"UTAS AI policies must connect explicitly to Vision 2040's goals for a knowledge economy, digital transformation, and an empowered Omani workforce.",
    ex:"Policy preamble references Vision 2040 and positions UTAS as a leader in responsible AI adoption."},
  {id:"S27",d:"D6",t:1,
    short:"Coordinate across all UTAS branches",
    ar:"التنسيق بين فروع UTAS لضمان الاتساق",
    plain:"All UTAS campuses must follow the same core AI policy so student experience is consistent regardless of which branch they attend.",
    ex:"A single institutional policy with branch-level implementation plans."},
  {id:"S28",d:"D6",t:1,
    short:"Bilingual policy: Arabic & English",
    ar:"سياسة ثنائية اللغة: العربية والإنجليزية",
    plain:"The full policy, all forms, guidance, and training must be available in both Arabic and English — no language barrier for any user.",
    ex:"Every form in the Navigator is available in Arabic and English simultaneously."},
  {id:"S29",d:"D6",t:1,
    short:"Cultural & Islamic ethical grounding",
    ar:"الأسس الثقافية والأخلاقية الإسلامية",
    plain:"UTAS AI policies must be grounded in Omani cultural values and Islamic ethical principles, reflecting the values of the university community.",
    ex:"Policy includes a statement on amanah (trustworthiness) as the foundation of academic integrity."},
];

/* ═══════════════════════════════════════════════════
   DECISION TREE DATA
═══════════════════════════════════════════════════ */
const ROLES = [
  {v:"student",   label:"Student",       ar:"طالب / طالبة",       icon:"🎓"},
  {v:"faculty",   label:"Faculty",       ar:"عضو هيئة تدريس",     icon:"👩‍🏫"},
  {v:"researcher",label:"Researcher",    ar:"باحث / باحثة",       icon:"🔬"},
  {v:"admin",     label:"Administrator", ar:"موظف إداري",          icon:"🏛️"},
];
const CONTEXTS = {
  student: [
    {v:"graded",   label:"Graded assignment",   ar:"واجب أو اختبار مقيّم"},
    {v:"thesis",   label:"Thesis or dissertation",ar:"رسالة علمية"},
    {v:"personal", label:"Personal / non-assessed study",ar:"دراسة غير مقيّمة"},
    {v:"group",    label:"Group project",        ar:"مشروع جماعي"},
  ],
  faculty: [
    {v:"teaching", label:"Teaching materials",   ar:"مواد تعليمية"},
    {v:"research", label:"Research or publication",ar:"بحث أو نشر أكاديمي"},
    {v:"marking",  label:"Student assessment",   ar:"تقييم أعمال الطلاب"},
    {v:"comms",    label:"Administrative communications",ar:"مراسلات إدارية"},
  ],
  researcher: [
    {v:"data",     label:"Data collection or analysis",ar:"جمع البيانات أو تحليلها"},
    {v:"writing",  label:"Writing a paper or report",ar:"كتابة ورقة بحثية أو تقرير"},
    {v:"literature",label:"Literature review",   ar:"مراجعة الأدبيات"},
  ],
  admin: [
    {v:"documents",label:"Official documents",   ar:"وثائق رسمية"},
    {v:"internal", label:"Internal communications",ar:"مراسلات داخلية"},
  ],
};
const AI_USES = [
  {v:"none",       label:"I did not use AI",          ar:"لم أستخدم الذكاء الاصطناعي"},
  {v:"brainstorm", label:"Brainstorming ideas only",  ar:"العصف الذهني للأفكار فقط"},
  {v:"drafting",   label:"Generating or drafting text",ar:"توليد أو كتابة نص"},
  {v:"editing",    label:"Editing or improving writing",ar:"تحرير أو تحسين الكتابة"},
  {v:"translation",label:"Translating content",      ar:"ترجمة المحتوى"},
  {v:"analysis",   label:"Analysing data or sources", ar:"تحليل البيانات أو المصادر"},
];

function getVerdict(role, context, aiUse) {
  if (aiUse === "none") return {
    type:"permitted", icon:"✓",
    title:"No AI used — no declaration required",
    titleAr:"لم يُستخدم الذكاء الاصطناعي — لا يلزم إعلان",
    color:C.sage,
    actions:["No AI declaration is required.","You may note 'No AI tools used' on your submission for your own records."],
    policies:[],
  };
  if (role==="student" && context==="marking") role="faculty";
  if (role==="faculty" && context==="marking") return {
    type:"caution", icon:"⚠",
    title:"Proceed with caution — data rules apply",
    titleAr:"توخَّ الحذر — تسري قواعد البيانات",
    color:C.sienna,
    actions:[
      "Never upload identifiable student data into public AI tools (S16).",
      "Anonymise all student work before any AI processing (S17).",
      "AI detection tool results cannot be the sole evidence for any misconduct decision (S11).",
      "Your professional judgement must remain the primary assessment tool.",
    ],
    policies:["S11","S16","S17","S18"],
  };
  if (role==="researcher") return {
    type:"permitted_conditions", icon:"✓",
    title:"Permitted — disclosure and data rules apply",
    titleAr:"مسموح — مع الامتثال لقواعد الإفصاح والبيانات",
    color:C.gold,
    actions:[
      "Disclose AI use in the Methods section of your research (S1).",
      "Do not list AI as a co-author — acknowledge it in methods only (S7).",
      "Remove all personal or identifiable data before any AI processing (S16, S17).",
      "Verify AI outputs for accuracy — you are responsible for all content (S6, S8).",
      "Ensure AI tools used comply with Omani data protection law (S18).",
    ],
    policies:["S1","S6","S7","S8","S16","S17","S18"],
  };
  if (aiUse==="brainstorm") return {
    type:"permitted_conditions", icon:"✓",
    title:"Permitted — declaration required",
    titleAr:"مسموح — مع إعلان مطلوب",
    color:C.gold,
    actions:[
      "Submit the UTAS AI Declaration Form with your work (S2, S4).",
      "State that AI was used for brainstorming purposes only (S5).",
      "Final ideas, arguments, and writing must be entirely your own (S9).",
    ],
    policies:["S2","S4","S5","S9"],
  };
  if (aiUse==="drafting") return {
    type:"permitted_conditions", icon:"✓",
    title:"Permitted — full declaration required",
    titleAr:"مسموح — مع إعلان كامل إلزامي",
    color:C.gold,
    actions:[
      "Confirm your faculty permits AI drafting for this specific assessment type (S10).",
      "Submit the UTAS AI Declaration Form with your assignment (S2, S4).",
      "State which tool you used and approximately what percentage it generated (S5).",
      "Confirm you have reviewed and understood all AI-generated content (S9).",
      "You remain fully responsible for every statement in the work (S6).",
    ],
    policies:["S2","S4","S5","S6","S9","S10"],
  };
  if (aiUse==="editing") return {
    type:"permitted_conditions", icon:"✓",
    title:"Permitted — declaration required",
    titleAr:"مسموح — مع إعلان",
    color:C.gold,
    actions:[
      "Submit the UTAS AI Declaration Form (S2, S4).",
      "Note that AI was used for editing or proofreading purposes only (S5).",
      "Original ideas and arguments must be entirely yours (S9).",
    ],
    policies:["S2","S4","S5","S9"],
  };
  return {
    type:"permitted_conditions", icon:"✓",
    title:"Permitted — declaration and compliance required",
    titleAr:"مسموح — مع الإعلان والامتثال للسياسة",
    color:C.gold,
    actions:[
      "Disclose your AI use clearly in the relevant context (S1, S2).",
      "Ensure no personal or sensitive data is included (S16).",
      "You remain fully responsible for all content produced (S6).",
    ],
    policies:["S1","S2","S5","S6"],
  };
}

/* ═══════════════════════════════════════════════════
   STYLES (injected)
═══════════════════════════════════════════════════ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:${C.paper};font-family:'DM Sans',sans-serif;color:${C.navy};}
button{cursor:pointer;border:none;font-family:'DM Sans',sans-serif;}
input,select,textarea{font-family:'DM Sans',sans-serif;}
.lora{font-family:'Lora',serif;}
.fade-in{animation:fadeIn .35s ease both;}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.opt-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(15,42,71,.1);}
.opt-card{transition:all .2s ease;}
.tier-badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600;border:1px solid;}
.policy-card{background:${C.white};border-radius:10px;border:1px solid ${C.line};padding:16px;transition:all .2s;position:relative;}
.policy-card:hover{box-shadow:0 4px 16px rgba(15,42,71,.08);}
.status-btn{padding:5px 12px;border-radius:20px;font-size:12px;font-weight:500;border:1.5px solid;transition:all .15s;cursor:pointer;}
progress-bar{display:block;height:6px;border-radius:3px;background:${C.line};overflow:hidden;}
@keyframes barGrow{from{width:0}to{width:var(--w)}}
`;

/* ═══════════════════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════════════════ */
const TierBadge = ({tier}) => {
  const cfg = TIER_CFG[tier];
  return (
    <span className="tier-badge" style={{background:cfg.bg,borderColor:cfg.border,color:cfg.text}}>
      {cfg.label}
    </span>
  );
};

const PolicyRef = ({ids}) => {
  if(!ids||!ids.length) return null;
  return (
    <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:8}}>
      <span style={{fontSize:11,color:C.warm,fontWeight:500}}>Policy refs:</span>
      {ids.map(id=>(
        <span key={id} style={{fontSize:11,padding:"1px 7px",background:C.cream,
          borderRadius:10,color:C.navy,fontWeight:600}}>
          {id}
        </span>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   MODULE 1 — DECISION TREE
═══════════════════════════════════════════════════ */
function DecisionModule(){
  const [step,setStep]=useState(0);
  const [role,setRole]=useState(null);
  const [context,setContext]=useState(null);
  const [aiUse,setAiUse]=useState(null);
  const [result,setResult]=useState(null);

  const reset=()=>{setStep(0);setRole(null);setContext(null);setAiUse(null);setResult(null);};

  const pickRole=(v)=>{setRole(v);setStep(1);};
  const pickContext=(v)=>{setContext(v);setStep(2);};
  const pickAiUse=(v)=>{
    setAiUse(v);
    setResult(getVerdict(role,v==="none"?v:context,v));
    setStep(3);
  };

  const steps=["Your role","Your context","AI usage","Result"];
  const policyMap=Object.fromEntries(P.map(p=>[p.id,p]));

  return (
    <div className="fade-in">
      {/* Progress */}
      <div style={{display:"flex",alignItems:"center",gap:0,marginBottom:32}}>
        {steps.map((s,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",flex:i<steps.length-1?1:0}}>
            <div style={{
              width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
              background: i<step ? C.navy : i===step ? C.sienna : C.line,
              color: i<=step ? C.white : C.warm,
              fontSize:12,fontWeight:700,flexShrink:0,
              transition:"all .3s",
            }}>{i<step?"✓":i+1}</div>
            {i<steps.length-1&&<div style={{
              flex:1,height:2,margin:"0 4px",
              background: i<step ? C.navy : C.line,
              transition:"background .3s"
            }}/>}
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
        {steps.map((s,i)=>(
          <span key={i} style={{
            fontSize:11,fontWeight:600,color: i===step ? C.sienna : i<step ? C.navy : C.warm,
            textTransform:"uppercase",letterSpacing:1,
          }}>{s}{i<steps.length-1&&<span style={{color:C.line,margin:"0 6px"}}>›</span>}</span>
        ))}
      </div>

      {/* Step 0 — Role */}
      {step===0&&(
        <div className="fade-in">
          <p className="lora" style={{fontSize:22,fontStyle:"italic",marginBottom:6}}>Who are you?</p>
          <p style={{fontSize:13,color:C.slate,marginBottom:24}}>
            مَن أنت؟ — Your answer shapes the guidance you receive.
          </p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12}}>
            {ROLES.map(r=>(
              <button key={r.v} className="opt-card" onClick={()=>pickRole(r.v)} style={{
                background:C.white,border:`1.5px solid ${C.line}`,borderRadius:12,
                padding:"20px 16px",textAlign:"left",
              }}>
                <div style={{fontSize:28,marginBottom:10}}>{r.icon}</div>
                <div style={{fontWeight:600,fontSize:15,color:C.navy,marginBottom:2}}>{r.label}</div>
                <div style={{fontSize:12,color:C.slate,fontStyle:"italic"}}>{r.ar}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1 — Context */}
      {step===1&&role&&(
        <div className="fade-in">
          <p className="lora" style={{fontSize:22,fontStyle:"italic",marginBottom:6}}>What are you working on?</p>
          <p style={{fontSize:13,color:C.slate,marginBottom:24}}>ما العمل الذي تقوم به؟</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:10}}>
            {(CONTEXTS[role]||[]).map(c=>(
              <button key={c.v} className="opt-card" onClick={()=>pickContext(c.v)} style={{
                background:C.white,border:`1.5px solid ${C.line}`,borderRadius:10,
                padding:"16px",textAlign:"left",
              }}>
                <div style={{fontWeight:600,fontSize:14,color:C.navy,marginBottom:4}}>{c.label}</div>
                <div style={{fontSize:12,color:C.slate,fontStyle:"italic"}}>{c.ar}</div>
              </button>
            ))}
          </div>
          <button onClick={()=>{setStep(0);setRole(null);}} style={{
            marginTop:20,background:"none",color:C.slate,fontSize:13,textDecoration:"underline"
          }}>← Back</button>
        </div>
      )}

      {/* Step 2 — AI Use */}
      {step===2&&(
        <div className="fade-in">
          <p className="lora" style={{fontSize:22,fontStyle:"italic",marginBottom:6}}>How are you using AI?</p>
          <p style={{fontSize:13,color:C.slate,marginBottom:24}}>كيف تستخدم الذكاء الاصطناعي؟</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:10}}>
            {AI_USES.map(u=>(
              <button key={u.v} className="opt-card" onClick={()=>pickAiUse(u.v)} style={{
                background: u.v==="none"?C.cream:C.white,
                border:`1.5px solid ${u.v==="none"?C.line:C.line}`,
                borderRadius:10,padding:"16px",textAlign:"left",
              }}>
                <div style={{fontWeight:600,fontSize:14,color:C.navy,marginBottom:4}}>{u.label}</div>
                <div style={{fontSize:12,color:C.slate,fontStyle:"italic"}}>{u.ar}</div>
              </button>
            ))}
          </div>
          <button onClick={()=>{setStep(1);setContext(null);}} style={{
            marginTop:20,background:"none",color:C.slate,fontSize:13,textDecoration:"underline"
          }}>← Back</button>
        </div>
      )}

      {/* Step 3 — Result */}
      {step===3&&result&&(
        <div className="fade-in">
          <div style={{
            background:C.white,borderRadius:16,border:`2px solid ${result.color}`,
            padding:"28px 28px 24px",marginBottom:24,
          }}>
            <div style={{display:"flex",alignItems:"flex-start",gap:16,marginBottom:20}}>
              <div style={{
                width:44,height:44,borderRadius:"50%",background:result.color,
                display:"flex",alignItems:"center",justifyContent:"center",
                color:C.white,fontSize:20,fontWeight:700,flexShrink:0,
              }}>{result.icon}</div>
              <div>
                <div className="lora" style={{fontSize:20,fontWeight:600,color:result.color,marginBottom:4}}>
                  {result.title}
                </div>
                <div style={{fontSize:13,color:C.slate,fontStyle:"italic"}}>{result.titleAr}</div>
              </div>
            </div>
            <div style={{borderTop:`1px solid ${C.line}`,paddingTop:16}}>
              <p style={{fontSize:12,fontWeight:600,color:C.warm,textTransform:"uppercase",
                letterSpacing:1,marginBottom:10}}>What you must do</p>
              {result.actions.map((a,i)=>(
                <div key={i} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}>
                  <span style={{color:result.color,fontWeight:700,flexShrink:0,marginTop:1}}>›</span>
                  <span style={{fontSize:14,color:C.navy,lineHeight:1.5}}>{a}</span>
                </div>
              ))}
              {result.policies.length>0&&(
                <div style={{marginTop:16,paddingTop:12,borderTop:`1px solid ${C.cream}`}}>
                  <p style={{fontSize:12,fontWeight:600,color:C.warm,textTransform:"uppercase",
                    letterSpacing:1,marginBottom:8}}>Policy basis</p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {result.policies.map(id=>{
                      const pol=policyMap[id];
                      return pol?(
                        <div key={id} style={{
                          background:C.cream,borderRadius:8,padding:"6px 10px",
                        }}>
                          <span style={{fontWeight:700,fontSize:12,color:C.navy}}>{id}</span>
                          {pol&&<span style={{fontSize:11,color:C.slate,marginLeft:4}}>{pol.short}</span>}
                        </div>
                      ):null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={reset} style={{
              background:C.navy,color:C.white,borderRadius:8,padding:"10px 20px",fontSize:13,fontWeight:600,
            }}>Start over</button>
            <button onClick={()=>document.getElementById("decl-tab").click()} style={{
              background:C.sienna,color:C.white,borderRadius:8,padding:"10px 20px",fontSize:13,fontWeight:600,
            }}>Generate declaration →</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MODULE 2 — DECLARATION GENERATOR
═══════════════════════════════════════════════════ */
function DeclarationModule(){
  const [form,setForm]=useState({
    name:"",role:"student",work:"",course:"",department:"",
    tool:"ChatGPT",extent:"<20%",purpose:"brainstorming",date:"",
  });
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const today=new Date().toLocaleDateString("en-GB");

  const en=`
AI USE DECLARATION FORM — UTAS Nizwa

I, ${form.name||"[Name]"}, in my capacity as ${form.role==="student"?"a student":"a faculty member"}, hereby declare that I used ${form.tool||"[AI tool]"} for ${form.purpose} in the preparation of "${form.work||"[Work title]"}"${form.course?` for ${form.course}`:""}${form.department?`, ${form.department} Department`:""}. The AI contribution accounted for approximately ${form.extent} of the total work. The intellectual content, original ideas, and arguments are my own. I have reviewed all AI-generated content for accuracy and take full responsibility for this submission.

Signature: _______________   Date: ${form.date||today}
`.trim();

  const ar=`
استمارة إعلان استخدام الذكاء الاصطناعي — UTAS نزوى

أنا، ${form.name||"[الاسم]"}، بصفتي ${form.role==="student"?"طالباً/طالبةً":"عضواً في هيئة التدريس"}، أُقرُّ بأنني استخدمت ${form.tool||"[الأداة]"} لـ ${form.purpose==="brainstorming"?"العصف الذهني":form.purpose==="drafting"?"صياغة النص":form.purpose==="editing"?"التحرير":"الترجمة"} في إعداد "${form.work||"[عنوان العمل]"}"${form.course?` لمقرر ${form.course}`:""}${form.department?`، قسم ${form.department}`:""}. بلغت مساهمة الذكاء الاصطناعي ما يقارب ${form.extent} من إجمالي العمل. المحتوى الفكري والأفكار الأصلية والحجج من عندي. وقد تحققت من دقة المحتوى الذي أنتجه الذكاء الاصطناعي، وأتحمل المسؤولية الكاملة عن هذا الإعمال.

التوقيع: _______________   التاريخ: ${form.date||today}
`.trim();

  const inp=(lbl,k,type="text",opts=null)=>(
    <div style={{marginBottom:14}}>
      <label style={{display:"block",fontSize:12,fontWeight:600,color:C.slate,
        textTransform:"uppercase",letterSpacing:.8,marginBottom:5}}>{lbl}</label>
      {opts
        ? <select value={form[k]} onChange={e=>set(k,e.target.value)} style={{
            width:"100%",padding:"8px 10px",borderRadius:7,
            border:`1.5px solid ${C.line}`,background:C.white,fontSize:14,color:C.navy,
          }}>{opts.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select>
        : <input type={type} value={form[k]} onChange={e=>set(k,e.target.value)}
            style={{width:"100%",padding:"8px 10px",borderRadius:7,
              border:`1.5px solid ${C.line}`,background:C.white,fontSize:14,color:C.navy}}
            placeholder={k==="name"?"Full name":""}/>
      }
    </div>
  );

  return (
    <div className="fade-in">
      <p className="lora" style={{fontSize:22,fontStyle:"italic",marginBottom:4}}>
        AI Use Declaration Generator
      </p>
      <p style={{fontSize:13,color:C.slate,marginBottom:24}}>
        مولّد استمارة إعلان استخدام الذكاء الاصطناعي — generates a bilingual print-ready declaration
      </p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
        {/* Form */}
        <div style={{background:C.white,borderRadius:14,border:`1px solid ${C.line}`,padding:22}}>
          <p style={{fontSize:12,fontWeight:700,color:C.warm,textTransform:"uppercase",
            letterSpacing:1,marginBottom:16}}>Your details</p>
          {inp("Full name","name")}
          {inp("I am a…","role","text",[["student","Student / طالب"],["faculty","Faculty member / عضو هيئة تدريس"]])}
          {inp("Work title","work")}
          {inp("Course / module (optional)","course")}
          {inp("Department","department")}
          {inp("AI tool used","tool","text",[["ChatGPT","ChatGPT"],["Microsoft Copilot","Microsoft Copilot"],["Gemini","Gemini"],["Grammarly","Grammarly"],["Claude","Claude"],["Other","Other"]])}
          {inp("AI was used for…","purpose","text",[
            ["brainstorming","Brainstorming ideas"],
            ["drafting","Drafting text"],
            ["editing","Editing / proofreading"],
            ["translation","Translation"],
            ["analysis","Data or source analysis"],
          ])}
          {inp("Approximate AI contribution","extent","text",[
            ["<20%","Less than 20%"],["20–50%","20 – 50%"],[">50%","More than 50%"],
          ])}
          {inp("Date","date","date")}
        </div>

        {/* Preview */}
        <div>
          <div style={{background:C.cream,borderRadius:14,border:`1px solid ${C.line}`,
            padding:22,marginBottom:14}}>
            <p style={{fontSize:11,fontWeight:700,color:C.sienna,textTransform:"uppercase",
              letterSpacing:1,marginBottom:12}}>English declaration</p>
            <pre style={{fontSize:12.5,lineHeight:1.7,color:C.navy,whiteSpace:"pre-wrap",
              fontFamily:"'DM Sans',sans-serif"}}>{en}</pre>
          </div>
          <div style={{background:C.cream,borderRadius:14,border:`1px solid ${C.line}`,padding:22}}>
            <p style={{fontSize:11,fontWeight:700,color:C.sage,textTransform:"uppercase",
              letterSpacing:1,marginBottom:12}}>إعلان عربي</p>
            <pre dir="rtl" style={{fontSize:12.5,lineHeight:1.9,color:C.navy,whiteSpace:"pre-wrap",
              fontFamily:"'DM Sans',sans-serif",textAlign:"right"}}>{ar}</pre>
          </div>
          <button onClick={()=>navigator.clipboard?.writeText(en+"\n\n---\n\n"+ar)}
            style={{marginTop:12,background:C.navy,color:C.white,borderRadius:8,
              padding:"10px 18px",fontSize:13,fontWeight:600,width:"100%"}}>
            Copy both declarations
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MODULE 3 — COMPLIANCE CHECKER
═══════════════════════════════════════════════════ */
function ComplianceModule(){
  const [status,setStatus]=useState(Object.fromEntries(P.map(p=>[p.id,0])));
  const [filter,setFilter]=useState("all");

  const toggleStatus=(id)=>setStatus(s=>({...s,[id]:(s[id]+1)%3}));

  const t1done = P.filter(p=>p.t===1&&status[p.id]===2).length;
  const t1total = P.filter(p=>p.t===1).length;
  const pct = Math.round((t1done/t1total)*100);

  const STATUS_CFG=[
    {label:"Not started",labelAr:"لم يبدأ",bg:"#F1EEE9",color:C.warm,border:C.line},
    {label:"In progress",labelAr:"قيد التنفيذ",bg:"#FBF5E6",color:"#7A5C1E",border:C.gold},
    {label:"Implemented",labelAr:"مُطبَّق",bg:"#EDF5F0",color:C.sage,border:C.sage},
  ];

  const grouped=useMemo(()=>{
    const g={};
    P.filter(p=>filter==="all"||p.d===filter||String(p.t)===filter)
     .forEach(p=>{(g[p.d]=g[p.d]||[]).push(p);});
    return g;
  },[filter]);

  return (
    <div className="fade-in">
      {/* Score card */}
      <div style={{background:C.navy,borderRadius:16,padding:"24px 28px",marginBottom:28,
        display:"flex",alignItems:"center",gap:28,flexWrap:"wrap"}}>
        <div style={{position:"relative",width:88,height:88,flexShrink:0}}>
          <svg width="88" height="88" viewBox="0 0 88 88">
            <circle cx="44" cy="44" r="38" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="7"/>
            <circle cx="44" cy="44" r="38" fill="none" stroke={C.sienna} strokeWidth="7"
              strokeDasharray={`${pct*2.39} 239`} strokeLinecap="round"
              transform="rotate(-90 44 44)" style={{transition:"stroke-dasharray .6s ease"}}/>
          </svg>
          <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",
            alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:22,fontWeight:700,color:C.white,lineHeight:1}}>{pct}%</span>
          </div>
        </div>
        <div>
          <div className="lora" style={{fontSize:20,color:C.white,fontStyle:"italic",marginBottom:4}}>
            Tier 1 compliance — {t1done} of {t1total} mandatory policies implemented
          </div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.6)"}}>
            نسبة الامتثال للسياسات الإلزامية · Track progress across all 29 policy statements
          </div>
        </div>
        {/* Mini legend */}
        <div style={{marginLeft:"auto",display:"flex",flexDirection:"column",gap:6}}>
          {STATUS_CFG.map((s,i)=>{
            const n=P.filter(p=>status[p.id]===i).length;
            return <div key={i} style={{display:"flex",alignItems:"center",gap:8,fontSize:12}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:s.border}}/>
              <span style={{color:"rgba(255,255,255,.7)"}}>{s.label}: <b style={{color:C.white}}>{n}</b></span>
            </div>;
          })}
        </div>
      </div>

      {/* Filters */}
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {[["all","All policies"],
          ...Object.entries(DOMAINS).map(([k,v])=>[k,`${k}: ${v.name.split("&")[0].trim()}`]),
          ["1","Tier 1"],["2","Tier 2"],["3","Tier 3"],
        ].map(([v,l])=>(
          <button key={v} onClick={()=>setFilter(v)} style={{
            padding:"5px 12px",borderRadius:20,fontSize:12,fontWeight:500,
            background: filter===v ? C.navy : C.white,
            color: filter===v ? C.white : C.slate,
            border:`1.5px solid ${filter===v ? C.navy : C.line}`,
            transition:"all .15s",
          }}>{l}</button>
        ))}
      </div>

      {/* Policy cards by domain */}
      {Object.entries(grouped).map(([domKey,policies])=>{
        const dom=DOMAINS[domKey];
        return (
          <div key={domKey} style={{marginBottom:28}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,
              paddingBottom:8,borderBottom:`2px solid ${dom.col}`}}>
              <span style={{fontSize:20}}>{dom.icon}</span>
              <div>
                <div style={{fontWeight:700,fontSize:16,color:dom.col}}>{domKey} · {dom.name}</div>
                <div style={{fontSize:12,color:C.slate,fontStyle:"italic"}}>{dom.ar}</div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
              {policies.map(p=>{
                const s=status[p.id];
                const sc=STATUS_CFG[s];
                return (
                  <div key={p.id} className="policy-card"
                    style={{borderLeft:`4px solid ${TIER_CFG[p.t].border}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                      <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
                        <span style={{fontWeight:700,fontSize:13,color:C.navy}}>{p.id}</span>
                        <TierBadge tier={p.t}/>
                      </div>
                      <button className="status-btn"
                        onClick={()=>toggleStatus(p.id)}
                        style={{background:sc.bg,color:sc.color,borderColor:sc.border,flexShrink:0}}>
                        {sc.label}
                      </button>
                    </div>
                    <div style={{fontWeight:600,fontSize:13.5,color:C.navy,marginBottom:3}}>{p.short}</div>
                    <div style={{fontSize:11,color:C.slate,fontStyle:"italic",marginBottom:6}}>{p.ar}</div>
                    <div style={{fontSize:12.5,color:C.slate,lineHeight:1.55}}>{p.plain}</div>
                    {p.ex&&<div style={{
                      marginTop:8,padding:"6px 10px",background:C.cream,
                      borderRadius:6,fontSize:11.5,color:C.warm,
                    }}>
                      <b>Example:</b> {p.ex}
                    </div>}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════ */
export default function App(){
  const [tab,setTab]=useState("decision");

  const TABS=[
    {id:"decision",   label:"Can I use AI?",        ar:"هل يُسمح باستخدام الذكاء الاصطناعي؟", icon:"🧭"},
    {id:"declaration",label:"Declaration generator",ar:"مولّد استمارة الإعلان",                icon:"📄"},
    {id:"compliance", label:"Compliance checker",   ar:"مدقّق الامتثال",                       icon:"📊"},
  ];

  return (
    <div style={{background:C.paper,minHeight:"100vh"}}>
      <style>{STYLES}</style>

      {/* ── HEADER ── */}
      <header style={{
        background:C.navy,
        borderBottom:`3px solid ${C.sienna}`,
      }}>
        <div style={{maxWidth:960,margin:"0 auto",padding:"28px 20px 0"}}>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",
            marginBottom:24,flexWrap:"wrap",gap:12}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                <div style={{width:36,height:36,borderRadius:8,background:C.sienna,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:18,flexShrink:0}}>🤖</div>
                <div>
                  <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.5)",
                    textTransform:"uppercase",letterSpacing:2}}>UTAS Nizwa</div>
                </div>
              </div>
              <h1 className="lora" style={{
                fontSize:26,color:C.white,fontStyle:"italic",lineHeight:1.15,marginBottom:4
              }}>
                GenAI Policy Navigator
              </h1>
              <p style={{fontSize:13,color:"rgba(255,255,255,.55)",fontStyle:"italic"}}>
                دليل سياسة الذكاء الاصطناعي التوليدي — مبني على 29 توصية من دراسة دلفاي 2025
              </p>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:10,color:"rgba(255,255,255,.4)",marginBottom:2}}>Research-backed</div>
              <div style={{
                background:"rgba(255,255,255,.08)",borderRadius:8,padding:"6px 12px",
                fontSize:13,color:C.gold,fontWeight:600,border:`1px solid rgba(201,168,118,.25)`,
              }}>
                29 policies · 6 domains · Delphi 2025
              </div>
            </div>
          </div>

          {/* Tab nav */}
          <div style={{display:"flex",gap:0,borderTop:`1px solid rgba(255,255,255,.1)`}}>
            {TABS.map(t=>(
              <button key={t.id} id={t.id+"-tab"}
                onClick={()=>setTab(t.id)}
                style={{
                  flex:1,padding:"12px 8px",background:"none",
                  borderBottom: tab===t.id ? `3px solid ${C.sienna}` : "3px solid transparent",
                  color: tab===t.id ? C.white : "rgba(255,255,255,.5)",
                  fontSize:13,fontWeight: tab===t.id ? 600 : 400,
                  transition:"all .2s",
                }}>
                <span style={{marginRight:6}}>{t.icon}</span>
                <span style={{display:"none @media (max-width:500px)"}}>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <main style={{maxWidth:960,margin:"0 auto",padding:"32px 20px 60px"}}>

        {/* Context banner per tab */}
        {tab==="decision"&&(
          <div style={{background:C.cream,borderRadius:10,padding:"12px 16px",marginBottom:24,
            borderLeft:`3px solid ${C.sienna}`,}}>
            <p style={{fontSize:13,color:C.slate}}>
              Answer three quick questions to receive tailored AI-use guidance based on the UTAS academic integrity policy.
              <span style={{fontStyle:"italic",marginLeft:8,color:C.warm}}>
                أجب عن ثلاثة أسئلة للحصول على إرشادات مخصصة
              </span>
            </p>
          </div>
        )}
        {tab==="declaration"&&(
          <div style={{background:C.cream,borderRadius:10,padding:"12px 16px",marginBottom:24,
            borderLeft:`3px solid ${C.sage}`,}}>
            <p style={{fontSize:13,color:C.slate}}>
              Fill in the form to generate a bilingual (English + Arabic) AI use declaration ready for submission.
              <span style={{fontStyle:"italic",marginLeft:8,color:C.warm}}>
                أنشئ استمارة إعلان استخدام الذكاء الاصطناعي ثنائية اللغة
              </span>
            </p>
          </div>
        )}
        {tab==="compliance"&&(
          <div style={{background:C.cream,borderRadius:10,padding:"12px 16px",marginBottom:24,
            borderLeft:`3px solid ${C.navy}`,}}>
            <p style={{fontSize:13,color:C.slate}}>
              Track your department's implementation progress. Click each policy card to cycle through status: Not started → In progress → Implemented.
              <span style={{fontStyle:"italic",marginLeft:8,color:C.warm}}>
                تتبّع تقدم التطبيق لكل سياسة — انقر للتحديث
              </span>
            </p>
          </div>
        )}

        {tab==="decision"&&<DecisionModule/>}
        {tab==="declaration"&&<DeclarationModule/>}
        {tab==="compliance"&&<ComplianceModule/>}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{borderTop:`1px solid ${C.line}`,padding:"16px 20px",textAlign:"center"}}>
        <p style={{fontSize:11,color:C.warm}}>
          UTAS Nizwa GenAI Policy Navigator · Built on expert consensus from a Delphi study (2025) ·
          Research by Sheikha Sulaiman Al-Hinai, M.Ed. Digital Transformation and Innovation ·
          Supervisor: Dr Rolando Lontok Jr.
        </p>
      </footer>
    </div>
  );
}
