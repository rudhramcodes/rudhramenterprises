import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import Stack from "../Stack/Stack";
import { heroCards } from "../../data/siteContent";
import { AwwwardsButton } from "../ui/AwwwardsButton";

const cardStyles = [
  {
    bg: "#F4D7B8",
    soft: "#FFF8EF",
    ink: "#362616",
    muted: "#765431",
    accent: "#9B4E23",
    hindi: "संस्कृति",
  },
  {
    bg: "#D3E4D9",
    soft: "#FAFFFB",
    ink: "#182D24",
    muted: "#486457",
    accent: "#2F6B55",
    hindi: "नवाचार",
  },
  {
    bg: "#EBCBC3",
    soft: "#FFF7F5",
    ink: "#341D1C",
    muted: "#744B48",
    accent: "#94433F",
    hindi: "उत्कृष्टता",
  },
];

const MobileValueCard = memo(function MobileValueCard({ card, index }) {
  const style = cardStyles[index] || cardStyles[0];

  return (
    <article
      className="relative flex h-full w-full flex-col overflow-hidden rounded-[inherit] border px-6 py-7"
      style={{
        background: `linear-gradient(145deg, ${style.soft} 0%, ${style.bg} 100%)`,
        borderColor: `${style.accent}2E`,
        color: style.ink,
      }}
    >
      <div className="relative z-10">
        <p
          className="mb-8 text-[1.18rem] font-semibold leading-none tracking-[-0.035em]"
          style={{ color: style.accent }}
        >
          {style.hindi}
        </p>
        <h2 className="font-display text-[3.18rem] font-semibold leading-[0.84] tracking-[-0.058em]">
          {card.title}
        </h2>
      </div>

      <p
        className="relative z-10 mt-8 max-w-[14.75rem] text-[13.5px] leading-[1.52]"
        style={{ color: style.muted }}
      >
        {card.backText}
      </p>

      <div className="mt-auto" />
    </article>
  );
});

const MobileStackHero = () => {
  const cards = useMemo(
    () =>
      [...heroCards]
        .reverse()
        .map((card, reversedIndex) => {
          const originalIndex = heroCards.length - 1 - reversedIndex;

          return (
            <MobileValueCard
              key={card.id}
              card={card}
              index={originalIndex}
            />
          );
        }),
    []
  );

  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden bg-paper px-[var(--page-gutter)] pb-7 pt-[7rem] md:hidden"
    >
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-8.75rem)] w-full max-w-[24rem] flex-col">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: "transform, opacity" }}
        >
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8F5F2E]">
            RUDHRAM
          </p>
          <h1 className="max-w-[21rem] font-display text-[3.25rem] font-semibold leading-[0.88] tracking-[-0.045em] text-[#2E2A24]">
            Leading,
            <br />
            What's Next.
          </h1>
          <p className="mt-4 max-w-[20rem] text-[14px] leading-[1.55] text-[#615A51]">
            A purpose-driven enterprise ecosystem where culture, creativity,
            and innovation shape ventures built for lasting impact.
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto mt-7 h-[23.5rem] w-[min(80vw,18.75rem)] max-w-full"
          initial={{ opacity: 0, y: 24, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.78, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: "transform, opacity" }}
        >
          <Stack
            randomRotation={false}
            sensitivity={80}
            sendToBackOnClick
            peekSide="left"
            cards={cards}
            animationConfig={{ stiffness: 180, damping: 22, mass: 0.9 }}
          />
        </motion.div>

        <div className="mt-5">
          <p className="mb-4 text-center text-[9px] font-semibold uppercase tracking-[0.24em] text-[#8F5F2E]">
            Swipe the cards
          </p>
          <div className="flex items-center gap-3">
            <AwwwardsButton
              className="flex-1"
              href="#ventures"
              variant="bronze"
              size="sm"
            >
              Explore
            </AwwwardsButton>
            <AwwwardsButton
              className="flex-1"
              href="#contact"
              variant="ghost-light"
              size="sm"
            >
              Contact
            </AwwwardsButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(MobileStackHero);
