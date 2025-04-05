"use client";
import { Separator } from "./ui/separator";
import {
  LogOut,
  MessageCircle,
  Moon,
  Sun,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { sidebarItem } from "@/lib/data";
import { useTheme } from "next-themes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const SideBar = ({ isMobile }: { isMobile?: boolean }) => {
  const { setTheme, theme } = useTheme();
  const isDark = theme === "dark";
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div
      className={cn(
        "sm:flex min-h-screen max-h-screen",
        isMobile ? "" : "hidden"
      )}
    >
      <div className=" px-5 py-3 h-full flex flex-col">
        <Link
          href={"/"}
          className="relative flex items-center cursor-pointer"
        >
          <h1 className="text-lg hidden md:flex">
            <span className="font-semibold px-1 text-primary text-xl">La</span>
            Book
          </h1>
        </Link>

        <div className="flex flex-col flex-1 space-y-3 justify-between py-5">
          {sidebarItem.map(({ Icon, id, link, name }) => {
            const isActive =
              (link !== "/" && pathname.includes(link) && link.length > 1) ||
              pathname === link;
            return (
              <Link
                className="flex items-center gap-x-2 cursor-pointer"
                key={id}
                href={link}
              >
                <div
                  className={cn(
                    "rounded bg-muted p-1",
                    isActive && "bg-primary "
                  )}
                >
                  <Icon
                    className={cn(isActive && "text-white")}
                    size={16}
                  />
                </div>

                <p
                  className={cn(
                    "capitalize text-sm hidden md:flex whitespace-nowrap",
                    isActive && "font-semibold "
                  )}
                >
                  {name}
                </p>
              </Link>
            );
          })}

          <Separator />
          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex cursor-pointer items-center gap-x-2"
          >
            <div className={cn("rounded bg-muted p-1")}>
              {isDark ? <Moon size={16} /> : <Sun size={16} />}
            </div>

            <p
              className={cn(
                "capitalize text-sm hidden md:flex whitespace-nowrap"
              )}
            >
              {isDark ? "Dark mode on" : "Light mode on"}
            </p>
          </div>
          <div
            onClick={() => router.push("mailto:ekelestephen.design@gmail.com")}
            className="flex cursor-pointer items-center gap-x-2"
          >
            <div className={cn("rounded bg-muted p-1")}>
              <MessageCircle size={16} />
            </div>

            <p
              className={cn(
                "capitalize text-sm hidden md:flex whitespace-nowrap"
              )}
            >
              Support
            </p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger>
              <div className="flex cursor-pointer items-center gap-x-2">
                <div className={cn("rounded bg-muted p-1")}>
                  <LogOut size={16} />
                </div>

                <p
                  className={cn(
                    "capitalize text-sm hidden md:flex whitespace-nowrap"
                  )}
                >
                  Sign out
                </p>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogAction>OK</AlertDialogAction>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Separator orientation="vertical" />
    </div>
  );
};
export default SideBar;
