import { useState, useRef, memo, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { heroCards } from "../../data/siteContent";
import { MagneticButton } from "../ui";
import MobileStackHero from "./MobileStackHero";

const AwwwardsHeroCard = memo(({ card, index, scrollYProgress, isMobile, isTablet }) => {
  const [manualFace, setManualFace] = useState(null);

  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const manualRotate = useMotionValue(0);

  useEffect(() => {
    if (manualFace === null) return;
    manualRotate.set(manualFace ? 180 : 0);
  }, [manualFace, manualRotate]);

  const tiltSpring = {
    stiffness: 120,
    damping: 22,
    mass: 0.8,
  };

  const tiltX = useSpring(mouseY, tiltSpring);
  const tiltY = useSpring(mouseX, tiltSpring);

  const manualRotateSpring = useSpring(manualRotate, {
    stiffness: 95,
    damping: 19,
    mass: 0.9,
  });

  const hoverRotateX = useTransform(tiltX, [-0.5, 0.5], [7, -7]);
  const hoverRotateY = useTransform(tiltY, [-0.5, 0.5], [-7, 7]);

  const innerX = useTransform(tiltY, [-0.5, 0.5], [-10, 10]);
  const innerY = useTransform(tiltX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 1024) return;

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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 42,
    damping: 24,
    mass: 1.25,
  });

  // Responsive offsets
  const xOffset = isMobile ? 32 : isTablet ? 26 : 22;
  const spreadOffset = isMobile ? 42 : isTablet ? 36 : 31;
  const settleOffset = isMobile ? 38 : isTablet ? 32 : 29;

  const x = useTransform(
    smoothProgress,
    [0, 0.25, 0.46, 0.72, 0.95],
    [
      `${(index - 1) * xOffset}vw`,
      "0vw",
      "0vw",
      `${(index - 1) * spreadOffset}vw`,
      `${(index - 1) * settleOffset}vw`,
    ]
  );

  const y = useTransform(
    smoothProgress,
    [0, 0.25, 0.46, 0.72, 0.95],
    [
      isMobile ? "42vh" : "42vh",
      isMobile ? "48vh" : "45vh",
      isMobile ? "38vh" : "35vh",
      isMobile ? "42vh" : "40vh",
      isMobile ? "48vh" : "45vh"
    ]
  );

  const scale = useTransform(
    smoothProgress,
    [0, 0.25, 0.46, 0.72, 0.95],
    [
      isMobile ? 0.8 : 0.9,
      isMobile ? 0.7 : 0.8,
      isMobile ? 0.48 : 0.55,
      isMobile ? 0.82 : 0.94,
      isMobile ? 0.78 : 0.91
    ]
  );

  const rotateZ = useTransform(
    smoothProgress,
    [0, 0.24, 0.46, 0.72, 0.95],
    [
      (index - 1) * (isMobile ? 8 : 12),
      0,
      (index - 1) * (isMobile ? -12 : -18),
      (index - 1) * 4,
      (index - 1) * 1.2,
    ]
  );

  const flipStart = 0.46 + index * 0.035;
  const flipEnd = flipStart + 0.12;

  const scrollRotateY = useTransform(
    smoothProgress,
    [0, flipStart, flipEnd, 1],
    [0, 0, 180, 180]
  );

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest < flipStart - 0.08 && manualFace !== null) {
      setManualFace(null);
    }
  });

  const finalRotateY = useTransform(
    [scrollRotateY, manualRotateSpring, hoverRotateY],
    ([scroll, manual, hover]) => {
      const baseRotation = manualFace === null ? scroll : manual;
      return baseRotation + hover;
    }
  );

  const finalRotateX = hoverRotateX;

  const cardStyles = [
    {
      name: "Culture",
      bg: "bg-[#F3CDA8]",
      backBg: "bg-[#EABF91]",
      text: "text-[#352414]",
      muted: "text-[#6F5031]",
      accent: "#9B4E23",
      accentSoft: "bg-[#9B4E23]/12",
      glow: "bg-[#C06632]/25",
      border: "border-[#9B4E23]/25",
      mark: "संस्कृति",
      word: "ROOTS",
      backWord: "BELIEF",
      shadow: "shadow-[0_30px_80px_rgba(155,78,35,0.20)]",
      hoverShadow: "group-hover:shadow-[0_42px_110px_rgba(155,78,35,0.30)]",
    },
    {
      name: "Innovation",
      bg: "bg-[#C7DCCF]",
      backBg: "bg-[#B8D2C3]",
      text: "text-[#182D24]",
      muted: "text-[#486457]",
      accent: "#2F6B55",
      accentSoft: "bg-[#2F6B55]/12",
      glow: "bg-[#4F8A72]/22",
      border: "border-[#2F6B55]/25",
      mark: "नवाचार",
      word: "NEXT",
      backWord: "BUILD",
      shadow: "shadow-[0_30px_80px_rgba(47,107,85,0.18)]",
      hoverShadow: "group-hover:shadow-[0_42px_110px_rgba(47,107,85,0.28)]",
    },
    {
      name: "Excellence",
      bg: "bg-[#E9C4BA]",
      backBg: "bg-[#DFAFA6]",
      text: "text-[#341D1C]",
      muted: "text-[#744B48]",
      accent: "#94433F",
      accentSoft: "bg-[#94433F]/12",
      glow: "bg-[#B75C56]/22",
      border: "border-[#94433F]/25",
      mark: "उत्कृष्टता",
      word: "TRUST",
      backWord: "CRAFT",
      shadow: "shadow-[0_30px_80px_rgba(148,67,63,0.18)]",
      hoverShadow: "group-hover:shadow-[0_42px_110px_rgba(148,67,63,0.28)]",
    },
  ];

  const style = cardStyles[index] || cardStyles[0];

  return (
    <motion.div
      className="absolute left-1/2 top-0 pointer-events-none"
      style={{
        x,
        y,
        scale,
        rotate: rotateZ,
        translateX: "-50%",
        zIndex: 10 + index,
        perspective: 2600,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.button
        type="button"
        onClick={() => {
          const currentRotation =
            manualFace === null ? scrollRotateY.get() : manualFace ? 180 : 0;

          const currentlyBackSide = currentRotation > 90;

          setManualFace(!currentlyBackSide);
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="pointer-events-auto group relative block cursor-pointer text-left outline-none"
        whileHover={{
          y: -3,
          scale: 1.006,
        }}
        whileTap={{
          scale: 0.992,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 22,
        }}
      >
        <motion.div
          ref={cardRef}
          className={`
            relative h-[19.5rem] w-[14.5rem]
            sm:h-[22.5rem] sm:w-[16.75rem]
            md:h-[24rem] md:w-[18rem]
            lg:h-[26rem] lg:w-[19.5rem]
            rounded-[1.8rem] sm:rounded-[2.25rem]
            ${style.shadow}
            ${style.hoverShadow}
            transition-shadow duration-700
          `}
          style={{
            rotateX: finalRotateX,
            rotateY: finalRotateY,
            transformStyle: "preserve-3d",
          }}
        >
          {/* FRONT FACE */}
          <div
            className={`
              absolute inset-0 overflow-hidden rounded-[1.8rem] sm:rounded-[2.25rem]
              ${style.bg}
              ${style.text}
              ${style.border}
              border
            `}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
            }}
          >
            <motion.div
              className={`absolute -right-28 -top-28 h-72 w-72 rounded-full ${style.glow} blur-3xl`}
              style={{
                x: innerX,
                y: innerY,
                translateZ: 40,
              }}
            />

            <motion.div
              className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/25 blur-3xl"
              style={{
                x: innerY,
                y: innerX,
                translateZ: 30,
              }}
            />

            <motion.div
              className="pointer-events-none absolute -bottom-2 left-4 select-none text-[4.2rem] font-black leading-none tracking-tight opacity-[0.08] sm:text-[5.3rem]"
              style={{ translateZ: 15 }}
            >
              {style.word}
            </motion.div>

            <div className="absolute inset-0 opacity-[0.085] bg-[radial-gradient(circle_at_1px_1px,rgba(20,20,20,0.45)_1px,transparent_0)] bg-[length:13px_13px]" />

            <div className="absolute inset-0 -translate-x-[145%] skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-[145%]" />

            <div className="pointer-events-none absolute inset-[10px] rounded-[1.45rem] border border-white/35 sm:rounded-[1.9rem]" />

            <motion.div
              className={`
                absolute right-5 top-5 z-20 rounded-full
                ${style.accentSoft}
                px-3 py-1.5 text-[10px] font-bold uppercase tracking-tight
              `}
              style={{
                color: style.accent,
                translateZ: 90,
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.div>

            <motion.div
              className="relative z-10 flex h-full w-full flex-col justify-between p-6 sm:p-7"
              style={{ translateZ: 85 }}
            >
              <div>
                <p
                  className="mb-5 text-[10px] font-bold uppercase tracking-tight"
                  style={{ color: style.accent }}
                >
                  {style.mark}
                </p>

                <h3 className="font-display text-[3rem] leading-[0.84] tracking-tighter sm:text-[3.2rem]">
                  {card.title}
                </h3>
              </div>

              <div>
                {card.frontText && (
                  <p
                    className={`max-w-[14.5rem] text-[14px] leading-[1.55] ${style.muted}`}
                  >
                    {card.frontText}
                  </p>
                )}
              </div>
            </motion.div>
          </div>

          {/* BACK FACE */}
          <div
            className={`
              absolute inset-0 overflow-hidden rounded-[1.8rem] sm:rounded-[2.25rem]
              ${style.backBg}
              ${style.text}
              ${style.border}
              border
            `}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div
              className={`absolute -right-24 -top-24 h-72 w-72 rounded-full ${style.glow} blur-3xl`}
            />
            <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-white/25 blur-3xl" />

            <div className="absolute inset-0 opacity-[0.095] bg-[radial-gradient(circle_at_1px_1px,rgba(20,20,20,0.45)_1px,transparent_0)] bg-[length:13px_13px]" />

            <div className="pointer-events-none absolute -bottom-3 left-4 select-none text-[4.3rem] font-black leading-none tracking-tighter opacity-[0.09] sm:text-[5.5rem]">
              {style.backWord}
            </div>

            <div className="pointer-events-none absolute inset-[10px] rounded-[1.45rem] border border-white/35 sm:rounded-[1.9rem]" />

            <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-7">
              <div className="flex items-start justify-between gap-5">
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.42em]"
                  style={{ color: style.accent }}
                >
                  {style.name}
                </p>

                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/35 text-xs font-bold backdrop-blur-md"
                  style={{ color: style.accent }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              <div>
                <p className="mb-5 font-display text-[3rem] leading-[0.8] tracking-tighter opacity-90 sm:text-[3.2rem]">
                  {style.name}
                </p>

                <p
                  className={`max-w-[15rem] text-[15px] leading-[1.65] ${style.muted}`}
                >
                  “{card.backText}”
                </p>
              </div>

              <p
                className="text-[10px] font-bold uppercase tracking-[0.32em]"
                style={{ color: style.accent }}
              >
                Click to flip back
              </p>
            </div>
          </div>
        </motion.div>
      </motion.button>
    </motion.div>
  );
});

const Hero = () => {
  const containerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 26,
    mass: 1.2,
  });

  const headOpacity = useTransform(
    smoothProgress,
    [0, 0.12, 0.22],
    [1, 0.5, 0]
  );

  const headScale = useTransform(smoothProgress, [0, 0.22], [1, 0.9]);
  const headY = useTransform(smoothProgress, [0, 0.22], ["0vh", "-8vh"]);
  
  const settleTextOpacity = useTransform(smoothProgress, [0.58, 0.72], [0, 1]);
  const settleTextY = useTransform(smoothProgress, [0.58, 0.72], ["32px", "0px"]);

  const bgOrbY = useTransform(smoothProgress, [0, 1], ["0vh", "-18vh"]);
  const bgOrbScale = useTransform(smoothProgress, [0, 1], [1, 1.25]);

  return (
    <>
      <MobileStackHero />
      <section
        ref={containerRef}
        id="top"
        className="relative hidden h-[460vh] overflow-visible bg-[#F7F1E6] md:block"
      >
        <div className="sticky top-0 min-h-screen w-full overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FFFDF6_0%,#F7F1E6_42%,#EAD8BF_100%)]" />

        {/* Soft texture grid */}
        <div className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(to_right,rgba(46,42,36,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(46,42,36,0.4)_1px,transparent_1px)] bg-[size:58px_58px]" />

        {/* Background motion glow */}
        <motion.div
          className="absolute left-1/2 top-[15vh] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[#B37839]/10 blur-3xl"
          style={{
            y: bgOrbY,
            scale: bgOrbScale,
          }}
        />

        <div className="absolute -left-28 top-[30vh] h-[24rem] w-[24rem] rounded-full bg-[#9B4E23]/12 blur-3xl" />
        <div className="absolute right-[-8rem] top-[38vh] h-[24rem] w-[24rem] rounded-full bg-[#2F6B55]/14 blur-3xl" />
        <div className="absolute bottom-[8vh] left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-[#94433F]/10 blur-3xl" />

        {/* Phase 1 headline */}
        <motion.div
          className="relative z-20 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-start px-5 pt-[18vh] text-center pointer-events-none sm:pt-[15vh]"
          style={{
            opacity: headOpacity,
            scale: headScale,
            y: headY,
          }}
        >
          <div className="mb-6 inline-flex items-center rounded-full border border-[#B37839]/20 bg-white/30 px-4 py-2 backdrop-blur-md sm:mb-5">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#6D5B43] sm:text-[10px] sm:tracking-[0.35em]">
              Culture · Innovation · Excellence
            </span>
          </div>

          <h1 className="max-w-5xl font-bold text-[clamp(2.75rem,9vw,8rem)] leading-[0.94] tracking-[-0.06em] text-[#2E2A24] sm:leading-[0.92] sm:tracking-[-0.07em]">
            Leading, What's Next.
          </h1>

          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-[#6D5B43]/85 sm:max-w-2xl sm:text-base md:text-lg">
            Rooted in culture, driven by creativity, and sharpened by modern
            innovation.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="absolute inset-0 h-full w-full pointer-events-none">
          {heroCards.map((card, index) => (
            <AwwwardsHeroCard
              key={card.id}
              card={card}
              index={index}
              scrollYProgress={scrollYProgress}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          ))}
        </div>

        {/* Final settled content */}
        <motion.div
          className="absolute bottom-[52vh] left-1/2 z-10 w-full max-w-4xl -translate-x-1/2 px-6 text-center sm:bottom-[60vh] sm:px-8"
          style={{
            opacity: settleTextOpacity,
            y: settleTextY,
          }}
        >
          <h2 className="mb-7 font-bold text-4xl leading-[1] tracking-[-0.04em] text-[#2E2A24] sm:text-5xl sm:leading-[0.95] sm:tracking-[-0.05em] lg:text-7xl">
            Three standards.
            <br />
            One way forward.
          </h2>

          <div className="flex justify-center">
            <MagneticButton href="#ventures">Explore the Ecosystem</MagneticButton>
          </div>
        </motion.div>
        </div>
      </section>
    </>
  );
};

export default memo(Hero);
