import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"idle" | "hover" | "view">("idle");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 300, damping: 28 });
  const ry = useSpring(y, { stiffness: 300, damping: 28 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      const t = e.target as HTMLElement;
      if (t.closest("[data-cursor='view']")) setMode("view");
      else if (t.closest("a,button,input,textarea,[role='button']")) setMode("hover");
      else setMode("idle");
    };
    window.addEventListener("pointermove", move);
    return () => { window.removeEventListener("pointermove", move); document.body.classList.remove("has-cursor"); };
  }, [x, y]);

  if (!enabled) return null;
  const size = mode === "view" ? 84 : mode === "hover" ? 48 : 32;
  return (
    <>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-spark" style={{ x, y }} />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full border border-cyan font-mono text-[10px] uppercase tracking-widest text-cyan"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: size, height: size, backgroundColor: mode === "view" ? "color-mix(in oklab, var(--background) 70%, transparent)" : "transparent" }}
      >
        {mode === "view" && "View"}
      </motion.div>
    </>
  );
}
