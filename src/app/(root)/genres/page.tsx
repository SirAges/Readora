"use client";
import BookList from "@/components/BookList";
import SectionCard from "@/components/SectionCard";
import { cn } from "@/lib/utils";
import { useGetBooksQuery } from "@/redux/features/book/bookApiSlice";
import { ArrowLeft, ArrowRight, ArrowUpDown, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import genres from "@/lib/genres.json";
import Link from "next/link";
const Page = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre");

  const { data, isFetching } = useGetBooksQuery({
    page,
    limit: 21,
    genre,
    sortBy: "title",
    sort,
  });

  useEffect(() => {
    if (data?.success) {
      setBooks(data.data.book);
    }
    return () => {};
  }, [data]);
  if (isFetching) {
    return (
      <div className="w-full h-full min-h-[calc(100vh-3rem)] flex flex-col items-center justify-center">
        <Loader2
          size={100}
          strokeWidth={1}
          className="text-primary animate-spin"
        />
        <p>Fetching books from library...</p>
      </div>
    );
  }
  return (
    <div className="w-full flex bg-muted max-h-[calc(100vh-3rem)] hide-scrollbar py-4 overflow-auto items-center flex-col px-2 space-y-2">
      <div className="py-3">
        <h1 className="text-3xl font-semibold ">
          Discover Books one Genre at a Time
        </h1>
      </div>
      <div className="flex flex-col items-center w-full flex-1">
        <div className="flex py-2 flex-wrap">
          {genres.map((g) => (
            <Link
              href={`/genres?genre=${g}`}
              key={g}
              className={cn(
                "bg-muted rounded-md text-xs px-2 py-2 whitespace-nowrap cursor-pointer",
                genre === g && "bg-primary text-white"
              )}
            >
              {g}
            </Link>
          ))}
        </div>

        <SectionCard>
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

          <BookList data={books} />
        </SectionCard>
      </div>
    </div>
  );
};
export default Page;
