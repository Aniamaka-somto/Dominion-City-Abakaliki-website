"use client";

import Image from "next/image";
import congregation from "@/public/header.jpg";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import welcome from "@/public/welcome home.jpg";

export default function Home() {
  const boxRef = useRef(null);
  const box2Ref = useRef(null);
  const welcomeRef = useRef(null);
  const missionTextRef = useRef(null);
  const loveInActionRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

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
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate "OUR MISSION IS"
      tl.from(missionTextRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        // Animate "LOVE IN ACTION" words with stagger
        .from(
          ".love-word",
          {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power4.out",
          },
          "-=0.3",
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
        <div className="flex flex-col justify-center  pb-5 sm:pb-0 sm:gap-y-28 gap-y-5">
          <h1 className=" text-black w-full font-syne text-3xl font-bold sm:text-5xl lg:text-8xl ">
            Welcome home
          </h1>
          <p className=" text-zinc-800 w-full font-syne ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            dolorem quod accusantium exercitationem distinctio repudiandae?
          </p>
        </div>
        <div className="flex justify-center items-center ">
          <div className="w-full h-fit sm:pl-32">
            <div className="w-full h-full min-h-80 bg-blue-700 rounded-tl-[25em] rounded-b-[3.75em] sm:rounded-bl-none overflow-hidden">
              <Image
                alt="image"
                src={welcome}
                className=" object-cover object-center -z-10  aspect-square"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <section className="h-screen flex flex-col items-center justify-center bg-[#F5F1E8] relative overflow-hidden">
        <div className="text-center">
          {/* "OUR MISSION IS" */}
          <p
            ref={missionTextRef}
            className="text-sm sm:text-base font-syne text-gray-600 mb-4 uppercase tracking-wider"
          >
            Our Mission Is
          </p>

          {/* "LOVE IN ACTION" */}
          <div
            ref={loveInActionRef}
            className="flex flex-wrap justify-center items-center gap-2 sm:gap-4"
          >
            <span className="love-word text-6xl sm:text-8xl lg:text-9xl font-black text-black inline-block">
              LOVE
            </span>
            <span className="love-word text-6xl sm:text-8xl lg:text-9xl font-black text-black inline-block">
              IN
            </span>
            <span className="love-word text-6xl sm:text-8xl lg:text-9xl font-black text-black inline-block">
              ACTION
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
