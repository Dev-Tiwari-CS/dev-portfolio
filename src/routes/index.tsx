import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Preloader } from "@/components/Preloader";
import { Cursor } from "@/components/Cursor";
import { BackToTop, CommandPalette, Navbar, ScrollProgress, SmoothScroll } from "@/components/Chrome";
import { Hero } from "@/components/Hero";
import { About, Contact, Experience, Footer, Marquee, NameBanner, Process, Projects, Proof, Skills } from "@/components/Sections";
import { profile } from "@/data/portfolio";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — Software Developer` },
      { name: "description", content: profile.intro },
      { property: "og:title", content: `${profile.name} — Software Developer` },
      { property: "og:description", content: profile.intro },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [palette, setPalette] = useState(false);
  return (
    <div className="grain">
      <a href="#main" className="sr-only z-[110] rounded-full bg-cyan px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Preloader />
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <Navbar onOpenPalette={() => setPalette(true)} />
      <CommandPalette open={palette} setOpen={setPalette} />
      <main id="main">
        <Hero onOpenPalette={() => setPalette(true)} />
        <About />
        <NameBanner />
        <Marquee />
        <Skills />
        <Projects />
        <Process />
        <Experience />
        <Proof />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Toaster />
    </div>
  );
}
