/* ═══════════════════════════════════════════════════════════════════
   SHARED COMPONENTS  ·  exports to window
═══════════════════════════════════════════════════════════════════ */
const { C, TIER } = window.NAV;

/* ── Stroke icon set (geometric, brand-aligned) ──────────────── */
function Glyph({ name, size = 24, stroke = "currentColor", width = 1.6, style }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke, strokeWidth: width, strokeLinecap: "round", strokeLinejoin: "round", style };
  const paths = {
    // domains
    disclosure: <><circle cx="12" cy="12" r="3.2"/><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z"/></>,
    author:     <><path d="M4 20h16"/><path d="M14.5 5.5l4 4L8 20l-4 1 1-4Z"/></>,
    shield:     <><path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6Z"/><path d="M9 12l2 2 4-4"/></>,
    lock:       <><rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>,
    book:       <><path d="M4 5.5A2 2 0 0 1 6 4h6v15H6a2 2 0 0 0-2 2Z"/><path d="M20 5.5A2 2 0 0 0 18 4h-6v15h6a2 2 0 0 1 2 2Z"/></>,
    crescent:   <><path d="M17.5 16.5A7 7 0 1 1 12 4.2a5.6 5.6 0 0 0 5.5 12.3Z"/><path d="M18.5 4.5l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6L16.2 6.8l1.6-.7Z"/></>,
    // roles
    student:    <><path d="M12 4 22 9l-10 5L2 9Z"/><path d="M6 11v4c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6v-4"/></>,
    faculty:    <><circle cx="12" cy="8" r="3.4"/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"/></>,
    research:   <><circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/></>,
    admin:      <><path d="M4 21V9l8-5 8 5v12"/><path d="M9 21v-6h6v6"/></>,
    // ui
    check:      <><path d="M4 12.5l5 5L20 6.5"/></>,
    alert:      <><path d="M12 3 22 20H2Z"/><path d="M12 10v4"/><path d="M12 17h.01"/></>,
    arrowR:     <><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>,
    arrowL:     <><path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/></>,
    compass:    <><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5Z"/></>,
    doc:        <><path d="M7 3h7l4 4v14H7Z"/><path d="M14 3v4h4"/><path d="M10 13h6M10 17h6"/></>,
    gauge:      <><path d="M4 18a8 8 0 1 1 16 0"/><path d="M12 18l4-5"/><circle cx="12" cy="18" r="1.3" fill={stroke}/></>,
    grid:       <><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></>,
    search:     <><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></>,
    copy:       <><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V6a2 2 0 0 1 2-2h10"/></>,
    print:      <><path d="M7 8V3h10v5"/><rect x="5" y="8" width="14" height="8" rx="1.5"/><path d="M7 16h10v5H7Z"/></>,
    globe:      <><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.4 2.5 15 0 18M12 3c-2.5 2.4-2.5 15 0 18"/></>,
    spark:      <><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><circle cx="12" cy="12" r="3"/></>,
    star:       <><path d="M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.9 6.7 19.5l1.1-6L3.4 9.3l6-.8Z"/></>,
    layers:     <><path d="M12 3 3 8l9 5 9-5Z"/><path d="M3 13l9 5 9-5"/></>,
    flag:       <><path d="M5 21V4"/><path d="M5 5h11l-2 3 2 3H5"/></>,
    info:       <><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 7.5h.01"/></>,
    close:      <><path d="M6 6l12 12M18 6L6 18"/></>,
    menu:       <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    play:       <><circle cx="12" cy="12" r="9"/><path d="M10 8.5l5 3.5-5 3.5Z" fill={stroke}/></>,
  };
  return <svg {...p}>{paths[name] || paths.spark}</svg>;
}

/* ── UTAS logo mark (real PNG) ───────────────────────────────── */
// Resolves to a bundled blob URL when standalone, else the relative asset.
function logoSrc() {
  return (window.__resources && window.__resources.utasLogo) || "assets/utas-logo.png";
}
function LogoMark({ size = 40 }) {
  return <img src={logoSrc()} alt="UTAS"
    style={{ width: size * 0.69, height: size, objectFit: "contain", display: "block" }} />;
}

/* ── Tier badge ──────────────────────────────────────────────── */
function TierBadge({ tier, lang = "en", size = "sm" }) {
  const cfg = TIER[tier];
  const pad = size === "sm" ? "3px 9px" : "5px 13px";
  const fs = size === "sm" ? 11 : 12.5;
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:6, padding:pad, borderRadius:99,
      fontSize:fs, fontWeight:600, letterSpacing:.2, background:cfg.bg, color:cfg.text,
      border:`1px solid ${cfg.border}33`, fontFamily:"'IBM Plex Sans Arabic',sans-serif",
    }}>
      <span style={{ width:6, height:6, borderRadius:99, background:cfg.dot }} />
      {cfg[lang]}
    </span>
  );
}

/* ── Pill (policy ref chip) ──────────────────────────────────── */
function RefChip({ id, onClick, active }) {
  return (
    <button onClick={onClick} style={{
      fontFamily:"'IBM Plex Mono',monospace", fontSize:12, fontWeight:600,
      padding:"3px 9px", borderRadius:7, cursor:onClick?"pointer":"default",
      background: active ? C.navy : C.cream, color: active ? C.white : C.navy,
      border:`1px solid ${active ? C.navy : C.line}`, transition:"all .18s", letterSpacing:.3,
    }}>{id}</button>
  );
}

/* ── Section eyebrow label ───────────────────────────────────── */
function Eyebrow({ children, color = C.orange }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
      <span style={{ width:26, height:2, background:color, borderRadius:2 }} />
      <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11.5, fontWeight:600,
        letterSpacing:2.5, textTransform:"uppercase", color }}>{children}</span>
    </div>
  );
}

/* ── Decorative real-logo watermark ─────────────────────────── */
function GeoMotif({ size = 200, opacity = 1, style }) {
  return (
    <img src={logoSrc()} alt="" width={size * 0.69} height={size}
      style={{ objectFit:"contain", display:"block", opacity, ...style }} />
  );
}

/* ── Bilingual text helper ──────────────────────────────────── */
function bi(obj, lang) { return obj && (obj[lang] ?? obj.en); }

/* ── Count-up animation hook ────────────────────────────────── */
function useCountUp(target, { duration = 1400, delay = 0, run = true } = {}) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!run) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setVal(target); return; }
    let raf, start;
    const t = setTimeout(() => {
      const tick = (now) => {
        if (!start) start = now;
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(eased * target));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [target, run]);
  return val;
}

/* ── Scroll reveal wrapper ──────────────────────────────────── */
function Reveal({ children, delay = 0, style, as = "div" }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const show = () => el.classList.add("in");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { show(); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { show(); io.unobserve(el); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    io.observe(el);
    // Safety fallback: guarantee visibility even if observer never fires.
    const fallback = setTimeout(show, 1600);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);
  const El = as;
  return <El ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms`, ...style }}>{children}</El>;
}

/* ── Pointer-parallax wrapper (gentle) ──────────────────────── */
function useParallax(strength = 14) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const parent = el.closest("[data-parallax-root]") || el.parentElement;
    const onMove = (e) => {
      const r = parent.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => { el.style.transform = "translate(0,0)"; };
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => { parent.removeEventListener("mousemove", onMove); parent.removeEventListener("mouseleave", onLeave); };
  }, [strength]);
  return ref;
}

/* ── Shared heading styles (used across modules) ────────────── */
const hHead = { fontFamily:"'Newsreader',serif", fontSize:"clamp(24px,3.2vw,32px)", fontWeight:600,
  color:C.ink, marginBottom:8, letterSpacing:-.5, lineHeight:1.2 };
const hSub = { fontSize:14.5, color:C.slate, marginBottom:26, lineHeight:1.55 };

Object.assign(window, { Glyph, LogoMark, GeoMotif, logoSrc, TierBadge, RefChip, Eyebrow, bi, hHead, hSub, useCountUp, Reveal, useParallax });
