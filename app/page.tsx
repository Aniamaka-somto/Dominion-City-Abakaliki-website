"use client";

import Image from "next/image";
import congregation from "@/public/header.jpg";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import welcome from "@/public/welcome home.jpg";
import TextType from "@/components/TextType";
import SlideUpText from "@/components/SlideUpText";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const boxRef = useRef(null);
  const box2Ref = useRef(null);
  const welcomeRef = useRef(null);
  const missionTextRef = useRef(null);
  const loveInActionRef = useRef(null);
  const container = useRef(null);
  const sectionRef = useRef(null);
  const loveRef = useRef(null);
  const inRef = useRef(null);
  const actionRef = useRef(null);
  const centerContentRef = useRef(null);
  const raisingRef = useRef(null);
  const leadersRef = useRef(null);
  const thatRef = useRef(null);
  const transformRef = useRef(null);
  const societyRef = useRef(null);
  const theRef = useRef(null);
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
      const isMobile = window.innerWidth < 640;

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 95%" : "top 60%",
          end: "bottom bottom",
          scrub: 1,
          markers: true,
        },
      });

      // LOVE / IN / ACTION (your existing code)
      const loveChars = loveRef.current?.querySelectorAll(".char-inner");
      const inChars = inRef.current?.querySelectorAll(".char-inner");
      const actionChars = actionRef.current?.querySelectorAll(".char-inner");

      scrollTl
        .from(
          loveChars,
          {
            y: "100%",
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
          },
          0,
        )
        .from(
          inChars,
          {
            y: "100%",
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
          },
          0.5,
        )
        .from(
          actionChars,
          {
            y: "100%",
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
          },
          1.0,
        );

      // ✅ NEW: Mission Words Animation (staggered overlap)
      const raisingChars = raisingRef.current?.querySelectorAll(
        ".char-inner-mission",
      );
      const leadersChars = leadersRef.current?.querySelectorAll(
        ".char-inner-mission",
      );
      const thatChars = thatRef.current?.querySelectorAll(
        ".char-inner-mission",
      );
      const transformChars = transformRef.current?.querySelectorAll(
        ".char-inner-mission",
      );
      const societyChars = societyRef.current?.querySelectorAll(
        ".char-inner-mission",
      );
      const theChars = theRef.current?.querySelectorAll(".char-inner-mission");

      scrollTl
        .from(
          raisingChars,
          {
            y: "100%",
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
          },
          1.5,
        ) // ✅ Starts right after ACTION begins

        .from(
          leadersChars,
          {
            y: "100%",
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
          },
          1.9,
        ) // ✅ Overlaps with RAISING

        .from(
          thatChars,
          {
            y: "100%",
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          },
          2.2,
        ) // ✅ Quick connector

        .from(
          transformChars,
          {
            y: "100%",
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
          },
          2.4,
        ) // ✅ Overlaps with "that"
        .from(
          theChars,
          {
            y: "100%",
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
          },
          2.8,
        )

        .from(
          societyChars,
          {
            y: "100%",
            opacity: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
          },
          3,
        ); // ✅ Hero word finale
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-blue-900 font-sans ">
      <header
        className="flex h-screen w-full flex-col   bg-bottom bg-cover bg-no-repeat  justify-end items-center  lg:pb-10 bg-[url('@/public/header.jpg')]"
        ref={boxRef}
      >
        <div
          className="h-48  w-full lg:w-3/4 ring-2 rounded-4xl bg-blue-100 flex sm:justify-between items-center justify-center "
          ref={box2Ref}
        >
          <div className=" relative h-11 w-11 rounded-full ring-black ring-2 -translate-x-5 bg-white text-black flex justify-center items-center">
            <ArrowLeft />
          </div>
          <div className=""></div>
          <div className="h-11 w-11 rounded-full ring-black ring-2 translate-x-5 bg-white text-black flex justify-center items-center">
            <ArrowRight />
          </div>
        </div>
      </header>
      <div className="h-fit w-fit bg-white">
        <div
          className="w-full h-fit bg-blue-900 z-10 grid grid-cols-1 sm:grid-cols-2 p-5 pt-20 sm:rounded-b-[90px] rounded-b-[45px] "
          ref={welcomeRef}
        >
          <div className="flex flex-col justify-center sm:pl-10 pb-5 sm:pb-0 sm:gap-y-28 gap-y-5">
            <div className=" ">
              <h1 className=" text-white w-full font-syne text-3xl font-bold sm:text-5xl lg:text-7xl  ">
                This is
              </h1>
              <TextType
                text={["Home", "Family", "Dominion City"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor
                cursorCharacter=""
                texts={[
                  "Welcome to React Bits! Good to see you!",
                  "Build some amazing experiences!",
                ]}
                deletingSpeed={50}
                cursorBlinkDuration={0.5}
                className={` text-white w-full font-syne text-3xl font-bold sm:text-5xl lg:text-7xl`}
              />
            </div>
            <p className=" text-zinc-300 w-full font-syne ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
              dolorem quod accusantium exercitationem distinctio repudiandae?
            </p>
          </div>

          <div className="flex justify-center items-center ">
            <div className="w-full h-fit lg:pl-32 md:pl-10 ">
              <div className="w-full h-full min-h-80 bg-blue-700 rounded-tl-[25em] rounded-b-[3.75em] sm:rounded-bl-none overflow-hidden">
                <Image
                  alt="image"
                  src={welcome}
                  className=" object-cover object-center -z-10  aspect-square    "
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section
        ref={sectionRef}
        className="relative h-[300vh] md:h-[260vh] lg:h-[220vh] bg-white"
      >
        <div className="sticky top-0 h-screen sm:h-[110vh] w-full flex items-center justify-center overflow-hidden">
          {/* Label moved higher */}
          <p className="absolute top-6 md:top-8 lg:top-10 left-1/2 -translate-x-1/2 text-xs md:text-sm font-semibold tracking-[4px] uppercase text-gray-600 z-30 pointer-events-none sm:mb-10">
            Our Mission Is
          </p>

          {/* Main content wrapper – centered, constrained height, tight spacing */}
          <div
            className="
        relative text-center px-4 sm:px-6 md:px-8 lg:px-10 
        max-w-[95vw] md:max-w-5xl 
        flex flex-col items-center justify-center 
        gap-1 sm:gap-0.5 md:gap-0 
        min-h-[75vh] md:min-h-[70vh] lg:min-h-[65vh]

      "
          >
            {/* RAISING */}
            <div
              ref={raisingRef}
              className="text-[clamp(2.6rem,8vw,6.2rem)] font-bold uppercase text-blue-800 font-syne leading-[0.82] tracking-[-0.025em]"
            >
              {["R", "A", "I", "S", "I", "N", "G"].map((c, i) => (
                <span key={i} className="inline-block overflow-hidden">
                  <span className="char-inner-mission inline-block will-change-transform">
                    {c}
                  </span>
                </span>
              ))}
            </div>

            {/* LEADERS */}
            <div
              ref={leadersRef}
              className="text-[clamp(2.6rem,8vw,6.2rem)] font-bold uppercase text-blue-900 font-syne leading-[0.82] tracking-[-0.025em]"
            >
              {["L", "E", "A", "D", "E", "R", "S"].map((c, i) => (
                <span key={i} className="inline-block overflow-hidden">
                  <span className="char-inner-mission inline-block will-change-transform">
                    {c}
                  </span>
                </span>
              ))}
            </div>

            {/* THAT */}
            <div
              ref={thatRef}
              className="text-[clamp(2.6rem,8vw,6.2rem)] font-bold uppercase text-blue-800 font-syne leading-[0.82] tracking-[-0.025em]"
            >
              {["T", "H", "A", "T"].map((c, i) => (
                <span key={i} className="inline-block overflow-hidden">
                  <span className="char-inner-mission inline-block will-change-transform">
                    {c}
                  </span>
                </span>
              ))}
            </div>

            {/* TRANSFORM */}
            <div
              ref={transformRef}
              className="text-[clamp(2.6rem,8vw,6.2rem)] font-bold uppercase text-blue-800 font-syne leading-[0.82] tracking-[-0.025em]"
            >
              {["T", "R", "A", "N", "S", "F", "O", "R", "M"].map((c, i) => (
                <span key={i} className="inline-block overflow-hidden">
                  <span className="char-inner-mission inline-block will-change-transform">
                    {c}
                  </span>
                </span>
              ))}
            </div>

            {/* THE */}
            <div
              ref={theRef}
              className="text-[clamp(2.6rem,8vw,6.2rem)] font-bold uppercase text-blue-800 font-syne leading-[0.82] tracking-[-0.025em]"
            >
              {["T", "H", "E"].map((c, i) => (
                <span key={i} className="inline-block overflow-hidden">
                  <span className="char-inner-mission inline-block will-change-transform">
                    {c}
                  </span>
                </span>
              ))}
            </div>

            {/* SOCIETY – slightly bigger for emphasis */}
            <div
              ref={societyRef}
              className="text-[clamp(2.6rem,8vw,6.2rem)] font-bold uppercase text-blue-800 font-syne leading-[0.82] tracking-[-0.025em]"
            >
              {["S", "O", "C", "I", "E", "T", "Y"].map((c, i) => (
                <span key={i} className="inline-block overflow-hidden">
                  <span className="char-inner-mission inline-block will-change-transform">
                    {c}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
