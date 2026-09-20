import { Float } from "@react-three/drei";

type GeometryKind = "icosahedron" | "torus" | "octahedron";

interface ShapeConfig {
  position: [number, number, number];
  scale: number;
  geometry: GeometryKind;
  color: string;
  speed: number;
}

/** Fixed, hand-placed so they read as intentional accents rather than random clutter. */
const ALL_SHAPES: ShapeConfig[] = [
  { position: [-3.2, 1.1, -2], scale: 0.55, geometry: "icosahedron", color: "#3d3d3d", speed: 1.1 },
  { position: [3.4, -0.8, -1.5], scale: 0.4, geometry: "torus", color: "#4a4a4a", speed: 0.9 },
  { position: [-2.6, -1.6, -3], scale: 0.3, geometry: "octahedron", color: "#5a5a5a", speed: 1.3 },
  { position: [2.8, 1.8, -2.5], scale: 0.35, geometry: "icosahedron", color: "#4a4a4a", speed: 1.0 },
  { position: [0.2, -2.2, -1.8], scale: 0.25, geometry: "octahedron", color: "#3d3d3d", speed: 1.2 },
];

interface FloatingShapesProps {
  /** How many of ALL_SHAPES to render — lower on mobile to keep the scene light. */
  count: number;
}

function Shape({ position, scale, geometry, color, speed }: ShapeConfig) {
  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.1}>
      <mesh position={position} scale={scale}>
        {geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
        {geometry === "torus" && <torusGeometry args={[0.8, 0.28, 12, 32]} />}
        {geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.55}
          emissive={color}
          emissiveIntensity={0.35}
        />
      </mesh>
    </Float>
  );
}

/** A handful of low-poly wireframe accents drifting at mid-depth — atmosphere, not a demo. */
export function FloatingShapes({ count }: FloatingShapesProps) {
  return (
    <>
      {ALL_SHAPES.slice(0, count).map((shape, i) => (
        <Shape key={i} {...shape} />
      ))}
    </>
  );
}
