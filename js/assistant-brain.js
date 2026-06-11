/* ═══════════════════════════════════════════════════════════════════
   OFFLINE ASSISTANT BRAIN  ·  window.BRAIN
   A retrieval engine over the 29 policies. Works with ZERO internet,
   so the assistant answers correctly once deployed to GitHub Pages.
   Scores each policy against the question and composes a grounded reply
   in Arabic or English, citing policy codes.
═══════════════════════════════════════════════════════════════════ */
(function () {
  const P = window.NAV.P;
  const DOM = window.NAV.DOMAINS;
  const TIER = window.NAV.TIER;

  /* ── synonym / concept expansion (EN + AR) ──────────────────── */
  const CONCEPTS = {
    disclose:   ["disclose","disclosure","declare","declaration","admit","reveal","إفصاح","افصاح","تصريح","إعلان","اعلان","أعلن","اقرار","إقرار"],
    student:    ["student","students","pupil","assignment","homework","essay","طالب","طلاب","طالبة","واجب","مقال","تكليف"],
    faculty:    ["faculty","teacher","lecturer","professor","instructor","staff","هيئة","تدريس","أستاذ","استاذ","معلم","مدرس","محاضر"],
    author:     ["author","authorship","co-author","coauthor","credit","byline","مؤلف","تأليف","مشارك","نسبة العمل"],
    chatgpt:    ["chatgpt","gpt","copilot","gemini","claude","grammarly","tool","tools","ai tool","أداة","أدوات","شات","جي بي تي"],
    data:       ["data","privacy","personal","confidential","upload","gdpr","بيانات","خصوصية","شخصية","سري","رفع","تحميل"],
    detect:     ["detect","detection","detector","turnitin","plagiarism","scan","كشف","كاشف","انتحال","فحص","نسبة"],
    quality:    ["quality","assurance","qa","audit","accreditation","review","جودة","ضمان","تدقيق","اعتماد","مراجعة"],
    train:      ["train","training","literacy","learn","course","workshop","skills","تدريب","ثقافة","تعلم","ورشة","مهارات","دورة"],
    grade:      ["grade","grading","mark","marking","assess","assessment","exam","تقييم","تصحيح","درجة","امتحان","اختبار"],
    research:   ["research","paper","publication","thesis","study","journal","بحث","ورقة","نشر","رسالة","دراسة","مجلة"],
    responsible:["responsible","responsibility","accountable","accountability","liable","مسؤول","مسؤولية","مساءلة","تحمل"],
    oman:       ["oman","omani","vision","2040","culture","islamic","local","عمان","عُمان","رؤية","ثقافة","إسلامية","محلي"],
    translate:  ["translate","translation","language","ترجمة","لغة","يترجم"],
    edit:       ["edit","editing","proofread","grammar","improve","rewrite","تحرير","تدقيق","قواعد","تحسين","صياغة"],
    allowed:    ["allowed","permit","permitted","can i","may i","ok to","is it ok","يسمح","مسموح","أستطيع","استطيع","يجوز","ممكن"],
  };

  const STOP = new Set(["the","a","an","is","are","do","does","can","could","i","my","we","you","to","of","for","and","or","in","on","with","use","using","used","what","how","when","should","my","me","it","this","that","هل","ما","ماذا","كيف","في","من","عن","على","إلى","الى","هذا","هذه","مع","أو","او","و","ال","يا","عند","لي","أن","ان"]);

  function normalize(s) {
    return (s || "").toLowerCase()
      .replace(/[إأآا]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه")
      .replace(/[ًٌٍَُِّْ]/g, "")
      .replace(/[^\p{L}\p{N}\s]/gu, " ");
  }
  function terms(s) {
    return normalize(s).split(/\s+/).filter(w => w.length > 1 && !STOP.has(w));
  }

  // Precompute a normalized search blob per policy
  const INDEX = P.map(p => {
    const blob = normalize([p.id, p.short, p.ar, p.plain, p.plainAr, p.ex, p.exAr, DOM[p.d].en, DOM[p.d].ar].join(" "));
    return { p, blob, tokens: new Set(blob.split(/\s+/)) };
  });

  function expand(qTerms) {
    const set = new Set(qTerms);
    const qJoined = " " + qTerms.join(" ") + " ";
    Object.values(CONCEPTS).forEach(group => {
      const hit = group.some(k => {
        const nk = normalize(k);
        return qTerms.includes(nk) || qJoined.includes(" " + nk + " ");
      });
      if (hit) group.forEach(k => normalize(k).split(/\s+/).forEach(w => set.add(w)));
    });
    return [...set];
  }

  function score(qTerms) {
    const ex = expand(qTerms);
    return INDEX.map(entry => {
      let s = 0;
      ex.forEach(t => {
        if (!t) return;
        if (entry.tokens.has(t)) s += 2;
        else if (entry.blob.includes(t)) s += 1;
      });
      // small boost for mandatory tier (more relevant guidance)
      if (entry.p.t === 1) s += 0.2;
      return { p: entry.p, s };
    }).sort((a, b) => b.s - a.s);
  }

  /* ── intent: greetings / thanks / meta ──────────────────────── */
  function smallTalk(qNorm, isAr) {
    if (/^(hi|hello|hey|salam|salaam|assalam|مرحبا|اهلا|السلام|هلا|هاي)/.test(qNorm))
      return isAr ? "أهلاً بك! اسألني أي شيء عن سياسة الذكاء الاصطناعي في الجامعة — مثل: «هل يمكنني استخدام ChatGPT في واجبي؟»"
                  : "Hello! Ask me anything about the university's AI policy — e.g. \"Can I use ChatGPT for my assignment?\"";
    if (/(thank|thanks|shukran|شكرا|مشكور|يعطيك)/.test(qNorm))
      return isAr ? "على الرحب والسعة! هل لديك سؤال آخر عن السياسة؟"
                  : "You're welcome! Any other policy question?";
    return null;
  }

  /* ── compose answer ─────────────────────────────────────────── */
  function answer(question, lang) {
    const isAr = lang === "ar";
    const qNorm = normalize(question);
    const small = smallTalk(qNorm, isAr);
    if (small) return { text: small, refs: [] };

    const qTerms = terms(question);
    const ranked = score(qTerms);
    const top = ranked.filter(r => r.s > 1.2).slice(0, 3);

    if (!top.length) {
      return {
        text: isAr
          ? "لم أجد بنداً مطابقاً لسؤالك بدقة. جرّب صياغة أخرى أو كلمات مثل: الإفصاح، التأليف، بيانات الطلاب، التدريب، أو الكشف. يمكنك أيضاً تصفّح «مكتبة السياسات» لكل البنود الـ٢٩."
          : "I couldn't match your question to a specific policy. Try rephrasing, or words like: disclosure, authorship, student data, training, or detection. You can also browse the Policy Library for all 29 statements.",
        refs: [],
      };
    }

    const lead = top[0].p;
    const intro = isAr
      ? `بحسب سياسة الجامعة، إليك ما ينطبق على سؤالك:`
      : `Based on the university's policy, here's what applies:`;

    const blocks = top.map(({ p }) => {
      const body = isAr ? p.plainAr : p.plain;
      const ex = isAr ? p.exAr : p.ex;
      return `• ${p.id} — ${isAr ? p.ar : p.short}\n${body}${ex ? `\n${isAr ? "مثال: " : "Example: "}${ex}` : ""}`;
    }).join("\n\n");

    const tierNote = lead.t === 1
      ? (isAr ? "\n\nهذا البند إلزامي (المستوى الأول)." : "\n\nThis is a mandatory (Tier 1) requirement.")
      : "";

    const outro = isAr
      ? "\n\nلمزيد من التفصيل افتح «مكتبة السياسات»، ولأمر رسمي راجع لجنة الجودة."
      : "\n\nFor more detail open the Policy Library; for an official ruling consult the quality committee.";

    return { text: `${intro}\n\n${blocks}${tierNote}${outro}`, refs: top.map(t => t.p.id) };
  }

  window.BRAIN = { answer, score, terms };
})();
