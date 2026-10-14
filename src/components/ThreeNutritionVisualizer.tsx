/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  RotateCw,
  Sparkles,
  Layers,
  Camera,
  Sun,
  Flame,
  PartyPopper,
  Compass,
  Eye,
  EyeOff,
  Info
} from 'lucide-react';
import { playSound } from '../utils/audio.ts';

interface ThreeNutritionVisualizerProps {
  weddingModeActive: boolean;
  onToggleWeddingMode?: () => void;
}

export const ThreeNutritionVisualizer: React.FC<ThreeNutritionVisualizerProps> = ({
  weddingModeActive,
  onToggleWeddingMode
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // UI States
  const [explodedFactor, setExplodedFactor] = useState<number>(0);
  const [plateMode, setPlateMode] = useState<'thali' | 'cheat'>('thali');
  const [lightingPreset, setLightingPreset] = useState<'royal' | 'sunset' | 'sangeet' | 'midnight'>('royal');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isControlsOpen, setIsControlsOpen] = useState<boolean>(true);
  const [activeLayerInfo, setActiveLayerInfo] = useState<string | null>(null);

  // References for render loop
  const targetExplodedRef = useRef<number>(0);
  const currentExplodedRef = useRef<number>(0);
  const autoRotateRef = useRef<boolean>(true);
  const plateModeRef = useRef<'thali' | 'cheat'>('thali');
  const weddingModeRef = useRef<boolean>(weddingModeActive);
  const lightingPresetRef = useRef<string>('royal');
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    targetExplodedRef.current = explodedFactor;
  }, [explodedFactor]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  useEffect(() => {
    plateModeRef.current = plateMode;
  }, [plateMode]);

  useEffect(() => {
    weddingModeRef.current = weddingModeActive;
    if (weddingModeActive) {
      setLightingPreset('sangeet');
    }
  }, [weddingModeActive]);

  useEffect(() => {
    lightingPresetRef.current = lightingPreset;
  }, [lightingPreset]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0e0d);

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 5.8, 8.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // --- Studio RoomEnvironment for PBR Reflections ---
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    // --- OrbitControls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Don't go below ground
    controls.minDistance = 3.5;
    controls.maxDistance = 14;
    controls.autoRotate = autoRotateRef.current;
    controls.autoRotateSpeed = 1.0;
    controls.target.set(0, 0.5, 0);
    controlsRef.current = controls;

    // --- Dynamic Studio Lighting Rig ---
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.8);
    scene.add(ambientLight);

    // Main Studio Key Softbox Light
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
    keyLight.position.set(5, 9, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0003;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    // Warm Saffron Fill Light
    const fillLight = new THREE.DirectionalLight(0xf59e0b, 1.0);
    fillLight.position.set(-6, 5, -3);
    scene.add(fillLight);

    // Rim / Backlight for Metallic Edges
    const rimLight = new THREE.PointLight(0xfef08a, 1.8, 20);
    rimLight.position.set(0, 6, -6);
    scene.add(rimLight);

    // Festive Marigold & Magenta lights
    const sangeetLight1 = new THREE.PointLight(0xff6b00, 0, 15);
    sangeetLight1.position.set(4, 4, 3);
    scene.add(sangeetLight1);

    const sangeetLight2 = new THREE.PointLight(0xec4899, 0, 15);
    sangeetLight2.position.set(-4, 4, 3);
    scene.add(sangeetLight2);

    // --- Studio Pedestal Table & Contact Shadow ---
    const tableGeo = new THREE.CylinderGeometry(4.8, 5.2, 0.4, 64);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.4,
      metalness: 0.15
    });
    const tableMesh = new THREE.Mesh(tableGeo, tableMat);
    tableMesh.position.y = -0.21;
    tableMesh.receiveShadow = true;
    scene.add(tableMesh);

    // Soft Radial Contact Shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 512;
    shadowCanvas.height = 512;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(256, 256, 40, 256, 256, 250);
    grad.addColorStop(0, 'rgba(0,0,0,0.85)');
    grad.addColorStop(0.5, 'rgba(0,0,0,0.4)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 512, 512);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(7.2, 7.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.005;
    scene.add(shadowMesh);

    // --- Procedural Canvas Textures for Authentic Realism ---
    // 1. Hammered Brass Texture with Concentric Etchings
    const brassCanvas = document.createElement('canvas');
    brassCanvas.width = 512;
    brassCanvas.height = 512;
    const bCtx = brassCanvas.getContext('2d')!;
    bCtx.fillStyle = '#D97706';
    bCtx.fillRect(0, 0, 512, 512);
    for (let r = 30; r < 250; r += 20) {
      bCtx.beginPath();
      bCtx.arc(256, 256, r, 0, Math.PI * 2);
      bCtx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
      bCtx.lineWidth = 3;
      bCtx.stroke();
    }
    // Hammered noise
    for (let i = 0; i < 900; i++) {
      bCtx.fillStyle = Math.random() > 0.5 ? 'rgba(254, 240, 138, 0.15)' : 'rgba(120, 53, 15, 0.2)';
      bCtx.beginPath();
      bCtx.arc(Math.random() * 512, Math.random() * 512, 2.5 + Math.random() * 3, 0, Math.PI * 2);
      bCtx.fill();
    }
    const brassTexture = new THREE.CanvasTexture(brassCanvas);
    brassTexture.colorSpace = THREE.SRGBColorSpace;

    // 2. Toasted Roti with Authentic Blister Char Spots
    const rotiCanvas = document.createElement('canvas');
    rotiCanvas.width = 512;
    rotiCanvas.height = 512;
    const rCtx = rotiCanvas.getContext('2d')!;
    rCtx.fillStyle = '#FDE68A';
    rCtx.fillRect(0, 0, 512, 512);
    // Golden wheat gradient
    const rGrad = rCtx.createRadialGradient(256, 256, 80, 256, 256, 250);
    rGrad.addColorStop(0, '#FEF08A');
    rGrad.addColorStop(0.7, '#FCD34D');
    rGrad.addColorStop(1, '#D97706');
    rCtx.fillStyle = rGrad;
    rCtx.fillRect(0, 0, 512, 512);

    // Blistered dark tawa char spots
    for (let i = 0; i < 45; i++) {
      const x = 70 + Math.random() * 370;
      const y = 70 + Math.random() * 370;
      const radius = 6 + Math.random() * 18;
      const charGrad = rCtx.createRadialGradient(x, y, 1, x, y, radius);
      charGrad.addColorStop(0, 'rgba(69, 26, 3, 0.85)');
      charGrad.addColorStop(0.6, 'rgba(146, 64, 14, 0.6)');
      charGrad.addColorStop(1, 'rgba(217, 119, 6, 0)');
      rCtx.fillStyle = charGrad;
      rCtx.beginPath();
      rCtx.arc(x, y, radius, 0, Math.PI * 2);
      rCtx.fill();
    }
    const rotiTexture = new THREE.CanvasTexture(rotiCanvas);
    rotiTexture.colorSpace = THREE.SRGBColorSpace;

    // 3. Golden Samosa Crispy Flaky Pastry
    const samosaCanvas = document.createElement('canvas');
    samosaCanvas.width = 512;
    samosaCanvas.height = 512;
    const smCtx = samosaCanvas.getContext('2d')!;
    smCtx.fillStyle = '#D97706';
    smCtx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 600; i++) {
      smCtx.fillStyle = Math.random() > 0.4 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(113, 63, 18, 0.5)';
      smCtx.beginPath();
      smCtx.arc(Math.random() * 512, Math.random() * 512, 1.5 + Math.random() * 3, 0, Math.PI * 2);
      smCtx.fill();
    }
    // Cumin / ajwain seed specks
    for (let i = 0; i < 70; i++) {
      smCtx.fillStyle = '#291807';
      smCtx.fillRect(Math.random() * 512, Math.random() * 512, 4, 1.5);
    }
    const samosaTexture = new THREE.CanvasTexture(samosaCanvas);
    samosaTexture.colorSpace = THREE.SRGBColorSpace;

    // --- Main Food Group Hierarchy ---
    const rootStage = new THREE.Group();
    scene.add(rootStage);

    // Groups for Exploded View
    const plateLayerGroup = new THREE.Group();
    const carbLayerGroup = new THREE.Group();
    const proteinLayerGroup = new THREE.Group();
    const fiberLayerGroup = new THREE.Group();
    const fatLayerGroup = new THREE.Group();

    rootStage.add(plateLayerGroup);
    rootStage.add(carbLayerGroup);
    rootStage.add(proteinLayerGroup);
    rootStage.add(fiberLayerGroup);
    rootStage.add(fatLayerGroup);

    // --- 1. Master Brass Thali Platter ---
    const plateGeo = new THREE.CylinderGeometry(2.55, 2.35, 0.18, 64);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0xEAB308,
      metalness: 0.92,
      roughness: 0.22,
      map: brassTexture
    });
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    plateMesh.castShadow = true;
    plateMesh.receiveShadow = true;
    plateMesh.position.y = 0.09;
    plateLayerGroup.add(plateMesh);

    // Carved Raised Brass Rim
    const rimGeo = new THREE.TorusGeometry(2.52, 0.08, 16, 64);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xFDE047,
      metalness: 0.95,
      roughness: 0.18
    });
    const plateRim = new THREE.Mesh(rimGeo, rimMat);
    plateRim.rotation.x = Math.PI / 2;
    plateRim.position.y = 0.18;
    plateLayerGroup.add(plateRim);

    // Helper: Sculpted Ornate Brass Katori
    const createOrnateKatori = (x: number, z: number, curryColor: number, garnishType: 'dal' | 'palak' | 'dahi' | 'chutney') => {
      const katoriGroup = new THREE.Group();
      katoriGroup.position.set(x, 0.16, z);

      // Brass Bowl with tapered flare
      const bowlGeo = new THREE.CylinderGeometry(0.68, 0.5, 0.48, 32, 1, true);
      const bowlMat = new THREE.MeshStandardMaterial({
        color: 0xCA8A04,
        metalness: 0.9,
        roughness: 0.25
      });
      const bowl = new THREE.Mesh(bowlGeo, bowlMat);
      bowl.castShadow = true;
      bowl.position.y = 0.24;
      katoriGroup.add(bowl);

      const bottomGeo = new THREE.CircleGeometry(0.5, 32);
      const bottom = new THREE.Mesh(bottomGeo, bowlMat);
      bottom.rotation.x = Math.PI / 2;
      bottom.position.y = 0.01;
      katoriGroup.add(bottom);

      // Ornate Lip Ring
      const lipGeo = new THREE.TorusGeometry(0.68, 0.04, 12, 32);
      const lip = new THREE.Mesh(lipGeo, rimMat);
      lip.rotation.x = Math.PI / 2;
      lip.position.y = 0.48;
      katoriGroup.add(lip);

      // Liquid Curry Surface with glossy shimmer
      const liquidGeo = new THREE.CircleGeometry(0.65, 32);
      const liquidMat = new THREE.MeshStandardMaterial({
        color: curryColor,
        roughness: 0.25,
        metalness: 0.08
      });
      const liquid = new THREE.Mesh(liquidGeo, liquidMat);
      liquid.rotation.x = -Math.PI / 2;
      liquid.position.y = 0.44;
      katoriGroup.add(liquid);

      // Garnishes
      if (garnishType === 'dal') {
        // Red chili tadka oil swirl & green coriander
        for (let i = 0; i < 7; i++) {
          const corianderGeo = new THREE.PlaneGeometry(0.08, 0.08);
          const corianderMat = new THREE.MeshBasicMaterial({ color: 0x15803D, side: THREE.DoubleSide });
          const coriander = new THREE.Mesh(corianderGeo, corianderMat);
          coriander.rotation.x = -Math.PI / 2;
          coriander.rotation.z = Math.random() * Math.PI;
          coriander.position.set((Math.random() - 0.5) * 0.4, 0.45, (Math.random() - 0.5) * 0.4);
          katoriGroup.add(coriander);
        }
        // Dried red chili pod
        const chiliGeo = new THREE.CylinderGeometry(0.04, 0.02, 0.25, 8);
        const chiliMat = new THREE.MeshStandardMaterial({ color: 0xB91C1C, roughness: 0.3 });
        const chili = new THREE.Mesh(chiliGeo, chiliMat);
        chili.rotation.z = Math.PI / 2.5;
        chili.position.set(0.1, 0.46, 0);
        katoriGroup.add(chili);
      } else if (garnishType === 'palak') {
        // Golden pan-seared paneer cubes floating
        for (let i = 0; i < 3; i++) {
          const cubeGeo = new THREE.BoxGeometry(0.2, 0.12, 0.2);
          const cubeMat = new THREE.MeshStandardMaterial({ color: 0xFEF3C7, roughness: 0.5 });
          const cube = new THREE.Mesh(cubeGeo, cubeMat);
          const angle = (i * Math.PI * 2) / 3;
          cube.position.set(Math.cos(angle) * 0.25, 0.47, Math.sin(angle) * 0.25);
          cube.rotation.y = Math.random() * Math.PI;
          cube.castShadow = true;
          katoriGroup.add(cube);
        }
      } else if (garnishType === 'dahi') {
        // Roasted brown cumin dust & pomegranate rubies
        for (let i = 0; i < 15; i++) {
          const jeeraGeo = new THREE.BoxGeometry(0.02, 0.01, 0.05);
          const jeeraMat = new THREE.MeshBasicMaterial({ color: 0x78350F });
          const jeera = new THREE.Mesh(jeeraGeo, jeeraMat);
          jeera.position.set((Math.random() - 0.5) * 0.45, 0.45, (Math.random() - 0.5) * 0.45);
          jeera.rotation.y = Math.random() * Math.PI;
          katoriGroup.add(jeera);
        }
      }

      return katoriGroup;
    };

    // --- 2. Thali Mode Assembly ---
    const thaliGroup = new THREE.Group();
    rootStage.add(thaliGroup);

    // Katori 1: Tadka Dal (Protein Layer)
    const dalKatori = createOrnateKatori(-1.15, -0.95, 0xF59E0B, 'dal');
    proteinLayerGroup.add(dalKatori);

    // Katori 2: Palak Paneer (Fiber & Protein Layer)
    const palakKatori = createOrnateKatori(1.15, -0.95, 0x14532D, 'palak');
    fiberLayerGroup.add(palakKatori);

    // Katori 3: Creamy Dahi (Fiber/Digestion Layer)
    const dahiKatori = createOrnateKatori(0.0, -1.45, 0xFFFFFF, 'dahi');
    fiberLayerGroup.add(dahiKatori);

    // Carb Layer: Stack of 2 Puffed Tawa Phulkas with Blister Marks
    const rotiGroup = new THREE.Group();
    rotiGroup.position.set(-0.35, 0.18, 0.55);

    const rotiGeo1 = new THREE.CylinderGeometry(0.95, 0.95, 0.05, 32);
    const rotiMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      map: rotiTexture,
      roughness: 0.65,
      metalness: 0.05
    });
    const roti1 = new THREE.Mesh(rotiGeo1, rotiMat);
    roti1.castShadow = true;
    roti1.position.y = 0.05;
    roti1.rotation.y = 0.6;
    rotiGroup.add(roti1);

    const rotiGeo2 = new THREE.CylinderGeometry(0.92, 0.92, 0.05, 32);
    const roti2 = new THREE.Mesh(rotiGeo2, rotiMat);
    roti2.castShadow = true;
    roti2.position.set(0.12, 0.11, -0.1);
    roti2.rotation.y = -0.5;
    rotiGroup.add(roti2);

    carbLayerGroup.add(rotiGroup);

    // Salad: Translucent Cucumber Disks & Red Onion Rings
    const saladGroup = new THREE.Group();
    saladGroup.position.set(1.4, 0.2, 0.4);
    for (let i = 0; i < 4; i++) {
      // Cucumber disk
      const cGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.035, 20);
      const cMat = new THREE.MeshStandardMaterial({ color: 0x86EFAC, roughness: 0.4 });
      const cMesh = new THREE.Mesh(cGeo, cMat);
      cMesh.position.set(i * 0.12, i * 0.03, i * 0.18);
      cMesh.rotation.z = 0.15;
      cMesh.castShadow = true;
      saladGroup.add(cMesh);

      // Red onion ring
      const oGeo = new THREE.TorusGeometry(0.2, 0.03, 8, 20);
      const oMat = new THREE.MeshStandardMaterial({ color: 0xBE185D, roughness: 0.3 });
      const oMesh = new THREE.Mesh(oGeo, oMat);
      oMesh.rotation.x = Math.PI / 2;
      oMesh.position.set(i * 0.12 - 0.05, i * 0.03 + 0.04, i * 0.18 + 0.05);
      saladGroup.add(oMesh);
    }
    fiberLayerGroup.add(saladGroup);

    // Fat Layer: Pure A2 Ghee Glaze Drop with realistic specular highlight
    const gheeGeo = new THREE.SphereGeometry(0.14, 20, 20);
    const gheeMat = new THREE.MeshPhysicalMaterial({
      color: 0xF59E0B,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.65,
      transparent: true,
      opacity: 0.9,
      clearcoat: 1.0
    });
    const gheeDrop = new THREE.Mesh(gheeGeo, gheeMat);
    gheeDrop.scale.set(1.5, 0.35, 1.2);
    gheeDrop.position.set(-0.3, 0.36, 0.5);
    fatLayerGroup.add(gheeDrop);

    // --- 3. Cheat Mode: Golden Samosa & Jalebi Temptation ---
    const cheatGroup = new THREE.Group();
    cheatGroup.visible = false;
    rootStage.add(cheatGroup);

    // Samosa 1 (Crispy Golden Triangular Pastry with Crimped Ridge)
    const samosaGeo = new THREE.ConeGeometry(1.25, 1.45, 3);
    const samosaMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      map: samosaTexture,
      roughness: 0.55,
      metalness: 0.08
    });
    const samosa1 = new THREE.Mesh(samosaGeo, samosaMat);
    samosa1.position.set(-0.6, 0.82, 0.2);
    samosa1.rotation.y = Math.PI / 5;
    samosa1.rotation.z = -0.15;
    samosa1.castShadow = true;
    cheatGroup.add(samosa1);

    // Samosa 2
    const samosa2 = samosa1.clone();
    samosa2.position.set(0.75, 0.72, 0.45);
    samosa2.scale.set(0.85, 0.85, 0.85);
    samosa2.rotation.y = -Math.PI / 3;
    cheatGroup.add(samosa2);

    // Chutney Katori: Tamarind Chutney with Coriander Swirl
    const tamarindKatori = createOrnateKatori(0.95, -1.05, 0x451A03, 'chutney');
    cheatGroup.add(tamarindKatori);

    // Spiraled Shiny Jalebi with Translucent Sugar Glaze
    const jalebiGroup = new THREE.Group();
    jalebiGroup.position.set(-0.85, 0.24, -1.05);
    const jalebiMat = new THREE.MeshPhysicalMaterial({
      color: 0xEA580C,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.5,
      transparent: true,
      opacity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });

    for (let r = 0.22; r <= 0.65; r += 0.18) {
      const ringGeo = new THREE.TorusGeometry(r, 0.075, 16, 32);
      const ring = new THREE.Mesh(ringGeo, jalebiMat);
      ring.rotation.x = Math.PI / 2;
      ring.castShadow = true;
      jalebiGroup.add(ring);
    }
    cheatGroup.add(jalebiGroup);

    // --- 4. Steaming Heat Particles (Aroma Wisps) ---
    const steamParticleCount = 45;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamParticleCount * 3);
    const steamLifes = new Float32Array(steamParticleCount);

    for (let i = 0; i < steamParticleCount; i++) {
      steamPositions[i * 3] = (Math.random() - 0.5) * 1.5;
      steamPositions[i * 3 + 1] = 0.4 + Math.random() * 1.8;
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
      steamLifes[i] = Math.random();
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    const steamMat = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.08,
      transparent: true,
      opacity: 0.22,
      depthWrite: false
    });
    const steamParticles = new THREE.Points(steamGeo, steamMat);
    scene.add(steamParticles);

    // --- 5. Shaadi Golden Glitter Confetti Particles ---
    const confettiCount = 180;
    const confettiGeo = new THREE.BufferGeometry();
    const confettiPos = new Float32Array(confettiCount * 3);

    for (let i = 0; i < confettiCount; i++) {
      const rad = 2.0 + Math.random() * 3.5;
      const angle = Math.random() * Math.PI * 2;
      confettiPos[i * 3] = Math.cos(angle) * rad;
      confettiPos[i * 3 + 1] = 0.3 + Math.random() * 4.5;
      confettiPos[i * 3 + 2] = Math.sin(angle) * rad;
    }
    confettiGeo.setAttribute('position', new THREE.BufferAttribute(confettiPos, 3));

    const confettiMat = new THREE.PointsMaterial({
      color: 0xF59E0B,
      size: 0.14,
      transparent: true,
      opacity: 0
    });
    const confettiField = new THREE.Points(confettiGeo, confettiMat);
    scene.add(confettiField);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Render Loop with Exponential Damping ---
    let animId: number;
    const clock = new THREE.Clock();

    const renderTick = () => {
      animId = requestAnimationFrame(renderTick);
      const delta = clock.getDelta();

      // Smooth damping for Exploded Macro View layers
      currentExplodedRef.current = THREE.MathUtils.damp(
        currentExplodedRef.current,
        targetExplodedRef.current,
        7,
        delta
      );
      const factor = currentExplodedRef.current;

      carbLayerGroup.position.y = factor * 1.0;
      proteinLayerGroup.position.y = factor * 2.0;
      fiberLayerGroup.position.y = factor * 3.0;
      fatLayerGroup.position.y = factor * 4.0;

      // Handle plate mode toggle
      if (plateModeRef.current === 'thali') {
        thaliGroup.visible = true;
        plateLayerGroup.visible = true;
        carbLayerGroup.visible = true;
        proteinLayerGroup.visible = true;
        fiberLayerGroup.visible = true;
        fatLayerGroup.visible = true;
        cheatGroup.visible = false;
      } else {
        thaliGroup.visible = false;
        plateLayerGroup.visible = true;
        carbLayerGroup.visible = false;
        proteinLayerGroup.visible = false;
        fiberLayerGroup.visible = false;
        fatLayerGroup.visible = false;
        cheatGroup.visible = true;
      }

      // Animate Steam Aroma Wisps
      const positions = steamGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < steamParticleCount; i++) {
        positions[i * 3 + 1] += delta * 0.35;
        positions[i * 3] += Math.sin(positions[i * 3 + 1] * 3) * 0.003;
        if (positions[i * 3 + 1] > 2.5) {
          positions[i * 3 + 1] = 0.4;
          positions[i * 3] = (Math.random() - 0.5) * 1.2;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
        }
      }
      steamGeo.attributes.position.needsUpdate = true;

      // Lighting Presets Handling
      const currentPreset = lightingPresetRef.current;
      const isSangeet = currentPreset === 'sangeet' || weddingModeRef.current;

      const targetSangeet = isSangeet ? 2.2 : 0;
      sangeetLight1.intensity = THREE.MathUtils.damp(sangeetLight1.intensity, targetSangeet, 4, delta);
      sangeetLight2.intensity = THREE.MathUtils.damp(sangeetLight2.intensity, targetSangeet, 4, delta);

      const targetConfettiOp = isSangeet ? 0.95 : 0;
      confettiMat.opacity = THREE.MathUtils.damp(confettiMat.opacity, targetConfettiOp, 4, delta);

      if (isSangeet) {
        confettiField.rotation.y += delta * 0.3;
      }

      if (currentPreset === 'sunset') {
        keyLight.color.setHex(0xf97316);
        fillLight.color.setHex(0xd97706);
        rimLight.color.setHex(0xfde047);
      } else if (currentPreset === 'midnight') {
        keyLight.color.setHex(0x38bdf8);
        fillLight.color.setHex(0x6366f1);
        rimLight.color.setHex(0xa855f7);
      } else if (currentPreset === 'royal') {
        keyLight.color.setHex(0xfff7ed);
        fillLight.color.setHex(0xf59e0b);
        rimLight.color.setHex(0xfef08a);
      }

      controls.update();
      renderer.render(scene, camera);
    };

    renderTick();

    // Memory Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      pmremGenerator.dispose();
      envTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleSetCameraAngle = (angle: 'top' | 'macro' | 'reset') => {
    playSound('click');
    if (!controlsRef.current) return;
    if (angle === 'top') {
      controlsRef.current.object.position.set(0, 8.5, 0.2);
    } else if (angle === 'macro') {
      controlsRef.current.object.position.set(-1.5, 2.4, 3.2);
    } else {
      controlsRef.current.object.position.set(0, 5.8, 8.2);
    }
    controlsRef.current.target.set(0, 0.5, 0);
  };

  return (
    <div className="relative w-full h-[650px] bg-stone-950 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl select-none">
      {/* 3D WebGL Canvas Mount */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left Floating Studio Badge */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real-Time 3D Macro Engine</span>
          <span aria-hidden="true">·</span>
          <span>60 FPS PBR Studio</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-1 drop-shadow-md">
          {plateMode === 'thali' ? 'Ghar Ka Royal Thali' : 'Street Samosa Temptation'}
        </h2>
        <p className="text-xs text-stone-300 max-w-sm mt-1 drop-shadow-sm font-sans">
          {plateMode === 'thali'
            ? 'Interactive 3D Desi platter with realistic hammered brass reflections, toasted blistered rotis, and exploded macro stratification.'
            : 'The 4:00 PM office ambush. Flaky golden fried pastry with aromatic steam in 3D glory.'}
        </p>
      </div>

      {/* Top Right Quick Angle Controls */}
      <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1 rounded-xl border border-stone-800">
        <button
          onClick={() => handleSetCameraAngle('reset')}
          className="px-2.5 py-1 text-[11px] text-stone-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors font-mono"
        >
          Perspective
        </button>
        <button
          onClick={() => handleSetCameraAngle('top')}
          className="px-2.5 py-1 text-[11px] text-stone-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors font-mono"
        >
          Top-Down
        </button>
        <button
          onClick={() => handleSetCameraAngle('macro')}
          className="px-2.5 py-1 text-[11px] text-stone-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors font-mono"
        >
          Macro Zoom
        </button>
      </div>

      {/* 3D Exploded Stratification HUD Labels */}
      {explodedFactor > 0.18 && plateMode === 'thali' && (
        <div className="absolute top-28 right-6 flex flex-col gap-2.5 pointer-events-none animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="bg-amber-950/80 border border-amber-500/50 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-mono text-amber-200 shadow-lg">
            <span className="font-bold text-amber-400">Layer 4: A2 Desi Ghee (Healthy Lipids)</span>
            <div className="text-[10px] text-amber-300/80">8g Clean Fats · Hormonal Support</div>
          </div>
          <div className="bg-emerald-950/80 border border-emerald-500/50 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-mono text-emerald-200 shadow-lg">
            <span className="font-bold text-emerald-400">Layer 3: Palak Sabzi & Salad (Fiber & Iron)</span>
            <div className="text-[10px] text-emerald-300/80">9g Dietary Fiber · Gut Microbiome Fuel</div>
          </div>
          <div className="bg-orange-950/80 border border-orange-500/50 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-mono text-orange-200 shadow-lg">
            <span className="font-bold text-orange-400">Layer 2: Tadka Dal & Dahi (Bio-Protein)</span>
            <div className="text-[10px] text-orange-300/80">24g Complete Amino Acids · Muscle Repair</div>
          </div>
          <div className="bg-stone-900/80 border border-stone-500/50 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-mono text-stone-200 shadow-lg">
            <span className="font-bold text-stone-300">Layer 1: Whole Wheat Phulkas (Complex Carbs)</span>
            <div className="text-[10px] text-stone-400">64g Sustained Glycogen · Zero Refined Maida</div>
          </div>
        </div>
      )}

      {/* Ergonomic Glassmorphic Bottom Dock */}
      <div
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 w-full max-w-[940px] px-4 transition-transform duration-300 ease-out z-20 ${
          isControlsOpen ? 'translate-y-0' : 'translate-y-[calc(100%-42px)]'
        }`}
      >
        <div className="bg-stone-900/90 backdrop-blur-xl border border-stone-700/80 rounded-2xl shadow-2xl p-4 flex flex-col gap-3 text-white">
          {/* Collapse/Expand Strip */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-400 uppercase tracking-wider">
              <span>Studio Controls</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400">Interactive 3D Engine</span>
            </div>

            <button
              onClick={() => {
                playSound('click');
                setIsControlsOpen(!isControlsOpen);
              }}
              className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white px-2 py-0.5 rounded hover:bg-stone-800 transition-colors"
            >
              {isControlsOpen ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hide Controls</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Show Controls</span>
                </>
              )}
            </button>
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* 1. Plate Mode Toggle */}
            <div className="md:col-span-3 flex items-center gap-1 p-1 bg-stone-950 rounded-xl border border-stone-800">
              <button
                onClick={() => {
                  playSound('click');
                  setPlateMode('thali');
                  setExplodedFactor(0);
                }}
                className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-lg transition-all ${
                  plateMode === 'thali'
                    ? 'bg-amber-600 text-white font-semibold shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Ghar Ka Thali
              </button>
              <button
                onClick={() => {
                  playSound('click');
                  setPlateMode('cheat');
                  setExplodedFactor(0);
                }}
                className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-lg transition-all ${
                  plateMode === 'cheat'
                    ? 'bg-amber-600 text-white font-semibold shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Cheat Samosa
              </button>
            </div>

            {/* 2. Exploded Macro Layer Slider */}
            <div className="md:col-span-4 flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-300 font-medium flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  Exploded Macro Strata
                </span>
                <span className="font-mono text-amber-400 tabular-nums font-semibold">
                  {Math.round(explodedFactor * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                disabled={plateMode === 'cheat'}
                value={explodedFactor}
                onChange={(e) => setExplodedFactor(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500 disabled:opacity-30"
              />
            </div>

            {/* 3. Lighting Presets */}
            <div className="md:col-span-3 flex items-center justify-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800">
              <button
                onClick={() => {
                  playSound('click');
                  setLightingPreset('royal');
                }}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  lightingPreset === 'royal' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
                }`}
                title="Royal Brass Studio"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  playSound('click');
                  setLightingPreset('sunset');
                }}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  lightingPreset === 'sunset' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
                }`}
                title="Golden Hour Sunset"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  playSound('click');
                  setLightingPreset('sangeet');
                }}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  lightingPreset === 'sangeet' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
                }`}
                title="Shaadi Sangeet Party"
              >
                <PartyPopper className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 4. Auto-Rotate & Action Button */}
            <div className="md:col-span-2 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  playSound('click');
                  setAutoRotate(!autoRotate);
                }}
                className={`p-2 rounded-xl text-xs border transition-colors ${
                  autoRotate
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                }`}
                title={autoRotate ? 'Pause 360° rotation' : 'Resume 360° rotation'}
              >
                <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
              </button>

              <button
                onClick={() => {
                  playSound('click');
                  if (onToggleWeddingMode) onToggleWeddingMode();
                }}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  weddingModeActive
                    ? 'bg-gradient-to-r from-amber-500 to-pink-500 text-white border-transparent shadow-md'
                    : 'bg-stone-800 text-amber-400 border-stone-700 hover:bg-stone-700'
                }`}
              >
                {weddingModeActive ? 'Party ON' : 'Shaadi'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
