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

  /* ── 29 POLICY STATEMENTS (bilingual, plain-language) ───────
     Verbatim basis: Round 2 Delphi instrument · Tiers per
     Round2_Complete_Analysis_CORRECTED.xlsx (Tier2: S7,S11,S17 · Tier3: S14,S23) */
  const P = [
    { id:"S1", d:"D1", t:1, short:"AI Declaration in summative work", ar:"إعلان الذكاء الاصطناعي في التقييمات الختامية",
      plain:"Students must include a formal AI Declaration Statement in every summative assessment where generative AI tools were used.",
      plainAr:"يجب على الطلاب تضمين إعلان رسمي عن استخدام الذكاء الاصطناعي في كل تقييم ختامي استُخدمت فيه أدوات الذكاء الاصطناعي التوليدي.",
      ex:"'I declare that ChatGPT was used for brainstorming in this assignment.'",
      exAr:"«أُقرّ بأن ChatGPT استُخدم للعصف الذهني في هذا الواجب.»" },
    { id:"S2", d:"D1", t:1, short:"Structured AI-use appendix", ar:"ملحق منظّم لتوثيق الاستخدام",
      plain:"When AI contributes substantially, students attach a structured appendix documenting the tools used, the prompts entered, and the modifications they made.",
      plainAr:"عند الاستخدام الواسع، يُرفق الطالب ملحقاً منظّماً يوثّق الأدوات المستخدمة والأوامر المُدخلة والتعديلات التي أجراها.",
      ex:"Appendix lists: tool, prompt summary, and what the student changed.",
      exAr:"يذكر الملحق: الأداة وملخّص الأوامر وما عدّله الطالب." },
    { id:"S3", d:"D1", t:1, short:"Disclosure level varies by task type", ar:"مستوى الإفصاح بحسب نوع المهمة",
      plain:"Required transparency differs by task type: summative assessments and research papers demand more disclosure than formative tasks and class presentations.",
      plainAr:"يتفاوت مستوى الإفصاح المطلوب بحسب المهمة: فالتقييمات الختامية والبحوث تستلزم شفافية أعلى من المهام التكوينية والعروض الصفية.",
      ex:"A research paper needs a full declaration; a practice exercise may not.",
      exAr:"الورقة البحثية تحتاج إعلاناً كاملاً؛ أما التمرين التدريبي فقد لا يحتاجه." },
    { id:"S4", d:"D1", t:1, short:"Faculty disclose AI use too", ar:"إفصاح هيئة التدريس أيضاً",
      plain:"Faculty members must also disclose their use of generative AI in course design, assessment development, and grading.",
      plainAr:"يجب أيضاً إلزام أعضاء هيئة التدريس بالإفصاح عن استخدامهم للذكاء الاصطناعي التوليدي في تصميم المقررات وتطوير التقييمات والتصحيح.",
      ex:"Say 'AI assisted in drafting these slides' at the start of class.",
      exAr:"قل: «ساعد الذكاء الاصطناعي في إعداد هذه الشرائح» في بداية المحاضرة." },
    { id:"S5", d:"D1", t:1, short:"Learning support vs assessed output", ar:"دعم التعلّم مقابل المهام المُقيَّمة",
      plain:"Using AI to support understanding and learning needs no mandatory disclosure, but using it to complete or produce work submitted for assessment requires explicit written disclosure.",
      plainAr:"استخدام الذكاء الاصطناعي لدعم الفهم والتعلّم لا يستلزم إفصاحاً إلزامياً، أما استخدامه لإنجاز مهام تُسلَّم للتقييم فيستلزم إفصاحاً كتابياً صريحاً.",
      ex:"Asking AI to explain a concept: fine. Asking it to write your submitted answer: declare it.",
      exAr:"طلب شرح مفهوم: مقبول. أما طلب كتابة إجابتك المُسلَّمة: فيجب الإعلان عنه." },

    { id:"S6", d:"D2", t:1, short:"Student keeps authorship, with responsibility", ar:"الطالب يحتفظ بالتأليف مع المسؤولية",
      plain:"A student retains academic authorship when AI is used as a support tool, provided the student remains responsible for the ideas, analysis, argument structure, and final interpretation.",
      plainAr:"يحتفظ الطالب بالتأليف الأكاديمي عند استخدام الذكاء الاصطناعي أداةً مساعدة، شريطة بقائه مسؤولاً عن الأفكار والتحليل والحجج والتفسير النهائي.",
      ex:"AI polished the wording, but the argument and analysis are the student's own.",
      exAr:"حسّن الذكاء الاصطناعي الصياغة، لكن الحجة والتحليل من الطالب نفسه." },
    { id:"S7", d:"D2", t:2, short:"Undisclosed AI submission is misconduct", ar:"تقديم محتوى الذكاء الاصطناعي دون إفصاح مخالفة",
      plain:"Submitting AI-generated content as one's own work, without substantial modification, genuine understanding, or disclosure, is classified as academic misconduct.",
      plainAr:"يُصنَّف تقديم محتوى مولَّد بالذكاء الاصطناعي باعتباره عمل الطالب، دون تعديل جوهري أو فهم حقيقي أو إفصاح، انتهاكاً للنزاهة الأكاديمية.",
      ex:"Copy-pasting a ChatGPT essay and submitting it unedited is misconduct.",
      exAr:"نسخ مقال من ChatGPT وتسليمه دون تعديل سوء سلوك أكاديمي." },
    { id:"S8", d:"D2", t:1, short:"Supports thinking: OK · replaces it: violation", ar:"يدعم التفكير مقبول؛ يحل محله مخالفة",
      plain:"AI is acceptable when it supports student thinking (brainstorming, grammar, translation, outlining) and a violation when it replaces it (generating conclusions, analysis, full content, or fabricated citations).",
      plainAr:"يُقبل الذكاء الاصطناعي حين يدعم تفكير الطالب (العصف الذهني والقواعد والترجمة والهيكلة)، ويُعدّ مخالفة حين يحل محله (توليد الاستنتاجات والتحليل أو المحتوى كاملاً أو اختراع المراجع).",
      ex:"Green zone: grammar check. Red zone: AI-written analysis.",
      exAr:"المنطقة الخضراء: تدقيق القواعد. الحمراء: تحليل يكتبه الذكاء الاصطناعي." },
    { id:"S9", d:"D2", t:1, short:"Shared responsibility for enforcement", ar:"مسؤولية مشتركة عن التطبيق",
      plain:"The student holds primary responsibility for violations, but faculty, departments, and the institution share responsibility for enforcement, training, and assessment conditions that discourage misuse.",
      plainAr:"تقع المسؤولية الأولى على الطالب، لكن هيئة التدريس والأقسام والمؤسسة يتشاركون مسؤولية تطبيق السياسات والتدريب وتهيئة بيئة تقييم تُثني عن إساءة الاستخدام.",
      ex:"Departments redesign assessments; the institution provides policy and training.",
      exAr:"تعيد الأقسام تصميم التقييمات؛ وتوفر المؤسسة السياسة والتدريب." },

    { id:"S10", d:"D3", t:1, short:"False mastery risk", ar:"خطر الإتقان الزائف",
      plain:"Over-reliance on generative AI risks false mastery: outputs look high-quality while students never develop the competencies, critical thinking, or practical skills being assessed.",
      plainAr:"الاعتماد المفرط على الذكاء الاصطناعي يولّد إتقاناً زائفاً: مخرجات تبدو عالية الجودة دون اكتساب الكفاءات والتفكير النقدي والمهارات التي يقيسها التقييم.",
      ex:"A student submits AI-written code but cannot explain or debug it.",
      exAr:"يسلّم الطالب كوداً كتبه الذكاء الاصطناعي ولا يستطيع شرحه أو تصحيحه." },
    { id:"S11", d:"D3", t:2, short:"Content fabrication risk", ar:"خطر اختلاق المحتوى",
      plain:"Generative AI poses a serious fabrication risk: hallucinated facts, non-existent citations, and AI-generated analysis that misrepresents the student's actual competence.",
      plainAr:"يشكّل الذكاء الاصطناعي التوليدي خطر اختلاق جسيماً: حقائق مزيفة ومراجع غير موجودة وتحليل آلي يشوّه صورة كفاءة الطالب الحقيقية.",
      ex:"Check every AI-suggested reference — fabricated citations are a documented risk.",
      exAr:"تحقّق من كل مرجع يقترحه الذكاء الاصطناعي — فالاستشهادات المختلقة خطر موثّق." },
    { id:"S12", d:"D3", t:1, short:"Viva voce verifies understanding", ar:"المناقشة الشفهية تتحقق من الفهم",
      plain:"Oral defense (viva voce) after submission is the most effective mechanism to verify that students genuinely understand, can explain, and can defend their work.",
      plainAr:"جلسات المناقشة الشفهية بعد التسليم هي الآلية الأكثر فاعلية للتحقق من أن الطلاب يفهمون فعلاً ما قدّموه ويستطيعون شرحه والدفاع عنه.",
      ex:"Answer 3–5 questions about your methods and reasoning after submitting.",
      exAr:"أجب عن ثلاثة إلى خمسة أسئلة حول منهجيتك وتفكيرك بعد التسليم." },
    { id:"S13", d:"D3", t:1, short:"Process-based assessment", ar:"التقييم القائم على العملية",
      plain:"Staged submissions, drafts, annotated references, and reflective components reduce AI substitution by requiring evidence of incremental learning, not just a polished final product.",
      plainAr:"التسليم على مراحل والمسودات والمراجع الموضّحة والمكوّنات التأملية تقلل الاستعاضة بالذكاء الاصطناعي باشتراط إثبات التعلم التدريجي لا مجرد مخرج نهائي مصقول.",
      ex:"Submit outline → draft → annotated sources → final version.",
      exAr:"سلّم المخطط ثم المسودة ثم المصادر الموضّحة ثم النسخة النهائية." },
    { id:"S14", d:"D3", t:3, short:"Local-context tasks resist misuse", ar:"مهام السياق المحلي تقاوم إساءة الاستخدام",
      plain:"Assessments built on local Omani context, real institutional data, or authentic personal experience resist AI misuse better than generic assignments and should be prioritised.",
      plainAr:"التقييمات المبنية على السياق العُماني المحلي أو البيانات المؤسسية الحقيقية أو التجربة الشخصية الأصيلة تقاوم إساءة الاستخدام أكثر من المهام العامة وينبغي إيلاؤها الأولوية.",
      ex:"A case study on a Nizwa business beats a generic marketing essay.",
      exAr:"دراسة حالة عن منشأة في نزوى أفضل من مقال تسويق عام." },

    { id:"S15", d:"D4", t:1, short:"No institutional data in external AI", ar:"لا بيانات مؤسسية في المنصات الخارجية",
      plain:"Sharing institutional data, unpublished research, exam materials, or personal information with external AI platforms creates serious security, privacy, and reputational risks.",
      plainAr:"مشاركة البيانات المؤسسية أو البحوث غير المنشورة أو المواد الامتحانية أو المعلومات الشخصية مع منصات الذكاء الاصطناعي الخارجية تخلق مخاطر جسيمة على الأمن والخصوصية والسمعة.",
      ex:"Never upload exam papers or named student records to a public chatbot.",
      exAr:"لا ترفع أوراق الامتحانات أو سجلات الطلاب المُعرِّفة إلى روبوت محادثة عام أبداً." },
    { id:"S16", d:"D4", t:1, short:"Mandatory data-safety training", ar:"تدريب إلزامي على أمن البيانات",
      plain:"Many students are unaware of the privacy risks of external AI platforms; explicit data-safety training must be a mandatory part of student induction.",
      plainAr:"كثير من الطلاب لا يدركون مخاطر الخصوصية في المنصات الخارجية؛ لذا يجب أن يكون التدريب الصريح على أمن البيانات جزءاً إلزامياً من التوجيه الأكاديمي.",
      ex:"Induction covers: what must never be pasted into public AI tools.",
      exAr:"يشمل التوجيه: ما الذي لا يُدخل أبداً في أدوات الذكاء الاصطناعي العامة." },
    { id:"S17", d:"D4", t:2, short:"Licensed institutional AI tools", ar:"أدوات مرخّصة مؤسسياً",
      plain:"UTAS Nizwa should approve and provide licensed AI tools with verified privacy protections rather than leaving students and faculty on uncontrolled public platforms.",
      plainAr:"ينبغي أن توفر الجامعة أدوات ذكاء اصطناعي مرخّصة بضمانات خصوصية موثّقة بدل ترك الطلاب وهيئة التدريس للمنصات العامة غير المُراقبة.",
      ex:"University accounts on a vetted AI platform with data protection.",
      exAr:"حسابات جامعية على منصة مدقّقة مع حماية للبيانات." },
    { id:"S18", d:"D4", t:1, short:"Formal data classification policy", ar:"سياسة رسمية لتصنيف البيانات",
      plain:"A formal data classification policy must specify which academic or institutional data may never be uploaded to any external generative AI platform.",
      plainAr:"سياسة رسمية لتصنيف البيانات تحدد صراحةً أنواع البيانات الأكاديمية أو المؤسسية التي لا يجوز رفعها إلى أي منصة ذكاء اصطناعي خارجية.",
      ex:"Categories: public / internal-restricted / confidential-prohibited.",
      exAr:"فئات: عامة / داخلية مقيّدة / سرّية يُمنع رفعها." },

    { id:"S19", d:"D5", t:1, short:"Unified university-wide policy", ar:"سياسة موحّدة على مستوى الجامعة",
      plain:"A unified AI academic integrity policy must apply consistently across all departments, programs, and campuses, defining acceptable use, disclosure, penalties, and appeal rights.",
      plainAr:"سياسة موحّدة للنزاهة الأكاديمية تُطبَّق باتساق عبر جميع الأقسام والبرامج والحرم الجامعية، وتحدد الاستخدام المقبول والإفصاح والعقوبات وحقوق التظلم.",
      ex:"Same rules in Engineering as in Business — no improvisation per department.",
      exAr:"القواعد نفسها في الهندسة وإدارة الأعمال — لا اجتهادات متفاوتة بين الأقسام." },
    { id:"S20", d:"D5", t:1, short:"Consistent application across campuses", ar:"تطبيق متسق عبر الفروع",
      plain:"The unified AI integrity policy is applied consistently across all departments, programs, and campuses.",
      plainAr:"تُطبَّق سياسة النزاهة الموحّدة باتساق عبر جميع الأقسام والبرامج والحرم الجامعية.",
      ex:"UTAS Nizwa's rules align with other UTAS branches after HQ approval.",
      exAr:"تتوافق قواعد فرع نزوى مع بقية فروع الجامعة بعد اعتماد الإدارة العامة." },
    { id:"S21", d:"D5", t:1, short:"Cross-departmental AI Integrity Committee", ar:"لجنة نزاهة متعددة الأقسام",
      plain:"A formal cross-departmental AI Integrity Committee handles policy updates, complex misconduct cases, and consistent enforcement across all academic units.",
      plainAr:"لجنة رسمية متعددة الأقسام لنزاهة الذكاء الاصطناعي تتولى تحديث السياسة ومعالجة حالات المخالفة المعقدة وضمان التطبيق المتسق عبر الوحدات الأكاديمية.",
      ex:"Ambiguous AI-use cases go to the committee, not ad-hoc decisions.",
      exAr:"تُحال الحالات الملتبسة إلى اللجنة بدل القرارات الارتجالية." },
    { id:"S22", d:"D5", t:1, short:"Mandatory student AI orientation", ar:"توجيه إلزامي للطلاب الجدد",
      plain:"All new students complete a mandatory AI literacy and academic integrity orientation covering acceptable use, disclosure, data privacy, and consequences of misuse.",
      plainAr:"يُلزَم جميع الطلاب الجدد بتوجيه إلزامي في محو أمية الذكاء الاصطناعي والنزاهة الأكاديمية يشمل الاستخدام المقبول والإفصاح وخصوصية البيانات وعواقب الإساءة.",
      ex:"A first-semester module ending with a short completion certificate.",
      exAr:"وحدة في الفصل الأول تنتهي بشهادة إتمام قصيرة." },
    { id:"S23", d:"D5", t:3, short:"Faculty readiness gap", ar:"فجوة جاهزية هيئة التدريس",
      plain:"Many faculty are not yet adequately equipped to guide students on AI use or enforce policies consistently; structured mandatory faculty training is required.",
      plainAr:"كثير من أعضاء هيئة التدريس غير مؤهلين بعد لتوجيه الطلاب نحو الاستخدام الملائم أو تطبيق السياسات باتساق؛ مما يستلزم تدريباً منظماً وإلزامياً.",
      ex:"Baseline AI-policy training before the new rules are enforced.",
      exAr:"تدريب أساسي على السياسة قبل بدء تطبيق القواعد الجديدة." },
    { id:"S24", d:"D5", t:1, short:"Structured faculty development", ar:"تطوير مهني منظم لهيئة التدريس",
      plain:"Faculty development programmes cover AI risk awareness, ethical boundaries, assessment redesign strategies, and standardized procedures for handling suspected violations.",
      plainAr:"برامج تطوير منظمة تشمل التوعية بمخاطر الذكاء الاصطناعي والحدود الأخلاقية واستراتيجيات إعادة تصميم التقييم والإجراءات الموحدة للتعامل مع الانتهاكات المشتبه بها.",
      ex:"Workshops on redesigning assessments for the AI era.",
      exAr:"ورش عمل حول إعادة تصميم التقييمات لعصر الذكاء الاصطناعي." },

    { id:"S25", d:"D6", t:1, short:"Policy vacuum demands urgent response", ar:"فراغ السياسة يستدعي استجابة عاجلة",
      plain:"The current absence of a formal institutional AI policy has produced hidden AI use, inconsistent faculty expectations, and uncertainty — an urgent, structured institutional response is needed.",
      plainAr:"أسفر غياب سياسة مؤسسية رسمية عن استخدام خفي وتوقعات متفاوتة وغموض في حدود النزاهة — مما يؤكد الحاجة الملحة إلى استجابة مؤسسية منظمة.",
      ex:"Students already use AI quietly; the policy must catch up now.",
      exAr:"الطلاب يستخدمونه بالفعل بصمت؛ وعلى السياسة أن تلحق الآن." },
    { id:"S26", d:"D6", t:1, short:"Grounded in Islamic principles", ar:"مرتكزة على المبادئ الإسلامية",
      plain:"The policy must explicitly reflect Islamic principles of honesty (الأمانة العلمية) and personal accountability (المسؤولية) as foundational ethical values governing academic conduct.",
      plainAr:"يجب أن تعكس السياسة صراحةً المبادئ الإسلامية للأمانة العلمية والمسؤولية الشخصية بوصفهما قيمتين أخلاقيتين أساسيتين تحكمان السلوك الأكاديمي.",
      ex:"The policy preamble frames integrity as أمانة, not just a rule.",
      exAr:"تُقدَّم النزاهة في ديباجة السياسة بوصفها أمانةً لا مجرد قاعدة." },
    { id:"S27", d:"D6", t:1, short:"Reflects Omani societal values", ar:"تعكس القيم المجتمعية العُمانية",
      plain:"Policy language and enforcement should reflect Omani values of fairness (العدالة), respect for knowledge (تعظيم العلم), and privacy and dignity (الخصوصية والكرامة).",
      plainAr:"ينبغي أن تعكس لغة السياسة وأسلوب تطبيقها قيم العدالة وتعظيم العلم والخصوصية والكرامة.",
      ex:"Enforcement respects dignity: educate first, sanction fairly.",
      exAr:"يراعي التطبيق الكرامة: التوعية أولاً والعقوبة بعدالة." },
    { id:"S28", d:"D6", t:1, short:"Aligned with PDPL and Tahawul", ar:"منسجمة مع قانون حماية البيانات وبرنامج تحوّل",
      plain:"The policy must align with Oman's Personal Data Protection Law (Royal Decree No. 6/2022) and the Government Digital Transformation Program (Tahawul) for national compliance.",
      plainAr:"يجب أن تنسجم السياسة مع قانون حماية البيانات الشخصية العُماني (المرسوم السلطاني 6/2022) وبرنامج التحول الرقمي الحكومي (تحوّل) ضماناً للامتثال الوطني.",
      ex:"Data rules in the AI policy cite PDPL categories directly.",
      exAr:"تستند قواعد البيانات في السياسة إلى فئات القانون مباشرة." },
    { id:"S29", d:"D6", t:1, short:"A living, annually reviewed framework", ar:"إطار حي يُراجع سنوياً",
      plain:"The policy is a living framework subject to annual review and revision, matching the rapid evolution of generative AI and its academic implications.",
      plainAr:"السياسة إطار حي يخضع للمراجعة والتعديل سنوياً بما يواكب التطور المتسارع للذكاء الاصطناعي التوليدي وتغيّر أبعاده الأكاديمية.",
      ex:"A scheduled annual review by the AI Integrity Committee.",
      exAr:"مراجعة سنوية مجدولة تتولاها لجنة نزاهة الذكاء الاصطناعي." },
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
        { en:"Never upload identifiable student data into public AI tools.", ar:"لا تُحمّل أبداً بيانات طلاب معرِّفة إلى أدوات الذكاء الاصطناعي العامة.", ref:"S15" },
        { en:"Anonymise all student work before any AI processing.", ar:"أخفِ هوية كل أعمال الطلاب قبل أي معالجة بالذكاء الاصطناعي.", ref:"S15" },
        { en:"AI detection results cannot be the sole evidence for misconduct.", ar:"نتائج أدوات الكشف لا تكون الدليل الوحيد على سوء السلوك.", ref:"S12" },
        { en:"Your professional judgement must remain the primary assessment tool.", ar:"يبقى حُكمك المهني الأداة الأساسية في التقييم." },
      ],
      policies:["S12","S15","S28"],
    };
    if (role==="researcher") return {
      type:"conditional", icon:"check",
      title:"Permitted — disclosure & data rules apply",
      titleAr:"مسموح — مع الامتثال لقواعد الإفصاح والبيانات",
      color:C.orange, tone:"amber",
      actions:[
        { en:"Disclose AI use in the Methods section of your research.", ar:"أفصِح عن استخدام الذكاء الاصطناعي في قسم المنهجية.", ref:"S3" },
        { en:"Do not list AI as a co-author — acknowledge it in methods only.", ar:"لا تُدرِج الذكاء الاصطناعي كمؤلف — أشِر إليه في المنهجية فقط.", ref:"S6" },
        { en:"Remove all personal or identifiable data before processing.", ar:"احذف كل البيانات الشخصية أو المعرِّفة قبل المعالجة.", ref:"S15" },
        { en:"Verify AI outputs for accuracy — you are responsible for all content.", ar:"تحقّق من دقة المخرجات — أنت مسؤول عن كل المحتوى.", ref:"S6" },
        { en:"Ensure tools used comply with Omani data protection law.", ar:"تأكّد من امتثال الأدوات لقانون حماية البيانات العُماني.", ref:"S28" },
      ],
      policies:["S3","S6","S7","S11","S15","S28"],
    };
    if (aiUse==="brainstorm") return {
      type:"conditional", icon:"check",
      title:"Permitted — declaration required",
      titleAr:"مسموح — مع إعلان مطلوب",
      color:C.orange, tone:"amber",
      actions:[
        { en:"Submit the UTAS AI Declaration Form with your work.", ar:"قدِّم نموذج إعلان الذكاء الاصطناعي مع عملك.", ref:"S1" },
        { en:"State that AI was used for brainstorming purposes only.", ar:"وضّح أن الذكاء الاصطناعي استُخدم للعصف الذهني فقط.", ref:"S5" },
        { en:"Final ideas, arguments, and writing must be entirely your own.", ar:"يجب أن تكون الأفكار والحجج والكتابة النهائية من عندك بالكامل.", ref:"S8" },
      ],
      policies:["S1","S2","S5","S8"],
    };
    if (aiUse==="drafting") return {
      type:"conditional", icon:"alert",
      title:"Permitted — full declaration required",
      titleAr:"مسموح — مع إعلان كامل إلزامي",
      color:C.rust, tone:"rust",
      actions:[
        { en:"Confirm your faculty permits AI drafting for this assessment type.", ar:"تأكّد أن قسمك يسمح بالصياغة بالذكاء الاصطناعي لهذا النوع من التقييم.", ref:"S3" },
        { en:"Submit the UTAS AI Declaration Form with your assignment.", ar:"قدِّم نموذج الإعلان مع واجبك.", ref:"S1" },
        { en:"State which tool you used and approximately what % it generated.", ar:"بيّن الأداة المستخدمة والنسبة التقريبية التي ولّدتها.", ref:"S5" },
        { en:"Confirm you have reviewed and understood all AI-generated content.", ar:"أكّد أنك راجعت وفهمت كل المحتوى المولَّد.", ref:"S12" },
        { en:"You remain fully responsible for every statement in the work.", ar:"تبقى مسؤولاً بالكامل عن كل عبارة في العمل.", ref:"S6" },
      ],
      policies:["S1","S2","S5","S6","S12","S3"],
    };
    if (aiUse==="editing") return {
      type:"conditional", icon:"check",
      title:"Permitted — declaration required",
      titleAr:"مسموح — مع إعلان",
      color:C.orange, tone:"amber",
      actions:[
        { en:"Submit the UTAS AI Declaration Form.", ar:"قدِّم نموذج إعلان الذكاء الاصطناعي.", ref:"S1" },
        { en:"Note that AI was used for editing or proofreading only.", ar:"دوّن أن الذكاء الاصطناعي استُخدم للتحرير أو التدقيق فقط.", ref:"S5" },
        { en:"Original ideas and arguments must be entirely yours.", ar:"يجب أن تكون الأفكار والحجج الأصلية من عندك بالكامل.", ref:"S8" },
      ],
      policies:["S1","S2","S5","S8"],
    };
    return {
      type:"conditional", icon:"check",
      title:"Permitted — declaration & compliance required",
      titleAr:"مسموح — مع الإعلان والامتثال للسياسة",
      color:C.orange, tone:"amber",
      actions:[
        { en:"Disclose your AI use clearly in the relevant context.", ar:"أفصِح عن استخدامك للذكاء الاصطناعي بوضوح في سياقه.", ref:"S1" },
        { en:"Ensure no personal or sensitive data is included.", ar:"تأكّد من عدم تضمين أي بيانات شخصية أو حسّاسة.", ref:"S15" },
        { en:"You remain fully responsible for all content produced.", ar:"تبقى مسؤولاً بالكامل عن كل ما يُنتَج من محتوى.", ref:"S6" },
      ],
      policies:["S4","S1","S5","S6"],
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
    nav_faq:      { en:"FAQ", ar:"أسئلة شائعة" },
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
