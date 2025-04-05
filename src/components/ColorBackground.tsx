import { cn } from "@/lib/utils";

const ColorBackground = ({ orientation }: { orientation: string }) => {
  return (
    <div
      className={cn(
        "inset-0 flex absolute h-[calc(100vh-6rem)] w-[calc(100vw-6rem)]",
        orientation === "right" && "flex-row-reverse ",
        orientation === "bottom" && " flex-col"
      )}
    >
      <div
        className={cn(
          "bg-primary-foreground",
          orientation === "bottom" ? "flex-2" : "flex-1"
        )}
      />
      <div
        className={cn(
          "hidden md:flex  bg-accent-background",
          orientation === "bottom" ? "flex-1 " : "flex-2"
        )}
      />
    </div>
  );
};
export default ColorBackground;
