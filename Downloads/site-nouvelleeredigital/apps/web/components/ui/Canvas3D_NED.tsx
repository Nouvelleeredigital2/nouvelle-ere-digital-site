"use client";

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { OrbitControls, Text, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface PlanetProps {
  position: [number, number, number];
  color: string;
  name: string;
  onClick?: () => void;
}

function Planet({ position, color, name, onClick }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      if (hovered) {
        meshRef.current.scale.setScalar(1.2);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </mesh>
      <Suspense fallback={null}>
        <Text position={[0, -1, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
          {name}
        </Text>
      </Suspense>
    </group>
  );
}

function OrbitingPlanets() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  const planets = [
    { name: "Communication", color: "#ff6b6b", position: [3, 0, 0] },
    { name: "Audiovisuel", color: "#4ecdc4", position: [0, 3, 0] },
    { name: "Événementiel", color: "#ffd93d", position: [-3, 0, 0] },
    { name: "Design", color: "#ff6b6b", position: [0, -3, 0] },
    { name: "Web", color: "#4ecdc4", position: [2, 2, 0] },
    { name: "IA", color: "#ffd93d", position: [-2, -2, 0] },
  ];

  return (
    <group ref={groupRef}>
      {planets.map((planet, index) => (
        <Planet
          key={index}
          position={planet.position as [number, number, number]}
          color={planet.color}
          name={planet.name}
          onClick={() => console.log(`Clicked on ${planet.name}`)}
        />
      ))}
    </group>
  );
}

interface Canvas3D_NEDProps {
  width?: string | number;
  height?: string | number;
  services?: Array<{
    name: string;
    color: number;
    colorHex: string;
    desc: string;
    position: [number, number, number];
    features: string[];
  }>;
  className?: string;
}

export const Canvas3D_NED: React.FC<Canvas3D_NEDProps> = ({
  width = "100%",
  height = 400,
  className = "",
}) => {
  return (
    <div style={{ width, height }} className={className}>
      <Suspense fallback={<div>Loading 3D Scene...</div>}>
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          <OrbitingPlanets />
        </Canvas>
      </Suspense>
    </div>
  );
};
