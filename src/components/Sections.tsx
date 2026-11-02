import { motion, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight, Github, Loader2, Mail, CheckCircle2, AlertCircle, Database, Code2, Globe, ShieldCheck, Wrench } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  about, experience, github, marquee, process, profile, projects, skills, socials, type Project,
} from "@/data/portfolio";
import { Reveal, SectionHeader } from "@/components/fx";
import { Button } from "@/components/ui/button";
import { submitContact, validateContact, type ContactErrors } from "@/lib/contact";

const wrap = "mx-auto w-full max-w-7xl px-4 md:px-10";
const section = "relative scroll-mt-20 border-t py-24 md:py-36";

export function About() {
  return (
    <section id="about" tabIndex={-1} className={section}>
      <div className={wrap}>
        <SectionHeader n="01" label="About" title="About Me" />
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            {about.paragraphs.map((p) => <p key={p} className="mb-5 text-base leading-relaxed md:text-lg">{p}</p>)}
            <ul className="flex flex-wrap gap-2">
              {about.strengths.map((strength) => <li key={strength} className="rounded-full border px-3 py-1 text-sm">{strength}</li>)}
            </ul>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {about.facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.06} className="rounded-lg border bg-surface p-5">
                <p className="label-mono mb-2">{f.label}</p>
                <p className="font-display text-base font-semibold">{f.value}</p>
                {f.note && <p className="mt-2 text-base text-muted-foreground">{f.note}</p>}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function NameBanner() {
  return <div className="border-t py-10 md:py-14"><div className={wrap}><p className="name-banner text-outline font-display font-bold leading-tight">{profile.name}</p></div></div>;
}

export function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div className="overflow-hidden border-t py-5" aria-label="Tech stack">
      {[false, true].map((rev) => (
        <div key={String(rev)} className="flex overflow-hidden py-1">
          <ul className={`marquee-track flex shrink-0 gap-6 pr-6 ${rev ? "marquee-reverse" : ""}`}>
            {row.map((t, i) => (
              <li key={i} aria-hidden={i >= marquee.length} className={`whitespace-nowrap font-display text-2xl font-bold md:text-4xl ${rev ? "text-outline" : ""}`}>
                {t} <span className="text-cyan">✦</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function Skills() {
  const reduce = useReducedMotion();
  const icons = { Database, Programming: Code2, Web: Globe, "Quality & Process": ShieldCheck, Tools: Wrench };
  return (
    <section id="skills" tabIndex={-1} className={section}>
      <div className={wrap}>
        <SectionHeader n="02" label="Skills" title="The toolkit." />
        <div className="grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-3">
          {skills.map((g, gi) => { const Icon = icons[g.group]; return (
            <div key={g.group} className="bg-background p-6 md:p-8">
              <p className="label-mono mb-6"><span className="text-cyan">0{gi + 1}</span> — {g.group}</p>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s, i) => (
                  <motion.li
                    key={s}
                    initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: reduce ? 0 : i * 0.05 }}
                    className="inline-flex max-w-full items-center gap-2 rounded-full border bg-surface px-3 py-1.5 font-mono text-sm transition-colors hover:border-cyan hover:text-cyan"
                  >
                    <Icon aria-hidden className="size-4 shrink-0" /><span>{s}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          ); })}
        </div>
      </div>
    </section>
  );
}

function LinkBtn({ href, label, icon }: { href?: string | undefined; label: string; icon: React.ReactNode }) {
  if (!href || !/^https?:\/\//.test(href)) return null;
  return (
    <Button asChild variant="outline" className="h-auto rounded-full"><a href={href} target="_blank" rel="noopener noreferrer" className="group/btn inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs transition-colors hover:border-cyan hover:bg-cyan hover:text-primary-foreground">
      {icon} {label} <ArrowUpRight className="size-3 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
    </a></Button>
  );
}

function ProjectCard({ p, i, big }: { p: Project; i: number; big?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    if (!reduce) el.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 8}deg)`;
  };
  return (
    <article
      ref={ref}
      data-cursor="view"
      onPointerMove={onMove}
      onPointerLeave={() => ref.current && (ref.current.style.transform = "")}
      onClick={(e) => { if ((e.nativeEvent as PointerEvent).pointerType === "touch") setRevealed((r) => !r); }}
      data-revealed={revealed}
      className={`group relative overflow-hidden rounded-lg border bg-surface p-px transition-transform duration-200 ease-out ${big ? "md:col-span-2" : ""}`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 [background:radial-gradient(400px_circle_at_var(--mx,50%)_var(--my,50%),color-mix(in_oklab,var(--cyan)_45%,transparent),transparent_60%)]" />
      <div className="relative h-full rounded-[calc(var(--radius)+3px)] bg-surface p-5 md:p-6">
        {/* Mockup frame */}
        <div className="mb-6 overflow-hidden rounded-xl border bg-background">
          <div className="flex items-center gap-1.5 border-b px-3 py-2">
            <span className="size-2 rounded-full bg-muted" /><span className="size-2 rounded-full bg-muted" /><span className="size-2 rounded-full bg-muted" />
            <span className="ml-3 truncate font-mono text-[10px] text-muted-foreground">{p.title.toLowerCase().replace(/\s/g, "-")}</span>
          </div>
          <div className={`relative grid place-items-center overflow-hidden ${big ? "aspect-[16/8]" : "aspect-[16/10]"}`}>
            {p.image ? (
              <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="project-mockup flex size-full items-center justify-center p-5 transition-transform duration-700 group-hover:scale-105">
                <span className="text-outline text-center font-display text-3xl font-bold md:text-5xl break-words">{p.title}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="label-mono mb-2"><span className="text-cyan">{String(i + 1).padStart(2, "0")}</span> — {p.tag}</p>
            <h3 className="font-display text-3xl font-bold">{p.title}</h3>
          </div>
        </div>
        {p.description && <p className="mt-3 text-base text-muted-foreground">{p.description}</p>}
        {p.stack.length > 0 && <ul className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.map((s) => <li key={s} className="rounded border px-2 py-0.5 font-mono text-xs">{s}</li>)}
        </ul>}
        {(p.live || p.github) && <div className="mt-5 flex flex-wrap gap-2 transition-[opacity,transform] duration-300 md:translate-y-2 md:opacity-70 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 group-data-[revealed=true]:opacity-100">
          <LinkBtn href={p.live} label="Live" icon={<ArrowUpRight className="size-3" />} />
          <LinkBtn href={p.github} label="GitHub" icon={<Github className="size-3" />} />
        </div>}
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="work" tabIndex={-1} className={section}>
      <div className={wrap}>
        <SectionHeader n="03" label="Featured work" title="Selected" outline="projects." />
        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05} className={i === 0 ? "md:col-span-2" : i === 3 ? "md:col-span-2" : ""}>
              <ProjectCard p={p} i={i} />
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

export function Process() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ok = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches;
    if (!ok || !pinRef.current || !trackRef.current) return;
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const track = trackRef.current;
        if (!track) return;
        const dist = () => track.scrollWidth - window.innerWidth + 80;
        gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: { trigger: pinRef.current, start: "top top", end: () => `+=${Math.min(dist(), window.innerHeight)}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
        });
      }, pinRef);
    })();
    return () => ctx?.revert();
  }, []);
  return (
    <section id="process" tabIndex={-1} className="relative scroll-mt-20 border-t">
      <div ref={pinRef} className="flex min-h-svh flex-col justify-center overflow-hidden py-14">
        <div className={wrap}><SectionHeader n="04" label="Process" title="How I work." /></div>
        <div ref={trackRef} className="flex flex-col gap-4 px-4 md:px-10 lg:w-max lg:flex-row">
          {process.map((s) => (
            <div key={s.n} className="relative flex min-h-64 flex-col justify-between rounded-lg border bg-surface p-8 lg:w-[34vw]">
              <span className="text-outline font-display text-7xl font-bold">{s.n}</span>
              <div>
                <h3 className="mb-2 font-display text-3xl font-bold">{s.title}</h3>
                <p className="text-muted-foreground">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 50%"] });
  return (
    <section id="experience" tabIndex={-1} className={section}>
      <div className={wrap}>
        <SectionHeader n="05" label="Experience & education" title="The path." />
        <ol ref={ref} className="relative ml-2 border-l border-transparent md:ml-[25%]">
          <span aria-hidden className="absolute -left-px top-0 h-full w-px bg-border" />
          <motion.span aria-hidden className="absolute -left-px top-0 h-full w-px origin-top bg-cyan" style={{ scaleY: scrollYProgress }} />
          {experience.map((e, i) => (
            <li key={i} className="relative pb-14 pl-8 last:pb-0 md:pl-12">
              <span aria-hidden className="absolute -left-[5px] top-2 size-2.5 rounded-full border border-cyan bg-background" />
              <Reveal>
                <p className="label-mono mb-2">{e.period ? `${e.period} · ` : ""}{e.kind}</p>
                <h3 className="font-display text-2xl font-bold md:text-3xl">{e.title}</h3>
                <p className="mb-2 text-cyan">{e.org}</p>
                {e.bullets.length > 0 && <ul className="max-w-xl list-disc space-y-3 pl-5 text-base text-muted-foreground">{e.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Proof() {
  return (
    <section id="proof" tabIndex={-1} className={section}>
      <div className={wrap}>
        <SectionHeader n="06" label="GitHub" title="On GitHub." />
        <div className="max-w-md rounded-lg border bg-surface p-8">
          <Github className="mb-6 size-8" />
          <p className="mb-6 font-display text-2xl font-bold">@{github.username}</p>
          <Button asChild variant="outline" className="rounded-full"><a href={github.url} target="_blank" rel="noopener noreferrer">View profile <ArrowUpRight className="size-4" /></a></Button>
        </div>
      </div>
    </section>
  );
}

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [v, setV] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateContact(v);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus("loading");
    try {
      await submitContact(profile.formspreeEndpoint, v);
      setStatus("success");
      setMsg("Thanks — your message was sent. I'll reply soon.");
      setV({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const field = (k: keyof typeof v, label: string, type = "text") => (
    <div>
      <label htmlFor={`f-${k}`} className="label-mono mb-2 block">{label}</label>
      {k === "message" ? (
        <textarea id={`f-${k}`} rows={5} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} onBlur={() => v[k] && setErrors((x) => ({ ...x, [k]: validateContact(v)[k] }))}
          aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `e-${k}` : undefined}
          className="w-full resize-none rounded-xl border bg-background px-4 py-3 text-base outline-none transition-colors focus:border-cyan aria-[invalid=true]:border-destructive" />
      ) : (
        <input id={`f-${k}`} type={type} value={v[k]} autoComplete={k} onChange={(e) => setV({ ...v, [k]: e.target.value })} onBlur={() => v[k] && setErrors((x) => ({ ...x, [k]: validateContact(v)[k] }))}
          aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `e-${k}` : undefined}
          className="w-full rounded-xl border bg-background px-4 py-3 text-base outline-none transition-colors focus:border-cyan aria-[invalid=true]:border-destructive" />
      )}
      {errors[k] && <p id={`e-${k}`} className="mt-1.5 text-sm text-destructive">{errors[k]}</p>}
    </div>
  );

  return (
    <section id="contact" tabIndex={-1} className={section}>
      <div className={wrap}>
        <SectionHeader n="08" label="Contact" title="Let's build" outline="something." />
        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
          <div>
            <a href={`mailto:${profile.email}`} className="group inline-flex items-center gap-3 min-w-0 font-display text-base font-bold hover:text-cyan md:text-xl break-all">
              <Mail className="size-5 shrink-0" /> <span>{profile.email}</span>
            </a>
            <p className="mt-4 text-base text-muted-foreground">{profile.location}</p>
            <ul className="mt-8 grid gap-2">
              {socials.map((s) => (
                <li key={s.label} className="flex items-center justify-between border-b py-3">
                  <span className="font-mono text-sm">{s.label}</span>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline" aria-label={s.label}><ArrowUpRight className="size-4" /></a>
                  ) : <span className="font-mono text-xs text-muted-foreground">Add your {s.label} link</span>}
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-lg border bg-surface p-6 md:p-8">
            {field("name", "Name")}
            {field("email", "Email", "email")}
            {field("message", "Message")}
            <Button type="submit" disabled={status === "loading"} className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan px-6 py-3.5 font-medium text-primary-foreground transition-shadow hover:glow-cyan disabled:opacity-60">
              {status === "loading" ? <><Loader2 className="size-4 animate-spin" /> Sending…</> : "Send message"}
            </Button>
            <div aria-live="polite">
              {status === "success" && <p className="flex items-center gap-2 text-spark"><CheckCircle2 className="size-4" /> {msg}</p>}
              {status === "error" && <p className="flex items-start gap-2 text-destructive"><AlertCircle className="mt-0.5 size-4 shrink-0" /> {msg}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t">
      <div className={`${wrap} py-10`}>
        <p className="font-display text-2xl font-bold">{profile.name}</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-base text-muted-foreground"><a href={`mailto:${profile.email}`} className="break-all hover:text-cyan">{profile.email}</a>{socials.map((s) => <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-cyan">{s.label}</a>)}<span>{profile.location}</span></div>
        <div className="mt-6 flex flex-wrap justify-between gap-4 label-mono">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Built with React · Three.js · care</span>
        </div>
      </div>
    </footer>
  );
}
