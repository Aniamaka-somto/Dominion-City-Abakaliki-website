"use client";

import Image from "next/image";
import DCLogo from "@/public/DC logo.png";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Menu } from "lucide-react";

export default function Navbar() {
  const boxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(boxRef.current, {
        delay: 0.3,
        duration: 1.4,
        opacity: 0,
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div
      className="flex w-full justify-between items-center  p-5 sm:px-10 sm:py-10 fixed z-50"
      ref={boxRef}
    >
      <div className="flex w-14 h-14 sm:w-[5.5em] sm:h-[5.5em] rounded-full bg-white justify-center items-center">
        <Image
          src={DCLogo}
          alt="Dominion City Logo"
          width={100}
          height={100}
          className="w-10 h-10 object-contain sm:w-12 sm:h-12  "
          // style={{ width: "50px", height: "50px", objectFit: "contain" }}
        />
      </div>
      <div className="flex rounded-full shadow-lg sm:w-[9.3rem] w-24 max-w-274.75 sm:h-14 bg-white justify-evenly items-center text-black cursor-pointer text-xs sm:text-lg h-10 font-syne">
        MENU
        <Menu />
      </div>
    </div>
  );
}
