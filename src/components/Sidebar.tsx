"use client";
import { Separator } from "./ui/separator";
import { Loader2, LogOut, MessageCircle, Moon, Sun, X } from "lucide-react";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { sidebarItem, socialLinks } from "@/lib/data";
import { useTheme } from "next-themes";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetClose,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { useSignOutMutation } from "@/redux/features/auth/authApiSlice";
import { usePathname, useSearchParams } from "next/navigation";

const SideBar = ({ isMobile }: { isMobile?: boolean }) => {
  const { setTheme, theme } = useTheme();
  const isDark = theme === "dark";
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stringSearchParams = searchParams.toString();
  const fullPath = stringSearchParams
    ? `${pathname}?${stringSearchParams}`
    : pathname;

  const [signOut, { isLoading }] = useSignOutMutation();
  const handleSignOut = async () => {
    await signOut("").unwrap();
  };
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div
      className={cn(
        "sm:flex sticky top-0 max-h-screen grow",
        isMobile ? "" : "hidden"
      )}
    >
      <div className=" px-5 py-3 h-full flex flex-col">
        <Link
          href={"/"}
          className="relative flex items-center cursor-pointer"
        >
          <h1 className="text-lg hidden md:flex">
            <span className="font-semibold px-1 text-primary text-xl">Re</span>
            dora
          </h1>
        </Link>

        <div className="flex flex-col h-full space-y-3 justify-between py-5">
          {sidebarItem.map(({ Icon, id, link, name }) => {
            const isActive = link.includes("?")
              ? fullPath === link
              : pathname === link && !searchParams.toString();

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
          <Sheet>
            <SheetTrigger>
              <div className="flex cursor-pointer items-center gap-x-2">
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
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="absolute inset-0 max-w-xs z-50 items-center"
            >
              <SheetTitle>Contact us</SheetTitle>
              <div className="w-full gap-y-3 flex flex-col items-center px-3 py-3 flex-1">
                {socialLinks.map(({ id, name, Icon }) => (
                  <SheetClose
                    className="w-full flex items-center cursor-pointer gap-x-3 bg-muted px-2 py-3 rounded-md "
                    key={id}
                  >
                    <Icon
                      strokeWidth={1.5}
                      size={20}
                      className="text-primary"
                    />
                    <p>{name}</p>
                  </SheetClose>
                ))}
                <div className="rounded-full bg-primary flex items-center justify-center w-12 h-12 ">
                  <SheetClose>
                    <X
                      size={20}
                      className="text-white"
                    />
                  </SheetClose>
                </div>
              </div>
              <p>copyright &copy; {year}</p>
            </SheetContent>
          </Sheet>

          <Popover>
            <PopoverTrigger>
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
            </PopoverTrigger>
            <PopoverContent className="flex flex-col items-center w-fit">
              <Button
                disabled={isLoading}
                onClick={handleSignOut}
                className="text-white cursor-pointer"
              >
                {isLoading ? (
                  <p className="flex items-center justify-center">
                    <Loader2 className="animate-spin " />
                  </p>
                ) : (
                  "Continue"
                )}
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Separator orientation="vertical" />
    </div>
  );
};
export default SideBar;
