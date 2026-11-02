import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function readColor(v: string) {
  const c = getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  const probe = document.createElement("span");
  probe.style.color = c;
  document.body.appendChild(probe);
  const rgb = getComputedStyle(probe).color;
  probe.remove();
  const m = (rgb.match(/[\d.]+/g)?.map(Number) ?? [34, 211, 238]) as [number, number, number];
  return new THREE.Color(m[0] / 255, m[1] / 255, m[2] / 255);
}

function Orb({ cyan, violet }: { cyan: THREE.Color; violet: THREE.Color }) {
  const group = useRef<THREE.Group>(null);
  const COUNT = 1400;
  const geo = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      pos.set([Math.cos(th) * r * 2, y * 2, Math.sin(th) * r * 2], i * 3);
      const c = cyan.clone().lerp(violet, (y + 1) / 2);
      col.set([c.r, c.g, c.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, [cyan, violet]);

  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.05);
    const g = group.current;
    if (!g) return;
    g.rotation.y += dt * 0.15;
    const k = 1 - Math.exp(-3 * dt);
    g.rotation.x += (state.pointer.y * 0.4 - g.rotation.x) * k;
    g.rotation.z += (-state.pointer.x * 0.3 - g.rotation.z) * k;
  });

  return (
    <group ref={group}>
      <points geometry={geo}>
        <pointsMaterial size={0.025} vertexColors transparent opacity={0.9} sizeAttenuation />
      </points>
      <mesh>
        <icosahedronGeometry args={[1.55, 2]} />
        <meshBasicMaterial color={violet} wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

export default function HeroOrb() {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [colors, setColors] = useState<{ cyan: THREE.Color; violet: THREE.Color } | null>(null);

  useEffect(() => {
    const read = () => setColors({ cyan: readColor("--cyan"), violet: readColor("--violet") });
    read();
    window.addEventListener("themechange", read);
    let visible = true, onScreen = true;
    const update = () => setActive(visible && onScreen);
    const vis = () => { visible = !document.hidden; update(); };
    document.addEventListener("visibilitychange", vis);
    const io = new IntersectionObserver(([e]) => { onScreen = !!e?.isIntersecting; update(); });
    if (wrap.current) io.observe(wrap.current);
    return () => { window.removeEventListener("themechange", read); document.removeEventListener("visibilitychange", vis); io.disconnect(); };
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden>
      {colors && (
        <Canvas dpr={[1, 1.5]} frameloop={active ? "always" : "never"} camera={{ position: [0, 0, 5.2], fov: 50 }} gl={{ antialias: false, alpha: true }}>
          <Orb cyan={colors.cyan} violet={colors.violet} />
        </Canvas>
      )}
    </div>
  );
}
