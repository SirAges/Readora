"use client";
import BookList from "@/components/BookList";
import ScreenLoader from "@/components/ScreenLoader";
import SectionCard from "@/components/SectionCard";
import { useGetBooksQuery } from "@/redux/features/book/bookApiSlice";
import { ArrowLeft, ArrowRight, ArrowUpDown,  } from "lucide-react";
import { useEffect, useState } from "react";

const Page = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const { data, isFetching } = useGetBooksQuery(
    {
      page,
      limit: 42,
      sortBy: "title",
      sort,
    },

  );

  useEffect(() => {
    if (data?.success) {
      setBooks(data.data.book);
    }
    return () => {};
  }, [data]);
 
  return (
    <div className="w-full flex bg-muted max-h-[calc(100vh-3rem)] hide-scrollbar py-4 overflow-auto items-center flex-col px-2 space-y-2">
      <ScreenLoader
        open={isFetching}
        message={"Fetching list of books from library"}
      />

      <div className="py-3 flex flex-col items-center space-y-2">
        <h1 className="text-3xl font-semibold ">
          The Biggest Library in Africa.
        </h1>
        <p>You can only find it here</p>
      </div>
      <div className="flex flex-col items-center w-full flex-1">
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
