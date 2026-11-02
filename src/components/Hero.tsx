import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, Command } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolio";
import { Magnetic } from "@/components/fx";
import { scrollToId } from "@/lib/site";
import { Button } from "@/components/ui/button";

const HeroOrb = lazy(() => import("@/components/HeroOrb"));

export function Hero({ onOpenPalette }: { onOpenPalette: () => void }) {
  const reduce = useReducedMotion();
  const [role, setRole] = useState(0);
  const [use3d, setUse3d] = useState(false);
  const spot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ok = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches;
    setUse3d(ok);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setRole((r) => (r + 1) % profile.roles.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden px-4 pb-10 pt-28 md:px-10"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !spot.current) return;
        spot.current.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
      }}
    >
      <div aria-hidden className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div aria-hidden className="aurora absolute inset-0" />
      <div ref={spot} aria-hidden className="pointer-events-none absolute left-0 top-0 hidden size-[600px] rounded-full bg-cyan/10 blur-3xl md:block" />

      {/* Orb / static fallback */}
      <div className="absolute right-[-15%] top-[10%] size-[90vw] max-w-[720px] md:right-[-4%] md:top-[6%] md:size-[58vw]">
        {use3d ? (
          <Suspense fallback={null}><HeroOrb /></Suspense>
        ) : (
          <div aria-hidden className="absolute inset-[15%] rounded-full border border-violet/30 [background:radial-gradient(circle_at_35%_30%,color-mix(in_oklab,var(--cyan)_30%,transparent),transparent_60%)]" />
        )}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {profile.available && (
            <span className="inline-flex items-center gap-2 rounded-full border border-spark/40 px-3 py-1 font-mono text-xs text-spark">
              <span className="size-1.5 rounded-full bg-spark" /> [ available for work ]
            </span>
          )}
          <span className="label-mono">{profile.location}</span>
        </div>

        <p className="mb-5 font-display text-2xl font-semibold">{profile.name}</p>
        <h1 className="hero-headline font-display font-bold leading-[1.05]">
          {profile.headline.map((w, i) => (
            <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className={`inline-block ${i === 3 ? "text-gradient" : i === 4 ? "text-outline" : ""}`}
                initial={reduce ? false : { y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 border-t pt-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-xl">
            <p className="mb-3 flex items-start gap-2 font-mono text-base">
              <span className="text-cyan">&gt;</span>
              <span className="relative inline-block min-w-0">
                <AnimatePresence mode="wait">
                  <motion.span key={role} className="inline-block text-foreground" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }}>
                    {profile.roles[role]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </p>
            <p className="text-lg text-muted-foreground">{profile.intro}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <Button onClick={() => scrollToId("work")} className="group h-auto inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3.5 font-medium text-primary-foreground transition-shadow hover:glow-cyan">
                See the work <ArrowDownRight className="size-4 transition-transform group-hover:rotate-[-45deg]" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button variant="outline" onClick={() => scrollToId("contact")} className="h-auto inline-flex items-center gap-2 rounded-full border px-6 py-3.5 font-medium hover:border-foreground/40">
                Get in touch
              </Button>
            </Magnetic>
            <button onClick={onOpenPalette} className="hidden items-center gap-1 self-center font-mono text-xs text-muted-foreground md:inline-flex" aria-label="Open command palette">
              or press <kbd className="rounded border px-1.5 py-0.5"><Command className="inline size-3" />K</kbd>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
