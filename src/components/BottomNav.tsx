"use client";
import { usePathname } from "next/navigation";
import { sidebarItem } from "@/lib/data";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState, RefObject } from "react";
import { motion } from "framer-motion"; // Import framer motion for animation

interface BottomNavProps {
  scrollableDivRef: RefObject<HTMLDivElement | null>; // Type for ref
}

const BottomNav: React.FC<BottomNavProps> = ({ scrollableDivRef }) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true); // State to manage visibility

  useEffect(() => {
    const div = scrollableDivRef.current;
    if (!div) return;

    let lastScrollY = div.scrollTop; // Get initial scroll position

    const handleScroll = () => {
      const currentScrollY = div.scrollTop;
      setIsVisible(currentScrollY < lastScrollY); // Hide on scroll down, show on scroll up
      lastScrollY = currentScrollY;
    };

    div.addEventListener("scroll", handleScroll);
    return () => div.removeEventListener("scroll", handleScroll);
  }, [scrollableDivRef]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : 130 }}
      transition={{ duration: 0.3 }}
      className={cn(
        isVisible ? "sm:hidden flex " : "hidden",
        "z-50 absolute right-0 left-0 flex-1 px-5 py-2 bottom-4"
      )}
    >
      <div className="flex-1 flex items-center justify-between px-4 py-2 bg-accent-background rounded-full">
        {sidebarItem.map(({ Icon, id, link }) => {
          const isActive =
            (link !== "/" && pathname.includes(link) && link.length > 1) ||
            pathname === link;
          return (
            <Link
              className={cn("rounded-full", isActive && "bg-primary p-2")}
              key={id}
              href={link}
            >
              <Icon
                size={20}
                className={cn(isActive && "text-white")}
                strokeWidth={1.5}
              />
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BottomNav;
