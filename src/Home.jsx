import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from './SectionHeading';
import {
  Cpu,
  Smartphone,
  MapPin,
  Phone,
  Clock,
  Compass,
  Check,
  ChevronRight,
  Grid,
  Monitor,
  Sliders,
  Wrench,
  ShieldCheck,
  Truck,
  DollarSign,
  Menu,
  X,
  Send,
  Eye,
  ExternalLink,
  Package,
  Laptop
} from 'lucide-react';
import GoogleReviews from './GoogleReviews';

import gamingPcImg from './assets/gaming_pc.png';
import editingWorkstationImg from './assets/editing_workstation.png';
import officeSetupImg from './assets/office_setup.png';
import customLiquidImg from './assets/custom_liquid.png';
import pcBuilderLogo from './assets/PCBUILDER.png';
import workstationPcImg from './assets/workstation_pc.png';
import deskstopPcImg from './assets/deskstop_pc.png';
import gamingPcHeroImg from './assets/gaming_pc.png';

// 3D projections on Canvas
function drawWireframeCube(ctx, width, height, angleX, angleY, scale, mouseX, mouseY) {
  ctx.save();
  ctx.translate(width / 2, height / 2);

  // Parallax translation
  ctx.translate(mouseX * 30, mouseY * 30);

  // Nodes for a GPU-like box
  const nodes = [
    [-120, -50, -30], [-120, -50, 30], [-120, 50, -30], [-120, 50, 30],
    [120, -50, -30], [120, -50, 30], [120, 50, -30], [120, 50, 30],
    // Fan 1 center
    [-40, 0, 31],
    // Fan 2 center
    [40, 0, 31],
  ];

  // Rotate nodes
  const rotated = nodes.map(node => {
    let x = node[0];
    let y = node[1];
    let z = node[2];

    // Y rotation
    let cosY = Math.cos(angleY);
    let sinY = Math.sin(angleY);
    let x1 = x * cosY - z * sinY;
    let z1 = x * sinY + z * cosY;

    // X rotation
    let cosX = Math.cos(angleX);
    let sinX = Math.sin(angleX);
    let y2 = y * cosX - z1 * sinX;
    let z2 = y * sinX + z1 * cosX;

    return [x1, y2, z2];
  });

  // Project (simple 3D to 2D)
  const d = 300; // perspective distance
  const projected = rotated.map(r => {
    const factor = d / (d + r[2]);
    return [r[0] * factor * scale, r[1] * factor * scale];
  });

  // Draw lines
  const edges = [
    [0, 1], [1, 3], [3, 2], [2, 0], // Left face
    [4, 5], [5, 7], [7, 6], [6, 4], // Right face
    [0, 4], [1, 5], [2, 6], [3, 7], // Connecting edges
  ];

  ctx.strokeStyle = '#7B2FFF'; // Purple for GPU body
  ctx.lineWidth = 1.5;
  edges.forEach(([u, v]) => {
    ctx.beginPath();
    ctx.moveTo(projected[u][0], projected[u][1]);
    ctx.lineTo(projected[v][0], projected[v][1]);
    ctx.stroke();
  });

  // Draw GPU Details / PCI connection (neon green)
  ctx.strokeStyle = '#8DFF00';
  ctx.beginPath();
  ctx.moveTo(projected[2][0], projected[2][1]);
  ctx.lineTo(projected[6][0], projected[6][1]);
  ctx.stroke();

  // Draw Fan 1 circle
  ctx.strokeStyle = '#00C8FF'; // Electric blue fans
  ctx.beginPath();
  const fanRadius = 30 * scale;
  const f1 = projected[8];
  ctx.arc(f1[0], f1[1], fanRadius, 0, Math.PI * 2);
  ctx.stroke();

  // Draw Fan 2 circle
  ctx.beginPath();
  const f2 = projected[9];
  ctx.arc(f2[0], f2[1], fanRadius, 0, Math.PI * 2);
  ctx.stroke();

  // Draw fan blades rotating
  ctx.lineWidth = 1;
  const fanAngle = angleY * 5;
  for (let i = 0; i < 4; i++) {
    const angle = fanAngle + (i * Math.PI) / 2;
    ctx.beginPath();
    ctx.moveTo(f1[0], f1[1]);
    ctx.lineTo(f1[0] + Math.cos(angle) * fanRadius, f1[1] + Math.sin(angle) * fanRadius);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(f2[0], f2[1]);
    ctx.lineTo(f2[0] + Math.cos(angle) * fanRadius, f2[1] + Math.sin(angle) * fanRadius);
    ctx.stroke();
  }

  // Draw a CPU chip floating separately
  ctx.translate(-mouseX * 40, -mouseY * 40 + Math.sin(angleX) * 30);
  ctx.rotate(-angleY * 0.5);
  ctx.strokeStyle = '#8DFF00';
  ctx.lineWidth = 2;
  ctx.strokeRect(-40, -40, 80, 80);

  // Chip pins and core
  ctx.strokeStyle = '#00C8FF';
  ctx.lineWidth = 1;
  ctx.strokeRect(-20, -20, 40, 40);

  // Outer pins
  for (let i = -30; i <= 30; i += 15) {
    // Top
    ctx.beginPath(); ctx.moveTo(i, -40); ctx.lineTo(i, -45); ctx.stroke();
    // Bottom
    ctx.beginPath(); ctx.moveTo(i, 40); ctx.lineTo(i, 45); ctx.stroke();
    // Left
    ctx.beginPath(); ctx.moveTo(-40, i); ctx.lineTo(-45, i); ctx.stroke();
    // Right
    ctx.beginPath(); ctx.moveTo(40, i); ctx.lineTo(45, i); ctx.stroke();
  }

  ctx.restore();
}

// Infinite auto-scrolling gallery marquee using requestAnimationFrame
function GalleryMarquee({ items, onImageClick }) {
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const offsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const speed = 0.6; // px per frame — adjust for faster/slower

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      if (!isPausedRef.current) {
        offsetRef.current += speed;
        // Half-width reset: when we've scrolled through one full copy, snap back
        const halfWidth = track.scrollWidth / 2;
        if (offsetRef.current >= halfWidth) {
          offsetRef.current = 0;
        }
        track.style.transform = `translateX(-${offsetRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const cardStyle = { position: 'relative' };
  const labelStyle = {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    right: '10px',
    background: 'rgba(0,0,0,0.7)',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '5px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    backdropFilter: 'blur(5px)',
  };

  // Render two copies for seamless looping
  const renderCards = (keyPrefix) =>
    items.map((item, index) => (
      <div
        key={`${keyPrefix}-${index}`}
        className="gallery-card glass-card"
        onClick={() => onImageClick(item.src)}
        onMouseEnter={() => { isPausedRef.current = true; }}
        onMouseLeave={() => { isPausedRef.current = false; }}
        style={cardStyle}
      >
        <div className="gallery-img-container">
          <img src={item.src} alt={`Installation at ${item.location}`} className="gallery-img" loading="lazy" />
        </div>
        <div style={labelStyle}>
          <MapPin size={14} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'text-bottom' }} />
          {item.location}
        </div>
      </div>
    ));

  return (
    <div
      style={{ overflow: 'hidden', padding: '20px 4px 30px 4px', width: '100%' }}
    >
      <div
        ref={trackRef}
        style={{ display: 'flex', width: 'max-content', gap: '20px', willChange: 'transform' }}
      >
        {renderCards('a')}
        {renderCards('b')}
      </div>
    </div>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [lightboxImg, setLightboxImg] = useState(null);
  const [heroSlide, setHeroSlide] = useState(0);

  const heroSlides = [
    { img: '/desktop_pc.png', label: 'Desktop Computer' },
    { img: '/gaming_pc.png', label: 'Gaming PC' },
    { img: '/editing_pc.png', label: 'Editing PC' },
    { img: '/workstation_pc.png', label: 'Workstation' },
  ];

  // Auto-scroll hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide(prev => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Form State
  const [enquiry, setEnquiry] = useState({
    name: '',
    location: '',
    phone: '',
    budget: '',
    usage: 'Gaming PC',
    secondaryUsage: '',
    message: ''
  });

  // Custom Checklist Config State
  const [customConfig, setCustomConfig] = useState({
    processor: '',
    motherboard: '',
    ram: '',
    ssd: '',
    hdd: '',
    cabinet: '',
    cooler: '',
    monitor: '',
    keyboard: '',
    mouse: ''
  });

  // Checklist items
  const componentsList = [
    { key: 'processor', label: 'Processor (Intel / AMD)' },
    { key: 'motherboard', label: 'Motherboard' },
    { key: 'ram', label: 'RAM (DDR4 / DDR5)' },
    { key: 'ssd', label: 'SSD Storage' },
    { key: 'hdd', label: 'Hard Disk (HDD)' },
    { key: 'cabinet', label: 'Cabinet (RGB / Mesh)' },
    { key: 'cooler', label: 'Liquid Cooler / Air Cooler' },
    { key: 'monitor', label: 'Gaming Monitor' },
    { key: 'keyboard', label: 'Mechanical Keyboard' },
    { key: 'mouse', label: 'Gaming Mouse' }
  ];

  // Gallery Data (Recent Installations)
  const galleryItems = [
    { src: '/installations/IMG-20260624-WA0019.jpg', location: 'Srivilliputhur' },
    { src: '/installations/IMG-20260624-WA0002.jpg', location: 'Ottansathiram' },
    { src: '/installations/IMG-20260624-WA0003.jpg', location: 'Thiruparankundram' },
    { src: '/installations/IMG-20260624-WA0004.jpg', location: 'Thirumangalam' },
    { src: '/installations/IMG-20260624-WA0005.jpg', location: 'Thoppur' },
    { src: '/installations/IMG-20260624-WA0006.jpg', location: 'Sivagiri' },
    { src: '/installations/IMG-20260624-WA0007.jpg', location: 'Madurai' },
    { src: '/installations/IMG-20260624-WA0008.jpg', location: 'Madurai' },
    { src: '/installations/IMG-20260624-WA0010.jpg', location: 'Karaikudi' },
    { src: '/installations/IMG-20260624-WA0011.jpg', location: 'Cumbum' },
    { src: '/installations/IMG-20260624-WA0012.jpg', location: 'Natham' },
    { src: '/installations/IMG-20260624-WA0015.jpg', location: 'Madurai' },
    { src: '/installations/IMG-20260624-WA0018.jpg', location: 'Madurai' },
  ];

  // Refs for canvas and mouse
  const canvasRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Handle scroll active states & transparent navbar toggle
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check current visible section
      const sections = ['home', 'about', 'enquiry', 'gallery', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic theme-aware hover system — IntersectionObserver
  useEffect(() => {
    const sectionThemes = {
      home:      { primary: '#00C8FF', accent: '#8DFF00', glow: 'rgba(0,200,255,0.4)',   glowSoft: 'rgba(0,200,255,0.15)' },
      about:     { primary: '#8DFF00', accent: '#7B2FFF', glow: 'rgba(141,255,0,0.4)',   glowSoft: 'rgba(141,255,0,0.15)' },
      services:  { primary: '#7B2FFF', accent: '#00C8FF', glow: 'rgba(123,47,255,0.4)',  glowSoft: 'rgba(123,47,255,0.15)' },
      enquiry:   { primary: '#00C8FF', accent: '#7B2FFF', glow: 'rgba(0,200,255,0.4)',   glowSoft: 'rgba(0,200,255,0.15)' },
      gallery:   { primary: '#8DFF00', accent: '#00C8FF', glow: 'rgba(141,255,0,0.4)',   glowSoft: 'rgba(141,255,0,0.15)' },
      brands:    { primary: '#7B2FFF', accent: '#8DFF00', glow: 'rgba(123,47,255,0.4)',  glowSoft: 'rgba(123,47,255,0.15)' },
      bookkeeper:{ primary: '#00C8FF', accent: '#8DFF00', glow: 'rgba(0,200,255,0.4)',   glowSoft: 'rgba(0,200,255,0.15)' },
      whychoose: { primary: '#8DFF00', accent: '#7B2FFF', glow: 'rgba(141,255,0,0.4)',   glowSoft: 'rgba(141,255,0,0.15)' },
      contact:   { primary: '#7B2FFF', accent: '#00C8FF', glow: 'rgba(123,47,255,0.4)',  glowSoft: 'rgba(123,47,255,0.15)' },
    };

    // Map sections: some use IDs, some use class selectors
    const sectionSelectors = [
      { id: 'home',       key: 'home' },
      { id: 'about',      key: 'about' },
      { id: 'services',   key: 'services' },
      { id: 'enquiry',    key: 'enquiry' },
      { id: 'gallery',    key: 'gallery' },
      { cls: '.brands-marquee',  key: 'brands' },
      { cls: '.bk-home-section', key: 'bookkeeper' },
      { cls: '.why-section:last-of-type', key: 'whychoose' },
      { id: 'contact',    key: 'contact' },
    ];

    const ratioMap = new Map();

    const applyTheme = (themeKey) => {
      const theme = sectionThemes[themeKey];
      if (!theme) return;
      const root = document.documentElement;
      root.style.setProperty('--hover-primary', theme.primary);
      root.style.setProperty('--hover-accent', theme.accent);
      root.style.setProperty('--hover-glow', theme.glow);
      root.style.setProperty('--hover-glow-soft', theme.glowSoft);
      root.setAttribute('data-active-theme', themeKey);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratioMap.set(entry.target, {
            ratio: entry.intersectionRatio,
            key: entry.target.dataset.themeKey,
          });
        });

        // Find the section with the highest intersection ratio
        let bestRatio = 0;
        let bestKey = 'home';
        ratioMap.forEach((val) => {
          if (val.ratio > bestRatio) {
            bestRatio = val.ratio;
            bestKey = val.key;
          }
        });

        if (bestRatio > 0) {
          applyTheme(bestKey);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
        rootMargin: '-5% 0px -5% 0px',
      }
    );

    // Observe each section
    const observedElements = [];
    sectionSelectors.forEach(({ id, cls, key }) => {
      const el = id ? document.getElementById(id) : document.querySelector(cls);
      if (el) {
        el.dataset.themeKey = key;
        observer.observe(el);
        observedElements.push(el);
      }
    });

    return () => {
      observedElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  // Track Mouse movement for Parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth) - 0.5;
      mouseRef.current.targetY = (e.clientY / innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Background particle system & 3D floating animation canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const pCanvas = particleCanvasRef.current;
    if (!pCanvas) return;
    const pCtx = pCanvas.getContext('2d');

    let animationId;
    let angleX = 0;
    let angleY = 0;

    // Set canvas sizes
    const resizeCanvases = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;

      pCanvas.width = window.innerWidth;
      pCanvas.height = window.innerHeight;
    };
    resizeCanvases();
    window.addEventListener('resize', resizeCanvases);

    // Particle pool setup
    const particleCount = 100;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: i % 3 === 0 ? '#7B2FFF' : i % 3 === 1 ? '#00C8FF' : '#8DFF00',
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    const render = () => {
      // 1. Render Interactive background particles
      pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Mouse repelling force
        const dx = p.x - (mouseRef.current.targetX + 0.5) * pCanvas.width;
        const dy = p.y - (mouseRef.current.targetY + 0.5) * pCanvas.height;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.x += (dx / dist) * force * 3;
          p.y += (dy / dist) * force * 3;
        }

        // Loop boundaries
        if (p.x < 0) p.x = pCanvas.width;
        if (p.x > pCanvas.width) p.x = 0;
        if (p.y < 0) p.y = pCanvas.height;
        if (p.y > pCanvas.height) p.y = 0;

        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        pCtx.fillStyle = p.color;
        pCtx.globalAlpha = p.alpha;
        pCtx.fill();
      });
      pCtx.globalAlpha = 1.0;

      // 2. Render Hero 3D wireframe GPU/CPU
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angleX += 0.003;
      angleY += 0.005;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;

      // Draw wireframe with scale adjusted to canvas width
      const scale = canvas.width < 500 ? 1.0 : 1.3;
      drawWireframeCube(
        ctx,
        canvas.width,
        canvas.height,
        angleX,
        angleY,
        scale,
        mouseRef.current.x,
        mouseRef.current.y
      );

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvases);
    };
  }, []);

  // Form Submit - Auto Generate WhatsApp Msg
  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedComponents = componentsList
      .filter(item => customConfig[item.key])
      .map(item => `*${item.label}:* ${customConfig[item.key]}`)
      .join('\n');

    const whatsappMessage = `*PCBUILDER Computers - Dream PC Inquiry*
--------------------------------------------
*Name:* ${enquiry.name}
*Location:* ${enquiry.location}
*Phone:* ${enquiry.phone}
*Budget:* ${enquiry.budget}
*Primary Usage:* ${enquiry.usage}
*Secondary Usage:* ${enquiry.secondaryUsage || 'Not specified'}
*Message:* ${enquiry.message || 'None'}

*Custom Hardware Configuration:*
${formattedComponents || 'Requesting Default Spec Recommendation'}

_Please review this configuration and send me a price estimate. Thank you!_`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/918667864448?text=${encodedMessage}`;

    // Open in new tab
    window.open(whatsappUrl, '_blank');
  };

  // Stat Counters (State-based ticks for animation)
  const [builtCount, setBuiltCount] = useState(0);
  const [businessCount, setBusinessCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBuiltCount(prev => (prev < 500 ? prev + 10 : 500));
      setBusinessCount(prev => (prev < 1000 ? prev + 20 : 1000));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Background Interactive canvas particles */}
      <canvas id="bg-canvas" ref={particleCanvasRef} />

      {/* Floating Action Buttons */}
      <div className="fab-container-left">
        <a href="tel:8667864448" className="fab-btn fab-call" aria-label="Call PCBUILDER Computers">
          <Phone size={24} />
        </a>
      </div>
      <div className="fab-container-right">
        <a
          href="https://wa.me/918667864448"
          className="fab-btn fab-whatsapp animate-pulse-glow"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Us"
        >
          <Smartphone size={24} />
        </a>
      </div>

      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#home" className="navbar-brand">
            <img src={pcBuilderLogo} alt="PC Builder Computers" className="navbar-logo" />
          </a>

          <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <li>
              <a
                href="#home"
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#enquiry"
                className={`nav-link ${activeSection === 'enquiry' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Enquiry
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Our Recent Installation
              </a>
            </li>
            <li>
              <Link
                to="/gallery"
                className={`nav-link`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Gallery
              </Link>
            </li>
            <li>
              <a
                href="#about"
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </a>
            </li>
            <li>
              <Link
                to="/bookkeeper"
                className="nav-link nav-bookkeeper"
                onClick={() => setMobileMenuOpen(false)}
              >
                BookKeeper
              </Link>
            </li>
            <li>
              <a
                href="#contact"
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/918667864448"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link nav-whatsapp"
              >
                WhatsApp
              </a>
            </li>
          </ul>

          <button
            className="hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">

        {/* ── Row 1: Centered heading + tagline ── */}
        <div className="hero-header-block">
          <p className="hero-tag">
            <img src="/favicon.svg" alt="PC BUILD IN MADURAI Logo" style={{ height: 'clamp(2.6rem, 6.5vw, 4.6rem)', width: 'auto' }} />
            PC BUILD IN MADURAI
          </p>
          <p className="hero-tag-sub">
            Custom Gaming PCs &amp; Video Editing Workstations in Madurai&nbsp;
            <span className="hero-tag-divider">|</span>&nbsp;
            <span className="hero-tag-sub-brand">PCBUILDER COMPUTERS</span>
          </p>
        </div>

        {/* ── Row 2: Full-width photo slideshow ── */}
        <div className="hero-photo-reel">
          {heroSlides.map((slide, i) => (
            <div
              key={i}
              className={`hero-photo-slide ${i === heroSlide ? 'active' : ''}`}
            >
              <img
                src={slide.img}
                alt={slide.label}
                className="hero-photo-img"
                draggable="false"
              />
            </div>
          ))}
          {/* Bottom overlay for dots & label */}
          <div className="hero-photo-footer">
            <span className="hero-photo-label">{heroSlides[heroSlide].label}</span>
            <div className="hero-photo-dots">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  className={`slide-dot ${i === heroSlide ? 'active' : ''}`}
                  onClick={() => setHeroSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 3: Title + description content ── */}
        <div className="hero-body container">
          <h1 className="hero-title">
            Build Your <span>Dream PC</span> Within Your <span className="title-underline">Budget</span>
          </h1>

          <div className="hero-body-text">
            <p className="hero-body-para hero-body-intro">
              Welcome to{' '}
              <span className="hb-accent">PCBUILDER COMPUTERS</span>
              , your expert assembled computer shop located in the heart of <span className="hb-accent">Madurai, Tamilnadu</span>.
            </p>
            <p className="hero-body-para">
              We specialize in high-quality <span className="hb-accent">computer assembling</span>, providing{' '}
              <span className="hb-accent">custom PCs</span>{' '}
              tailored to meet our client's individual needs. Whether for{' '}
              <span className="hb-accent">gaming</span>,
              professional <span className="hb-accent">workstations</span>, or <span className="hb-accent">general use</span>, our skilled technicians combine{' '}
              <span className="hb-accent">top-tier components</span> to construct <span className="hb-accent">reliable</span> and <span className="hb-accent">high-performance</span> systems.
            </p>
            <p className="hero-body-para">
              Our commitment to delivering unparalleled <span className="hb-accent">service</span> and value ensures that every computer we build
              not only meets but{' '}
              <span className="hb-highlight">exceeds client expectations</span>.
              Trust <span className="hb-accent">PCBUILDER COMPUTERS</span> for all your <span className="hb-accent">computing solutions</span>.
            </p>
          </div>

          <div className="hero-buttons">
            <a href="#enquiry" className="btn-primary">
              Get Free Estimate <ChevronRight size={18} />
            </a>
            <a
              href="https://wa.me/918667864448"
              className="btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Now
            </a>
            <a href="tel:8667864448" className="btn-call">
              <Phone size={16} />
              Call Now
            </a>
          </div>

          {/* Counters */}
          <div className="counters-container">
            <div className="counter-card glass-card">
              <div className="counter-num">{builtCount}+</div>
              <div className="counter-label">CUSTOM PC BUILDS</div>
            </div>
            <div className="counter-card glass-card">
              <div className="counter-num">{businessCount}+</div>
              <div className="counter-label">Customers</div>
            </div>
            <div className="counter-card glass-card">
              <div className="counter-num">100%</div>
              <div className="counter-label">Customer Satisfaction</div>
            </div>
            <div className="counter-card glass-card">
              <div className="counter-num">FREE</div>
              <div className="counter-label">Delivery</div>
            </div>
            <div className="counter-card glass-card">
              <div className="counter-num">FREE</div>
              <div className="counter-label">Installation</div>
            </div>
            <div className="counter-card glass-card">
              <div className="counter-num">24x7</div>
              <div className="counter-label">Customer Support</div>
            </div>
            <div className="counter-card glass-card">
              <div className="counter-num">5.0</div>
              <div className="counter-label">⭐ Ratings</div>
            </div>
          </div>
        </div>

      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">

          {/* ── Section heading ── */}
          <SectionHeading>Your Gaming &amp; Editing PC Destination</SectionHeading>

          <div className="about-grid">

            {/* ── LEFT CARD ── */}
            <div className="about-card glass-card">
              <h3 className="about-card-heading">PCBUILDER COMPUTERS</h3>
              <p className="about-card-sub">Custom High-Performance Systems</p>

              <p className="about-body-text">
                Welcome to <span className="txt-green">PCBUILDER COMPUTERS</span>, Madurai's premier destination for{' '}
                <span className="txt-green">custom-built computers</span>. We specialize in designing and assembling{' '}
                <span className="txt-green">high-performance</span> hardware configurations tailored to your <span className="txt-green">exact needs</span>.
                From industry-leading Custom <span className="txt-green">Gaming PCs</span> and{' '}
                <span className="txt-green">4K Video Editing Workstations</span> to reliable{' '}
                <span className="txt-green">Office Desktops</span> and high-compute <span className="txt-green">Enterprise Solutions</span>,
                we deliver <span className="txt-green">uncompromising quality</span>.
              </p>

              <p className="about-body-text">
                Whether you need the latest{' '}
                <span className="txt-green">Intel Core Processors</span> or{' '}
                <span className="txt-green">AMD Ryzen Processors</span> paired with cutting-edge{' '}
                <span className="txt-green">NVIDIA RTX Graphics</span> or{' '}
                <span className="txt-green">AMD Radeon Graphics</span>, every rig is meticulously assembled
                using <span className="txt-green">hand-picked</span>, <span className="txt-green">premium brand components</span>. Before dispatch,
                your system undergoes rigorous thermal stress-testing and{' '}
                <span className="txt-green">professional cable management</span> to guarantee{' '}
                <span className="txt-green">peak performance</span> straight out of the box.
              </p>
            </div>

            {/* ── RIGHT CARD ── */}
            <div className="about-card glass-card">
              <h3 className="about-card-heading about-card-heading--blue">
                Expert PC Engineering &amp; Assembly
              </h3>

              <p className="about-body-text">
                A custom PC is more than just hardware — it's the foundation of your <span className="txt-blue">gaming</span>, <span className="txt-blue">content
                  creation</span> and <span className="txt-blue">professional workflow</span>. Our expert-built systems are engineered for{' '}
                <span className="txt-blue">maximum cooling</span>, quieter operation,{' '}
                <span className="txt-blue">higher FPS</span> and{' '}
                <span className="txt-blue">faster rendering performance</span> while maintaining
                <span className="txt-blue"> outstanding stability</span>.
              </p>

              <p className="about-quality-heading">Our Commitment to Quality</p>

              <ul className="about-checklist">
                {[
                  'Professional Cable Management for improved airflow and a clean finish.',
                  'Benchmark, Thermal & Hardware Stress Testing for maximum stability.',
                  'Plug-and-Play Windows Installation, Driver Setup & BIOS Optimization.',
                  'XMP / EXPO Memory Configuration for peak RAM performance.',
                  'Safe CPU & GPU Performance Tuning using premium thermal solutions.',
                  'Genuine Components with Official Manufacturer Warranties.',
                  'Lifetime Technical Support and expert after-sales assistance.',
                ].map((item, i) => (
                  <li className="about-checklist-item" key={i}>
                    <Check size={16} style={{ color: 'var(--neon-green)', flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="why-section">
        <div className="container">
          <SectionHeading>Our Services</SectionHeading>
          <div className="why-grid">
            <div className="why-card glass-card">
              <div className="why-icon-container"><Sliders size={28} /></div>
              <h3 className="why-title">Customization PC Build</h3>
              <p className="why-desc">Fully custom-configured PCs built to your exact specs, budget and use case — every component hand-picked for maximum performance.</p>
            </div>
            <div className="why-card glass-card">
              <div className="why-icon-container"><Monitor size={28} /></div>
              <h3 className="why-title">Gaming PC</h3>
              <p className="why-desc">High-FPS gaming rigs with the latest Intel / AMD processors and NVIDIA / AMD GPUs, optimized for the smoothest gameplay experience.</p>
            </div>
            <div className="why-card glass-card">
              <div className="why-icon-container"><Grid size={28} /></div>
              <h3 className="why-title">Editing PC</h3>
              <p className="why-desc">4K / 8K video editing workstations and photo editing powerhouses with fast NVMe storage, High Speed DDR5 / DDR4 RAM and color-accurate display support.</p>
            </div>
            <div className="why-card glass-card">
              <div className="why-icon-container"><Cpu size={28} /></div>
              <h3 className="why-title">Desktop Computer</h3>
              <p className="why-desc">Reliable office and home desktop systems built for productivity, accounting, billing and everyday computing needs.</p>
            </div>
            <div className="why-card glass-card">
              <div className="why-icon-container"><Smartphone size={28} /></div>
              <h3 className="why-title">Gaming Laptop</h3>
              <p className="why-desc">Top gaming laptop brands sourced and supplied with expert advice on best-fit models for your gaming or work requirements.</p>
            </div>
            <div className="why-card glass-card">
              <div className="why-icon-container"><Package size={28} /></div>
              <h3 className="why-title">Refurbished Laptop</h3>
              <p className="why-desc">Shop premium refurbished laptops from top brands. Professionally tested, warranty-backed & reliable. Perfect for students, business & everyday use.</p>
            </div>
            <div className="why-card glass-card">
              <div className="why-icon-container"><Wrench size={28} /></div>
              <h3 className="why-title">Deep Cleaning &amp; Upgrade</h3>
              <p className="why-desc">Professional deep cleaning, thermal paste replacement, CPU / RAM / SSD / GPU upgrades, OS / BIOS Upgrade and performance tuning for your existing system.</p>
            </div>
            <div className="why-card glass-card">
              <div className="why-icon-container"><ShieldCheck size={28} /></div>
              <h3 className="why-title">Repair Services &amp; More</h3>
              <p className="why-desc">Hardware diagnostics, motherboard repair, power supply replacement, OS installation, BSOD Error Rectifying and full system troubleshooting.</p>
            </div>
            <div className="why-card glass-card">
              <div className="why-icon-container"><Laptop size={28} /></div>
              <h3 className="why-title">Laptop Services</h3>
              <p className="why-desc">Top laptop repair & maintenance: Screen / battery/ Keyboard / Cooling fan replacements, SSD / RAM upgrades, BIOS upgrades, virus removal & Laptop performance optimization for all brands.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Section */}
      <section id="enquiry" className="enquiry-section">
        <div className="container">
          <SectionHeading>Configure Your Custom PC</SectionHeading>
          <div className="enquiry-card glass-card">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter your name"
                    required
                    value={enquiry.name}
                    onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Your Location</label>
                  <input
                    type="text"
                    id="location"
                    className="form-control"
                    placeholder="e.g., Madurai, Chennai, Trichy"
                    required
                    value={enquiry.location}
                    onChange={(e) => setEnquiry({ ...enquiry, location: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    className="form-control"
                    placeholder="Enter 10-digit number"
                    required
                    value={enquiry.phone}
                    onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="budget">Approximate value (Rs)</label>
                  <input
                    type="text"
                    id="budget"
                    className="form-control"
                    placeholder="e.g., ₹50,000, ₹1.5 Lakhs"
                    required
                    value={enquiry.budget}
                    onChange={(e) => setEnquiry({ ...enquiry, budget: e.target.value })}
                  />
                </div>
                <div className="form-group form-full">
                  <label htmlFor="usage">Primary Usage</label>
                  <select
                    id="usage"
                    className="form-control"
                    value={enquiry.usage}
                    onChange={(e) => setEnquiry({ ...enquiry, usage: e.target.value })}
                  >
                    <option value="Gaming ">Gaming </option>
                    <option value="4K Gaming">4K Gaming</option>
                    <option value="4K Video Editing">4K Video Editing</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Photo Editing">Photo Editing</option>
                    <option value="Animation work">Animation work </option>
                    <option value="AI Development">AI Development</option>
                    <option value="Architecture / Builder Work">Architecture / Builder Work</option>
                    <option value="Office Work">Office Work</option>
                    <option value="POS Billing">POS Billing</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Trading">Trading</option>
                    <option value="Workstation">Workstation</option>
                    <option value="Coding">Coding</option>
                    <option value="Software Development">Software Development</option>
                    <option value="College Use">College Use</option>
                    <option value="School Use">School Use</option>
                    <option value="YouTube streaming">YouTube streaming</option>
                    <option value="Industrial ">Industrial </option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="form-group form-full">
                  <label htmlFor="secondaryUsage">Secondary Usage <span style={{ color: 'var(--text-secondary)', fontWeight: 400, fontSize: '0.8rem' }}>(Optional)</span></label>
                  <select
                    id="secondaryUsage"
                    className="form-control"
                    value={enquiry.secondaryUsage}
                    onChange={(e) => setEnquiry({ ...enquiry, secondaryUsage: e.target.value })}
                  >
                    <option value="">-- Select Secondary Usage --</option>
                    <option value="Gaming ">Gaming </option>
                    <option value="4K Gaming">4K Gaming</option>
                    <option value="4K Video Editing">4K Video Editing</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Photo Editing">Photo Editing</option>
                    <option value="Animation work">Animation work</option>
                    <option value="AI Development">AI Development</option>
                    <option value="Architecture / Builder Work">Architecture / Builder Work</option>
                    <option value="Office Work">Office Work</option>
                    <option value="POS Billing">POS Billing</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Trading">Trading</option>
                    <option value="Workstation">Workstation</option>
                    <option value="Coding">Coding</option>
                    <option value="Software Development">Software Development</option>
                    <option value="College Use">College Use</option>
                    <option value="School Use">School Use</option>
                    <option value="YouTube / streaming">YouTube streaming </option>
                    <option value="Industrial ">Industrial </option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="form-group form-full">
                  <label htmlFor="message">Message <span style={{ color: 'var(--text-secondary)', fontWeight: 400, fontSize: '0.8rem' }}>(Optional)</span></label>
                  <textarea
                    id="message"
                    className="form-control"
                    placeholder="Any specific requirements or questions?"
                    rows="4"
                    style={{ resize: 'vertical' }}
                    value={enquiry.message}
                    onChange={(e) => setEnquiry({ ...enquiry, message: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <div className="submit-container">
                <button type="submit" className="btn-primary">
                  Generate WhatsApp Quote <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery-section">
        <div className="container">

          <SectionHeading style={{ marginBottom: '2rem' }}>Free Door Delivery & Door Step Installation</SectionHeading>

          <div className="video-container glass-card" style={{ marginBottom: '4rem', padding: '1rem', borderRadius: '15px', background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(20,20,40,0.8))', boxShadow: '0 8px 32px rgba(0,255,255,0.15)' }}>
            <video
              src="/videos/delivery-installation.mp4"
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{ width: '100%', height: 'auto', borderRadius: '21px', display: 'block', maxHeight: '90vh', objectFit: 'contain' }}
            >
              <source src="/videos/delivery-installation.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <SectionHeading containerClassName="recent-installations-container">Our Recent Installations</SectionHeading>

          <GalleryMarquee items={galleryItems} onImageClick={setLightboxImg} />

          <div className="submit-container" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link to="/gallery" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              View Full Gallery <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Brands Marquee */}
      <section className="brands-marquee">
        <SectionHeading containerClassName="we-dealing-with-container" style={{ textAlign: 'center', paddingTop: '2rem', marginBottom: '1.5rem' }}>We Dealing With</SectionHeading>
        <div className="marquee-track">
          {[
            { name: 'MSI', file: '/logos/msi-new.png' },
            { name: 'ASUS', file: '/logos/asus-new.png' },
            { name: 'GIGABYTE', file: '/logos/gigabyte-new.png' },
            { name: 'AMD', file: '/logos/amd-new.png' },
            { name: 'INTEL', file: '/logos/intel-new.png' },
            { name: 'NVIDIA', file: '/logos/nvidia.png' },
            { name: 'ASROCK', file: '/logos/asrock-new.png' },
            { name: 'COOLER MASTER', file: '/logos/coolermaster-new.png' },
            { name: 'THERMALTAKE', file: '/logos/thermaltake-new.png' },
            { name: 'ANT ESPORTS', file: '/logos/antesports-new.png' },
            { name: 'ANTEC', file: '/logos/antec-new.png' },
            { name: 'DEEPCOOL', file: '/logos/deepcool-new.png' },
            { name: 'CP PLUS', file: '/logos/cpplus-new.jpg' },
          ].map((brand, i) => (
            <div key={i} className="marquee-logo-card">
              <div className="marquee-logo-img-wrap">
                <img src={brand.file} alt={brand.name} className="marquee-logo-img" />
              </div>
            </div>
          ))}
          {/* Duplicate for seamless infinite loop */}
          {[
            { name: 'MSI', file: '/logos/msi-new.png' },
            { name: 'ASUS', file: '/logos/asus-new.png' },
            { name: 'GIGABYTE', file: '/logos/gigabyte-new.png' },
            { name: 'AMD', file: '/logos/amd-new.png' },
            { name: 'INTEL', file: '/logos/intel-new.png' },
            { name: 'NVIDIA', file: '/logos/nvidia.png' },
            { name: 'ASROCK', file: '/logos/asrock-new.png' },
            { name: 'COOLER MASTER', file: '/logos/coolermaster-new.png' },
            { name: 'THERMALTAKE', file: '/logos/thermaltake-new.png' },
            { name: 'ANT ESPORTS', file: '/logos/antesports-new.png' },
            { name: 'ANTEC', file: '/logos/antec-new.png' },
            { name: 'DEEPCOOL', file: '/logos/deepcool-new.png' },
            { name: 'CP PLUS', file: '/logos/cpplus-new.jpg' },
          ].map((brand, i) => (
            <div key={`dup-${i}`} className="marquee-logo-card">
              <div className="marquee-logo-img-wrap">
                <img src={brand.file} alt={brand.name} className="marquee-logo-img" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BookKeeper Authorized Partner Section */}
      <section className="bk-home-section">
        <div className="container">
          <div className="bk-animated-box">
            <div className="bk-animated-box-inner">

              <div className="bk-home-badge">We are an Authorized Sales Partner</div>

              {/* BookKeeper official logo image */}
              <div className="bk-home-logo-wrap">
                <img
                  src="/bookkeeper-logo.png"
                  alt="BookKeeper Accounting Software"
                  className="bk-home-logo-img"
                />
              </div>

              {/* Product screenshot */}
              <div className="bk-home-product-wrap">
                <img
                  src="/bookeeper-30plus.png"
                  alt="BookKeeper – Now in 30+ Countries"
                  className="bk-home-product-img"
                />
              </div>
              <p style={{ textAlign: 'center', color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '1px', marginBottom: '12px' }}>
                SUPPORTED DEVICES IOS / ANDROID / WINDOWS
              </p>
              <p className="bk-home-pills">
                <span className="bk-pill">GST Billing</span>
                <span className="bk-pill-dot">•</span>
                <span className="bk-pill">Accounting</span>
                <span className="bk-pill-dot">•</span>
                <span className="bk-pill">Inventory Management</span>
              </p>
              <p className="bk-home-desc">
                Manage your business smarter with <span className="bk-accent">BookKeeper</span>, India's
                trusted accounting software for <span className="bk-accent">retailers, wholesalers, manufacturers, service providers</span>, retail stores, wholesale shops, <span className="bk-accent">POS Billing</span>, startups and SMEs. As an{' '}
                <span className="bk-accent">Authorized Sales Partner in Tamil Nadu</span>, we provide
                genuine licenses, installation, setup, training, and full technical support.
              </p>

              <div className="bk-home-cta">
                <p className="bk-home-cta-text">Ready to Simplify Your Business?</p>
                <div className="bk-home-cta-btns">
                  <Link to="/bookkeeper" className="bk-btn-primary">
                    Learn More <ExternalLink size={16} />
                  </Link>
                  <a href="tel:+918667864448" className="bk-btn-primary bk-btn-call">
                    <Phone size={16} />
                    Book Now — +91 8667864448
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-section">
        <div className="container">
          <SectionHeading>Why Choose Us</SectionHeading>
          <div className="why-grid">
            <div className="why-card glass-card">
              <div className="why-icon-container"><Truck size={28} /></div>
              <h3 className="why-title">Free Door Delivery</h3>
              <p className="why-desc">Premium shockproof packed and delivered free to your doorstep anywhere.</p>
            </div>
            <div className="why-card glass-card">
              <div className="why-icon-container"><Wrench size={28} /></div>
              <h3 className="why-title">Free Doorstep Installation</h3>
              <p className="why-desc">Our crew assembles, wires and verifies performance right at your location — no setup hassle.</p>
            </div>
            <div className="why-card glass-card">
              <div className="why-icon-container"><DollarSign size={28} /></div>
              <h3 className="why-title">Budget Friendly Builds</h3>
              <p className="why-desc">Maximum hardware performance squeezed into your budget — peak FPS value for every rupee.</p>
            </div>
            <div className="why-card glass-card">
              <div className="why-icon-container"><Sliders size={28} /></div>
              <h3 className="why-title">Premium Components</h3>
              <p className="why-desc">Only A-grade parts from ASUS, MSI, GIGABYTE, Intel, AMD, Corsair, NVIDIA, DeepCool, Cooler Master, Thermaltake, Zotac -zero grey-market components.</p>
            </div>
            <div className="why-card glass-card">
              <div className="why-icon-container"><Cpu size={28} /></div>
              <h3 className="why-title">Pro Cable Management</h3>
              <p className="why-desc">Surgical cable routing for optimal airflow, dust resistance and a showcase-ready build.</p>
            </div>
            <div className="why-card glass-card">
              <div className="why-icon-container"><ShieldCheck size={28} /></div>
              <h3 className="why-title">Warranty Support</h3>
              <p className="why-desc">Full manufacturer warranties backed by us. We handle RMA and keep your machine protected long-term.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <GoogleReviews />

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <SectionHeading>Connect With Us</SectionHeading>
          <div className="contact-grid">
            <div className="contact-info glass-card" style={{ padding: '40px' }}>
              <div className="contact-header">
                <h3 className="contact-title" style={{
                  background: 'linear-gradient(to right, #78F626, #1CD1CE, #22A5DE, #6A46FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}>PCBUILDER Computers</h3>
                <p className="contact-desc">
                  Visit our physical experience store in Madurai, or reach out to our team of custom building experts today.
                </p>
              </div>

              <div className="contact-list">
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="contact-item-details">
                    <h4>Address</h4>
                    <p>KTR Complex, 229-230, E Veli St,</p>
                    <p>near HDFC Bank, Nelpettai,</p>
                    <p>Madurai Main, Madurai,</p>
                    <p>Tamil Nadu 625001</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item-icon">
                    <Phone size={20} />
                  </div>
                  <div className="contact-item-details">
                    <h4>Phone Number</h4>
                    <p><a href="tel:+918667864448" style={{ color: 'inherit', textDecoration: 'none' }}>+91 8667864448</a></p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item-icon">
                    <Smartphone size={20} />
                  </div>
                  <div className="contact-item-details">
                    <h4>WhatsApp</h4>
                    <p><a href="https://wa.me/918667864448" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>+91 8667864448</a></p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item-icon">
                    <Clock size={20} />
                  </div>
                  <div className="contact-item-details">
                    <h4>Store Hours</h4>
                    <p>Monday – Saturday: 9:00 AM to 10:00 PM</p>
                    <p>Sunday: 9:00 AM to 3:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="map-container glass-card">
              {/* Google Map Embedded Live */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d982.5317538073!2d78.1251032!3d9.9213951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c566b3e3efbf%3A0x9ed4d0a8fafa1fb4!2sPCBUILDER%20Computers!5e0!3m2!1sen!2sin!4v1719230000000!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="PCBUILDER Computers Madurai Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src={pcBuilderLogo} alt="PC BUILD IN MADURAI" style={{ width: '140px', marginBottom: '12px', display: 'block', marginLeft: '-10px' }} />
              <p>Specializing in custom high-performance gaming and editing computer setups. Built for enthusiasts, by enthusiasts.</p>
              <div className="footer-social-icons">
                <a
                  href="https://www.facebook.com/people/Pcbuilder-Computers/100084020059694/"
                  className="footer-social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Profile"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a
                  href="https://www.instagram.com/harishjackson_/"
                  className="footer-social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a
                  href="https://www.indiamart.com/pcbuilder-computers/"
                  className="footer-social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="IndiaMART Profile"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                </a>
                <a
                  href="https://jsdl.in/DT-41XP3YN8ZYE"
                  className="footer-social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Justdial Profile"
                >
                  <Compass size={20} />
                </a>
                <a
                  href="https://www.youtube.com/@pcbuildercomputers"
                  className="footer-social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
              </div>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#enquiry">Enquiry Form</a></li>
                <li><a href="#gallery">Recent Showcase</a></li>
                <li><Link to="/gallery">Gallery</Link></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Services</h4>
              <ul>
                <li><a href="#services">Customization PC Build</a></li>
                <li><a href="#services">Gaming PC</a></li>
                <li><a href="#services">Editing PC</a></li>
                <li><a href="#services">Desktop Computer</a></li>
                <li><a href="#services">Gaming Laptop</a></li>
                <li><a href="#services">Deep Cleaning & Upgrade</a></li>
                <li><a href="#services">Repair Services & More</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} PCBUILDER Computers. All rights reserved.</p>
            <p>
              Developed by{' '}
              <a
                href="https://www.arvitechai.in/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#4da6ff', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.5px' }}
              >
                arvitechai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="lightbox" onClick={() => setLightboxImg(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxImg(null)}>
              <X size={32} />
            </button>
            <img src={lightboxImg} alt="Installation Showcase" className="lightbox-img" />
          </div>
        </div>
      )}
    </>
  );
}
