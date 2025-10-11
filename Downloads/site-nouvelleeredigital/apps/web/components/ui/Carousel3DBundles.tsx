import React, { useRef, useState } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';
import * as THREE from 'three';

interface Bundle {
  id: string;
  name: string;
  description: string;
  modules: string[];
  price: number;
  discount: number;
  color: string;
}

interface BundleCard3DProps {
  bundle: Bundle;
  position: [number, number, number];
  onClick?: () => void;
}

function BundleCard3D({ bundle, position, onClick }: BundleCard3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      if (hovered) {
        meshRef.current.scale.setScalar(1.1);
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
        <boxGeometry args={[2, 3, 0.2]} />
        <meshStandardMaterial
          color={hovered ? bundle.color : '#ffffff'}
          emissive={bundle.color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
      <Text
        position={[0, 2, 0.15]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {bundle.name}
      </Text>
      <Text
        position={[0, 1.5, 0.15]}
        fontSize={0.15}
        color="gray"
        anchorX="center"
        anchorY="middle"
      >
        {bundle.price}€ (-{bundle.discount}%)
      </Text>
      <Text
        position={[0, 1, 0.15]}
        fontSize={0.1}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {bundle.description}
      </Text>
    </group>
  );
}

function Carousel3D({ bundles, onBundleSelect }: { bundles: Bundle[]; onBundleSelect?: (bundle: Bundle) => void }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  const radius = 5;
  const positions: [number, number, number][] = bundles.map((_, index) => {
    const angle = (index / bundles.length) * Math.PI * 2;
    return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
  });

  return (
    <group ref={groupRef}>
      {bundles.map((bundle, index) => (
        <BundleCard3D
          key={bundle.id}
          bundle={bundle}
          position={positions[index]}
          onClick={() => onBundleSelect?.(bundle)}
        />
      ))}
    </group>
  );
}

interface Carousel3DBundlesProps {
  bundles: Bundle[];
  onSelect?: (bundle: Bundle) => void;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Carousel3DBundles: React.FC<Carousel3DBundlesProps> = ({
  bundles,
  onSelect,
  width = '100%',
  height = 400,
  className = '',
}) => {
  return (
    <div style={{ width, height }} className={className}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <Carousel3D bundles={bundles} onBundleSelect={onSelect} />
      </Canvas>
    </div>
  );
};
