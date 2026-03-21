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
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          markers: true, // Keep this while testing
        },
      });

      scrollTl
        .from(
          loveRef.current,
          {
            y: -200,
            x: -100,
            rotation: -15,
            opacity: 0,
            duration: 1,
          },
          0,
        )
        .from(
          inRef.current,
          {
            x: 200,
            y: 100,
            rotation: 10,
            opacity: 0,
            duration: 1,
          },
          0.7,
        )
        .from(
          actionRef.current,
          {
            y: 200,
            rotation: -5,
            opacity: 0,
            scale: 0.8,
            duration: 1,
          },
          1.4,
        )
        .from(
          centerContentRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 1,
          },
          2,
        );
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-blue-800 font-sans ">
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

      <div
        className="w-full h-fit bg-blue-800 z-10 grid grid-cols-1 sm:grid-cols-2 p-5 pt-20"
        ref={welcomeRef}
      >
        <div className="flex flex-col justify-center sm:pl-10 pb-5 sm:pb-0 sm:gap-y-28 gap-y-5">
          <div className=" ">
            <h1 className=" text-black w-full font-syne text-3xl font-bold sm:text-5xl lg:text-7xl  ">
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
              variableSpeedEnabled={false}
              variableSpeedMin={60}
              variableSpeedMax={120}
              cursorBlinkDuration={0.5}
              variableSpeed={undefined}
              onSentenceComplete={undefined}
              className={` text-black w-full font-syne text-3xl font-bold sm:text-5xl lg:text-7xl`}
            />
          </div>
          <p className=" text-zinc-800 w-full font-syne ">
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
      <section ref={sectionRef} className="relative h-[200vh] bg-[#F0F0E8]">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <SlideUpText
            className="absolute top-[5%] -left-[5%] text-[15vw] font-bold uppercase text-[#111] leading-[0.8] whitespace-nowrap z-10"
            text={"LOVE"}
            triggerRef={loveRef}
          />

          <div
            ref={inRef}
            className="absolute top-[40%] -right-[5%] text-[10vw] font-bold uppercase text-[#111] leading-[0.8] whitespace-nowrap z-10"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            IN
          </div>
          <div
            ref={actionRef}
            className="absolute -bottom-[5%] left-1/2 -translate-x-1/2 text-[18vw] font-bold uppercase text-[#111] leading-[0.8] whitespace-nowrap z-10"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            ACTION
          </div>
          <div
            ref={centerContentRef}
            className="relative z-20 text-center max-w-[600px] p-8 bg-[#F0F0E8]/80 backdrop-blur-sm rounded-[20px]"
          >
            <span className="text-sm font-semibold tracking-[2px] uppercase mb-4 block">
              Our Mission Is
            </span>
            <h2 className="text-xl font-normal">LOVE IN ACTION</h2>
          </div>
        </div>
      </section>
    </div>
  );
}
