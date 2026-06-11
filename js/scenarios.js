/* ═══════════════════════════════════════════════════════════════════
   SCENARIOS & FAQ DATA  ·  window.SCEN
   Case studies for the decision guide + a bilingual FAQ / common
   AI-usage situations page. (Added per reviewer feedback — Dr Sonia
   Victor Soans, ISESCO/DCIS, UTAS-Nizwa.)
═══════════════════════════════════════════════════════════════════ */
(function () {
  const C = window.NAV.C;

  /* ── CASE STUDIES (real academic situations) ──────────────────
     verdict tone: green = fine · amber = allowed w/ disclosure · rust = risk/violation */
  const CASES = [
    {
      id:"CS1", role:"student", tone:"rust", icon:"alert",
      titleEn:"The unedited essay", titleAr:"المقال المنسوخ كما هو",
      personaEn:"Ahmed, Business student", personaAr:"أحمد، طالب إدارة أعمال",
      situationEn:"Ahmed asks ChatGPT to write his entire marketing essay, copies it word-for-word, and submits it without any declaration.",
      situationAr:"يطلب أحمد من ChatGPT كتابة مقال التسويق كاملاً، وينسخه حرفياً، ويسلّمه دون أي إعلان.",
      outcomeEn:"This is a clear violation. The work is not his own, AI was undeclared, and he cannot defend the content. This is academic misconduct.",
      outcomeAr:"هذه مخالفة واضحة. العمل ليس من إنتاجه، ولم يُعلن عن الذكاء الاصطناعي، ولا يستطيع الدفاع عن المحتوى. هذا سوء سلوك أكاديمي.",
      doEn:"Write your own work. If AI helped brainstorm, declare it and ensure the ideas and writing are yours.",
      doAr:"اكتب عملك بنفسك. إن ساعد الذكاء الاصطناعي في العصف الذهني، فأعلن عن ذلك واحرص أن تكون الأفكار والكتابة من عندك.",
      refs:["S2","S6","S9"],
    },
    {
      id:"CS2", role:"student", tone:"green", icon:"check",
      titleEn:"Brainstorming, then writing", titleAr:"العصف الذهني ثم الكتابة",
      personaEn:"Fatma, Engineering student", personaAr:"فاطمة، طالبة هندسة",
      situationEn:"Fatma uses ChatGPT to brainstorm angles for her report, then researches and writes everything herself. She adds a one-line AI declaration.",
      situationAr:"تستخدم فاطمة ChatGPT للعصف الذهني حول زوايا تقريرها، ثم تبحث وتكتب كل شيء بنفسها، وتضيف سطر إعلان عن الذكاء الاصطناعي.",
      outcomeEn:"Fully compliant. AI supported her thinking, the work is genuinely hers, and she disclosed it transparently.",
      outcomeAr:"ملتزمة تماماً. دعم الذكاء الاصطناعي تفكيرها، والعمل من إنتاجها فعلاً، وأفصحت عنه بشفافية.",
      doEn:"This is the model approach: use AI as a thinking aid, do the work yourself, and declare it.",
      doAr:"هذا هو النموذج الأمثل: استخدم الذكاء الاصطناعي كأداة تفكير، أنجز العمل بنفسك، وأعلن عنه.",
      refs:["S2","S5","S9"],
    },
    {
      id:"CS3", role:"student", tone:"amber", icon:"alert",
      titleEn:"AI for grammar only", titleAr:"الذكاء الاصطناعي للقواعد فقط",
      personaEn:"Salim, IT student", personaAr:"سالم، طالب تقنية معلومات",
      situationEn:"Salim writes his assignment himself but runs it through Grammarly's AI to fix grammar and improve phrasing. He's unsure if he must declare it.",
      situationAr:"يكتب سالم واجبه بنفسه، لكنه يمرّره عبر Grammarly لإصلاح القواعد وتحسين الصياغة، وهو غير متأكّد إن كان عليه الإعلان.",
      outcomeEn:"Allowed, but it must still be declared. Even grammar/editing tools count as AI assistance under the policy.",
      outcomeAr:"مسموح، لكن يجب الإعلان عنه. حتى أدوات القواعد والتحرير تُعدّ مساعدة من الذكاء الاصطناعي بحسب السياسة.",
      doEn:"Add a brief declaration noting AI was used for editing/proofreading only.",
      doAr:"أضِف إعلاناً موجزاً يبيّن أن الذكاء الاصطناعي استُخدم للتحرير والتدقيق فقط.",
      refs:["S2","S5"],
    },
    {
      id:"CS4", role:"faculty", tone:"rust", icon:"alert",
      titleEn:"Uploading student work to mark", titleAr:"رفع أعمال الطلاب للتصحيح",
      personaEn:"Dr Khalid, Lecturer", personaAr:"د. خالد، محاضر",
      situationEn:"Dr Khalid pastes a named student's assignment into a public AI tool to help him grade it faster.",
      situationAr:"يُدخِل د. خالد واجب طالبٍ يحمل اسمه في أداة ذكاء اصطناعي عامة ليساعده على التصحيح أسرع.",
      outcomeEn:"This breaches data-privacy policy. Identifiable student data must never go into public AI tools.",
      outcomeAr:"هذا يخالف سياسة خصوصية البيانات. لا يجوز أبداً إدخال بيانات طلاب معرِّفة في أدوات الذكاء الاصطناعي العامة.",
      doEn:"Anonymise work first, use only institution-approved tools, and keep professional judgement as the primary assessment.",
      doAr:"أخفِ هوية العمل أولاً، استخدم الأدوات المعتمدة مؤسسياً فقط، وأبقِ حُكمك المهني الأساس في التقييم.",
      refs:["S16","S17","S11"],
    },
    {
      id:"CS5", role:"faculty", tone:"amber", icon:"check",
      titleEn:"AI-assisted lecture slides", titleAr:"شرائح محاضرة بمساعدة الذكاء الاصطناعي",
      personaEn:"Dr Mona, Lecturer", personaAr:"د. منى، محاضِرة",
      situationEn:"Dr Mona uses AI to draft lecture slides, then reviews and corrects every fact before teaching.",
      situationAr:"تستخدم د. منى الذكاء الاصطناعي لإعداد شرائح المحاضرة، ثم تراجع وتصحّح كل معلومة قبل التدريس.",
      outcomeEn:"Acceptable with disclosure. She verified accuracy and should tell students AI assisted with the materials.",
      outcomeAr:"مقبول مع الإفصاح. لقد تحقّقت من الدقة، وعليها إخبار الطلاب أن الذكاء الاصطناعي ساعد في إعداد المواد.",
      doEn:"Verify all AI content for accuracy and disclose its use to students.",
      doAr:"تحقّق من دقة كل محتوى يولّده الذكاء الاصطناعي وأفصِح عن استخدامه للطلاب.",
      refs:["S1","S8"],
    },
    {
      id:"CS6", role:"researcher", tone:"amber", icon:"check",
      titleEn:"AI in a research paper", titleAr:"الذكاء الاصطناعي في ورقة بحثية",
      personaEn:"Researcher, Sciences", personaAr:"باحثة، كلية العلوم",
      situationEn:"A researcher uses AI to summarise literature and polish language, then wants to list the AI as a co-author.",
      situationAr:"تستخدم باحثة الذكاء الاصطناعي لتلخيص الأدبيات وتحسين اللغة، ثم تريد إدراجه كمؤلف مشارك.",
      outcomeEn:"The AI use is fine if disclosed in the methods — but AI cannot be a co-author; only humans hold authorship.",
      outcomeAr:"استخدام الذكاء الاصطناعي مقبول إن أُفصح عنه في المنهجية — لكنه لا يكون مؤلفاً مشاركاً؛ التأليف للبشر فقط.",
      doEn:"Acknowledge the AI in the methods section and verify all outputs. Do not list it as an author.",
      doAr:"أشِر إلى الذكاء الاصطناعي في قسم المنهجية وتحقّق من كل المخرجات. لا تُدرِجه كمؤلف.",
      refs:["S1","S7","S8"],
    },
  ];

  /* ── FAQ / COMMON AI-USAGE SITUATIONS ─────────────────────────── */
  const FAQ_CATS = [
    { id:"basics",  en:"Getting started", ar:"الأساسيات",        icon:"spark",  col:C.orange },
    { id:"students",en:"For students",    ar:"للطلاب",           icon:"student",col:C.royal },
    { id:"faculty", en:"For faculty",     ar:"لهيئة التدريس",     icon:"faculty",col:C.navy },
    { id:"data",    en:"Data & privacy",  ar:"البيانات والخصوصية", icon:"lock",  col:C.rust },
  ];

  const FAQS = [
    { cat:"basics",
      qEn:"What counts as 'using AI'?", qAr:"ما الذي يُعدّ «استخداماً للذكاء الاصطناعي»؟",
      aEn:"Any generative-AI tool — ChatGPT, Copilot, Gemini, Claude, Grammarly's AI features, and similar — used to generate, rewrite, translate, summarise, or substantially edit your work.",
      aAr:"أي أداة ذكاء اصطناعي توليدي — ChatGPT وCopilot وGemini وClaude وميزات Grammarly وما يماثلها — تُستخدم لتوليد عملك أو إعادة صياغته أو ترجمته أو تلخيصه أو تحريره جوهرياً.",
      refs:["S3"] },
    { cat:"basics",
      qEn:"Is AI banned at UTAS?", qAr:"هل الذكاء الاصطناعي ممنوع في الجامعة؟",
      aEn:"No. AI is allowed in many cases — the key is transparency. You must disclose how you used it, and the rules depend on the task (e.g. exams may forbid it; research may allow brainstorming).",
      aAr:"لا. الذكاء الاصطناعي مسموح في حالات كثيرة — والمفتاح هو الشفافية. عليك الإفصاح عن طريقة استخدامك له، وتختلف القواعد حسب المهمة (فالاختبارات قد تمنعه، والبحث قد يسمح بالعصف الذهني).",
      refs:["S10","S2"] },
    { cat:"students",
      qEn:"Can I use ChatGPT to brainstorm ideas?", qAr:"هل أستطيع استخدام ChatGPT للعصف الذهني؟",
      aEn:"Usually yes — brainstorming is among the most accepted uses. But the final ideas, arguments, and writing must be your own, and you should declare that AI helped you brainstorm.",
      aAr:"غالباً نعم — العصف الذهني من أكثر الاستخدامات قبولاً. لكن يجب أن تكون الأفكار والحجج والكتابة النهائية من عندك، وعليك الإعلان أن الذكاء الاصطناعي ساعدك في العصف الذهني.",
      refs:["S2","S5","S9"] },
    { cat:"students",
      qEn:"Do I have to declare AI even for small help?", qAr:"هل أعلن عن الذكاء الاصطناعي حتى للمساعدة البسيطة؟",
      aEn:"Yes. Even using AI only to fix grammar or rephrase a sentence requires a declaration. When in doubt, declare it — transparency protects you.",
      aAr:"نعم. حتى استخدامه لإصلاح القواعد أو إعادة صياغة جملة يستلزم إعلاناً. عند الشكّ، أعلِن — فالشفافية تحميك.",
      refs:["S2","S5"] },
    { cat:"students",
      qEn:"What happens if I don't declare AI use?", qAr:"ماذا يحدث إن لم أُعلن عن استخدام الذكاء الاصطناعي؟",
      aEn:"Undeclared AI use is treated as academic misconduct, because the work misrepresents your own effort. Detection tools may flag it, but you remain responsible regardless.",
      aAr:"يُعامَل الاستخدام غير المُعلَن بوصفه سوء سلوك أكاديمي، لأن العمل يُضلّل بشأن جهدك الحقيقي. وقد ترصده أدوات الكشف، لكنك تبقى مسؤولاً في كل الأحوال.",
      refs:["S2","S6","S11"] },
    { cat:"students",
      qEn:"The AI gave me a wrong fact — am I responsible?", qAr:"أعطاني الذكاء الاصطناعي معلومة خاطئة — هل أنا مسؤول؟",
      aEn:"Yes. You are fully responsible for everything you submit. 'The AI said so' is not a defence — always verify facts and citations yourself.",
      aAr:"نعم. أنت مسؤول بالكامل عن كل ما تسلّمه. «الذكاء الاصطناعي قال ذلك» ليس عذراً — تحقّق دائماً من الحقائق والاستشهادات بنفسك.",
      refs:["S6","S9"] },
    { cat:"faculty",
      qEn:"Can I use AI to prepare teaching materials?", qAr:"هل أستخدم الذكاء الاصطناعي لإعداد المواد التعليمية؟",
      aEn:"Yes, provided you verify all content for accuracy and disclose AI assistance to students. You remain accountable for what you teach.",
      aAr:"نعم، بشرط أن تتحقّق من دقة كل المحتوى وتُفصح للطلاب عن مساعدة الذكاء الاصطناعي. وتبقى مسؤولاً عمّا تُدرّسه.",
      refs:["S1","S8"] },
    { cat:"faculty",
      qEn:"Can I rely on AI-detection scores to prove cheating?", qAr:"هل أعتمد على نتائج أدوات الكشف لإثبات الغش؟",
      aEn:"No. Detection results are supporting evidence only — never the sole basis for a misconduct decision. Combine them with your professional judgement and a conversation with the student.",
      aAr:"لا. نتائج الكشف دليل مساعد فقط — لا تكون أبداً الأساس الوحيد لقرار سوء السلوك. اجمعها مع حُكمك المهني ومناقشة الطالب.",
      refs:["S11"] },
    { cat:"data",
      qEn:"Can I put student names or grades into ChatGPT?", qAr:"هل أُدخِل أسماء الطلاب أو درجاتهم في ChatGPT؟",
      aEn:"Never in public AI tools. Personal or identifiable data must be removed or anonymised first, and only institution-approved tools should handle such data.",
      aAr:"أبداً في الأدوات العامة. يجب إزالة البيانات الشخصية أو المعرِّفة أو إخفاء هويتها أولاً، ولا تتعامل مع هذه البيانات إلا الأدوات المعتمدة مؤسسياً.",
      refs:["S16","S17","S19"] },
    { cat:"data",
      qEn:"Which AI tools are safe to use at UTAS?", qAr:"ما الأدوات الآمنة للاستخدام في الجامعة؟",
      aEn:"Prefer institution-licensed tools that comply with Oman's Personal Data Protection Law. Avoid entering any sensitive university or personal data into unvetted public tools.",
      aAr:"فضّل الأدوات المرخّصة مؤسسياً التي تمتثل لقانون حماية البيانات الشخصية العُماني. وتجنّب إدخال أي بيانات جامعية أو شخصية حسّاسة في أدوات عامة غير مدقّقة.",
      refs:["S18","S19"] },
  ];

  window.SCEN = { CASES, FAQ_CATS, FAQS };
})();
