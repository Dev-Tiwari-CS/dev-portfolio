import Lenis from "lenis";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, Command, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profile, sections } from "@/data/portfolio";
import { scrollToId, setLenis, toggleTheme } from "@/lib/site";
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/components/ui/command";
import { toast } from "sonner";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1 });
    setLenis(lenis);
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => lenis.on("scroll", ScrollTrigger.update));
    return () => { cancelAnimationFrame(raf); lenis.destroy(); setLenis(null); };
  }, []);
  return null;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-cyan" style={{ scaleX }} />;
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 900);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button
      aria-label="Back to top"
      onClick={() => scrollToId("top")}
      className={`fixed bottom-6 right-6 z-50 grid size-12 place-items-center rounded-full border bg-surface transition-[opacity,transform] duration-300 hover:glow-cyan ${show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <ArrowUp className="size-4" />
    </button>
  );
}

function useTheme() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const read = () => setLight(document.documentElement.classList.contains("light"));
    read();
    window.addEventListener("themechange", read);
    return () => window.removeEventListener("themechange", read);
  }, []);
  return light;
}

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return active;
}

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const active = useActiveSection();
  const light = useTheme();
  const [open, setOpen] = useState(false);
  const go = (id: string) => { setOpen(false); scrollToId(id); };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
      <nav aria-label="Main" className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-2.5">
        <button onClick={() => go("top")} className="font-mono text-sm font-bold" aria-label="Back to top">
          {profile.initials}<span className="text-spark">.</span>
        </button>
        <ul className="hidden items-center gap-1 lg:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => go(s.id)}
                aria-current={active === s.id ? "true" : undefined}
                className={`relative rounded-full px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${active === s.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {active === s.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full border border-cyan/40 bg-cyan/10" />
                )}
                {s.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1.5">
          <button onClick={onOpenPalette} className="hidden items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs text-muted-foreground hover:text-foreground sm:flex" aria-label="Open command palette">
            <Command className="size-3" /> K
          </button>
          <button onClick={toggleTheme} className="grid size-9 place-items-center rounded-full border" aria-label={light ? "Switch to dark theme" : "Switch to light theme"}>
            {light ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </button>
          <button onClick={() => setOpen((o) => !o)} className="grid size-9 place-items-center rounded-full border lg:hidden" aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="glass mx-auto mt-2 max-w-7xl rounded-3xl border p-4 lg:hidden">
          <ul className="grid gap-1">
            {sections.map((s, i) => (
              <li key={s.id}>
                <button onClick={() => go(s.id)} className="flex w-full items-baseline gap-3 rounded-xl px-3 py-3 text-left font-display text-2xl font-bold hover:bg-accent">
                  <span className="label-mono">0{i + 1}</span>{s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (o: boolean) => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(!open); }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, setOpen]);
  const run = (fn: () => void) => { setOpen(false); setTimeout(fn, 50); };
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Jump to">
          {sections.map((s) => (
            <CommandItem key={s.id} onSelect={() => run(() => scrollToId(s.id))}>{s.label}</CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => run(toggleTheme)}>Toggle theme</CommandItem>
          {profile.resumeUrl && <CommandItem onSelect={() => run(() => window.open(profile.resumeUrl, "_blank", "noopener"))}>Open resume</CommandItem>}
          <CommandItem
            onSelect={() => run(async () => {
              try { await navigator.clipboard.writeText(profile.email); toast.success("Email copied"); }
              catch { toast.error("Couldn't copy — email is " + profile.email); }
            })}
          >
            Copy email
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
