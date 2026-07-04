import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';

const BUILDINGS_BACK = [
  { x: 0, w: 90, h: 280, neonColor: 'rgba(230,57,70,0.1)' }, 
  { x: 100, w: 60, h: 360, neonColor: 'rgba(61,220,255,0.08)' }, 
  { x: 175, w: 110, h: 240, neonColor: 'rgba(230,57,70,0.08)' },
  { x: 300, w: 70, h: 410, neonColor: 'rgba(61,220,255,0.12)' }, 
  { x: 385, w: 95, h: 290, neonColor: 'rgba(230,57,70,0.1)' }, 
  { x: 495, w: 60, h: 350, neonColor: 'rgba(61,220,255,0.08)' },
  { x: 570, w: 120, h: 260, neonColor: 'rgba(230,57,70,0.08)' }, 
  { x: 705, w: 80, h: 390, neonColor: 'rgba(61,220,255,0.1)' }, 
  { x: 800, w: 100, h: 280, neonColor: 'rgba(230,57,70,0.08)' },
  { x: 915, w: 65, h: 330, neonColor: 'rgba(61,220,255,0.08)' }, 
  { x: 995, w: 110, h: 250, neonColor: 'rgba(230,57,70,0.1)' }, 
  { x: 1120, w: 80, h: 370, neonColor: 'rgba(61,220,255,0.08)' },
];

const BUILDINGS_FRONT = [
  { x: -30, w: 140, h: 200 }, 
  { x: 130, w: 100, h: 150 }, 
  { x: 260, w: 160, h: 220 },
  { x: 460, w: 110, h: 170 }, 
  { x: 610, w: 150, h: 210 }, 
  { x: 800, w: 110, h: 160 },
  { x: 950, w: 170, h: 230 }, 
  { x: 1160, w: 110, h: 180 },
];

export default function Hero() {
  const heroRef = useRef(null);
  const spideyRef = useRef(null);
  const webLineRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const backY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const frontY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (!spideyRef.current || !webLineRef.current) return;

    // Set initial position
    gsap.set(spideyRef.current, { x: 150, y: 280, rotation: -30, transformOrigin: 'center center' });

    // GSAP Pendulum Physics swinging animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } });
    
    tl.to(spideyRef.current, {
      x: 1050,
      rotation: 30,
      duration: 3.2,
      onUpdate: () => {
        if (!spideyRef.current || !webLineRef.current) return;
        const currentX = gsap.getProperty(spideyRef.current, 'x');
        
        // Pendulum curve logic: bottom out in the middle (x=600)
        // normalized value from -1 to 1 based on center 600
        const normX = (currentX - 600) / 450; 
        // Y curve: lower in center, higher on both sides
        const calcY = 460 - 180 * (1 - Math.pow(normX, 2));
        
        // Dynamic swinging tilt calculation
        const tilt = normX * 45; 
        
        gsap.set(spideyRef.current, { y: calcY, rotation: tilt });

        // Update web line from anchor point (600, -50) in sky to Spidey
        webLineRef.current.setAttribute('x2', currentX);
        webLineRef.current.setAttribute('y2', calcY);
      }
    });

    return () => tl.kill();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-gradient-to-b from-[#08080a] via-[#0e0d14] to-[#08080a]">
      {/* Spider-Man background radial red/blue ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(230,57,70,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(61,220,255,0.08),transparent_50%)]" />

      {/* Spider Web overlay background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="40%" r="30%" stroke="white" strokeWidth="1" fill="none" strokeDasharray="3,6" />
          <circle cx="50%" cy="40%" r="50%" stroke="white" strokeWidth="1" fill="none" strokeDasharray="4,8" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="1" />
          <line x1="0" y1="40%" x2="100%" y2="40%" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      {/* Floating Spark/Web Particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-[15%] left-[25%] w-1.5 h-1.5 bg-[var(--cyan)] rounded-full opacity-35 blur-[1px] animate-bounce" style={{ animationDuration: '6s' }} />
        <div className="absolute top-[35%] left-[75%] w-2 h-2 bg-[var(--crimson)] rounded-full opacity-20 blur-[2px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-[60%] left-[15%] w-1.5 h-1.5 bg-white rounded-full opacity-40 blur-[0.5px] animate-bounce" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[45%] left-[85%] w-1.5 h-1.5 bg-[var(--cyan)] rounded-full opacity-25 blur-[1px] animate-pulse" style={{ animationDuration: '5s' }} />
      </div>

      {/* Background buildings */}
      <motion.svg style={{ y: backY }} className="absolute inset-0 w-full h-full opacity-60 z-0" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMax slice">
        {BUILDINGS_BACK.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={700 - b.h} width={b.w} height={b.h} fill="#14131a" />
            {/* Glowing neon borders/details to simulate NYC skyline */}
            <line x1={b.x} y1={700 - b.h} x2={b.x + b.w} y2={700 - b.h} stroke={b.neonColor.replace('0.1', '0.6')} strokeWidth="1" />
            <rect x={b.x + b.w/2 - 1.5} y={700 - b.h + 20} width="3" height={b.h - 40} fill={b.neonColor} />
          </g>
        ))}
      </motion.svg>

      {/* Foreground buildings */}
      <motion.svg style={{ y: frontY }} className="absolute inset-0 w-full h-full z-10" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMax slice">
        {BUILDINGS_FRONT.map((b, i) => (
          <rect key={i} x={b.x} y={700 - b.h} width={b.w} height={b.h} fill="#0a0a0e" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
        ))}

        {/* Dynamic swing web string */}
        <line 
          ref={webLineRef} 
          x1="600" y1="-50" 
          x2="150" y2="280" 
          stroke="rgba(240,240,250,0.7)" 
          strokeWidth="1.8" 
          style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.5))' }}
        />

        {/* Animated Spiderman Silhouette */}
        <g ref={spideyRef}>
          {/* Web shooter attachment line */}
          <line x1="0" y1="0" x2="-8" y2="-22" stroke="white" strokeWidth="2" strokeLinecap="round" />
          
          {/* Main Spider-man figure group */}
          <g transform="translate(-10, -5) scale(1.4)">
            {/* Web fluid lines overlay on suit */}
            <path d="M-8,-4 C-4,-8 4,-8 8,-4 C6,3 -6,3 -8,-4 Z" fill="#1e3a8a" />
            
            {/* Suit elements (Red torso/mask) */}
            <path d="M -7, -11 C -7,-19 7,-19 7,-11 C 7,-6 4,-3 0,-3 C -4,-3 -7,-6 -7,-11 Z" fill="#E63946" stroke="#b91c1c" strokeWidth="0.5" />
            <path d="M -5, -3 C -8, 2 -5, 8 0, 7 C 5, 8 8, 2 5,-3 Z" fill="#E63946" />
            
            {/* Legs (Blue/Red spider legs in crouch) */}
            <path d="M-5,7 L-11,13 L-13,11" stroke="#1e3a8a" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5,7 L11,13 L13,11" stroke="#1e3a8a" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Arms (reaching for web) */}
            <path d="M-6,-9 L-14,-17" stroke="#E63946" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M6,-9 L12,-3" stroke="#E63946" strokeWidth="3" strokeLinecap="round" />

            {/* Glowing Spiderman white eyes */}
            <path d="M-5,-13 Q-3,-16 -1,-13 Q-3,-11 -5,-13 Z" fill="white" stroke="black" strokeWidth="1" />
            <path d="M5,-13 Q3,-16 1,-13 Q3,-11 5,-13 Z" fill="white" stroke="black" strokeWidth="1" />

            {/* Spider emblem on chest */}
            <circle cx="0" cy="0" r="1.5" fill="black" />
            <path d="M-2,-1 L2,1 M-2,1 L2,-1" stroke="black" strokeWidth="0.5" />
          </g>
        </g>
      </motion.svg>

      {/* Hero content overlay */}
      <motion.div style={{ opacity: fade }} className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="font-mono text-xs tracking-[0.4em] text-[var(--cyan)] mb-4 uppercase">SPIDER-MAN COMIC ARCHIVE</p>
        <h1 className="font-display text-5xl sm:text-8xl leading-[0.95] uppercase">
          THE AMAZING<br /><span className="text-[var(--crimson)]">SPIDER</span>-MAN
        </h1>
        <p className="text-[var(--ash)] max-w-lg mt-6">
          Step into the spider-verse. Browse original classic issues, preview pages, and explore the web of Marvel's legendary wall-crawler.
        </p>
        <a href="#books" className="mt-9 inline-block bg-[var(--crimson)] hover:bg-[var(--crimson-dim)] transition-colors px-8 py-3 rounded-full font-mono text-sm tracking-wide shadow-lg cursor-pointer">
          EXPLORE THE CATALOG
        </a>
      </motion.div>
    </section>
  );
}
