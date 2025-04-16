"use client";
import AdminBooks from "@/components/admin/AdminBooks";
import AdminBorrows from "@/components/admin/AdminBorrows";
import AdminReviews from "@/components/admin/AdminReviews";
import AdminUsers from "@/components/admin/AdminUsers";
import BookStats from "@/components/admin/BookStats";
import BorrowStats from "@/components/admin/BorrowStats";
import ReviewStats from "@/components/admin/ReviewStats";
import UserStats from "@/components/admin/UserStats";
import SectionCard from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useSignOutMutation } from "@/redux/features/auth/authApiSlice";
import { Loader2, LogOut } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const { userId, isLibrarian, isStudent } = useAuth();
  const [signOut, { isLoading }] = useSignOutMutation();
  const handleSignOut = async () => {
    await signOut("").unwrap();
  };
  if (isLibrarian) {
    redirect("/admin/librarian");
  }
  if (isStudent) {
    redirect("/");
  }

  return (
    <>
      <div className="flex flex-col lg:hidden items-center justify-center h-screen w-screen px-5 ">
        <p className="text-center font-semibold">
          Admin dashboard can only be viewed on desktop
        </p>
        <p className="text-primary text-center font-semibold text-2xl uppercase">
          Sign in with a desktop
        </p>
      </div>
      <main className="hidden lg:flex flex-col h-full py-2 bg-muted">
        <div className="flex items-center justify-between min-h-12 px-4 pb-2">
          <UserAvatar userId={userId!} />
          <div className="flex items-center justify-end flex-1 gap-x-4">
            <p className="font-semibold capitalize flex-1 text-center">
              Admin Dashboard
            </p>

            <Button
              asChild
              className="text-white"
            >
              <Link href="/admin/add-book">Add book</Link>
            </Button>
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
        <div className="flex px-2 gap-x-2 min-h-84 max-h-84">
          <SectionCard className="w-1/2  grid grid-cols-2">
            <AdminBooks
              selectedBook={selectedBook}
              setSelectedBook={setSelectedBook}
            />
            <AdminReviews selectedBook={selectedBook} />
          </SectionCard>
          <SectionCard className="w-1/2  grid grid-cols-2">
            <AdminUsers
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
            <AdminBorrows selectedUser={selectedUser} />
          </SectionCard>
        </div>
        <div className="flex px-2 pt-2  gap-x-2 flex-1">
          <SectionCard className="w-1/4 h-52">
            <BookStats />
          </SectionCard>
          <SectionCard className="w-1/4 h-52">
            <ReviewStats />
          </SectionCard>
          <SectionCard className="w-1/4 h-52">
            <UserStats />
          </SectionCard>
          <SectionCard className="w-1/4 h-52">
            <BorrowStats />
          </SectionCard>
        </div>
      </main>
    </>
  );
}
