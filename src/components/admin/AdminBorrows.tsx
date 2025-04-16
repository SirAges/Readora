"use client";
import { formatDateTime } from "@/lib/utils";
import { useGetAllBorrowedBooksQuery } from "@/redux/features/borrow/borrowApiSlice";
import { ArrowLeft, ArrowRight, ArrowUpDown, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useGetBookQuery } from "@/redux/features/book/bookApiSlice";
import UserAvatar from "../UserAvatar";
const AdminBorrows = ({ selectedUser }: { selectedUser: number | null }) => {
  const [borrows, setBorrows] = useState<BorrowBook[]>([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const { data, isFetching } = useGetAllBorrowedBooksQuery({
    userId: selectedUser,
    page,
    limit: 10,
    sortBy: "returnDate",
    sort,
  });

  useEffect(() => {
    if (data?.success) {
      setBorrows(data.data.borrows);
    }
    return () => {};
  }, [data]);

  if (isFetching) {
    return (
      <div className="w-full h-full  px-2 flex flex-col items-center justify-center">
        <Loader2
          size={100}
          strokeWidth={1}
          className="text-primary animate-spin"
        />
        <p>Fetching borrows from library...</p>
      </div>
    );
  }
  return (
    <div className=" px-2 overflow-y-scroll hide-scrollbar space-y-2 ">
      <div className="sticky top-0 z-50">
      
        <h1 className="text-center">Books borrowed by selected user</h1>
        <div className=" flex items-center justify-between py-2 ">
          <div className="w-8 h-8 rounded-full flex items-center justify-center border bg-background/70">
            <ArrowUpDown
              onClick={() =>
                setSort((prev) => (prev === "desc" ? "asc" : "desc"))
              }
              className="cursor-pointer"
              size={14}
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
                onClick={() => setPage((prev) => data?.data?.nextPage || prev)}
                className="cursor-pointer"
                size={14}
              />
            </div>
          </div>
        </div>
      </div>

      {borrows.map(({ bookId, borrowDate, returnDate, librarianId, id }) => {
        return (
          <div
            key={id}
            className="flex flex-col  border-b  cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <BookCover bookId={bookId} />
              <UserAvatar userId={librarianId} />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs ">{formatDateTime(borrowDate).dateTime}</p>
              <p className="text-xs ">{formatDateTime(returnDate).dateTime}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default AdminBorrows;
const BookCover = ({ bookId }: { bookId: number }) => {
  const { data } = useGetBookQuery(bookId);

  return (
    data && (
      <div className="flex items-center">
        <div className="cursor-pointer relative h-8 w-5">
          <Link href={`/library${bookId}`}>
            <Image
              src={data.data.coverUrl.secure_url}
              alt="Book cover"
              fill
              className="object-fill"
              loading="lazy"
            />
          </Link>
        </div>
        <h1 className="px-2 font-semibold text-xs flex-1 pr-2 truncate">
          {data.data.title}
        </h1>
      </div>
    )
  );
};
