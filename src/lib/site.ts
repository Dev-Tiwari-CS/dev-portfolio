import type Lenis from "lenis";

let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => (lenis = l);
export const getLenis = () => lenis;

export function scrollToId(id: string) {
  const el = id === "top" ? document.body : document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(id === "top" ? 0 : el, { offset: -72 });
  else if (id === "top") window.scrollTo({ top: 0 });
  else el.scrollIntoView();
  if (id !== "top") (el as HTMLElement).focus?.({ preventScroll: true });
}

export function toggleTheme() {
  const isLight = document.documentElement.classList.toggle("light");
  try { localStorage.setItem("theme", isLight ? "light" : "dark"); } catch {}
  window.dispatchEvent(new Event("themechange"));
  return isLight;
}

export function initTheme() {
  try { if (localStorage.getItem("theme") === "light") document.documentElement.classList.add("light"); } catch {}
}
