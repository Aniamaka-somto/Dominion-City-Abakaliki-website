import { cn } from "@/lib/utils";

export interface ShimmerHeadingProps {
  children: React.ReactNode;
  /** Heading level to render. */
  as?: "h1" | "h2" | "h3";
  /** Extra classes for the heading element. */
  className?: string;
}

/**
 * Section heading with the iridescent shimmer sweep.
 *
 * The keyframes live in `app/globals.css`.
 */
export default function ShimmerHeading({
  children,
  as: Component = "h2",
  className,
}: ShimmerHeadingProps) {
  return (
    <Component
      className={cn(
        "text-[clamp(2.6rem,5vw,6.2rem)] font-bold uppercase font-syne leading-[0.85] tracking-[-0.02em] text-center bg-clip-text text-transparent flex h-fit",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(135deg, #a8d0ff 0%, #e8dfc0 22%, #f5f0d0 40%, #c0d8f8 58%, #d0c0f0 75%, #a8d0ff 100%)",
        backgroundSize: "200% 200%",
        animation: "holoshimmer 5s ease infinite",
      }}
    >
      {children}
    </Component>
  );
}
