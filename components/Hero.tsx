"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

export interface HeroProps {
  /** Background image for the hero. */
  image: StaticImageData | string;
  /** Optional content rendered inside the white pill bar. */
  children?: React.ReactNode;
  /** Extra classes for the header element. */
  className?: string;
}

/**
 * Full-bleed hero used at the top of every page.
 *
 * The layout and the entrance animation are fixed — only the background
 * image and the pill bar content vary per page, so those are the props.
 */
export default function Hero({ image, children, className }: HeroProps) {
  const boxRef = useRef<HTMLElement | null>(null);
  const box2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        height: "92vh",
        borderBottomRightRadius: "90px",
        borderBottomLeftRadius: "90px",
        delay: 1.7,
        duration: 1.2,
        ease: "power3.inOut",
      });
      gsap.from(box2Ref.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.inOut",
      });
    }, boxRef);

    return () => ctx.revert();
  }, []);

  const backgroundImage = typeof image === "string" ? image : image.src;

  return (
    <header
      ref={boxRef}
      className={cn(
        "flex h-screen w-full flex-col bg-bottom bg-cover bg-no-repeat justify-end items-center lg:pb-10",
        className,
      )}
      style={{ backgroundImage: `url("${backgroundImage}")` }}
    >
      <div
        ref={box2Ref}
        className="h-48 w-full lg:w-3/4 rounded-4xl bg-white ring-white flex sm:justify-between items-center justify-center"
      >
        <button
          type="button"
          aria-label="Previous slide"
          className="relative h-11 w-11 rounded-full ring-white ring-2 -translate-x-5 text-white bg-blue-900 flex justify-center items-center"
        >
          <ArrowLeft />
        </button>
        <div className="flex items-center justify-center text-center text-blue-900 font-syne">
          {children}
        </div>
        <button
          type="button"
          aria-label="Next slide"
          className="h-11 w-11 rounded-full ring-white ring-2 translate-x-5 text-white bg-blue-900 flex justify-center items-center"
        >
          <ArrowRight />
        </button>
      </div>
    </header>
  );
}
