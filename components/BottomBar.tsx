"use client";

import { useEffect, useState, useRef } from "react";

interface ServiceBarProps {
  isLive?: boolean;
}

const Divider = () => <span className="h-4 w-px bg-white/30 shrink-0" />;

const ChatIcon = () => (
  <button
    type="button"
    aria-label="Open chat"
    className="flex items-center justify-center h-8 w-8 rounded-full bg-white text-blue-900 shrink-0"
  >
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M20 2H4a2 2 0 0 0-2 2v18l5.333-4H20a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
    </svg>
  </button>
);

const LiveBadge = () => (
  <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide shrink-0">
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
    </span>
    Live
  </span>
);

const ServiceInfo = () => (
  <div className="flex items-center gap-3 flex-wrap">
    <span className="text-xs font-medium uppercase tracking-wide whitespace-nowrap">
      Sunday services
    </span>
    <Divider />
    <span className="text-xs font-medium uppercase tracking-wide whitespace-nowrap">
      9AM
    </span>
    <Divider />
    <span className="text-xs font-medium uppercase tracking-wide whitespace-nowrap">
      11.30AM
    </span>
    <Divider />
    <span className="text-xs font-medium uppercase tracking-wide whitespace-nowrap">
      5PM (once a month)
    </span>
  </div>
);

const Marquee = ({ className = "" }: { className?: string }) => {
  const marqueeText =
    "FIND OUT WHAT IS GOING ON AT SOUL CHURCH — FIND OUT WHAT IS GOING ON AT SOUL CHURCH";

  return (
    <div
      className={`relative min-w-0 overflow-hidden h-6 flex items-center ${className}`}
    >
      <div className="marquee-track flex items-center gap-12 whitespace-nowrap">
        <span className="text-xs font-medium uppercase tracking-wide">
          {marqueeText}
        </span>
        <span className="text-xs font-medium uppercase tracking-wide">
          {marqueeText}
        </span>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-blue-900 to-transparent" />
    </div>
  );
};

export default function ServiceBar({ isLive = false }: ServiceBarProps) {
  const [scrolled, setScrolled] = useState(false); // controls PC bar height growth
  const [hidden, setHidden] = useState(false); // controls non-PC show/hide on scroll direction
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 0);

      if (y > lastScrollY.current && y > 50) {
        setHidden(true); // scrolling down -> hide
      } else if (y < lastScrollY.current) {
        setHidden(false); // scrolling up -> show
      }
      lastScrollY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* PC: single bar, always visible, everything in one row */}
      <div
        className={[
          "hidden lg:flex fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-[95%] rounded-t-2xl",
          "shadow-lg bg-blue-900 text-white font-syne overflow-hidden",
          "transition-[height] duration-300 ease-out",
          "items-center",
          scrolled ? "h-14" : "h-12",
        ].join(" ")}
      >
        <div className="relative flex items-center gap-3 w-full h-full pl-6 pr-14">
          <ServiceInfo />
          <Divider />
          {isLive && (
            <>
              <LiveBadge />
              <Divider />
            </>
          )}
          <Marquee className="flex-1" />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <ChatIcon />
          </div>
        </div>
      </div>

      {/* Tablet & mobile: two separate stacked bars, hide on scroll down / show on scroll up */}
      <div
        className={[
          "lg:hidden fixed left-1/2 -translate-x-1/2 z-50 w-[95%] flex flex-col gap-1",
          "transition-transform duration-300 ease-out",
          hidden ? "translate-y-[150%]" : "translate-y-0",
        ].join(" ")}
        style={{ bottom: 0 }}
      >
        <div className="relative rounded-2xl shadow-lg bg-blue-900 text-white font-syne px-4 py-2 pr-14">
          <div className="flex items-center gap-3 flex-wrap">
            <ServiceInfo />
            {isLive && (
              <>
                <Divider />
                <LiveBadge />
              </>
            )}
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <ChatIcon />
          </div>
        </div>
        <div className="shadow-lg bg-blue-900 text-white font-syne px-4 py-0.5 rounded-2xl">
          <Marquee />
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 18s linear infinite;
        }
      `}</style>
    </>
  );
}
