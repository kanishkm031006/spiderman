import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ThreadProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.3 });
  const dotTop = useTransform(scaleY, (v) => `${v * 100}%`);

  return (
    <div className="hidden lg:block fixed left-6 top-24 bottom-10 w-px z-30 pointer-events-none">
      <div className="w-px h-full bg-white/10" />
      <motion.div
        style={{ scaleY, originY: 0 }}
        className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-[var(--crimson)] to-[var(--cyan)]"
      />
      <motion.div
        style={{ top: dotTop }}
        className="absolute -left-[3px] w-[7px] h-[7px] rounded-full bg-[var(--crimson)] shadow-[0_0_8px_2px_rgba(230,57,70,0.6)]"
      />
    </div>
  );
}
