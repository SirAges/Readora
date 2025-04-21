"use client";
import BookList from "@/components/BookList";
// import books from "@/lib/dummybooks.json";
import { ChevronRight, Loader2 } from "lucide-react";
import SectionCard from "@/components/SectionCard";
import { useGetBooksQuery } from "@/redux/features/book/bookApiSlice";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const min = 1;
  const max = 10;
  const randomPage = useRef<number>(
    Math.floor(Math.random() * (max - min + 1)) + min
  );
  const { data, isFetching } = useGetBooksQuery({
    page: randomPage.current,
    limit: 24,
  });
      console.log("data", data);

  useEffect(() => {
    if (data?.success) {
      console.log('data', data)
      setBooks(data.data.book);
    }
    return () => {};
  }, [data]);
  if (isFetching) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
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
    <div className="w-full grid grid-cols-1 gap-y-5 overflow-y-scroll  bg-muted px-2 py-2 md:px-10 md:py-10 hide-scrollbar">
      <SectionCard>
        <div className="flex items-center justify-between py-2">
          <h1 className="font-semibold text-xs capitalize">Recommended</h1>
          <Link
            href="/library"
            className="flex items-center rounded-md text-xs bg-muted text-foreground px-3 py-2"
          >
            See All
            <ChevronRight size={12} />
          </Link>
        </div>
        <div>
          <BookList data={books.slice(12, 24)} />
        </div>
      </SectionCard>
      <SectionCard>
        <div className="flex items-center justify-between py-2">
          <h1 className="font-semibold text-xs capitalize ">Popular</h1>
          <Link
            href="/library"
            className="flex items-center rounded-md text-xs bg-muted text-foreground px-3 py-2"
          >
            See All
            <ChevronRight size={12} />
          </Link>
        </div>

        <BookList data={books.slice(0, 12)} />
      </SectionCard>
    </div>
  );
};
export default HomePage;
