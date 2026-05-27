import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, useScroll, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { SunburstIcon, TrishulLineIcon, ArrowIcon, PlusIcon, ScrollToTopRing } from './FooterSVGs';
import './Footer.css';

const ventures = [
  { id: '01', name: 'Panigrahna', tag: 'Legacy & Tradition', teaser: 'Honoring sacred unions through timeless craft and cultural precision.' },
  { id: '02', name: 'Aghhori', tag: 'Bold Innovation', teaser: 'Defying conventions with radical design and transformative thinking.' },
  { id: '03', name: 'House of Joggi', tag: 'Luxury Lifestyle', teaser: 'A sanctuary of refined aesthetics and artisanal excellence.' },
  { id: '04', name: 'Damrru', tag: 'Creative Rhythm', teaser: 'Capturing the heartbeat of innovation through sound and visual flow.' },
  { id: '05', name: 'Tandavs', tag: 'Dynamic Energy', teaser: 'Executing vision with power, precision, and relentless momentum.' },
  { id: '06', name: 'Kapaalik', tag: 'Identity & Brand', teaser: 'Precision branding and digital experiences that leave a mark.' },
  { id: '07', name: 'Kalyannam', tag: 'Holistic Growth', teaser: 'Nurturing ventures that celebrate balance, prosperity, and wellness.' },
  { id: '08', name: 'Storage Media Solution', tag: 'Tech Infrastructure', teaser: 'Architecting the digital foundation for the ventures of tomorrow.' },
];

const VentureRow = ({ venture, isActive, onClick }) => {
  return (
    <div className={`venture-row ${isActive ? 'active' : ''}`}>
      <div 
        className="venture-row-header" 
        onClick={() => onClick(isActive ? null : venture.id)}
      >
        <span className="venture-num">{venture.id}</span>
        <h3 className="venture-name">{venture.name}</h3>
        <span className="venture-tag">{venture.tag}</span>
        <div className="venture-plus-container">
          <PlusIcon className="venture-plus" />
        </div>
      </div>
      
      <div className="venture-content">
        <div className="venture-inner-content">
          <div className="venture-teaser">
            {venture.teaser}
            <button className="venture-action">
              View Venture <ArrowIcon className="venture-action-arrow" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = memo(() => {
  const [activeVenture, setActiveVenture] = useState('06');
  const [scrollProgress, setScrollProgress] = useState(0);
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, ease: 'easeOut', staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
  };

  const wordmarkY = useTransform(smoothProgress, [0.85, 1], [0, -80]);

  return (
    <footer 
      ref={footerRef}
      className={`footer-ledger-container ${isInView ? 'visible' : ''}`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section 1: Top Closing */}
        <div className="footer-top">
          <div className="footer-headline-container">
            <motion.h2 className="footer-headline" variants={itemVariants}>
              Build what <br /> endures.
            </motion.h2>
            <motion.p className="footer-sub-headline" variants={itemVariants}>
              Rudhram Enterprises partners with ambitious people, cultural ideas, and future-ready ventures.
            </motion.p>
          </div>

          <div className="footer-cta-container">
            <motion.div 
              className="footer-cta-circle" 
              variants={itemVariants}
              onClick={() => window.location.href = 'mailto:hello@rudhram.com'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="footer-cta-text">Start</span>
              <ArrowIcon className="footer-cta-arrow" />
            </motion.div>
            <motion.a 
              href="mailto:hello@rudhram.com" 
              className="footer-email"
              variants={itemVariants}
            >
              hello@rudhram.com
            </motion.a>
          </div>
        </div>

        {/* Section 2: Venture Ledger (Accordion) */}
        <motion.div className="venture-ledger" variants={itemVariants}>
          {ventures.map((venture) => (
            <VentureRow
              key={venture.id}
              venture={venture}
              isActive={activeVenture === venture.id}
              onClick={setActiveVenture}
            />
          ))}
        </motion.div>

        {/* Section 3: Wordmark */}
        <motion.div 
          className="footer-wordmark-container" 
          variants={itemVariants}
          style={{ y: wordmarkY }}
        >
          <div className="trishul-container">
            <TrishulLineIcon />
          </div>
          <h1 className="footer-wordmark">
            RUDHRAM
            <span className="footer-wordmark-solid">RUDHRAM</span>
          </h1>
          <span className="footer-enterprises">ENTERPRISES</span>
        </motion.div>

        {/* Section 4: Utility Strip */}
        <motion.div className="footer-bottom" variants={itemVariants}>
          <div className="footer-philosophy">
            <SunburstIcon className="sunburst-icon" />
            <span>Inspiring / Innovative / Impeccable</span>
          </div>
          
          <div className="footer-copyright">
            © 2026 Rudhram Enterprises. All rights reserved.
          </div>

          <div className="footer-links">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
            <a href="/privacy" className="footer-link">Privacy</a>
            <div className="back-to-top-container">
              <button 
                className="back-to-top-btn" 
                onClick={scrollToTop}
                aria-label="Back to top"
              >
                <ScrollToTopRing progress={scrollProgress} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
});

export default Footer;
