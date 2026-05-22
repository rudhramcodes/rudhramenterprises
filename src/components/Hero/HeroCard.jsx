import { memo, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const HeroCard = ({ 
  card, 
  index, 
  isActive, 
  isDimmed,
  onClick, 
  scrollProps // { x, y, rotate, scale }
}) => {
  const cardRef = useRef(null);
  
  // --- 1. MOUSE TILT LOGIC ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const tiltX = useSpring(mouseY, springConfig);
  const tiltY = useSpring(mouseX, springConfig);

  const rotateX = useTransform(tiltX, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(tiltY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isActive || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        x: scrollProps.x,
        y: scrollProps.y,
        rotate: scrollProps.rotate,
        scale: scrollProps.scale,
        zIndex: isActive ? 50 : 10 + index,
      }}
    >
      <motion.button
        onClick={() => onClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="pointer-events-auto relative block outline-none group"
        animate={{
          scale: isActive ? 1.1 : isDimmed ? 0.94 : 1,
          x: isActive ? -40 : 0, // Slight offset when active
          filter: isDimmed ? 'blur(2px) grayscale(0.2)' : 'blur(0px) grayscale(0)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        aria-pressed={isActive}
      >
        <motion.div
          ref={cardRef}
          className="relative h-[20rem] w-[15rem] sm:h-[24rem] sm:w-[18rem] md:h-[25rem] md:w-[19rem] lg:h-[26.5rem] lg:w-[20rem] rounded-[1.5rem] sm:rounded-[2rem] bg-paper border border-ink/5 shadow-2xl overflow-hidden"
          style={{
            rotateX: isActive ? 0 : rotateX,
            rotateY: isActive ? 0 : rotateY,
            transformStyle: 'preserve-3d',
            perspective: 1200,
          }}
          whileHover={{ y: -10 }}
          whileTap={{ scale: 0.985 }}
        >
          {/* Card Surface Depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-bronze/5 opacity-40" />
          
          {/* Content Layer */}
          <div className="relative h-full w-full p-8 flex flex-col justify-between">
            {/* Header */}
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold tracking-[0.3em] text-bronze uppercase">
                {card.label}
              </span>
              <span className="px-2 py-1 rounded-full border border-ink/10 text-[9px] font-bold uppercase tracking-widest text-stone">
                {card.note}
              </span>
            </div>

            {/* Main Content */}
            <div className="space-y-4">
              <motion.h3 
                className="font-display text-5xl leading-none text-ink"
                animate={{ opacity: isActive ? 0 : 1, y: isActive ? -10 : 0 }}
              >
                {card.title}
              </motion.h3>
              
              <motion.p 
                className="text-sm leading-relaxed text-stone/80"
                animate={{ opacity: isActive ? 0 : 1 }}
              >
                {card.frontText}
              </motion.p>
            </div>

            {/* Active State Details Panel */}
            <motion.div 
              className="absolute inset-0 bg-ink p-8 text-paper flex flex-col justify-center"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ 
                opacity: isActive ? 1 : 0,
                rotateY: isActive ? 0 : -90,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <span className="text-bronze text-[10px] font-bold tracking-widest uppercase mb-4">Inside the value</span>
              <p className="text-lg font-medium leading-snug text-paper/90 italic">
                "{card.backText}"
              </p>
              <div className="mt-8 pt-6 border-t border-paper/10">
                <span className="text-[10px] uppercase tracking-widest text-paper/40">Click to collapse</span>
              </div>
            </motion.div>

            {/* Micro-Interaction Arrow */}
            <div className="pt-6 border-t border-ink/5 flex justify-between items-center group-hover:border-bronze/20 transition-colors">
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink/30">Rudhram Series</span>
              <motion.div 
                className="text-bronze"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default memo(HeroCard);
