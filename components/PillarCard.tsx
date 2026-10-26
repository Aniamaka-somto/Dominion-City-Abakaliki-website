import type { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface PillarCardProps {
  /** Card heading. */
  title: string;
  /** Supporting copy. */
  body: string;
  /** Optional icon, rendered in a white circle above the title. */
  icon?: LucideIcon;
  /** Extra classes for the card element. */
  className?: string;
}

/**
 * A single "how we do church" pillar, built on the shared card primitive.
 */
export default function PillarCard({
  title,
  body,
  icon: Icon,
  className,
}: PillarCardProps) {
  return (
    <Card className={cn("group/pillar gap-0 rounded-3xl bg-white", className)}>
      <CardHeader className="gap-0">
        {Icon ? (
          <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-900 transition-transform duration-300 group-hover/pillar:scale-105">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
        ) : null}
        <CardTitle className="font-syne text-lg font-bold uppercase tracking-tight ">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm leading-relaxed ">
          {body}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
