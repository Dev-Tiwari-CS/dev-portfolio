import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [show, setShow] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try { seen = sessionStorage.getItem("preloaded") === "1"; sessionStorage.setItem("preloaded", "1"); } catch {}
    if (reduce || seen) return;
    setShow(true);
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1600);
      setN(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 250);
    };
    raf = requestAnimationFrame(tick);
    const skip = () => setShow(false);
    window.addEventListener("keydown", skip);
    const hard = setTimeout(skip, 2500);
    return () => { cancelAnimationFrame(raf); clearTimeout(hard); window.removeEventListener("keydown", skip); };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-label="Loading"
          onClick={() => setShow(false)}
          className="fixed inset-0 z-[100] flex flex-col justify-end bg-background p-6 md:p-12"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-end justify-between">
            <span className="label-mono">[ booting portfolio ] — click to skip</span>
            <span className="font-display text-7xl font-bold tabular-nums md:text-[10rem]">{n}</span>
          </div>
          <div className="mt-4 h-px w-full bg-border">
            <div className="h-px origin-left bg-cyan glow-cyan" style={{ transform: `scaleX(${n / 100})` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
