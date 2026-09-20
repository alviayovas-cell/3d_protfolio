import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { FloatingShapes } from "./FloatingShapes";
import { ParallaxGroup } from "./ParallaxGroup";
import { ParticleField } from "./ParticleField";

interface HeroSceneProps {
  parallax: { x: number; y: number };
}

/**
 * The hero's 3D layer: a soft dust field plus a few floating low-poly
 * accents, gently parallaxed by the cursor. Kept deliberately light —
 * one particle draw call, a handful of meshes, no shadows/post-processing.
 */
export function HeroScene({ parallax }: HeroSceneProps) {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const particleCount = isMobile ? 70 : 220;
  const shapeCount = isMobile ? 2 : 5;

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 4]} intensity={45} color="#4a4a4a" />
      <pointLight position={[-4, -2, 2]} intensity={30} color="#2e2e2e" />
      <Suspense fallback={null}>
        <ParallaxGroup parallax={parallax}>
          <ParticleField count={particleCount} />
          <FloatingShapes count={shapeCount} />
        </ParallaxGroup>
      </Suspense>
    </Canvas>
  );
}
