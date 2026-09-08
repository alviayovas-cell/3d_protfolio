import { useFrame } from "@react-three/fiber";
import type { ReactNode } from "react";
import { useRef } from "react";
import * as THREE from "three";

interface ParallaxGroupProps {
  parallax: { x: number; y: number };
  children: ReactNode;
}

/** Eases the whole scene's rotation toward the cursor's offset — the "background moves slowly" depth cue. */
export function ParallaxGroup({ parallax, children }: ParallaxGroupProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;
    const targetY = (parallax.x / 100) * 0.25;
    const targetX = (parallax.y / 100) * -0.15;
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetY, 0.04);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetX, 0.04);
  });

  return <group ref={groupRef}>{children}</group>;
}
