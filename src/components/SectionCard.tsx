import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const SectionCard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn("bg-background  rounded-lg w-full px-5 py-3", className)}
    >
      {children}
    </section>
  );
};
export default SectionCard;
