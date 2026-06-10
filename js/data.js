/* ═══════════════════════════════════════════════════════════════════
   UTAS GenAI Policy Navigator — DATA LAYER
   Brand palette extracted from official UTAS logo.
   29 policy statements · Delphi Study 2026
═══════════════════════════════════════════════════════════════════ */
(function () {
  /* ── BRAND PALETTE (from logo) ───────────────────────────── */
  const C = {
    navy:   "#243090",  // deep indigo  (logo dark blue)
    indigo: "#1B2068",  // darkest
    royal:  "#3C54A8",  // royal blue   (logo light blue)
    blue:   "#4E66C2",
    sky:    "#7C8FD8",
    orange: "#FC8424",  // signature orange
    rust:   "#E46C24",  // burnt orange
    amber:  "#F6A623",
    // warm neutrals
    paper:  "#FAF7F1",
    cream:  "#F1ECE1",
    sand:   "#E9E2D3",
    line:   "#E0D8C8",
    ink:    "#20233A",
    slate:  "#5B6276",
    warm:   "#8C8678",
    white:  "#FFFFFF",
  };

  const TIER = {
    1: { en:"Mandatory",   ar:"إلزامي",   bg:"#ECEFFA", soft:"#E3E8F8", border:C.navy,  text:C.navy,  dot:C.royal },
    2: { en:"Recommended", ar:"موصى به",  bg:"#FFF1E0", soft:"#FFE8CE", border:C.orange, text:"#B45A12", dot:C.orange },
    3: { en:"Advisory",    ar:"استشاري",  bg:"#FBEBE3", soft:"#F7DECF", border:C.rust,  text:C.rust,  dot:C.rust },
  };

  const DOMAINS = {
    D1: { en:"Transparency & Disclosure",   ar:"الشفافية والإفصاح",        col:C.navy,   glyph:"disclosure" },
    D2: { en:"Authorship & Accountability", ar:"التأليف والمساءلة",        col:C.royal,  glyph:"author" },
    D3: { en:"Quality Assurance & Safety",  ar:"ضمان الجودة والسلامة",      col:C.blue,   glyph:"shield" },
    D4: { en:"Data Privacy & Security",     ar:"خصوصية البيانات وأمنها",    col:C.rust,   glyph:"lock" },
    D5: { en:"AI Literacy & Training",      ar:"الثقافة والتدريب",          col:C.orange, glyph:"book" },
    D6: { en:"Omani Context & Vision 2040", ar:"السياق العُماني ورؤية 2040", col:C.amber,  glyph:"crescent" },
  };

  /* ── 29 POLICY STATEMENTS (bilingual, plain-language) ─────── */
  const P = [
    { id:"S1", d:"D1", t:1, short:"Faculty disclose AI use", ar:"إفصاح هيئة التدريس عن استخدام الذكاء الاصطناعي",
      plain:"Every faculty member must explicitly state when AI tools helped create their teaching materials, research, or communications.",
      plainAr:"على كل عضو هيئة تدريس أن يُصرّح بوضوح متى ساعدت أدوات الذكاء الاصطناعي في إعداد المواد التعليمية أو الأبحاث أو المراسلات.",
      ex:"Say 'ChatGPT assisted with these lecture notes' at the start of class.",
      exAr:"قل: «استعنتُ بـ ChatGPT في إعداد هذه الملاحظات» في بداية المحاضرة." },
    { id:"S2", d:"D1", t:1, short:"Students declare AI assistance", ar:"إعلان الطلاب عن المساعدة بالذكاء الاصطناعي",
      plain:"Students must inform faculty whenever AI contributed to submitted work — regardless of how small the contribution.",
      plainAr:"على الطلاب إبلاغ هيئة التدريس عند مساهمة الذكاء الاصطناعي في أي عمل مُقدَّم — مهما كانت المساهمة بسيطة.",
      ex:"Even using AI only to check grammar still requires a declaration.",
      exAr:"حتى استخدامه لمراجعة القواعد فقط يستلزم إعلاناً." },
    { id:"S3", d:"D1", t:1, short:"Define disclosure thresholds", ar:"تحديد معايير الإفصاح بوضوح",
      plain:"UTAS policy must state precisely what counts as sufficient disclosure so no one is left guessing.",
      plainAr:"على سياسة الجامعة أن تحدّد بدقة ما يُعدّ إفصاحاً كافياً حتى لا يبقى أحد في حيرة.",
      ex:"Define 'AI tools' to include ChatGPT, Grammarly, Copilot, and equivalents.",
      exAr:"تعريف «أدوات الذكاء الاصطناعي» ليشمل ChatGPT وGrammarly وCopilot وما يماثلها." },
    { id:"S4", d:"D1", t:1, short:"Standardised disclosure templates", ar:"نماذج إفصاح موحّدة لجميع الأقسام",
      plain:"All UTAS departments use the same AI disclosure form to ensure consistent expectations institution-wide.",
      plainAr:"تستخدم جميع الأقسام نموذج إفصاح موحّداً لضمان اتساق التوقعات على مستوى المؤسسة.",
      ex:"One universal template eliminates confusion between different faculties.",
      exAr:"نموذج موحّد واحد يلغي الالتباس بين الكليات المختلفة." },
    { id:"S5", d:"D1", t:1, short:"Specify AI contribution extent", ar:"تحديد نطاق مساهمة الذكاء الاصطناعي",
      plain:"Declarations must state not just that AI was used, but what it did and approximately how much it contributed.",
      plainAr:"على الإعلان أن يبيّن ليس فقط استخدام الذكاء الاصطناعي، بل ما الذي فعله وكم بلغت مساهمته تقريباً.",
      ex:"'I used ChatGPT for brainstorming the introduction — roughly 20% of ideas.'",
      exAr:"«استخدمتُ ChatGPT للعصف الذهني في المقدمة — نحو ٢٠٪ من الأفكار.»" },

    { id:"S6", d:"D2", t:1, short:"Human authors bear full responsibility", ar:"المؤلف البشري يتحمّل المسؤولية الكاملة",
      plain:"Using AI does not reduce your accountability. You are responsible for every statement — AI errors are your errors.",
      plainAr:"استخدام الذكاء الاصطناعي لا يقلّل مسؤوليتك. أنت مسؤول عن كل عبارة — وأخطاؤه أخطاؤك.",
      ex:"A hallucinated citation submitted without verification is your academic responsibility.",
      exAr:"الاستشهاد المُختلَق الذي يُقدَّم دون تحقّق يقع على مسؤوليتك الأكاديمية." },
    { id:"S7", d:"D2", t:2, short:"AI cannot be listed as co-author", ar:"لا يُدرَج الذكاء الاصطناعي كمؤلف مشارك",
      plain:"Only humans who hold intellectual and ethical responsibility may hold authorship. Acknowledge AI in your methods section.",
      plainAr:"التأليف حقٌّ للبشر الذين يتحمّلون المسؤولية الفكرية والأخلاقية فقط. أشِر إلى الذكاء الاصطناعي في قسم المنهجية.",
      ex:"Write 'We used GPT-4 for data summarisation' in methods — not in the author list.",
      exAr:"اكتب «استخدمنا GPT-4 لتلخيص البيانات» في المنهجية — لا في قائمة المؤلفين." },
    { id:"S8", d:"D2", t:1, short:"Faculty verify AI content accuracy", ar:"التحقّق من دقة محتوى الذكاء الاصطناعي",
      plain:"Faculty using AI must personally verify that all AI-generated content is factually accurate before sharing it.",
      plainAr:"على هيئة التدريس التحقّق شخصياً من دقة كل محتوى يُنتجه الذكاء الاصطناعي قبل مشاركته.",
      ex:"Check every AI-generated reference — 'hallucinated' citations are a documented risk.",
      exAr:"تحقّق من كل مرجع يولّده الذكاء الاصطناعي — فالاستشهادات المُختلَقة خطرٌ موثَّق." },
    { id:"S9", d:"D2", t:1, short:"Students responsible for AI-assisted work", ar:"مسؤولية الطلاب عن أعمالهم المعتمدة على الذكاء الاصطناعي",
      plain:"Students must understand and defend any AI-assisted submission. 'The AI wrote it' is not an acceptable explanation.",
      plainAr:"على الطلاب فهم أي عمل مُستعان فيه بالذكاء الاصطناعي والدفاع عنه. «الذكاء الاصطناعي كتبه» تبريرٌ غير مقبول.",
      ex:"Be prepared to discuss your AI-assisted work in class or viva at any time.",
      exAr:"كن مستعداً لمناقشة عملك في الصف أو المناقشة في أي وقت." },

    { id:"S10", d:"D3", t:2, short:"Define AI boundaries per assessment", ar:"تحديد حدود الذكاء الاصطناعي لكل تقييم",
      plain:"Each assessment must specify clearly whether AI is permitted, in what capacity, and to what extent.",
      plainAr:"على كل تقييم أن يحدّد بوضوح ما إذا كان الذكاء الاصطناعي مسموحاً، وبأي صفة، وإلى أي مدى.",
      ex:"Exams: no AI. Reflective essays: no AI. Research reports: brainstorming only.",
      exAr:"الاختبارات: ممنوع. المقالات التأمّلية: ممنوع. التقارير البحثية: عصف ذهني فقط." },
    { id:"S11", d:"D3", t:2, short:"AI detection: supplementary evidence only", ar:"أدوات الكشف: دليل مساعد فقط",
      plain:"AI detection tools can flag concerns but cannot be the sole evidence for any misconduct decision.",
      plainAr:"يمكن لأدوات الكشف أن تُنبّه إلى مخاوف، لكنها لا تكون الدليل الوحيد في أي قرار يتعلّق بسوء السلوك.",
      ex:"A 70% AI score triggers an investigation — it does not equal a verdict of misconduct.",
      exAr:"نسبة ٧٠٪ تستدعي التحقيق — لكنها لا تعني حُكماً بسوء السلوك." },
    { id:"S12", d:"D3", t:1, short:"Periodic AI policy audit", ar:"مراجعة دورية لتطبيق السياسة",
      plain:"UTAS must regularly audit whether AI policies are being consistently followed across all departments.",
      plainAr:"على الجامعة إجراء مراجعات دورية للتأكّد من اتّباع سياسات الذكاء الاصطناعي عبر جميع الأقسام.",
      ex:"Annual QA review includes an AI-integrity compliance report per department.",
      exAr:"تتضمّن مراجعة الجودة السنوية تقرير امتثال لنزاهة الذكاء الاصطناعي لكل قسم." },
    { id:"S13", d:"D3", t:2, short:"Train faculty to identify AI content", ar:"تدريب هيئة التدريس على تمييز محتوى الذكاء الاصطناعي",
      plain:"Faculty should receive practical training on recognising patterns and signals of AI-generated academic work.",
      plainAr:"ينبغي تدريب هيئة التدريس عملياً على تمييز أنماط وإشارات الأعمال التي يولّدها الذكاء الاصطناعي.",
      ex:"Workshops with side-by-side comparisons of AI-generated vs human writing.",
      exAr:"ورش عمل تقارن بين الكتابة البشرية وما يولّده الذكاء الاصطناعي جنباً إلى جنب." },
    { id:"S14", d:"D3", t:3, short:"Discipline-specific AI restrictions", ar:"قيود خاصة بكل تخصّص",
      plain:"Some programmes — clinical, legal, creative — may need stricter AI rules than the general policy, set at department level.",
      plainAr:"قد تحتاج بعض البرامج — الطبية والقانونية والإبداعية — قواعد أكثر صرامة من السياسة العامة، تُحدَّد على مستوى القسم.",
      ex:"Nursing assessments may prohibit AI-assisted care plan writing entirely.",
      exAr:"قد تمنع تقييمات التمريض كتابة خطط الرعاية بمساعدة الذكاء الاصطناعي كلياً." },
    { id:"S15", d:"D3", t:1, short:"Embed AI integrity into QA frameworks", ar:"دمج نزاهة الذكاء الاصطناعي في إطار الجودة",
      plain:"AI integrity requirements must be formally built into UTAS programme review, accreditation, and quality assurance.",
      plainAr:"يجب دمج متطلبات نزاهة الذكاء الاصطناعي رسمياً في مراجعة البرامج والاعتماد وضمان الجودة.",
      ex:"Programme review checklist includes: 'Is the AI-integrity policy current and accessible?'",
      exAr:"تتضمّن قائمة مراجعة البرنامج: «هل سياسة نزاهة الذكاء الاصطناعي محدّثة ومتاحة؟»" },

    { id:"S16", d:"D4", t:1, short:"No personal data in public AI tools", ar:"حظر البيانات الشخصية في أدوات الذكاء الاصطناعي العامة",
      plain:"It is strictly prohibited to upload any student's name, ID, grades, or personal information into public AI tools.",
      plainAr:"يُمنع منعاً باتاً تحميل اسم أي طالب أو رقمه أو درجاته أو بياناته الشخصية إلى أدوات الذكاء الاصطناعي العامة.",
      ex:"Never paste a student's named assignment into ChatGPT for marking help.",
      exAr:"لا تُدخِل أبداً واجب طالبٍ يحمل اسمه إلى ChatGPT للمساعدة في التصحيح." },
    { id:"S17", d:"D4", t:2, short:"Anonymise data before AI processing", ar:"إخفاء هوية البيانات قبل المعالجة",
      plain:"If data must be processed by AI, all personally identifying information must be removed or replaced first.",
      plainAr:"إذا لزِم معالجة البيانات بالذكاء الاصطناعي، فيجب إزالة أو استبدال كل المعلومات المعرِّفة أولاً.",
      ex:"Replace 'Student: Fatma Al-Said, ID 12345' with 'Student A' before processing.",
      exAr:"استبدل «الطالبة: فاطمة السعدي، الرقم ١٢٣٤٥» بـ «الطالب أ» قبل المعالجة." },
    { id:"S18", d:"D4", t:1, short:"Comply with Omani Data Protection Law", ar:"الامتثال لقانون حماية البيانات العُماني",
      plain:"All AI tool use at UTAS must comply with Royal Decree 6/2022 — Oman's Personal Data Protection Law.",
      plainAr:"على كل استخدام لأدوات الذكاء الاصطناعي في الجامعة الامتثال للمرسوم السلطاني ٦/٢٠٢٢ — قانون حماية البيانات الشخصية.",
      ex:"Verify AI vendors meet Omani data sovereignty requirements before adoption.",
      exAr:"تأكّد من استيفاء موردي الذكاء الاصطناعي لمتطلبات سيادة البيانات العُمانية قبل اعتمادهم." },
    { id:"S19", d:"D4", t:1, short:"Institutional licences for approved tools", ar:"تراخيص مؤسسية للأدوات المعتمدة",
      plain:"UTAS should provide licensed institutional AI tools so staff and students are not forced to use unvetted public tools.",
      plainAr:"على الجامعة توفير أدوات ذكاء اصطناعي مرخّصة مؤسسياً حتى لا يُضطر الموظفون والطلاب لاستخدام أدوات عامة غير مدقّقة.",
      ex:"A Microsoft Copilot institutional licence with a UTAS data-handling agreement.",
      exAr:"ترخيص مؤسسي لـ Microsoft Copilot مع اتفاقية معالجة بيانات خاصة بالجامعة." },

    { id:"S20", d:"D5", t:1, short:"Mandatory faculty AI literacy module", ar:"وحدة إلزامية لثقافة الذكاء الاصطناعي لهيئة التدريس",
      plain:"Every faculty member must complete a foundational AI literacy module covering capabilities, limitations, and responsible use.",
      plainAr:"على كل عضو هيئة تدريس إكمال وحدة تأسيسية في ثقافة الذكاء الاصطناعي تشمل القدرات والحدود والاستخدام المسؤول.",
      ex:"A 3-hour self-paced module completed before the start of each academic year.",
      exAr:"وحدة ذاتية مدّتها ٣ ساعات تُكمَل قبل بداية كل عام دراسي." },
    { id:"S21", d:"D5", t:1, short:"Student AI orientation at programme entry", ar:"توجيه الطلاب الجدد حول الاستخدام المسؤول",
      plain:"Every new student must receive structured AI orientation — covering policy and responsible use — as part of induction.",
      plainAr:"على كل طالب جديد تلقّي توجيه منظَّم حول الذكاء الاصطناعي — يشمل السياسة والاستخدام المسؤول — ضمن البرنامج التعريفي.",
      ex:"First-week 'AI in your studies' session with the declaration process walk-through.",
      exAr:"جلسة في الأسبوع الأول بعنوان «الذكاء الاصطناعي في دراستك» مع شرح آلية الإعلان." },
    { id:"S22", d:"D5", t:1, short:"Library AI literacy resources", ar:"موارد ثقافة الذكاء الاصطناعي عبر المكتبة",
      plain:"UTAS Library and academic support teams develop and maintain accessible, current resources for navigating AI responsibly.",
      plainAr:"تطوّر المكتبة وفِرَق الدعم الأكاديمي موارد متاحة ومحدّثة تساعد الجميع على استخدام الذكاء الاصطناعي بمسؤولية.",
      ex:"An 'AI & Academic Integrity' guide on the library website, updated each semester.",
      exAr:"دليل «الذكاء الاصطناعي والنزاهة الأكاديمية» على موقع المكتبة، يُحدَّث كل فصل." },
    { id:"S23", d:"D5", t:3, short:"Annual faculty training hours", ar:"ساعات التدريب السنوية لهيئة التدريس",
      plain:"A specific annual training-hour requirement was discussed but remains advisory — the right amount varies by role.",
      plainAr:"نوقش اشتراط عدد ساعات تدريب سنوية محدّد لكنه يبقى استشارياً — إذ يختلف القدر المناسب باختلاف الدور.",
      ex:"Recommended: at least 4 hours of AI-related professional development per year.",
      exAr:"يُوصى بما لا يقل عن ٤ ساعات من التطوير المهني المتعلّق بالذكاء الاصطناعي سنوياً." },
    { id:"S24", d:"D5", t:1, short:"AI ethics embedded in curriculum", ar:"دمج أخلاقيات الذكاء الاصطناعي في المناهج",
      plain:"AI ethics and responsible use must be woven into courses across all programmes — not a standalone topic only.",
      plainAr:"يجب دمج أخلاقيات الذكاء الاصطناعي واستخدامه المسؤول في المقررات عبر كل البرامج — لا أن يكون موضوعاً منفصلاً فحسب.",
      ex:"Business Ethics includes an AI bias module. Computer Science includes AI governance.",
      exAr:"تتضمّن أخلاقيات الأعمال وحدة عن تحيّز الذكاء الاصطناعي، وعلوم الحاسب وحدة عن حوكمته." },
    { id:"S25", d:"D5", t:1, short:"Train-the-trainer for coordinators", ar:"تدريب المدرّبين لمنسّقي الأقسام",
      plain:"Department coordinators should be trained as AI literacy champions, creating a knowledge multiplier across units.",
      plainAr:"ينبغي تدريب منسّقي الأقسام ليكونوا روّاداً في ثقافة الذكاء الاصطناعي، مما يضاعف المعرفة عبر الوحدات.",
      ex:"Coordinators complete an advanced programme and receive facilitation resources.",
      exAr:"يُكمل المنسّقون برنامجاً متقدّماً ويحصلون على موارد لتيسير التدريب." },

    { id:"S26", d:"D6", t:1, short:"Align with Oman Vision 2040", ar:"التوافق مع رؤية عُمان 2040",
      plain:"UTAS AI policies must connect explicitly to Vision 2040's goals for a knowledge economy and digital transformation.",
      plainAr:"يجب أن تتّصل سياسات الذكاء الاصطناعي صراحةً بأهداف رؤية 2040 في الاقتصاد المعرفي والتحوّل الرقمي.",
      ex:"Policy preamble references Vision 2040 and positions UTAS as a responsible-AI leader.",
      exAr:"تشير ديباجة السياسة إلى رؤية 2040 وتجعل الجامعة رائدةً في الاستخدام المسؤول." },
    { id:"S27", d:"D6", t:1, short:"Coordinate across all UTAS branches", ar:"التنسيق بين فروع الجامعة",
      plain:"All UTAS campuses must follow the same core AI policy so the student experience is consistent across branches.",
      plainAr:"على كل فروع الجامعة اتّباع سياسة أساسية واحدة لضمان اتساق تجربة الطالب في كل الفروع.",
      ex:"A single institutional policy with branch-level implementation plans.",
      exAr:"سياسة مؤسسية واحدة مع خطط تطبيق على مستوى كل فرع." },
    { id:"S28", d:"D6", t:1, short:"Bilingual policy: Arabic & English", ar:"سياسة ثنائية اللغة: العربية والإنجليزية",
      plain:"The full policy, all forms, guidance, and training must be available in both Arabic and English — no language barrier.",
      plainAr:"يجب أن تتوفّر السياسة الكاملة وكل النماذج والإرشاد والتدريب بالعربية والإنجليزية — دون أي حاجز لغوي.",
      ex:"Every form in the Navigator is available in Arabic and English simultaneously.",
      exAr:"كل نموذج في هذا المرشد متاح بالعربية والإنجليزية في آنٍ واحد." },
    { id:"S29", d:"D6", t:1, short:"Cultural & Islamic ethical grounding", ar:"الأسس الثقافية والأخلاقية الإسلامية",
      plain:"UTAS AI policies must be grounded in Omani cultural values and Islamic ethical principles.",
      plainAr:"يجب أن ترتكز سياسات الذكاء الاصطناعي على القيم الثقافية العُمانية والمبادئ الأخلاقية الإسلامية.",
      ex:"Policy includes a statement on amanah (trustworthiness) as the foundation of integrity.",
      exAr:"تتضمّن السياسة بياناً عن «الأمانة» بوصفها أساس النزاهة الأكاديمية." },
  ];

  /* ── DECISION TREE INPUTS ─────────────────────────────────── */
  const ROLES = [
    { v:"student",    en:"Student",       ar:"طالب / طالبة",    glyph:"student" },
    { v:"faculty",    en:"Faculty",       ar:"عضو هيئة تدريس",  glyph:"faculty" },
    { v:"researcher", en:"Researcher",    ar:"باحث / باحثة",    glyph:"research" },
    { v:"admin",      en:"Administrator", ar:"موظف إداري",      glyph:"admin" },
  ];
  const CONTEXTS = {
    student: [
      { v:"graded",   en:"Graded assignment",        ar:"واجب أو اختبار مُقيَّم" },
      { v:"thesis",   en:"Thesis or dissertation",   ar:"رسالة علمية" },
      { v:"personal", en:"Personal / non-assessed",  ar:"دراسة غير مُقيَّمة" },
      { v:"group",    en:"Group project",            ar:"مشروع جماعي" },
    ],
    faculty: [
      { v:"teaching", en:"Teaching materials",        ar:"مواد تعليمية" },
      { v:"research", en:"Research or publication",   ar:"بحث أو نشر أكاديمي" },
      { v:"marking",  en:"Student assessment",        ar:"تقييم أعمال الطلاب" },
      { v:"comms",    en:"Administrative comms",      ar:"مراسلات إدارية" },
    ],
    researcher: [
      { v:"data",       en:"Data collection / analysis", ar:"جمع البيانات أو تحليلها" },
      { v:"writing",    en:"Writing a paper or report",  ar:"كتابة ورقة بحثية أو تقرير" },
      { v:"literature", en:"Literature review",          ar:"مراجعة الأدبيات" },
    ],
    admin: [
      { v:"documents", en:"Official documents",       ar:"وثائق رسمية" },
      { v:"internal",  en:"Internal communications",  ar:"مراسلات داخلية" },
    ],
  };
  const AI_USES = [
    { v:"none",        en:"I did not use AI",            ar:"لم أستخدم الذكاء الاصطناعي" },
    { v:"brainstorm",  en:"Brainstorming ideas only",    ar:"العصف الذهني للأفكار فقط" },
    { v:"drafting",    en:"Generating or drafting text", ar:"توليد أو كتابة نص" },
    { v:"editing",     en:"Editing or improving writing",ar:"تحرير أو تحسين الكتابة" },
    { v:"translation", en:"Translating content",         ar:"ترجمة المحتوى" },
    { v:"analysis",    en:"Analysing data or sources",   ar:"تحليل البيانات أو المصادر" },
  ];

  function getVerdict(role, context, aiUse) {
    if (aiUse === "none") return {
      type:"clear", icon:"check",
      title:"No AI used — no declaration required",
      titleAr:"لم يُستخدَم الذكاء الاصطناعي — لا يلزم إعلان",
      color:"#2E7D5B", tone:"green",
      actions:[
        { en:"No AI declaration is required.", ar:"لا يلزم تقديم إعلان." },
        { en:"You may note 'No AI tools used' on your submission for your records.", ar:"يمكنك تدوين «لم تُستخدَم أدوات ذكاء اصطناعي» في عملك لسجلّك الخاص." },
      ],
      policies:[],
    };
    if (role==="student" && context==="marking") role="faculty";
    if (role==="faculty" && context==="marking") return {
      type:"caution", icon:"alert",
      title:"Proceed with caution — data rules apply",
      titleAr:"توخَّ الحذر — تسري قواعد البيانات",
      color:C.rust, tone:"rust",
      actions:[
        { en:"Never upload identifiable student data into public AI tools.", ar:"لا تُحمّل أبداً بيانات طلاب معرِّفة إلى أدوات الذكاء الاصطناعي العامة.", ref:"S16" },
        { en:"Anonymise all student work before any AI processing.", ar:"أخفِ هوية كل أعمال الطلاب قبل أي معالجة بالذكاء الاصطناعي.", ref:"S17" },
        { en:"AI detection results cannot be the sole evidence for misconduct.", ar:"نتائج أدوات الكشف لا تكون الدليل الوحيد على سوء السلوك.", ref:"S11" },
        { en:"Your professional judgement must remain the primary assessment tool.", ar:"يبقى حُكمك المهني الأداة الأساسية في التقييم." },
      ],
      policies:["S11","S16","S17","S18"],
    };
    if (role==="researcher") return {
      type:"conditional", icon:"check",
      title:"Permitted — disclosure & data rules apply",
      titleAr:"مسموح — مع الامتثال لقواعد الإفصاح والبيانات",
      color:C.orange, tone:"amber",
      actions:[
        { en:"Disclose AI use in the Methods section of your research.", ar:"أفصِح عن استخدام الذكاء الاصطناعي في قسم المنهجية.", ref:"S1" },
        { en:"Do not list AI as a co-author — acknowledge it in methods only.", ar:"لا تُدرِج الذكاء الاصطناعي كمؤلف — أشِر إليه في المنهجية فقط.", ref:"S7" },
        { en:"Remove all personal or identifiable data before processing.", ar:"احذف كل البيانات الشخصية أو المعرِّفة قبل المعالجة.", ref:"S16" },
        { en:"Verify AI outputs for accuracy — you are responsible for all content.", ar:"تحقّق من دقة المخرجات — أنت مسؤول عن كل المحتوى.", ref:"S6" },
        { en:"Ensure tools used comply with Omani data protection law.", ar:"تأكّد من امتثال الأدوات لقانون حماية البيانات العُماني.", ref:"S18" },
      ],
      policies:["S1","S6","S7","S8","S16","S17","S18"],
    };
    if (aiUse==="brainstorm") return {
      type:"conditional", icon:"check",
      title:"Permitted — declaration required",
      titleAr:"مسموح — مع إعلان مطلوب",
      color:C.orange, tone:"amber",
      actions:[
        { en:"Submit the UTAS AI Declaration Form with your work.", ar:"قدِّم نموذج إعلان الذكاء الاصطناعي مع عملك.", ref:"S2" },
        { en:"State that AI was used for brainstorming purposes only.", ar:"وضّح أن الذكاء الاصطناعي استُخدم للعصف الذهني فقط.", ref:"S5" },
        { en:"Final ideas, arguments, and writing must be entirely your own.", ar:"يجب أن تكون الأفكار والحجج والكتابة النهائية من عندك بالكامل.", ref:"S9" },
      ],
      policies:["S2","S4","S5","S9"],
    };
    if (aiUse==="drafting") return {
      type:"conditional", icon:"alert",
      title:"Permitted — full declaration required",
      titleAr:"مسموح — مع إعلان كامل إلزامي",
      color:C.rust, tone:"rust",
      actions:[
        { en:"Confirm your faculty permits AI drafting for this assessment type.", ar:"تأكّد أن قسمك يسمح بالصياغة بالذكاء الاصطناعي لهذا النوع من التقييم.", ref:"S10" },
        { en:"Submit the UTAS AI Declaration Form with your assignment.", ar:"قدِّم نموذج الإعلان مع واجبك.", ref:"S2" },
        { en:"State which tool you used and approximately what % it generated.", ar:"بيّن الأداة المستخدمة والنسبة التقريبية التي ولّدتها.", ref:"S5" },
        { en:"Confirm you have reviewed and understood all AI-generated content.", ar:"أكّد أنك راجعت وفهمت كل المحتوى المولَّد.", ref:"S9" },
        { en:"You remain fully responsible for every statement in the work.", ar:"تبقى مسؤولاً بالكامل عن كل عبارة في العمل.", ref:"S6" },
      ],
      policies:["S2","S4","S5","S6","S9","S10"],
    };
    if (aiUse==="editing") return {
      type:"conditional", icon:"check",
      title:"Permitted — declaration required",
      titleAr:"مسموح — مع إعلان",
      color:C.orange, tone:"amber",
      actions:[
        { en:"Submit the UTAS AI Declaration Form.", ar:"قدِّم نموذج إعلان الذكاء الاصطناعي.", ref:"S2" },
        { en:"Note that AI was used for editing or proofreading only.", ar:"دوّن أن الذكاء الاصطناعي استُخدم للتحرير أو التدقيق فقط.", ref:"S5" },
        { en:"Original ideas and arguments must be entirely yours.", ar:"يجب أن تكون الأفكار والحجج الأصلية من عندك بالكامل.", ref:"S9" },
      ],
      policies:["S2","S4","S5","S9"],
    };
    return {
      type:"conditional", icon:"check",
      title:"Permitted — declaration & compliance required",
      titleAr:"مسموح — مع الإعلان والامتثال للسياسة",
      color:C.orange, tone:"amber",
      actions:[
        { en:"Disclose your AI use clearly in the relevant context.", ar:"أفصِح عن استخدامك للذكاء الاصطناعي بوضوح في سياقه.", ref:"S1" },
        { en:"Ensure no personal or sensitive data is included.", ar:"تأكّد من عدم تضمين أي بيانات شخصية أو حسّاسة.", ref:"S16" },
        { en:"You remain fully responsible for all content produced.", ar:"تبقى مسؤولاً بالكامل عن كل ما يُنتَج من محتوى.", ref:"S6" },
      ],
      policies:["S1","S2","S5","S6"],
    };
  }

  /* ── UI DICTIONARY (chrome) ───────────────────────────────── */
  const T = {
    brand:        { en:"AI Integrity OS", ar:"نظام نزاهة الذكاء الاصطناعي" },
    institution:  { en:"University of Technology and Applied Sciences — Nizwa", ar:"جامعة التقنية والعلوم التطبيقية — نزوى" },
    tagline:      { en:"Turning 29 expert-consensus recommendations into everyday guidance", ar:"نحوّل ٢٩ توصية توافقية إلى إرشاد عملي يومي" },
    nav_home:     { en:"Home",        ar:"الرئيسية" },
    nav_command:  { en:"Command Center", ar:"مركز القيادة" },
    nav_decision: { en:"Can I use AI?", ar:"هل أستطيع؟" },
    nav_decl:     { en:"Declaration",  ar:"مولّد الإعلان" },
    nav_comp:     { en:"Compliance",   ar:"مدقّق الامتثال" },
    nav_lib:      { en:"Policy Library", ar:"مكتبة السياسات" },
    nav_assistant:{ en:"AI Assistant", ar:"المساعد الذكي" },
    nav_portal:   { en:"Student Portal", ar:"بوابة الطالب" },
    cta_start:    { en:"Check my situation", ar:"افحص حالتي" },
    cta_explore:  { en:"Explore the policies", ar:"استكشف السياسات" },
    stat_policies:{ en:"Policy statements", ar:"بند سياسة" },
    stat_domains: { en:"Policy domains", ar:"مجالات" },
    stat_tiers:   { en:"Priority tiers", ar:"مستويات أولوية" },
    stat_langs:   { en:"Languages", ar:"لغتان" },
    back:         { en:"Back", ar:"رجوع" },
    restart:      { en:"Start over", ar:"ابدأ من جديد" },
  };

  window.NAV = { C, TIER, DOMAINS, P, ROLES, CONTEXTS, AI_USES, getVerdict, T };
})();
