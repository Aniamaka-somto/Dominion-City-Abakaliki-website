"use client";

import { forwardRef, useCallback, useEffect, useRef } from "react";
import gsap from "gsap";

export interface SlideUpTextProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  /** The text to split into individually animated characters. */
  text: string;
  /** Classes applied to the wrapper element. */
  className?: string;
  /**
   * Extra classes applied to each character's inner span.
   * `char-inner` is always applied — it is the animation target.
   */
  charClassName?: string;
  /**
   * "self" runs the animation on mount.
   * "none" renders only — use it when a parent drives the animation through
   * the forwarded ref (for example a shared GSAP timeline).
   */
  animate?: "self" | "none";
  /** Seconds to wait before the animation starts. */
  delay?: number;
  /** Seconds between each character. */
  stagger?: number;
  /** Seconds for each character's animation. */
  duration?: number;
}

/**
 * Splits text into per-character spans that can be animated individually.
 *
 * Every character is wrapped in an overflow-hidden span so it can slide up
 * from behind a mask. The inner span carries the `char-inner` class, which is
 * what the animation targets.
 */
const SlideUpText = forwardRef<HTMLDivElement, SlideUpTextProps>(
  function SlideUpText(
    {
      text,
      className = "",
      charClassName = "",
      animate = "self",
      delay = 0,
      stagger = 0.05,
      duration = 0.8,
      ...props
    },
    forwardedRef,
  ) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    useEffect(() => {
      if (animate !== "self") return;

      const ctx = gsap.context(() => {
        const chars = containerRef.current?.querySelectorAll<HTMLElement>(
          ".char-inner",
        );
        if (!chars?.length) return;

        gsap.from(chars, {
          y: "100%",
          opacity: 0,
          duration,
          stagger,
          ease: "power3.out",
          delay,
        });
      }, containerRef);

      return () => ctx.revert();
    }, [animate, delay, duration, stagger, text]);

    return (
      <div ref={setRefs} className={className} {...props}>
        {Array.from(text).map((char, i) => (
          <span key={`${char}-${i}`} className="inline-block overflow-hidden">
            <span
              className={`char-inner ${charClassName} inline-block will-change-transform`}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </div>
    );
  },
);

export default SlideUpText;
