"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SlideUpText = ({
  text,
  className = "",
  delay = 0,
  triggerRef = null,
}) => {
  const containerRef = useRef(null);
  const words = text.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Select all inner word spans
      const wordSpans = containerRef.current.querySelectorAll(".word-inner");

      // Animation Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef || containerRef.current, // Use external trigger or self
          start: "top 80%", // Adjust when it starts
          toggleActions: "play none none reverse", // Play on enter, reverse on leave
        },
        delay: delay,
      });

      tl.from(wordSpans, {
        y: "100%",
        opacity: 0,
        duration: 0.8,
        stagger: 0.1, // Time between each word
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [text, delay, triggerRef]);

  return (
    <h2 ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-2 last:mr-0">
          <span className="word-inner inline-block">{word}</span>
        </span>
      ))}
    </h2>
  );
};

export default SlideUpText;
