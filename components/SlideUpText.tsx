"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MagicSlideUp({
  text,
  className = "",
  timeline = null, // ✅ Accept parent timeline
  delay = 0, // ✅ Position in timeline
  stagger = 0.05,
}) {
  const containerRef = useRef(null);
  const chars = Array.from(text);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const charSpans = containerRef.current.querySelectorAll(".char-inner");

      if (timeline) {
        // ✅ Add to parent scroll timeline
        timeline.from(
          charSpans,
          {
            y: "100%",
            opacity: 0,
            duration: 0.8,
            stagger: stagger,
            ease: "power3.out",
          },
          delay,
        );
      } else {
        // ✅ Fallback: Self-triggered animation
        gsap.from(charSpans, {
          y: "100%",
          opacity: 0,
          duration: 0.8,
          stagger: stagger,
          ease: "power3.out",
          delay: delay,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [text, timeline, delay, stagger]);

  return (
    <div ref={containerRef} className={`flex flex-wrap ${className}`}>
      {chars.map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className="char-inner inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </div>
  );
}
