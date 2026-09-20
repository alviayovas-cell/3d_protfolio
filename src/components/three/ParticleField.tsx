import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface ParticleFieldProps {
  count: number;
}

/** Deterministic 32-bit PRNG (mulberry32), seeded so the field is reproducible. */
function makeRandom(seed: number) {
  let state = seed + 0x6d2b79f5;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A soft drifting dust field rendered as a single Points draw call. Particles
 * are scattered through a deep spherical volume so perspective alone reads
 * as depth — no need to hand-author separate "layers".
 */
export function ParticleField({ count }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    // Seeded rather than Math.random: the scatter is decorative, but `useMemo` may
    // re-run, and re-randomising would make the dust field visibly jump. A pure
    // generator keeps it identical every time — and keeps the render pure.
    const random = makeRandom(count);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3 + random() * 6;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = radius * Math.cos(phi) - 2;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.rotation.x += delta * 0.004;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#3d3d3d"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        // Additive blending brightens toward white — invisible on a light page.
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
