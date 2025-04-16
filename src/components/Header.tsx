import Searchbar from "@/components/Searchbar";
import UserAvatar from "@/components/UserAvatar";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

const Header = ({ userId }: { userId: number }) => {
  return (
    <div className="sticky top-0 flex bg-white z-50  w-full h-12 px-5 items-center justify-between">
      <div className="flex gap-x-2">
        <Sheet>
          <SheetTrigger className="sm:hidden">
            <Menu
              size={24}
              className="cursor-pointer"
            />
          </SheetTrigger>
          <SheetContent
            className="absolute inset-0 w-fit pt-2"
            side="left"
          >
            <Sidebar isMobile={true} />
          </SheetContent>
        </Sheet>
        <Searchbar />
      </div>
      <Link href={"/user"}>
        <UserAvatar userId={userId} />
      </Link>
    </div>
  );
};
export default Header;
