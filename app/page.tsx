import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import MissionSection from "@/components/MissionSection";
import HowWeDoChurch from "@/components/HowWeDoChurch";
import headerImage from "@/public/header.jpg";
import welcomeImage from "@/public/welcome home.jpg";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-blue-900 font-sans">
      <Hero image={headerImage} />
      <Welcome image={welcomeImage} />
      <MissionSection />
      <HowWeDoChurch />
    </div>
  );
}
