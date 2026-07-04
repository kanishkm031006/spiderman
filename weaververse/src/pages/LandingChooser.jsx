import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserAstronaut, FaStore, FaSpider } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext.jsx';

function SpiderWebField() {
  const circles = [100, 200, 300, 400, 500, 600, 700];
  const spokes = Array.from({ length: 12 });
  
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <svg className="absolute w-[1200px] h-[1200px]" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} viewBox="0 0 1000 1000">
        <defs>
          <radialGradient id="webRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E63946" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#3DDCFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0B0B0D" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Glow center */}
        <circle cx="500" cy="500" r="500" fill="url(#webRadial)" />

        {/* Spokes */}
        {spokes.map((_, i) => {
          const angle = (i * 360) / 12;
          const rad = (angle * Math.PI) / 180;
          const x2 = 500 + Math.cos(rad) * 600;
          const y2 = 500 + Math.sin(rad) * 600;
          return (
            <motion.line
              key={`spoke-${i}`}
              x1="500" y1="500" x2={x2} y2={y2}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.05, ease: 'easeOut' }}
            />
          );
        })}

        {/* Concentric rings */}
        {circles.map((r, i) => (
          <motion.circle
            key={`ring-${i}`}
            cx="500"
            cy="500"
            r={r}
            stroke={i % 2 === 0 ? 'rgba(230,57,70,0.18)' : 'rgba(61,220,255,0.12)'}
            strokeWidth="1.2"
            fill="none"
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.5, delay: i * 0.08, ease: 'easeOut' }}
          />
        ))}

        {/* Center glowing spider logo */}
        <motion.g
          transform="translate(465, 460) scale(1.4)"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: [0.2, 0.45, 0.2], 
            scale: [1.3, 1.45, 1.3] 
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M25,5 C25,5 24,10 20,12 C16,14 10,12 10,12 C10,12 15,18 20,18 C25,18 25,22 25,25 C25,28 20,32 15,30 C10,28 5,20 5,20 C5,20 7,27 12,32 C17,37 22,38 25,43 L25,48 L27,48 L27,43 C30,38 35,37 40,32 C45,27 47,20 47,20 C47,20 42,28 37,30 C32,32 27,28 27,25 C27,22 27,18 32,18 C37,18 42,12 42,12 C42,12 36,14 32,12 C28,10 27,5 27,5 Z"
            fill="currentColor"
            className="text-[var(--crimson)]"
          />
          <circle cx="26" cy="22" r="5" fill="currentColor" className="text-[var(--crimson)]" />
        </motion.g>
      </svg>
    </div>
  );
}

export default function LandingChooser() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[var(--obsidian)] text-[var(--silk)] relative overflow-hidden flex flex-col items-center justify-center px-6">
      <SpiderWebField />

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center mb-14"
      >
        <p className="font-mono text-[var(--cyan)] tracking-[0.35em] text-xs mb-3">ISSUE #001 · AMAZING FANTASY</p>
        <h1 className="font-display text-6xl sm:text-8xl leading-none">
          SPIDER<span className="text-[var(--crimson)]">MAN</span>
        </h1>
        <p className="text-[var(--ash)] mt-4 max-w-md mx-auto">
          "With great power comes great responsibility." Access the legendary Spider-Man comic collection and archives.
        </p>
      </motion.div>

      <div className="relative z-10 grid sm:grid-cols-2 gap-6 w-full max-w-3xl">
        <motion.button
          whileHover={{ y: -6, borderColor: '#E63946' }}
          onClick={() => navigate('/customer')}
          className="group text-left bg-[var(--carbon)] border border-white/10 rounded-2xl p-8 cursor-pointer transition-colors"
        >
          <FaUserAstronaut className="text-3xl text-[var(--crimson)] mb-4" />
          <h2 className="font-display text-2xl mb-2">CUSTOMER PORTAL</h2>
          <p className="text-[var(--ash)] text-sm">Browse the catalog, preview legendary issues, and build your digital collection.</p>
          <span className="inline-block mt-5 text-xs font-mono text-[var(--crimson)] group-hover:translate-x-1 transition-transform">ENTER →</span>
        </motion.button>

        <motion.button
          whileHover={{ y: -6, borderColor: '#3DDCFF' }}
          onClick={() => navigate('/shopkeeper')}
          className="group text-left bg-[var(--carbon)] border border-white/10 rounded-2xl p-8 cursor-pointer transition-colors"
        >
          <FaStore className="text-3xl text-[var(--cyan)] mb-4" />
          <h2 className="font-display text-2xl mb-2">SHOPKEEPER PORTAL</h2>
          <p className="text-[var(--ash)] text-sm">Manage spidey inventory, view customer orders, and control database analytics.</p>
          <span className="inline-block mt-5 text-xs font-mono text-[var(--cyan)] group-hover:translate-x-1 transition-transform">
            {user && user.role === 'shopkeeper' ? 'DASHBOARD →' : 'SIGN IN →'}
          </span>
        </motion.button>
      </div>
    </div>
  );
}

