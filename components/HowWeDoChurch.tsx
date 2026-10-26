import ShimmerHeading from "@/components/ShimmerHeading";
import { cn } from "@/lib/utils";
import PillarCard from "./PillarCard";
import { title } from "process";
import { button } from "motion/react-client";

export interface HowWeDoChurchProps {
  /** Section heading. */
  title?: string;
  /** Extra classes for the outer section. */

  className?: string;
}

const cards = [
  {
    title: "Services 1",
    body: "SOUL Church Ltd is a registered charity in England and Wales (No. 1138459) and a company limited by guarantee (No. 07260215). Registered Office: Heartsease Lane, Norwich, NR7 9NT. ‍SOUL Foundation",
    button: "Learn more",
  },
  {
    title: "Connect",
    body: "SOUL Church Ltd is a registered charity in England and Wales (No. 1138459) and a company limited by guarantee (No. 07260215). Registered Office: Heartsease Lane, Norwich, NR7 9NT. SOUL Foundation",
    button: "Connect today",
  },
  {
    title: "Services",
    body: "SOUL Church Ltd is a registered charity in England and Wales (No. 1138459) and a company limited by guarantee (No. 07260215). Registered Office: Heartsease Lane, Norwich, NR7 9NT. ‍SOUL Foundation",
    button: "Learn more",
  },
  {
    title: "Connect",
    body: "SOUL Church Ltd is a registered charity in England and Wales (No. 1138459) and a company limited by guarantee (No. 07260215). Registered Office: Heartsease Lane, Norwich, NR7 9NT. SOUL Foundation",
    button: "Connect today",
  },
  {
    title: "Services",
    body: "SOUL Church Ltd is a registered charity in England and Wales (No. 1138459) and a company limited by guarantee (No. 07260215). Registered Office: Heartsease Lane, Norwich, NR7 9NT. ‍SOUL Foundation",
    button: "Learn more",
  },
  {
    title: "Connect",
    body: "SOUL Church Ltd is a registered charity in England and Wales (No. 1138459) and a company limited by guarantee (No. 07260215). Registered Office: Heartsease Lane, Norwich, NR7 9NT. SOUL Foundation",
    button: "Connect today",
  },
];

/**
 * "How we do church" section.
 */
export default function HowWeDoChurch({
  title = "How we do Church",
  className,
}: HowWeDoChurchProps) {
  return (
    <section className={cn("h-fit w-full bg-white", className)}>
      <section className="h-screen w-full flex items-center px-14  pt-14  bg-blue-900 rounded-t-[45px] sm:rounded-t-[90px] flex-col overflow-hidden ">
        <ShimmerHeading className="mb-5 sm:mt-12">{title}</ShimmerHeading>

        <div className="w-full  h-full flex   items-center gap-x-8">
          {cards.map((card, key) => (
            <PillarCard
              key={key}
              title={card.title}
              body={card.body}
              className="h-96  min-w-72 w-80 text-black py-12 px-9 text-sm  "
            />
          ))}
        </div>
      </section>
    </section>
  );
}
