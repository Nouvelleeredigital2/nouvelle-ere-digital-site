"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ServicePole {
  name: string;
  color: number;
  colorHex: string;
  desc: string;
  position: [number, number, number];
  features: string[];
}

interface Universe3DProps {
  services?: ServicePole[];
  className?: string;
}

export function Universe3D({
  className = "",
  services = [
    {
      name: "Communication",
      color: 0xf87171,
      colorHex: "#f87171",
      desc: "Stratégies créatives & storytelling digital",
      position: [0, 10, 0],
      features: ["SEO/SEA", "Réseaux sociaux", "Content marketing", "Analytics"],
    },
    {
      name: "Audiovisuel",
      color: 0x60a5fa,
      colorHex: "#60a5fa",
      desc: "Production vidéo & contenus immersifs",
      position: [8.7, 5, -5],
      features: ["Vidéo corporate", "Motion design", "Photographie", "Post-production"],
    },
    {
      name: "Événementiel",
      color: 0xfde047,
      colorHex: "#fde047",
      desc: "Expériences mémorables & activation de marque",
      position: [8.7, -5, 5],
      features: ["Événements hybrides", "Scénographie", "Live streaming", "Interaction"],
    },
    {
      name: "Design",
      color: 0xfb923c,
      colorHex: "#fb923c",
      desc: "Identité visuelle & design thinking",
      position: [0, -10, 0],
      features: ["Identité visuelle", "Print", "Web design", "UX/UI"],
    },
    {
      name: "Web",
      color: 0x34d399,
      colorHex: "#34d399",
      desc: "Développement web & applications sur mesure",
      position: [-8.7, -5, -5],
      features: ["Sites vitrine", "E-commerce", "Applications web", "Maintenance"],
    },
    {
      name: "IA",
      color: 0x818cf8,
      colorHex: "#818cf8",
      desc: "Intelligence artificielle & automatisation",
      position: [-8.7, 5, 5],
      features: ["Chatbots", "Analyse prédictive", "Automatisation", "Machine Learning"],
    },
  ],
}: Universe3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredPole, setHoveredPole] = useState<ServicePole | null>(null);
  const [fallbackMode, setFallbackMode] = useState(false);
  const [webGLError, setWebGLError] = useState<string | null>(null);
  const [polePositions, setPolePositions] = useState<
    Array<{
      x: number;
      y: number;
      visible: boolean;
      service: ServicePole;
    }>
  >([]);

  const polePositionsRef = useRef<
    Array<{
      x: number;
      y: number;
      visible: boolean;
      service: ServicePole;
    }>
  >([]);

  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const animationIdRef = useRef<number>();

  // Détection mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Touch gestures
  let touchStart = { x: 0, y: 0 };
  let lastTouchDistance = 0;

  const rotationRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Navigation clavier
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const speed = 0.05;
    switch (e.key) {
      case "ArrowLeft":
        rotationRef.current.targetY -= speed;
        break;
      case "ArrowRight":
        rotationRef.current.targetY += speed;
        break;
      case "ArrowUp":
        rotationRef.current.targetX = Math.max(-Math.PI / 2.5, rotationRef.current.targetX - speed);
        break;
      case "ArrowDown":
        rotationRef.current.targetX = Math.min(Math.PI / 2.5, rotationRef.current.targetX + speed);
        break;
      case "Tab":
        // Cycle through poles
        const currentIndex = services.findIndex((s) => s === hoveredPole);
        const nextIndex = (currentIndex + 1) % services.length;
        setHoveredPole(services[nextIndex]);
        e.preventDefault();
        break;
    }
  };

  useEffect(() => {
    if (!mountRef.current) return;

    let canvas: HTMLCanvasElement | null = null;

    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setWebGLError("WebGL non supporté. Utilisez Chrome, Firefox ou Safari.");
        return;
      }

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 1);

      canvas = renderer.domElement;
      canvas.style.display = "block";
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      mountRef.current.appendChild(canvas);

      camera.position.set(0, 3, 28);
      camera.lookAt(0, 0, 0);

      sceneRef.current = scene;
      cameraRef.current = camera;
      rendererRef.current = renderer;

      const ambientLight = new THREE.AmbientLight(0x404060, 1);
      scene.add(ambientLight);

      const centerLight = new THREE.PointLight(0xffffff, 3, 120);
      scene.add(centerLight);

      const starsGeometry = new THREE.BufferGeometry();
      const starsVertices = [];
      for (let i = 0; i < 3000; i++) {
        starsVertices.push(
          (Math.random() - 0.5) * 400,
          (Math.random() - 0.5) * 400,
          (Math.random() - 0.5) * 400,
        );
      }
      starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starsVertices, 3));
      const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.3,
        transparent: true,
        opacity: 0.8,
      });
      const stars = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(stars);

      const centerGroup = new THREE.Group();
      const centerGeometry = new THREE.SphereGeometry(0.7, 32, 32);
      const centerMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const centerSphere = new THREE.Mesh(centerGeometry, centerMaterial);
      centerGroup.add(centerSphere);

      for (let i = 0; i < 5; i++) {
        const ringGeometry = new THREE.RingGeometry(1.5 + i * 0.5, 1.7 + i * 0.5, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: 0x818cf8,
          transparent: true,
          opacity: 0.2 - i * 0.03,
          side: THREE.DoubleSide,
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        centerGroup.add(ring);
      }
      scene.add(centerGroup);

      const poleObjects: any[] = [];
      const mainGroup = new THREE.Group();

      services.forEach((service) => {
        const poleGroup = new THREE.Group();

        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshPhongMaterial({
          color: service.color,
          emissive: service.color,
          emissiveIntensity: 0.7,
          shininess: 200,
        });
        const sphere = new THREE.Mesh(geometry, material);
        poleGroup.add(sphere);

        for (let i = 1; i <= 3; i++) {
          const haloGeometry = new THREE.SphereGeometry(1 + i * 0.4, 32, 32);
          const haloMaterial = new THREE.MeshBasicMaterial({
            color: service.color,
            transparent: true,
            opacity: 0.15 / i,
            side: THREE.BackSide,
          });
          const halo = new THREE.Mesh(haloGeometry, haloMaterial);
          poleGroup.add(halo);
        }

        for (let i = 0; i < 3; i++) {
          const ringGeometry = new THREE.TorusGeometry(2 + i * 0.4, 0.05, 16, 100);
          const ringMaterial = new THREE.MeshBasicMaterial({
            color: service.color,
            transparent: true,
            opacity: 0.6,
          });
          const ring = new THREE.Mesh(ringGeometry, ringMaterial);
          ring.rotation.x = (Math.PI / 4) * i;
          ring.rotation.y = (Math.PI / 3) * i;
          poleGroup.add(ring);
        }

        poleGroup.position.set(...service.position);
        mainGroup.add(poleGroup);

        const poleLight = new THREE.PointLight(service.color, 2.5, 30);
        poleLight.position.copy(poleGroup.position);
        mainGroup.add(poleLight);

        // Particules
        const particlesGeo = new THREE.BufferGeometry();
        const particlesPos = [];
        const particlesVel = [];

        for (let i = 0; i < 150; i++) {
          const r = Math.random() * 3 + 2;
          const theta = Math.random() * Math.PI * 2; // Angle azimuthal
          const phi = Math.acos(2 * Math.random() - 1); // Angle polaire (distribution uniforme sur la sphère)

          particlesPos.push(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi),
          );

          particlesVel.push({
            theta: (Math.random() - 0.5) * 0.02,
            phi: (Math.random() - 0.5) * 0.01,
            r: r,
          });
        }

        particlesGeo.setAttribute("position", new THREE.Float32BufferAttribute(particlesPos, 3));
        const particlesMat = new THREE.PointsMaterial({
          color: service.color,
          size: 0.2,
          transparent: true,
          opacity: 0.8,
        });
        const particles = new THREE.Points(particlesGeo, particlesMat);
        poleGroup.add(particles);

        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          poleGroup.position.clone(),
        ]);
        const lineMaterial = new THREE.LineBasicMaterial({
          color: service.color,
          transparent: true,
          opacity: 0.5,
        });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        mainGroup.add(line);

        poleObjects.push({
          group: poleGroup,
          sphere,
          light: poleLight,
          particles,
          velocities: particlesVel,
          rings: poleGroup.children.filter((c: any) => c.geometry?.type === "TorusGeometry"),
          halos: poleGroup.children.filter(
            (c: any) => c.geometry?.type === "SphereGeometry" && c !== sphere,
          ),
          data: service,
          currentScale: 1,
        });
      });

      scene.add(mainGroup);

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      let isDragging = false;
      let previousMouse = { x: 0, y: 0 };
      let rotation = rotationRef.current;
      let velocity = { x: 0, y: 0 };

      const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        previousMouse = { x: e.clientX, y: e.clientY };
        velocity = { x: 0, y: 0 }; // Réinitialiser la vélocité
      };

      const onMouseUp = () => {
        isDragging = false;
        // La vélocité continue après le relâchement
      };

      const onMouseMove = (e: MouseEvent) => {
        mouse.x = (e.clientX / width) * 2 - 1;
        mouse.y = -(e.clientY / height) * 2 + 1;

        if (isDragging) {
          const deltaX = e.clientX - previousMouse.x;
          const deltaY = e.clientY - previousMouse.y;

          // Capturer la vélocité pour l'inertie
          velocity.y = deltaX * 0.007;
          velocity.x = deltaY * 0.007;

          rotation.targetY += velocity.y;
          rotation.targetX += velocity.x;
          rotation.targetX = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, rotation.targetX));

          previousMouse = { x: e.clientX, y: e.clientY };
        }

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(poleObjects.map((p) => p.sphere));

        if (intersects.length > 0) {
          const found = poleObjects.find((p) => p.sphere === intersects[0].object);
          setHoveredPole(found?.data || null);
        } else {
          setHoveredPole(null);
        }
      };

      canvas.addEventListener("mousedown", onMouseDown);
      canvas.addEventListener("mouseup", onMouseUp);
      canvas.addEventListener("mousemove", onMouseMove);

      // Touch gestures
      const onTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          isDragging = true;
          velocity = { x: 0, y: 0 };
        } else if (e.touches.length === 2) {
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          lastTouchDistance = Math.sqrt(dx * dx + dy * dy);
        }
      };

      const onTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        if (e.touches.length === 1 && isDragging) {
          const deltaX = e.touches[0].clientX - touchStart.x;
          const deltaY = e.touches[0].clientY - touchStart.y;
          velocity.y = deltaX * 0.01;
          velocity.x = deltaY * 0.01;
          rotationRef.current.targetY += velocity.y;
          rotationRef.current.targetX += velocity.x;
          rotationRef.current.targetX = Math.max(
            -Math.PI / 2.5,
            Math.min(Math.PI / 2.5, rotationRef.current.targetX),
          );
          touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else if (e.touches.length === 2) {
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const delta = distance - lastTouchDistance;
          camera.position.z = Math.max(15, Math.min(40, camera.position.z - delta * 0.05));
          lastTouchDistance = distance;
        }
      };

      const onTouchEnd = () => {
        isDragging = false;
      };

      canvas.addEventListener("touchstart", onTouchStart, { passive: false });
      canvas.addEventListener("touchmove", onTouchMove, { passive: false });
      canvas.addEventListener("touchend", onTouchEnd);

      let time = 0;
      let frameCount = 0;
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);
        time += 0.01;
        frameCount++;

        // Rotation avec inertie
        rotation.x += (rotation.targetX - rotation.x) * 0.08;
        rotation.y += (rotation.targetY - rotation.y) * 0.08;
        mainGroup.rotation.x = rotation.x;
        mainGroup.rotation.y = rotation.y;

        // Effet d'inertie : continue le mouvement après le relâchement
        if (!isDragging) {
          // Décélération progressive (friction)
          velocity.x *= 0.95;
          velocity.y *= 0.95;

          // Arrêter complètement si la vélocité est très faible
          if (Math.abs(velocity.x) < 0.0001) velocity.x = 0;
          if (Math.abs(velocity.y) < 0.0001) velocity.y = 0;

          // Appliquer la vélocité
          rotation.targetY += velocity.y;
          rotation.targetX += velocity.x;
          rotation.targetX = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, rotation.targetX));
        }

        stars.rotation.y += 0.0001;
        stars.rotation.x += 0.00005;

        // Pôles
        poleObjects.forEach((poleObj, index) => {
          const scale = 1 + Math.sin(time * 2.5 + index) * 0.08;
          poleObj.sphere.scale.setScalar(scale);

          poleObj.rings.forEach((ring: any, i: number) => {
            ring.rotation.x += 0.012 * (i + 1);
            ring.rotation.y += 0.009 * (i + 1);
          });

          poleObj.halos.forEach((halo: any, i: number) => {
            const haloScale = 1 + Math.sin(time * 1.5 + index + i) * 0.15;
            halo.scale.setScalar(haloScale);
          });

          const targetScale = poleObj.data === hoveredPole ? 1.5 : 1;
          poleObj.currentScale += (targetScale - poleObj.currentScale) * 0.12;
          poleObj.group.scale.setScalar(poleObj.currentScale);

          poleObj.light.intensity = poleObj.data === hoveredPole ? 4 : 2.5;

          // Particules
          const positions = poleObj.particles.geometry.attributes.position.array;
          for (let i = 0; i < positions.length; i += 3) {
            const vel = poleObj.velocities[i / 3];
            const currentTheta = Math.atan2(positions[i + 1], positions[i]) + vel.theta;
            const currentPhi =
              Math.acos(Math.max(-1, Math.min(1, positions[i + 2] / vel.r))) + vel.phi;

            // Garder le rayon fixe pour éviter la dérive
            const r = vel.r;

            positions[i] = r * Math.sin(currentPhi) * Math.cos(currentTheta);
            positions[i + 1] = r * Math.sin(currentPhi) * Math.sin(currentTheta);
            positions[i + 2] = r * Math.cos(currentPhi);
          }
          poleObj.particles.geometry.attributes.position.needsUpdate = true;

          poleObj.group.rotation.y += 0.005;
        });

        const canvas = renderer.domElement;
        const rect = canvas.getBoundingClientRect();

        const newPositions = poleObjects.map((poleObj) => {
          const worldPos = new THREE.Vector3();
          poleObj.group.getWorldPosition(worldPos);

          const screenPos = worldPos.clone().project(camera);

          const x = (screenPos.x * 0.5 + 0.5) * rect.width;
          const y = (-screenPos.y * 0.5 + 0.5) * rect.height;

          const visible = screenPos.z < 1;

          return { x, y, visible, service: poleObj.data };
        });

        polePositionsRef.current = newPositions;

        if (frameCount % 2 === 0) {
          setPolePositions([...newPositions]);
        }

        renderer.render(scene, camera);
      };

      const onResize = () => {
        const w = mountRef.current?.clientWidth || window.innerWidth;
        const h = mountRef.current?.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      setIsLoaded(true);
      animate();

      return () => {
        if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
        window.removeEventListener("resize", onResize);
        if (canvas) {
          canvas.removeEventListener("mousedown", onMouseDown);
          canvas.removeEventListener("mouseup", onMouseUp);
          canvas.removeEventListener("mousemove", onMouseMove);
          canvas.removeEventListener("touchstart", onTouchStart);
          canvas.removeEventListener("touchmove", onTouchMove);
          canvas.removeEventListener("touchend", onTouchEnd);
        }
        if (mountRef.current && canvas) {
          mountRef.current.removeChild(canvas);
        }
        renderer.dispose();
      };
    } catch (error) {
      console.error("Erreur 3D:", error);
      setWebGLError("Erreur lors de l'initialisation de la scène 3D.");
    }
  }, [hoveredPole]);

  return (
    <div className={`relative w-full h-screen bg-black ${className}`}>
      <div
        role="application"
        aria-label="Univers 3D interactif des services"
        aria-describedby="instructions"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div id="instructions" className="sr-only">
          Utilisez les flèches pour faire tourner l&apos;univers. Tab pour naviguer entre les
          services. Entrée pour sélectionner.
        </div>

        {!fallbackMode ? (
          <>
            <div ref={mountRef} className="absolute inset-0" />

            <div className="absolute inset-0 pointer-events-none z-10">
              {/* Titre - Stabilisé */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center will-change-transform">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-wider drop-shadow-lg">
                  NOUVELLE ÈRE DIGITAL
                </h1>
                <p className="text-lg md:text-xl text-white/80 tracking-widest drop-shadow-md">
                  L&apos;UNIVERS DES POSSIBLES
                </p>
              </div>

              {/* Labels permanents à côté de chaque sphère */}
              {polePositions.map(
                (pos, index) =>
                  pos.visible && (
                    <div
                      key={index}
                      className="absolute transition-all duration-300 pointer-events-auto cursor-pointer"
                      style={{
                        left: `${pos.x + 40}px`,
                        top: `${pos.y - 10}px`,
                        transform: "translateY(-50%)",
                      }}
                      onMouseEnter={() => setHoveredPole(pos.service)}
                      onMouseLeave={() => setHoveredPole(null)}
                    >
                      <div
                        className="text-sm md:text-base font-bold tracking-wide drop-shadow-lg whitespace-nowrap"
                        style={{
                          color: pos.service.colorHex,
                          textShadow: `0 0 10px ${pos.service.colorHex}80, 0 0 20px ${pos.service.colorHex}40`,
                        }}
                      >
                        {pos.service.name}
                      </div>
                      {hoveredPole === pos.service && (
                        <div
                          className="absolute left-0 top-6 w-2 h-2 rounded-full animate-ping"
                          style={{ backgroundColor: pos.service.colorHex }}
                        />
                      )}
                    </div>
                  ),
              )}

              {/* Carte d'information détaillée - Panneau latéral droit */}
              {hoveredPole && (
                <div
                  className="absolute right-8 top-1/2 -translate-y-1/2 bg-black/95 backdrop-blur-xl border-2 rounded-2xl p-6 w-80 pointer-events-auto shadow-2xl will-change-transform"
                  style={{
                    borderColor: hoveredPole.colorHex,
                    boxShadow: `0 0 30px ${hoveredPole.colorHex}40`,
                    animation: "slideInRight 0.3s ease-out",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-3 h-3 rounded-full animate-pulse"
                      style={{ backgroundColor: hoveredPole.colorHex }}
                    />
                    <h3 className="text-2xl font-bold" style={{ color: hoveredPole.colorHex }}>
                      {hoveredPole.name}
                    </h3>
                  </div>

                  <p className="text-white/90 text-sm mb-4 leading-relaxed">{hoveredPole.desc}</p>

                  <div className="space-y-2">
                    <div className="text-xs text-white/50 uppercase tracking-wider mb-2">
                      Services inclus
                    </div>
                    {hoveredPole.features.map((feature, i) => (
                      <div
                        key={i}
                        className="text-sm text-white/80 flex items-center gap-2 hover:text-white transition-colors"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: hoveredPole.colorHex }}
                        />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructions - Stabilisées */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white/40 text-xs tracking-widest will-change-opacity">
                <div className="opacity-60 hover:opacity-100 transition-opacity duration-300">
                  ◆ SURVOLEZ LES LABELS • EXPLOREZ L&apos;UNIVERS ◆
                </div>
              </div>
            </div>

            {/* Animations CSS */}
            <style jsx>{`
              @keyframes slideInRight {
                from {
                  opacity: 0;
                  transform: translateY(-50%) translateX(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(-50%) translateX(0);
                }
              }

              /* Curseur personnalisé pour indicateur drag */
              .draggable-area {
                cursor: grab;
              }
              .draggable-area:active {
                cursor: grabbing;
              }
            `}</style>

            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-50">
                <div className="text-white text-xl">Chargement...</div>
              </div>
            )}

            {webGLError && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-900/80 z-50">
                <div className="text-white text-center p-6 bg-black/50 rounded-lg">
                  <h2 className="text-2xl mb-4">Erreur WebGL</h2>
                  <p>{webGLError}</p>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Mode texte alternatif */
          <div className="grid grid-cols-2 gap-4 p-8">
            {services.map((service) => (
              <button
                key={service.name}
                className="p-6 border-2 rounded-lg hover:scale-105 transition"
                style={{ borderColor: service.colorHex }}
                onClick={() => setHoveredPole(service)}
              >
                <h3 className="text-xl font-bold" style={{ color: service.colorHex }}>
                  {service.name}
                </h3>
                <p className="text-sm mt-2">{service.desc}</p>
              </button>
            ))}
          </div>
        )}

        {/* Bouton pour basculer le mode */}
        <button
          onClick={() => setFallbackMode(!fallbackMode)}
          className="absolute top-4 right-4 bg-white/10 px-4 py-2 rounded"
          aria-label={fallbackMode ? "Activer la vue 3D" : "Activer la vue alternative"}
        >
          {fallbackMode ? "Vue 3D" : "Vue Liste"}
        </button>
      </div>
    </div>
  );
}
