import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import { ABOUT } from "@/lib/about";
import aboutHero from "@/public/wide shot congregation.jpg";
import leadership from "@/public/leadership.png";

export const metadata: Metadata = {
  title: "About — Dominion City",
  description:
    "Dominion City is a house of faith gathered in Abakaliki, Nigeria.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-blue-900 font-sans">
      <Hero image={aboutHero} />
      <Welcome
        image={leadership}
        alt="Our leadership"
        label={ABOUT.welcome.label}
        words={ABOUT.welcome.words}
        body={ABOUT.welcome.body}
      />
    </div>
  );
}
