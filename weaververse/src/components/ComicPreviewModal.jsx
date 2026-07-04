import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaArrowLeft, FaArrowRight, FaVolumeUp } from 'react-icons/fa';

export default function ComicPreviewModal({ book, isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState(0);

  if (!isOpen) return null;

  // Let's define the retro comic pages dynamically based on the selected comic
  const pages = [
    // Page 1: Retro Cover
    {
      title: `${book.title} - Cover Preview`,
      layout: 'cover',
      content: (
        <div className="w-full h-full flex flex-col justify-between p-6 relative bg-gradient-to-br from-red-700 via-red-900 to-blue-900 rounded-lg overflow-hidden border-4 border-yellow-400">
          {/* Half-tone dots texture simulation */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:8px_8px]" />
          
          {/* Header Banner */}
          <div className="bg-yellow-400 text-black p-3 font-display border-b-4 border-black text-center shadow-md">
            <p className="text-xs font-mono tracking-widest font-bold">APPROVED BY THE SPIDEY AUTHORITY</p>
            <h3 className="text-3xl tracking-wide uppercase">AMAZING ADVENTURES</h3>
          </div>

          {/* Central Artwork */}
          <div className="flex-1 flex items-center justify-center relative">
            <svg viewBox="0 0 200 240" className="w-48 h-56 drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]">
              {/* NYC Skyline silhouette */}
              <path d="M10,240 L10,180 L35,180 L35,210 L60,150 L85,210 L120,130 L150,190 L180,180 L180,240 Z" fill="#0f172a" />
              {/* Glowing yellow moon */}
              <circle cx="100" cy="110" r="45" fill="#fef08a" opacity="0.8" />
              
              {/* Web swing line */}
              <line x1="50" y1="30" x2="110" y2="120" stroke="white" strokeWidth="2.5" strokeDasharray="3,3" />

              {/* Spider-man silhouette path in action */}
              <g transform="translate(110, 120) scale(1.2)">
                <path d="M0,-10 C-5,-10 -7,-7 -7,-3 C-7,-1 -4,2 0,5 C4,2 7,-1 7,-3 C7,-7 5,-10 0,-10 Z" fill="#ef4444" />
                <path d="M-6,2 L-10,8 L-7,10 L-4,5 Z" fill="#1e3a8a" />
                <path d="M6,2 L10,8 L7,10 L4,5 Z" fill="#1e3a8a" />
                <path d="M-6,-4 L-12,-8" stroke="#ef4444" strokeWidth="2" />
                <path d="M6,-4 L12,-1" stroke="#ef4444" strokeWidth="2" />
                <polygon points="-3,-5 -1,-2 -4,-2" fill="white" />
                <polygon points="3,-5 1,-2 4,-2" fill="white" />
              </g>

              {/* Red-blue action lines */}
              <line x1="20" y1="50" x2="60" y2="70" stroke="#ef4444" strokeWidth="1.5" />
              <line x1="180" y1="80" x2="140" y2="100" stroke="#3b82f6" strokeWidth="1.5" />
            </svg>

            {/* Comic Splash Badge */}
            <div className="absolute top-2 left-2 bg-red-600 text-yellow-300 font-display px-4 py-2 border-2 border-white -rotate-12 uppercase text-xs tracking-widest shadow-md">
              12¢
            </div>
            <div className="absolute bottom-2 right-2 bg-yellow-400 text-black font-mono text-[9px] px-3 py-1 font-bold border border-black uppercase">
              {book.publisher}
            </div>
          </div>

          {/* Footer Title Banner */}
          <div className="bg-black/90 p-4 border-t-2 border-yellow-400 text-center">
            <h2 className="font-display text-2xl text-yellow-300 tracking-wide uppercase line-clamp-1">
              {book.title.split(':')[0]}
            </h2>
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-1">
              "INTRODUCING THE CHRONICLES OF PETER PARKER"
            </p>
          </div>
        </div>
      )
    },
    // Page 2: The Radioactive Bite
    {
      title: "The Radioactive Bite",
      layout: 'panels',
      content: (
        <div className="w-full h-full grid grid-rows-2 gap-4 p-4 bg-[#fbf8eb] text-black border-4 border-black rounded-lg relative overflow-hidden">
          {/* Paper texture overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />

          {/* Panel 1 */}
          <div className="border-4 border-black bg-white p-3 relative flex flex-col justify-between">
            {/* Comic Caption Box */}
            <div className="bg-yellow-100 border-2 border-black p-1.5 font-mono text-[9px] leading-tight uppercase max-w-sm shadow mb-2">
              DURING A PUBLIC SCIENCE EXHIBITION, A SPIDER ACCIDENTALLY FLOATS INTO A BEAM OF HIGH-ENERGY RADIATION...
            </div>
            
            <div className="flex-1 flex justify-center items-center">
              <svg viewBox="0 0 300 100" className="w-full h-20">
                {/* Radiation particles */}
                <circle cx="150" cy="50" r="30" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="3,3" className="animate-spin" style={{ animationDuration: '10s' }} />
                <path d="M 120,50 L 180,50 M 150,20 L 150,80" stroke="#22c55e" strokeWidth="1" />
                
                {/* Peter's hand */}
                <path d="M 40,90 C 70,80 110,65 140,65 C 150,65 155,60 160,50 C 162,45 168,45 175,55" stroke="black" strokeWidth="2" fill="none" />
                
                {/* Spider landing */}
                <circle cx="140" cy="62" r="3" fill="red" />
                <path d="M137,60 L134,57 M137,62 L133,62 M137,64 L134,67 M143,60 L146,57 M143,62 L147,62 M143,64 L146,67" stroke="red" strokeWidth="1.2" />
                
                {/* Zap lightning effect */}
                <path d="M135,50 L140,58 L137,60 L145,63" stroke="#eab308" strokeWidth="2.5" fill="none" />
              </svg>
            </div>

            {/* Speech Bubble */}
            <div className="absolute bottom-2 right-4 bg-white border-2 border-black rounded-full px-3 py-1 text-[10px] font-bold font-mono shadow-md">
              OUCH! A SPIDER BIT ME! IT GLOWED!
              {/* Speech bubble pointer */}
              <div className="absolute top-[-8px] left-4 w-2 h-2.5 bg-white border-l-2 border-t-2 border-black transform rotate-45" />
            </div>
          </div>

          {/* Panel 2 */}
          <div className="border-4 border-black bg-white p-3 relative flex flex-col justify-between">
            {/* Comic Caption Box */}
            <div className="bg-yellow-100 border-2 border-black p-1.5 font-mono text-[9px] leading-tight uppercase max-w-sm shadow mb-2">
              IN SHEER BEWILDERMENT, THE FRAIL HIGH SCHOOLER RUNS INTO THE STREET, ONLY TO LEAP OVER A SPEEDING SEDAN IN SHOCK!
            </div>
            
            <div className="flex-1 flex justify-center items-center">
              <svg viewBox="0 0 300 100" className="w-full h-20">
                {/* Car */}
                <rect x="180" y="65" width="80" height="25" fill="#ef4444" stroke="black" strokeWidth="2" rx="4" />
                <circle cx="200" cy="90" r="10" fill="gray" stroke="black" strokeWidth="2" />
                <circle cx="240" cy="90" r="10" fill="gray" stroke="black" strokeWidth="2" />
                <path d="M 190,65 L 205,50 L 235,50 L 255,65 Z" fill="#93c5fd" stroke="black" strokeWidth="2" />
                
                {/* Dust lines */}
                <path d="M 270,75 L 285,75 M 275,83 L 290,83" stroke="gray" strokeWidth="2" />

                {/* Jumping Peter (stick figure style for classic silhouette) */}
                <g transform="translate(100, 25)">
                  <circle cx="0" cy="0" r="6" fill="black" />
                  <path d="M 0,6 L 0,22 L -8,32 M 0,22 L 8,32" stroke="black" strokeWidth="2" fill="none" />
                  <path d="M -10,12 L 0,8 L 10,12" stroke="black" strokeWidth="2" fill="none" />
                </g>
                
                {/* Motion arcs */}
                <path d="M 50,85 Q 100,5 100,20" stroke="black" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />
              </svg>
            </div>

            {/* Speech Bubble */}
            <div className="absolute bottom-2 left-4 bg-white border-2 border-black rounded-full px-3 py-1 text-[10px] font-bold font-mono shadow-md">
              WHAT IS HAPPENING?! I AM STICKING TO THE WALL!
              <div className="absolute bottom-[-8px] right-6 w-2 h-2.5 bg-white border-r-2 border-b-2 border-black transform rotate-45" />
            </div>
          </div>
        </div>
      )
    },
    // Page 3: The Tragedy and Responsibility
    {
      title: "Tragedy and Responsibility",
      layout: 'panels',
      content: (
        <div className="w-full h-full grid grid-rows-2 gap-4 p-4 bg-[#fbf8eb] text-black border-4 border-black rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />

          {/* Panel 1 */}
          <div className="border-4 border-black bg-white p-3 relative flex flex-col justify-between">
            <div className="bg-yellow-100 border-2 border-black p-1.5 font-mono text-[9px] leading-tight uppercase max-w-sm shadow mb-2">
              DAYS LATER... A RUNAWAY BURGLAR DASHES PAST THE EGO-TRIPPED WRESTLER, PETER PARKER. HE REFUSES TO STOP HIM...
            </div>
            
            <div className="flex-1 flex justify-center items-center">
              <svg viewBox="0 0 300 100" className="w-full h-20">
                {/* Burglar running */}
                <g transform="translate(180, 40)">
                  <circle cx="0" cy="0" r="6" fill="#475569" />
                  <path d="M 0,6 L 0,22 L -5,35 M 0,22 L 5,35" stroke="black" strokeWidth="2.5" fill="none" />
                  <path d="M -10,8 L 0,15 L 10,8" stroke="black" strokeWidth="2.5" fill="none" />
                  {/* Swag bag */}
                  <circle cx="15" cy="20" r="7" fill="yellow" stroke="black" strokeWidth="1.5" />
                </g>

                {/* Peter in casual clothes standing with arms crossed */}
                <g transform="translate(70, 40)">
                  <circle cx="0" cy="0" r="6" fill="#e11d48" />
                  <path d="M 0,6 L 0,25 L -4,38 M 0,25 L 4,38" stroke="black" strokeWidth="2.5" fill="none" />
                  <path d="M -8,12 L 0,12 L 8,12" stroke="black" strokeWidth="2.5" fill="none" />
                </g>

                {/* Cop chasing */}
                <g transform="translate(240, 40)">
                  <circle cx="0" cy="0" r="6" fill="#1d4ed8" />
                  <path d="M 0,6 L 0,22 L -3,35 M 0,22 L 3,35" stroke="black" strokeWidth="2.5" fill="none" />
                  <path d="M -8,15 L 8,6" stroke="black" strokeWidth="2" fill="none" />
                </g>
              </svg>
            </div>

            <div className="absolute bottom-1 left-24 bg-white border-2 border-black rounded-full px-2 py-0.5 text-[8px] font-bold font-mono shadow-md">
              SORRY PAL! I'M DONE BEING PUSHED AROUND.
              <div className="absolute top-[8px] left-[-4px] w-1.5 h-1.5 bg-white border-l-2 border-b-2 border-black transform rotate-45" />
            </div>
          </div>

          {/* Panel 2 */}
          <div className="border-4 border-black bg-white p-3 relative flex flex-col justify-between">
            <div className="bg-yellow-100 border-2 border-black p-1.5 font-mono text-[9px] leading-tight uppercase max-w-sm shadow mb-2">
              BUT TRAGEDY STRIKES HOME! THE SAME THIEF KILLS PETER'S BELOVED UNCLE BEN. PETER UNDERSTANDS THE TRUTH...
            </div>
            
            <div className="flex-1 flex justify-center items-center relative">
              <svg viewBox="0 0 300 100" className="w-full h-20">
                {/* Full Moon */}
                <circle cx="220" cy="30" r="22" fill="#fef08a" opacity="0.4" />
                {/* Spidey swinging away into the night */}
                <line x1="50" y1="10" x2="130" y2="70" stroke="black" strokeWidth="1.5" strokeDasharray="2,2" />
                
                <g transform="translate(130, 70) scale(0.8)">
                  <circle cx="0" cy="0" r="7" fill="#ef4444" />
                  <path d="M0,7 L-5,18 M0,7 L5,18" stroke="black" strokeWidth="2" />
                  <path d="M-8,3 L8,-3" stroke="black" strokeWidth="2" />
                </g>
              </svg>

              {/* Legendary Quote box */}
              <div className="absolute bottom-0 right-2 left-2 bg-black text-yellow-300 border-2 border-yellow-400 p-2 font-display text-center text-xs tracking-wider uppercase shadow-lg">
                "WITH GREAT POWER THERE MUST ALSO COME... GREAT RESPONSIBILITY!"
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(c => c + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(c => c - 1);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
        {/* Modal container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-2xl bg-[var(--carbon)] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
            <div className="flex items-center gap-3">
              <span className="bg-[var(--crimson)] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">PREVIEW</span>
              <h3 className="text-sm font-mono text-[var(--silk)] tracking-wide uppercase line-clamp-1">{pages[currentPage].title}</h3>
            </div>
            <button 
              onClick={onClose}
              className="text-[var(--ash)] hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* Book Content Screen */}
          <div className="flex-1 flex justify-center items-center bg-black/50 p-6 min-h-[420px] max-h-[500px]">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.4 }}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              className="w-full max-w-md aspect-[3/4] shadow-2xl"
            >
              {pages[currentPage].content}
            </motion.div>
          </div>

          {/* Reader Navigation Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-black/40 font-mono text-xs">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="flex items-center gap-2 border border-white/10 disabled:opacity-30 disabled:hover:bg-transparent hover:bg-white/5 px-4 py-2 rounded-full cursor-pointer transition-colors"
            >
              <FaArrowLeft size={10} /> PREV
            </button>

            <span className="text-[var(--ash)]">
              PAGE {currentPage + 1} OF {pages.length}
            </span>

            {currentPage === pages.length - 1 ? (
              <button
                onClick={onClose}
                className="flex items-center gap-2 bg-[var(--crimson)] hover:bg-[var(--crimson-dim)] text-white px-5 py-2 rounded-full cursor-pointer transition-colors font-bold"
              >
                CLOSE PREVIEW
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 border border-white/10 hover:bg-white/5 px-4 py-2 rounded-full cursor-pointer transition-colors"
              >
                NEXT <FaArrowRight size={10} />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
