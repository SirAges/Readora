"use client";
import SectionCard from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/hooks/useAuth";
import { cn, formatDateTime } from "@/lib/utils";
import {
  useGetAllBorrowedBooksQuery,
  useUpdateBorrowedBookStatusMutation,
} from "@/redux/features/borrow/borrowApiSlice";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  Loader2,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { useSignOutMutation } from "@/redux/features/auth/authApiSlice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const Page = () => {
  const { isAdmin, isStudent, userId } = useAuth();
  const [borrows, setBorrrows] = useState<BorrowBook[]>([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const [search, setSearch] = useState<string>("");
  const [signOut, { isLoading }] = useSignOutMutation();
  const handleSignOut = async () => {
    await signOut("").unwrap();
  };
  const { data } = useGetAllBorrowedBooksQuery({
    page,
    limit: 40,
    sortBy: "status",
    sort,
  });

  useEffect(() => {
    if (data) {
      setBorrrows(data.data.borrows);
    }
    return () => {};
  }, [data]);
  useEffect(() => {
    if (data?.success) {
      const filtered = data.data.borrows.filter(
        ({
          user,
          book,
        }: {
          user: {
            firstName: string;
            lastName: string;
          };
          book: {
            coverUrl: File;
            title: string;
          };
        }) =>
          user.firstName.toLowerCase().includes(search.toLowerCase()) ||
          user.lastName.toLowerCase().includes(search.toLowerCase()) ||
          book.title.toLowerCase().includes(search.toLowerCase())
      );
      setBorrrows(filtered);
    }
    return () => {};
  }, [data, search]);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  console.log("borrows", borrows);
  if (isAdmin) {
    redirect("/admin");
  }
  if (isStudent) {
    redirect("/");
  }
  return (
    <>
      <div className="flex flex-col lg:hidden items-center justify-center h-screen w-screen px-5 ">
        <p className="text-center font-semibold">
          Librarian dashboard can only be viewed on desktop
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
              Librarian Dashboard
            </p>

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
        <SectionCard className="min-h-60 overflow-x-scroll hide-scrollbar">
          <div className="flex items-center justify-between py-2 sticky top-0 z-50">
            <div className="w-8 h-8 rounded-full flex items-center justify-center border bg-background/70">
              <ArrowUpDown
                onClick={() =>
                  setSort((prev) => (prev === "desc" ? "asc" : "desc"))
                }
                className="cursor-pointer"
                size={14}
              />
            </div>
            <div className="flex-1 px-4">
              <Input
                name="search"
                placeholder="search here..."
                value={search}
                onChange={handleSearch}
                className="max-w-72 py-3 px-2 bg-background"
              />
            </div>
            <div className="flex items-center gap-x-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center border bg-background/70">
                <ArrowLeft
                  onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
                  className="cursor-pointer"
                  size={14}
                />
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center border bg-background/70">
                <ArrowRight
                  onClick={() =>
                    setPage((prev) => data?.data?.nextPage || prev)
                  }
                  className="cursor-pointer"
                  size={14}
                />
              </div>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                {[
                  "book",
                  "book title",
                  "borrowed by",
                  "borrow date",
                  "return date",
                  "status",
                  "actions",
                ].map((key) => (
                  <TableHead
                    className={cn(
                      "text-start capitalize",
                      key === "actions" && "text-right"
                    )}
                    key={key}
                  >
                    {key}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrows.map(
                ({
                  bookId,
                  borrowDate,
                  returnDate,
                  id,
                  status,
                  book,
                  user,
                }: BorrowBook) => (
                  <TableRow key={id}>
                    <TableCell>
                      <BookCover
                        bookId={bookId}
                        coverUrl={book.coverUrl}
                      />
                    </TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>
                      {user.lastName} {user.firstName}
                    </TableCell>

                    <TableCell>{formatDateTime(borrowDate).dateTime}</TableCell>
                    <TableCell>{formatDateTime(returnDate).dateTime}</TableCell>
                    <TableCell>{status}</TableCell>
                    <TableCell>
                      <Actions borrowId={id} />
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </SectionCard>
      </main>
    </>
  );
};
export default Page;

const BookCover = ({
  coverUrl,
  bookId,
}: {
  bookId: number;
  coverUrl: File;
}) => {
  return (
    <div className="cursor-pointer relative h-8 w-5">
      <Link href={`/library${bookId}`}>
        <Image
          src={coverUrl.secure_url}
          alt="Book cover"
          fill
          className="object-fill"
          loading="lazy"
        />
      </Link>
    </div>
  );
};

const Actions = ({ borrowId }: { borrowId: number }) => {
  const [updateBorrowedBookStatus, { isLoading }] =
    useUpdateBorrowedBookStatusMutation();
  const [isLoadingStatus, setIsLoadingStatus] = useState<string>("");
  const handleUpdateBorrowedBookStatus = async (status: string) => {
    setIsLoadingStatus(status);
    console.log("status", status);
    try {
      const { success, message } = await updateBorrowedBookStatus({
        borrowId,
        status,
      }).unwrap();
      if (success) {
        toast(message);
      }
    } catch (error) {
      //@ts-expect-error error type
      if (error?.data) {
        //@ts-expect-error error type
        toast(error?.data?.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-end gap-x-2">
      <Button
        onClick={() => handleUpdateBorrowedBookStatus("APPROVED")}
        variant={"link"}
        className={cn()}
      >
        {isLoading && isLoadingStatus === "APPROVED" ? <Loader2 /> : "approve"}
      </Button>
      <Button
        onClick={() => handleUpdateBorrowedBookStatus("COLLECTED")}
        variant={"link"}
        className={cn("text-chart-4")}
      >
        {isLoading && isLoadingStatus === "COLLECTED" ? <Loader2 /> : "collect"}
      </Button>
      <Button
        onClick={() => handleUpdateBorrowedBookStatus("REJECTED")}
        variant={"link"}
        className={cn("text-destructive")}
      >
        {isLoading && isLoadingStatus === "REJECTED" ? <Loader2 /> : "reject"}
      </Button>
      <Button
        onClick={() => handleUpdateBorrowedBookStatus("RETURNED")}
        variant={"link"}
        className={cn("text-chart-3")}
      >
        {isLoading && isLoadingStatus === "RETURNED" ? <Loader2 /> : "return"}
      </Button>
    </div>
  );
};
