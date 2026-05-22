import { useState, useRef, memo, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { heroCards } from '../../data/siteContent';
import { MagneticButton } from '../ui';

/**
 * Awwwards-Style Hero Card with Deep 3D Logic
 */
const AwwwardsHeroCard = memo(({ card, index, scrollYProgress }) => {
  const [isActive, setIsActive] = useState(false);

  const springConfig = { stiffness: 40, damping: 18, mass: 1 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // Position Transforms
  // Cards start below text, converge to center, then drop staggered
  const x = useTransform(smoothProgress, 
    [0, 0.25, 0.45, 0.7, 0.9], 
    [`${(index - 1) * 22}vw`, '0vw', '0vw', `${(index - 1) * 32}vw`, `${(index - 1) * 30}vw`]
  );
  
  const y = useTransform(smoothProgress, 
    [0, 0.25, 0.45, 0.75, 0.95], 
    ['40vh', '45vh', '35vh', '45vh', '47vh']
  );

  const scale = useTransform(smoothProgress, 
    [0, 0.25, 0.45, 0.75, 0.95], 
    [0.9, 0.8, 0.55, 1, 0.95]
  );

  const rotate = useTransform(smoothProgress, 
    [0, 0.25, 0.45, 0.75, 0.95], 
    [(index - 1) * 10, 0, (index - 1) * -20, 0, 0]
  );

  // Staggered 3D Flip
  const flipStart = 0.55 + index * 0.05;
  const rotateY = useTransform(smoothProgress, 
    [0, flipStart, flipStart + 0.15], 
    [0, 0, 180]
  );

  return (
    <motion.div
      className="absolute left-1/2 top-0 pointer-events-none"
      style={{ 
        x, y, scale, rotate, 
        translateX: '-50%',
        zIndex: 10 + index,
        perspective: 2000,
        transformStyle: 'preserve-3d'
      }}
    >
      <motion.div
        className="pointer-events-auto cursor-pointer relative"
        style={{ 
          rotateY,
          transformStyle: 'preserve-3d',
          width: 'clamp(240px, 20vw, 380px)',
          height: 'clamp(320px, 28vw, 480px)',
        }}
        whileHover={{ scale: 1.02, y: -5 }}
        onClick={() => setIsActive(!isActive)}
      >
        {/* FRONT FACE (Brand Title) */}
        <div 
          className="absolute inset-0 rounded-[2.5rem] bg-paper border border-ink/5 shadow-2xl p-8 flex flex-col justify-between overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-bronze/5 opacity-50" />
          <div className="relative flex justify-between">
            <span className="text-[10px] font-bold tracking-[0.4em] text-bronze uppercase">{card.label}</span>
            <span className="text-[10px] font-bold text-stone/40">{card.note}</span>
          </div>
          <h3 className="relative font-display text-5xl leading-none text-ink">{card.title}</h3>
          <div className="relative pt-6 border-t border-ink/5 flex justify-between items-center">
            <span className="text-[9px] font-bold tracking-widest text-ink/20 uppercase">Rudhram Series</span>
            <div className="h-8 w-8 rounded-full border border-ink/10 flex items-center justify-center text-bronze">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* BACK FACE (Content Settle) */}
        <div 
          className="absolute inset-0 rounded-[2.5rem] bg-ink p-8 flex flex-col justify-between text-paper border border-paper/10 shadow-2xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(179,120,57,0.15),transparent_70%)]" />
          <span className="relative text-[10px] font-bold tracking-[0.4em] text-bronze uppercase">Strategic Value</span>
          <div className="relative">
            <h4 className="font-display text-3xl mb-4 text-paper">{card.title}</h4>
            <p className="text-sm leading-relaxed text-paper/60 italic">"{card.backText}"</p>
          </div>
          <div className="relative pt-6 border-t border-paper/10">
            <span className="text-[10px] tracking-widest text-bronze uppercase font-bold">Impeccable Standard</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

const Hero = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  // Headline Transforms
  const headOpacity = useTransform(smoothProgress, [0, 0.15, 0.25], [1, 0.5, 0]);
  const headScale = useTransform(smoothProgress, [0, 0.25], [1, 0.85]);
  const headY = useTransform(smoothProgress, [0, 0.25], ['0vh', '-10vh']);

  // Second Screen Text Transforms (Settles with flipped cards)
  const settleTextOpacity = useTransform(smoothProgress, [0.7, 0.85], [0, 1]);
  const settleTextY = useTransform(smoothProgress, [0.7, 0.85], ['50px', '0px']);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[450vh] bg-paper"
    >
      <div className="sticky top-0 min-h-screen w-full flex flex-col items-center overflow-hidden">
        
        {/* PHASE 1: Center Top Headline */}
        <motion.div 
          className="relative z-20 mt-[15vh] text-center pointer-events-none px-5"
          style={{ opacity: headOpacity, scale: headScale, y: headY }}
        >
          <h1 className="font-bold tracking-tighter text-[clamp(3.5rem,7vw,8rem)] leading-tight text-ink">
            Leading, What's Next.
          </h1>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-8 flex flex-col items-center gap-2"
          >
          </motion.div>
        </motion.div>

        {/* THE CARDS ENGINE (Nested Layers) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {heroCards.map((card, index) => (
            <AwwwardsHeroCard
              key={card.id}
              card={card}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* PHASE 4: Final Settled Content (Centered above settled cards) */}
        <motion.div 
          className="absolute bottom-[58vh] z-10 w-full max-w-4xl text-center px-10"
          style={{ opacity: settleTextOpacity, y: settleTextY }}
        >
          {/* <span className="text-[10px] font-bold tracking-[0.4em] text-bronze uppercase block mb-6">The Rudhram Standard</span> */}
          <h2 className="font-bold tracking-tight text-5xl lg:text-7xl leading-tighter text-ink mb-8">
            Three standards.<br />One way forward.
          </h2>
          <div className="flex justify-center">
            <MagneticButton href="#ventures">Explore the Ecosystem</MagneticButton>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default memo(Hero);
