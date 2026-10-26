/**
 * Home page copy.
 *
 * Edit the text here — the components in `components/` only own layout.
 *
 * Everything in this file is plain data, so it is safe to import from both
 * server and client components.
 */

/* ── Welcome ─────────────────────────────────────────────────────────── */

export const WELCOME = {
  label: "This is",
  /** Cycled by the typewriter effect. */
  words: ["Home", "Family", "Dominion City"],
  body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam dolorem quod accusantium exercitationem distinctio repudiandae?",
} as const;

/* ── Mission ─────────────────────────────────────────────────────────── */

export interface MissionWord {
  /** The word as it appears on screen. */
  word: string;
  /** Tailwind text colour for this word. */
  tone: string;
  /** Timeline position + duration per breakpoint. */
  desktop: { at: number; duration: number };
  mobile: { at: number; duration: number };
}

export const MISSION_WORDS: MissionWord[] = [
  {
    word: "RAISING",
    tone: "text-blue-800",
    desktop: { at: 1.5, duration: 0.7 },
    mobile: { at: 1.2, duration: 0.6 },
  },
  {
    word: "LEADERS",
    tone: "text-blue-900",
    desktop: { at: 1.9, duration: 0.7 },
    mobile: { at: 1.6, duration: 0.6 },
  },
  {
    word: "THAT",
    tone: "text-blue-800",
    desktop: { at: 2.2, duration: 0.5 },
    mobile: { at: 1.9, duration: 0.5 },
  },
  {
    word: "TRANSFORM",
    tone: "text-blue-800",
    desktop: { at: 2.4, duration: 0.8 },
    mobile: { at: 2.1, duration: 0.7 },
  },
  {
    word: "THE",
    tone: "text-blue-800",
    desktop: { at: 2.8, duration: 0.8 },
    mobile: { at: 2.5, duration: 0.7 },
  },
  {
    word: "SOCIETY",
    tone: "text-blue-800",
    desktop: { at: 3.0, duration: 0.9 },
    mobile: { at: 2.7, duration: 0.8 },
  },
];
