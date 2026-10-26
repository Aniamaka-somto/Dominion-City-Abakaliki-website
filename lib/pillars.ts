import type { LucideIcon } from "lucide-react";
import { BookOpen, Flame, HandHeart, Sparkles, Users } from "lucide-react";

/**
 * "How we do church" pillars.
 *
 * Icons live here (rather than in `lib/home.ts`) so the lucide bundle stays
 * out of the client build — this file is only imported by server components.
 */

export interface Pillar {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const HOW_WE_DO_CHURCH: Pillar[] = [
  {
    title: "Worship",
    description:
      "We gather as one body to worship God — loudly, joyfully and without apology.",
    icon: Flame,
  },
  {
    title: "The Word",
    description:
      "The Bible is our anchor. Every week we open it and let it reshape us.",
    icon: BookOpen,
  },
  {
    title: "Fellowship",
    description:
      "No one does life alone. We make room for each other, in the pew and beyond it.",
    icon: Users,
  },
  {
    title: "Service",
    description:
      "Faith in motion. We serve our city, our neighbours and the least among us.",
    icon: HandHeart,
  },
  {
    title: "Discipleship",
    description:
      "We grow people, not just crowds. Every member is walked, trained and sent.",
    icon: Sparkles,
  },
];
