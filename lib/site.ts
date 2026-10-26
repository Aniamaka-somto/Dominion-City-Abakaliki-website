/**
 * Site-wide content.
 *
 * Anything that appears in more than one place (nav, service times, contact
 * details) lives here so components stay layout-only and the copy can be
 * changed in one file.
 */

export const site = {
  name: "Dominion City",
  tagline: "Raising leaders that transform the society",
  location: {
    label: "Location",
    lines: ["Dominion City HQ", "Nigeria"],
  },
  social: {
    instagram: "#",
    youtube: "#",
  },
  copyright: `© ${new Date().getFullYear()} Dominion City. All rights reserved.`,
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "#" },
  { label: "Give", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Events", href: "#" },
] as const;

/** Times shown in the bottom service bar. */
export const SERVICE_TIMES = ["9AM", "11.30AM", "5PM (once a month)"] as const;

/** Scrolling announcement in the bottom service bar. */
export const MARQUEE_TEXT =
  "FIND OUT WHAT IS GOING ON AT SOUL CHURCH — FIND OUT WHAT IS GOING ON AT SOUL CHURCH";
