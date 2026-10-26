"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import TextType from "@/components/TextType";
import { WELCOME } from "@/lib/home";
import { cn } from "@/lib/utils";

export interface WelcomeProps {
  /**
   * Image shown in the rounded panel on the right. Must be a static import so
   * Next knows its intrinsic size (the panel is sized by the image).
   */
  image: StaticImageData;
  /** Static line above the typewriter. */
  label?: string;
  /** Words cycled by the typewriter effect. */
  words?: readonly string[];
  /** Supporting paragraph. */
  body?: string;
  /** Alt text for the image. */
  alt?: string;
  /** Extra classes for the outer wrapper. */
  className?: string;
}

/**
 * Intro block: a static label, a typewriter headline and a supporting
 * paragraph, paired with a rounded image panel.
 */
export default function Welcome({
  image,
  label = WELCOME.label,
  words = WELCOME.words,
  body = WELCOME.body,
  alt = "Congregation",
  className,
}: WelcomeProps) {
  return (
    <div className={cn("h-fit w-fit bg-white", className)}>
      <div className="w-full h-fit bg-blue-900 z-10 grid grid-cols-1 sm:grid-cols-2 p-5 pt-20 sm:rounded-b-[90px] rounded-b-[45px]">
        <div className="flex flex-col justify-center sm:pl-10 pb-5 sm:pb-0 sm:gap-y-28 gap-y-5">
          <div className="">
            <h1 className="text-white w-full font-syne text-3xl font-bold sm:text-5xl lg:text-7xl">
              {label}
            </h1>
            <TextType
              text={words}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor
              cursorCharacter=""
              deletingSpeed={50}
              cursorBlinkDuration={0.5}
              className="text-white w-full font-syne text-3xl font-bold sm:text-5xl lg:text-7xl"
            />
          </div>
          <p className="text-zinc-300 w-full font-syne">{body}</p>
        </div>

        <div className="flex justify-center items-center">
          <div className="w-full h-fit lg:pl-32 md:pl-10">
            <div className="w-full h-full min-h-80 bg-blue-700 rounded-tl-[25em] rounded-b-[3.75em] sm:rounded-bl-none overflow-hidden">
              <Image
                alt={alt}
                src={image}
                className="object-cover object-center -z-10 aspect-square"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
