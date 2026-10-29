/**
 * AMAX // THE COMMERCIAL OPERATING SYSTEM
 * Three.js 3D Interactive Holographic Engine (site-3d-engine.js)
 * Clean, ultra-realistic, reactive 3D WebGL stage.
 */

(function() {
  const container = document.getElementById('three-canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  const width = container.clientWidth || 1200;
  const height = container.clientHeight || 380;

  // 1. SCENE, CAMERA, RENDERER
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 16);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  // 2. LIGHTING
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  const blueLight = new THREE.PointLight(0x2563eb, 3.5, 40);
  blueLight.position.set(-6, 6, 8);
  scene.add(blueLight);

  const amberLight = new THREE.PointLight(0xffb000, 4.0, 40);
  amberLight.position.set(6, -4, 6);
  scene.add(amberLight);

  const whiteHighlight = new THREE.DirectionalLight(0xffffff, 1.2);
  whiteHighlight.position.set(0, 10, 10);
  scene.add(whiteHighlight);

  // 3. MAIN 3D HOLOGRAPHIC QUANTUM CORE
  const coreGroup = new THREE.Group();
  scene.add(coreGroup);

  // Inner Crystal Core (Icosahedron)
  const coreGeo = new THREE.IcosahedronGeometry(2.4, 0);
  const coreMat = new THREE.MeshPhysicalMaterial({
    color: 0x2563eb,
    emissive: 0x1d4ed8,
    emissiveIntensity: 0.35,
    roughness: 0.15,
    metalness: 0.2,
    transmission: 0.7,
    thickness: 1.5,
    transparent: true,
    opacity: 0.85
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreGroup.add(coreMesh);

  // Outer Wireframe Cage (Amber & Cobalt)
  const cageGeo = new THREE.IcosahedronGeometry(3.1, 1);
  const cageMat = new THREE.MeshBasicMaterial({
    color: 0xffb000,
    wireframe: true,
    transparent: true,
    opacity: 0.45
  });
  const cageMesh = new THREE.Mesh(cageGeo, cageMat);
  coreGroup.add(cageMesh);

  // 4. CONCENTRIC GYROSCOPE GIMBAL RINGS
  const rings = [];

  function createGimbalRing(radius, tube, color, opacity, rotX, rotY) {
    const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: opacity
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = rotX;
    ringMesh.rotation.y = rotY;
    coreGroup.add(ringMesh);
    rings.push({ mesh: ringMesh, speedX: 0.003, speedY: 0.005 });
    return ringMesh;
  }

  // Ring 1 (Inner Cobalt)
  createGimbalRing(4.2, 0.04, 0x2563eb, 0.7, Math.PI / 4, 0);
  // Ring 2 (Middle Slate Blue)
  createGimbalRing(5.2, 0.035, 0x60a5fa, 0.6, -Math.PI / 3, Math.PI / 6);
  // Ring 3 (Outer Amber Laser)
  createGimbalRing(6.4, 0.05, 0xffb000, 0.85, Math.PI / 2.5, -Math.PI / 4);

  // 5. ORBITING DEAL DATA SATELLITES (3D SPHERES WITH HALOS)
  const satellites = [];
  const satelliteData = [
    { name: 'Camila Vasconcelos · R$ 54k', radius: 4.8, speed: 0.015, color: 0x2563eb, size: 0.26 },
    { name: 'Cadência 2/4 · WhatsApp', radius: 5.6, speed: -0.012, color: 0xffb000, size: 0.22 },
    { name: 'PIX Confirmado · R$ 82k', radius: 6.8, speed: 0.009, color: 0x10b981, size: 0.30 },
    { name: 'LogPrime · R$ 38k', radius: 7.4, speed: -0.014, color: 0x3b82f6, size: 0.24 }
  ];

  satelliteData.forEach((sat, i) => {
    const satGeo = new THREE.SphereGeometry(sat.size, 16, 16);
    const satMat = new THREE.MeshStandardMaterial({
      color: sat.color,
      emissive: sat.color,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.5
    });
    const satMesh = new THREE.Mesh(satGeo, satMat);
    scene.add(satMesh);
    satellites.push({
      mesh: satMesh,
      radius: sat.radius,
      speed: sat.speed,
      angle: (i * Math.PI) / 2
    });
  });

  // 6. FLOATING LIGHT PARTICLES (DUST FIELD)
  const particleCount = 140;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 24;
    particlePositions[i + 1] = (Math.random() - 0.5) * 14;
    particlePositions[i + 2] = (Math.random() - 0.5) * 16;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0x60a5fa,
    size: 0.12,
    transparent: true,
    opacity: 0.6
  });
  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // 7. INTERACTIVE MOUSE TRACKING & PHYSICS
  let targetRotationX = 0;
  let targetRotationY = 0;
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetRotationY = mouseX * 0.45;
    targetRotationX = -mouseY * 0.35;
  });

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevMouseX;
    const deltaY = e.clientY - prevMouseY;
    coreGroup.rotation.y += deltaX * 0.008;
    coreGroup.rotation.x += deltaY * 0.008;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  // 8. ANIMATION LOOP (SILKY 60FPS)
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    // Core self-rotation
    coreMesh.rotation.y += 0.008;
    coreMesh.rotation.x += 0.004;
    cageMesh.rotation.y -= 0.006;
    cageMesh.rotation.z += 0.005;

    // Rings independent rotation
    rings.forEach((r, idx) => {
      r.mesh.rotation.x += (idx % 2 === 0 ? 0.006 : -0.005);
      r.mesh.rotation.y += (idx % 2 === 0 ? 0.008 : 0.007);
    });

    // Orbiting satellites
    satellites.forEach(sat => {
      sat.angle += sat.speed;
      sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
      sat.mesh.position.z = Math.sin(sat.angle) * sat.radius * 0.6;
      sat.mesh.position.y = Math.sin(sat.angle * 2) * 1.2;
    });

    // Particle drift
    particleSystem.rotation.y += 0.001;

    // Smooth lerp to mouse position
    if (!isDragging) {
      coreGroup.rotation.y += (targetRotationY - coreGroup.rotation.y) * 0.05;
      coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.05;
    }

    renderer.render(scene, camera);
  }

  animate();

  // 9. RESPONSIVE RESIZING
  window.addEventListener('resize', () => {
    const newW = container.clientWidth || 1200;
    const newH = container.clientHeight || 380;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  });
})();
