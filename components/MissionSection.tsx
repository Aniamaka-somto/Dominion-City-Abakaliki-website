"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SlideUpText from "@/components/SlideUpText";
import { MISSION_WORDS, type MissionWord } from "@/lib/home";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Per-breakpoint scroll configuration.
 *
 * The timeline is identical on both sides — only the trigger position and
 * the character timings differ, so they live in one table instead of two
 * copies of the same 110 lines.
 */
const BREAKPOINTS = {
  desktop: {
    media: "(min-width: 768px)",
    start: "top 60%",
    charStagger: 0.08,
  },
  mobile: {
    media: "(max-width: 767px)",
    start: "top 110%",
    charStagger: 0.06,
  },
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

export interface MissionSectionProps {
  /** The words to reveal, in order. */
  words?: MissionWord[];
  /** Small label above the words. */
  label?: string;
  /** Extra classes for the section element. */
  className?: string;
}

/**
 * Sticky scroll section that reveals the mission statement word by word.
 */
export default function MissionSection({
  words = MISSION_WORDS,
  label = "Our Mission Is",
  className,
}: MissionSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      (Object.keys(BREAKPOINTS) as Breakpoint[]).forEach((breakpoint) => {
        const config = BREAKPOINTS[breakpoint];

        mm.add(config.media, () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: config.start,
              end: "bottom bottom",
              scrub: 1,
            },
          });

          words.forEach((entry) => {
            const chars = containerRef.current?.querySelectorAll<HTMLElement>(
              `[data-word="${entry.word}"] .char-inner`,
            );
            if (!chars?.length) return;

            const { at, duration } = entry[breakpoint];

            tl.from(
              chars,
              {
                y: "100%",
                opacity: 0,
                duration,
                stagger: config.charStagger,
                ease: "power3.out",
              },
              at,
            );
          });
        });
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    // Fonts and images land after first paint and shift the section, which
    // would leave the scroll measurements stale.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, [words]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative h-[180vh] md:h-[260vh] lg:h-[220vh] bg-white",
        className,
      )}
    >
      <div className="sticky top-0 h-screen sm:h-[110vh] w-full flex items-center justify-center overflow-hidden">
        <p className="absolute top-6 md:top-8 lg:top-10 left-1/2 -translate-x-1/2 text-xs md:text-sm font-semibold tracking-[4px] uppercase text-gray-600 z-30 pointer-events-none sm:mb-10 font-syne">
          {label}
        </p>

        <div
          ref={containerRef}
          className="
            relative text-center px-4 sm:px-6 md:px-8 lg:px-10
            max-w-[95vw] md:max-w-5xl
            flex flex-col items-center justify-center
            gap-1 sm:gap-0.5 md:gap-0
            min-h-[75vh] md:min-h-[70vh] lg:min-h-[65vh]
          "
        >
          {words.map((entry) => (
            <SlideUpText
              key={entry.word}
              text={entry.word}
              animate="none"
              data-word={entry.word}
              className={cn(
                "text-[clamp(2.6rem,8vw,6.2rem)] font-bold uppercase font-syne leading-[0.82] tracking-[-0.025em]",
                entry.tone,
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
