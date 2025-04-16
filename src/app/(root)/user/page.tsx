"use client";
import SectionCard from "@/components/SectionCard";
import { useAuth } from "@/hooks/useAuth";
import { cn, formatDateTime } from "@/lib/utils";
import {
  useCancelRequestForBorrowedBookMutation,
  useExtendReturnDateMutation,
  useGetUserBorrowedBooksQuery,
} from "@/redux/features/borrow/borrowApiSlice";
import { useGetUserQuery } from "@/redux/features/user/userApiSlice";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import DemoImage from "@/assets/images/idcard.jpg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, ArrowUpDown, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
const Page = () => {
  const { userId } = useAuth();
  const { data } = useGetUserQuery(userId);
  const [user, setUser] = useState<User | null>(null);
  const [borrows, setBorrrows] = useState<BorrowBook[]>([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const { data: borrowData } = useGetUserBorrowedBooksQuery({
    page,
    limit: 40,
    sortBy: "status",
    sort,
  });

  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    if (borrowData) {
      setBorrrows(borrowData.data.userborrows);
    }
    return () => {};
  }, [borrowData]);
  useEffect(() => {
    if (data) {
      setUser(data.data);
    }

    return () => {};
  }, [data]);
  useEffect(() => {
    if (borrowData?.success) {
      const filtered = borrowData.data.userborrows.filter(
        ({
          book,
        }: {
          book: {
            coverUrl: File;
            title: string;
          };
        }) => book.title.toLowerCase().includes(search.toLowerCase())
      );
      setBorrrows(filtered);
    }
    return () => {};
  }, [borrowData, search]);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    user && (
      <div className="max-h-[calc(100vh-3rem)] hide-scrollbar overflow-y-scroll bg-muted flex flex-col w-full px-2 py-2 gap-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <SectionCard className="w-full">
            <div className="flex items-center w-full">
              <div className="flex-1">
                <p className="text-xs">Welcome</p>
                <div className="flex items-center gap-x-2">
                  <p className="font-semibold text-md">{user.firstName}</p>
                  <p className="font-semibold text-md">{user.lastName}</p>
                </div>
                <p className=" text-xs text-primary">{user.email}</p>
              </div>

              <div className=" flex flex-col items-end flex-1">
                <p className="font-semibold text-xs text-primary">
                  {formatDateTime(user.lastLogin).dateTime}
                </p>
                <p className="font-semibold text-xs">{user.status}</p>
                <p className="font-semibold text-xs ">{user.role}</p>
              </div>
            </div>
            <div className="flex items-center justify-center py-5">
              <div className="rounded-full bg-muted w-32 h-32 flex flex-col items-center justify-center">
                <p className="font-semibold text-2xl">
                  {borrowData?.data?.totalBorrowedBook}
                </p>
                <p className="font-semibold text-xs">Books borrowed</p>
              </div>
            </div>
          </SectionCard>
          <SectionCard className="w-full">
            <div className="w-full relative h-60 py-2">
              <Image
                className="object-cover rounded-md"
                src={DemoImage || user.idCardUrl.secure_url}
                alt="id card"
                fill
              />
            </div>
          </SectionCard>
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
                placeholder="search borrow"
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
                }: BorrowBook) => (
                  <TableRow key={id}>
                    <TableCell>
                      <BookCover
                        coverUrl={book.coverUrl}
                        bookId={bookId}
                      />
                    </TableCell>
                    <TableCell className="truncate">{book.title}</TableCell>
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
      </div>
    )
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
  const [extendReturnDate, { isLoading: isExtendLoading }] =
    useExtendReturnDateMutation();
  const [cancelRequestForBorrowedBook, { isLoading: isCancelLoading }] =
    useCancelRequestForBorrowedBookMutation();

  const handleExtendReturnDate = async () => {
    try {
      const { success, message } = await extendReturnDate(borrowId).unwrap();
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
  const handleCancelRequestForBorrowedBook = async () => {
    try {
      const { success, message } = await cancelRequestForBorrowedBook(
        borrowId
      ).unwrap();
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
    <div className="flex items-center justify-end">
      <Button
        onClick={handleExtendReturnDate}
        variant={"link"}
        className={cn()}
      >
        {isExtendLoading ? <Loader2 /> : "extend"}
      </Button>
      <Button
        onClick={handleCancelRequestForBorrowedBook}
        variant={"link"}
        className={cn("text-destructive")}
      >
        {isCancelLoading ? <Loader2 /> : "cancel"}
      </Button>
    </div>
  );
};
