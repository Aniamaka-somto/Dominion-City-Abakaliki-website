"use client";

import Image from "next/image";
import DCLogo from "@/public/DC logo.png";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Services", href: "#" },
  { label: "Give", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Navbar() {
  const boxRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);
  const isAnimating = useRef(false);

  // Navbar fade in on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(boxRef.current, { delay: 0.3, duration: 1.4, opacity: 0 });
    });
    return () => ctx.revert();
  }, []);

  // Lock scroll
  useEffect(() => {
    const overlay = overlayRef.current;
    const btn = btnRef.current;
    // Use a more specific selector to find the bars inside the button
    const bars = btn?.querySelectorAll(".icon-bar");

    if (!overlay || !btn || !bars) return;

    const rect = btn.getBoundingClientRect();

    if (open) {
      if (isAnimating.current) return;
      isAnimating.current = true;

      // 1. LOCK SCROLLBAR
      document.documentElement.style.overflow = "hidden";

      // 2. ICON MORPH
      gsap.to(bars[0], {
        top: "50%",
        yPercent: -50,
        rotate: 45,
        duration: 0.4,
      });
      gsap.to(bars[1], { opacity: 0, x: -10, duration: 0.3 });
      gsap.to(bars[2], {
        bottom: "50%",
        yPercent: 50,
        rotate: -45,
        duration: 0.4,
      });

      // 3. OVERLAY REVEAL
      // Force display flex so it actually shows up
      gsap.set(overlay, {
        display: "flex",
        opacity: 1,
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
        borderRadius: "9999px",
      });

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
          overlay.style.overflowY = "auto";
        },
      });

      tl.to(overlay, {
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        borderRadius: 0,
        duration: 0.8,
        ease: "expo.inOut",
      }).fromTo(
        [linkRefs.current, ".lg\\:border-l", ctaRef.current],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        "-=0.4",
      );
    } else {
      if (isAnimating.current) return;
      isAnimating.current = true;

      // ICON BACK TO HAMBURGER
      gsap.to(bars[0], { top: "0%", yPercent: 0, rotate: 0, duration: 0.4 });
      gsap.to(bars[1], { opacity: 1, x: 0, duration: 0.4 });
      gsap.to(bars[2], { bottom: "0%", yPercent: 0, rotate: 0, duration: 0.4 });

      overlay.style.overflowY = "hidden";

      gsap.to(overlay, {
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
        borderRadius: "9999px",
        duration: 0.7,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          document.documentElement.style.overflow = "";
          isAnimating.current = false;
        },
      });
    }
  }, [open]);
  return (
    <>
      <style>{`
        .link-mask {
          overflow: hidden;
          display: block;
        }
      `}</style>

      {/* NAVBAR */}
      <div
        ref={boxRef}
        className="fixed z-50 flex w-full items-center justify-between p-5 sm:px-10 sm:py-10"
      >
        {/* Logo pill */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white sm:h-[5.5em] sm:w-[5.5em]">
          <Image
            src={DCLogo}
            alt="Dominion City Logo"
            width={100}
            height={100}
            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
          />
        </div>

        {/* Menu pill */}
        <button
          ref={btnRef}
          onClick={() => {
            if (!isAnimating.current) setOpen((v) => !v);
          }}
          className="relative z-[60] flex h-10 w-24 sm:h-14 sm:w-[9.3rem] items-center justify-center rounded-full bg-white shadow-lg"
        >
          <span className="font-syne text-xs sm:text-lg text-blue-900 mr-2 sm:mr-4">
            {open ? "CLOSE" : "MENU"}
          </span>

          {/* The Icon Container */}
          <div className="relative h-4 w-5 sm:h-5 sm:w-6">
            {/* Top Bar */}
            <span className="icon-bar absolute top-0 left-0 h-[2px] w-full bg-blue-900"></span>
            {/* Middle Bar */}
            <span className="icon-bar absolute top-[50%] left-0 h-[2px] w-full bg-blue-900 -translate-y-[50%]"></span>
            {/* Bottom Bar */}
            <span className="icon-bar absolute bottom-0 left-0 h-[2px] w-full bg-blue-900"></span>
          </div>
        </button>
      </div>

      {/* OVERLAY */}
      <div
        ref={overlayRef}
        className="fixed z-40 flex flex-col bg-blue-900 px-6 sm:px-12 overflow-y-auto overflow-x-hidden h-screen w-screen"
        style={{ display: "none" }}
        aria-hidden={!open}
      >
        {/* Grid container: 1 column on mobile, 2 columns on laptop (lg) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-full w-full pt-32 pb-10 gap-10">
          {/* LEFT SIDE: Navigation */}
          <nav className="flex flex-col justify-center">
            <ul className="m-0 list-none p-0">
              {NAV_LINKS.map((link, i) => (
                <li
                  key={link.label}
                  className="border-b border-white/10 lg:border-none"
                >
                  <span className="link-mask py-2 sm:py-4">
                    <a
                      href={link.href}
                      ref={(el) => {
                        linkRefs.current[i] = el;
                      }}
                      onClick={() => setOpen(false)}
                      className="block font-syne font-bold tracking-tight text-white no-underline transition-colors duration-200 hover:text-blue-300"
                      style={{ fontSize: "clamp(2rem, 7vh, 4.5rem)" }}
                    >
                      {link.label}
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          {/* RIGHT SIDE: Info & CTA */}
          <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 pt-10 lg:pt-0 lg:pl-12 text-white">
            <div className="space-y-8 font-syne">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-blue-300 mb-2">
                  Location
                </p>
                <p className="text-lg leading-tight">
                  Dominion City HQ,
                  <br />
                  Nigeria
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-blue-300 mb-2">
                  Connect
                </p>
                <div className="flex gap-6 text-sm font-bold uppercase tracking-widest">
                  <a href="#" className="hover:text-blue-300">
                    Instagram
                  </a>
                  <a href="#" className="hover:text-blue-300">
                    YouTube
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-10 flex flex-col gap-4">
              <a
                href="#"
                ref={ctaRef}
                className="rounded-full bg-white py-4 text-center font-syne text-xs font-bold uppercase tracking-widest text-blue-900 no-underline hover:bg-blue-100 transition-colors"
              >
                Get in touch →
              </a>
              <span className="text-center lg:text-left font-syne text-[10px] uppercase tracking-widest text-blue-300">
                © 2026 Dominion City. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
