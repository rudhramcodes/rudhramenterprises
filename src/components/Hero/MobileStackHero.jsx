import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import Stack from "../Stack/Stack";
import { heroCards } from "../../data/siteContent";

const cardStyles = [
  {
    bg: "#F1CBA6",
    soft: "#FFF6EA",
    ink: "#362616",
    muted: "#765431",
    accent: "#9B4E23",
    hindi: "संस्कृति",
    word: "ROOTS",
  },
  {
    bg: "#C7DCCF",
    soft: "#F5FBF7",
    ink: "#182D24",
    muted: "#486457",
    accent: "#2F6B55",
    hindi: "नवाचार",
    word: "NEXT",
  },
  {
    bg: "#E9C4BA",
    soft: "#FFF5F2",
    ink: "#341D1C",
    muted: "#744B48",
    accent: "#94433F",
    hindi: "उत्कृष्टता",
    word: "TRUST",
  },
];

const MobileValueCard = memo(function MobileValueCard({ card, index }) {
  const style = cardStyles[index] || cardStyles[0];

  return (
    <article
      className="relative flex h-full w-full flex-col justify-between overflow-hidden border p-6"
      style={{
        background: `linear-gradient(145deg, ${style.soft} 0%, ${style.bg} 100%)`,
        borderColor: `${style.accent}33`,
        color: style.ink,
      }}
    >
      <div
        className="absolute -right-7 top-6 select-none text-[4.6rem] font-bold leading-none tracking-[-0.08em] opacity-[0.12]"
        style={{ color: style.accent }}
        aria-hidden="true"
      >
        {style.hindi}
      </div>

      <div
        className="absolute -bottom-3 left-4 select-none text-[4.4rem] font-black leading-none tracking-[-0.08em] opacity-[0.075]"
        aria-hidden="true"
      >
        {style.word}
      </div>

      <div className="relative z-10 flex items-start justify-between gap-4">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ color: style.accent }}
        >
          {card.label}
        </p>
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/35 text-[11px] font-bold"
          style={{ color: style.accent }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative z-10">
        <p
          className="mb-4 text-[1.35rem] font-semibold leading-none tracking-[-0.04em]"
          style={{ color: style.accent }}
        >
          {style.hindi}
        </p>
        <h2 className="font-display text-[3.35rem] font-semibold leading-[0.82] tracking-[-0.06em]">
          {card.title}
        </h2>
      </div>

      <p
        className="relative z-10 max-w-[13.5rem] text-[14px] leading-[1.55]"
        style={{ color: style.muted }}
      >
        {card.backText}
      </p>
    </article>
  );
});

const MobileStackHero = () => {
  const cards = useMemo(
    () =>
      heroCards.map((card, index) => (
        <MobileValueCard key={card.id} card={card} index={index} />
      )),
    []
  );

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-[#F8F4ED] px-5 pb-8 pt-[7.25rem] md:hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_8%,rgba(179,120,57,0.18),transparent_16rem),linear-gradient(180deg,#FFFDF8_0%,#F8F4ED_56%,#F0E1CC_100%)]" />
      <div className="absolute inset-0 opacity-[0.075] bg-[linear-gradient(90deg,rgba(46,42,36,0.46)_1px,transparent_1px),linear-gradient(180deg,rgba(46,42,36,0.34)_1px,transparent_1px)] bg-[size:38px_38px]" />
      <div
        className="pointer-events-none absolute -right-14 top-[16%] select-none text-[8.6rem] font-bold leading-none tracking-[-0.1em] text-[#B37839]/[0.09]"
        aria-hidden="true"
      >
        आगे
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-9.25rem)] max-w-[26rem] flex-col">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8F5F2E]">
            RUDHRAM
          </p>
          <h1 className="font-display text-[3.75rem] font-semibold leading-[0.84] tracking-[-0.055em] text-[#2E2A24]">
            Leading,
            <br />
            What's Next.
          </h1>
          <p className="mt-5 max-w-[20rem] text-[15px] leading-[1.58] text-[#615A51]">
            A purpose-driven enterprise ecosystem where culture, creativity,
            and innovation shape ventures built for lasting impact.
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto mt-7 h-[18.75rem] w-[min(78vw,18.25rem)]"
          initial={{ opacity: 0, y: 24, rotate: -2, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.78, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <Stack
            randomRotation
            sensitivity={80}
            sendToBackOnClick
            cards={cards}
            animationConfig={{ stiffness: 220, damping: 24 }}
          />
        </motion.div>

        <div className="mt-6">
          <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8F5F2E]">
            Swipe the cards
          </p>
          <div className="flex items-center gap-3">
            <a
              className="flex min-h-12 flex-1 items-center justify-center border border-[#B37839] bg-[#B37839] px-4 text-[13px] font-semibold text-[#FFFDF8] transition active:scale-[0.98]"
              href="#ventures"
            >
              Explore
            </a>
            <a
              className="flex min-h-12 flex-1 items-center justify-center border border-[#B37839]/30 bg-[#FFFDF8]/52 px-4 text-[13px] font-semibold text-[#2E2A24] backdrop-blur-md transition active:scale-[0.98]"
              href="#contact"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(MobileStackHero);
