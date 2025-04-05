import Searchbar from "@/components/Searchbar";
import UserAvatar from "@/components/UserAvatar";
import { Menu, Sun } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "@/components/Sidebar";

const Header = () => {
  return (
    <div className="flex w-full h-12 px-5 items-center justify-between">
      <div className="flex gap-x-2">
        <Sheet>
          <SheetTrigger className="sm:hidden">
            <Menu
              size={24}
              className="cursor-pointer"
            />
          </SheetTrigger>
          <SheetContent
            className="w-fit pt-2"
            side="left"
          >
            <Sidebar isMobile={true} />
          </SheetContent>
        </Sheet>
        <Searchbar />
      </div>

      <UserAvatar />

      <Sun
        className="flex sm:hidden"
        strokeWidth={1.5}
      />
    </div>
  );
};
export default Header;
