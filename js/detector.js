/* ═══════════════════════════════════════════════════════════════════
   AI DETECTOR ENGINE  ·  window.DETECT
   Dual engine:  (1) offline heuristic signals   (2) real AI via Claude
   Grounded in the UTAS 29-policy framework.
═══════════════════════════════════════════════════════════════════ */
(function () {
  /* ── 1 ·  HEURISTIC SIGNALS (offline, deterministic) ─────────── */
  const AI_PHRASES_EN = [
    "in conclusion", "it is important to note", "it is worth noting", "furthermore",
    "moreover", "in today's world", "in the modern world", "delve into", "navigating the",
    "a testament to", "plays a crucial role", "plays a vital role", "it is essential to",
    "in the realm of", "tapestry", "landscape of", "ever-evolving", "paradigm shift",
    "on the other hand", "as a result", "in summary", "overall,", "firstly", "secondly",
    "additionally", "consequently", "it should be noted", "this essay will", "in essence",
  ];
  const AI_PHRASES_AR = [
    "في الختام", "من الجدير بالذكر", "تجدر الإشارة", "علاوة على ذلك", "بالإضافة إلى ذلك",
    "في عالم اليوم", "في عصرنا الحالي", "يلعب دوراً", "يلعب دورا", "من المهم أن نلاحظ",
    "وبالتالي", "نتيجة لذلك", "بشكل عام", "في الواقع", "مما لا شك فيه", "في نهاية المطاف",
    "يعد بمثابة", "في ظل", "لا يمكن إنكار", "تطور مستمر",
  ];

  function splitSentences(t) {
    return t.replace(/\s+/g, " ").split(/(?<=[.!?؟।])\s+|\n+/).map(s => s.trim()).filter(s => s.length > 8);
  }
  function tokens(t) { return (t.toLowerCase().match(/[\p{L}\p{N}']+/gu) || []); }

  function heuristics(text) {
    const words = tokens(text);
    const sents = splitSentences(text);
    const wc = words.length;
    if (wc < 40) return { score: null, wc, reasons: [], note: "short" };

    // (a) cliché / transition phrase density
    const low = text.toLowerCase();
    let phraseHits = [];
    AI_PHRASES_EN.forEach(p => { if (low.includes(p)) phraseHits.push(p); });
    AI_PHRASES_AR.forEach(p => { if (text.includes(p)) phraseHits.push(p); });
    const phraseDensity = phraseHits.length / Math.max(1, sents.length); // per sentence

    // (b) burstiness — humans vary sentence length; AI is uniform
    const lens = sents.map(s => tokens(s).length).filter(Boolean);
    const mean = lens.reduce((a, b) => a + b, 0) / Math.max(1, lens.length);
    const variance = lens.reduce((a, b) => a + (b - mean) ** 2, 0) / Math.max(1, lens.length);
    const cv = Math.sqrt(variance) / Math.max(1, mean);   // coefficient of variation
    const burstiness = Math.min(1, cv);                    // low cv → AI-like

    // (c) lexical diversity (type-token ratio) — AI mid-range, very low/high less so
    const uniq = new Set(words).size;
    const ttr = uniq / wc;

    // (d) average sentence length — AI tends to be long & even
    const avgLen = mean;

    // ── combine to 0–100 suspicion ──
    let s = 0;
    s += Math.min(35, phraseDensity * 120);                 // up to 35
    s += Math.max(0, (0.55 - burstiness)) / 0.55 * 30;      // uniform → up to 30
    s += (avgLen > 20 ? Math.min(18, (avgLen - 20) * 1.6) : 0); // long even sentences
    s += (ttr > 0.42 && ttr < 0.62 ? 10 : 0);               // "polished" mid diversity
    s += (phraseHits.length >= 3 ? 7 : 0);
    s = Math.max(2, Math.min(96, Math.round(s)));

    const reasons = [];
    if (phraseHits.length) reasons.push({
      en: `Found ${phraseHits.length} common AI/transition phrase(s): "${phraseHits.slice(0,3).join('", "')}"`,
      ar: `وُجدت ${phraseHits.length} عبارة شائعة في كتابة الذكاء الاصطناعي مثل: «${phraseHits.slice(0,3).join("»، «")}»` });
    if (burstiness < 0.4) reasons.push({
      en: "Very uniform sentence lengths (low burstiness) — typical of generated text.",
      ar: "تجانس كبير في أطوال الجمل (تذبذب منخفض) — سمة شائعة للنص المولّد." });
    if (avgLen > 24) reasons.push({
      en: `Long, even sentences (avg ${avgLen.toFixed(0)} words).`,
      ar: `جمل طويلة ومتساوية (متوسط ${avgLen.toFixed(0)} كلمة).` });
    if (!reasons.length) reasons.push({
      en: "Natural variation in rhythm and vocabulary — human-like signals.",
      ar: "تنوّع طبيعي في الإيقاع والمفردات — إشارات تشبه الكتابة البشرية." });

    return {
      score: s, wc, sentCount: sents.length, phraseHits, phraseDensity,
      burstiness: +burstiness.toFixed(2), ttr: +ttr.toFixed(2), avgLen: +avgLen.toFixed(1),
      reasons, note: null,
    };
  }

  /* ── 2 ·  REAL AI ANALYSIS via Claude ────────────────────────── */
  function policyList() {
    const P = window.NAV.P;
    return P.map(p => `${p.id}: ${p.short} | ${p.ar}`).join("\n");
  }

  async function aiAnalyze(text, ctx) {
    if (!(window.claude && window.claude.complete)) return { ok: false, err: "noapi" };
    const excerpt = text.slice(0, 6000);
    const prompt = `You are the AI-Integrity Detector for the University of Technology and Applied Sciences (UTAS), Nizwa. You assess a STUDENT submission against a 29-statement academic-integrity policy framework.

POLICY FRAMEWORK (id: english | arabic):
${policyList()}

SUBMISSION CONTEXT:
- Work title: ${ctx.title || "(untitled)"}
- Course: ${ctx.course || "(n/a)"}
- Student declared AI use: ${ctx.declaredAI ? "YES" : "NO"}
- Declared purpose: ${ctx.purpose || "(none)"}

STUDENT TEXT (excerpt):
"""${excerpt}"""

Analyse how likely this text was AI-generated and whether it complies with the policy. Consider: if AI was likely used but NOT declared, that violates S2 (students must declare AI assistance) and S5 (specify extent). If personal data appears, consider S16/S17.

Respond with STRICT JSON only, no prose, in this exact shape:
{
 "aiLikelihood": <integer 0-100>,
 "confidence": "<low|medium|high>",
 "verdict": "<compliant|needs_declaration|violation>",
 "summaryEn": "<one sentence>",
 "summaryAr": "<جملة واحدة>",
 "violatedPolicies": ["S2", ...],
 "suspiciousSentences": [{"text":"<verbatim sentence from the text>","reasonEn":"<short>","reasonAr":"<قصير>"}],
 "recommendationsEn": ["<action>", ...],
 "recommendationsAr": ["<إجراء>", ...]
}
Keep suspiciousSentences to at most 4, quoting verbatim. Keep arrays concise.`;

    try {
      const raw = await window.claude.complete({ messages: [{ role: "user", content: prompt }] });
      const m = raw.match(/\{[\s\S]*\}/);
      if (!m) return { ok: false, err: "parse", raw };
      const data = JSON.parse(m[0]);
      return { ok: true, data };
    } catch (e) {
      return { ok: false, err: "exception", msg: String(e) };
    }
  }

  /* ── 3 ·  ORCHESTRATION ──────────────────────────────────────── */
  function blendVerdict(aiLikelihood, declaredAI) {
    if (aiLikelihood >= 55 && !declaredAI) return "violation";
    if (aiLikelihood >= 35 && !declaredAI) return "needs_declaration";
    if (aiLikelihood >= 55 && declaredAI)  return "compliant"; // disclosed → ok
    return "compliant";
  }

  async function run(text, ctx, onPhase) {
    const h = heuristics(text);
    onPhase && onPhase("heuristics", h);

    onPhase && onPhase("ai_start");
    const ai = await aiAnalyze(text, ctx);

    // Final blend
    let aiLikelihood, verdict, source;
    if (ai.ok) {
      aiLikelihood = h.score != null
        ? Math.round(ai.data.aiLikelihood * 0.6 + h.score * 0.4)
        : ai.data.aiLikelihood;
      verdict = ai.data.verdict || blendVerdict(aiLikelihood, ctx.declaredAI);
      source = "ai+heuristics";
    } else {
      aiLikelihood = h.score != null ? h.score : 0;
      verdict = blendVerdict(aiLikelihood, ctx.declaredAI);
      source = "heuristics";
    }
    aiLikelihood = Math.max(0, Math.min(100, aiLikelihood));

    return {
      aiLikelihood, verdict, source,
      heuristic: h,
      ai: ai.ok ? ai.data : null,
      aiError: ai.ok ? null : ai.err,
      ctx, at: Date.now(),
    };
  }

  window.DETECT = { run, heuristics, aiAnalyze, splitSentences };
})();
