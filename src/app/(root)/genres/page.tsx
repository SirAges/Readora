"use client";
import BookList from "@/components/BookList";
import SectionCard from "@/components/SectionCard";
import books from "@/lib/dummybooks.json";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, ArrowUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const genre = params.get("genre");
  const router = useRouter();
  const handleParamUpdate = (genre: string) => {
    params.set("genre", genre);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const filtered = books.filter((book) => genre === book.genre);
    if (filtered.length > 0 && genre) {
      //@ts-expect-error type error
      setAllBooks(filtered);
    } else {
      //@ts-expect-error type error
      setAllBooks(books);
    }

    return () => {};
  }, [genre]);

  return (
    <div className="w-full flex bg-muted max-h-[calc(100vh-3rem)] hide-scrollbar py-4 overflow-auto items-center flex-col px-2 space-y-2">
      <div className="py-3">
        <h1 className="text-3xl font-semibold ">
          Discover Books one Genre at a Time
        </h1>
      </div>
      <div className="flex flex-col items-center w-full flex-1">
        <div className="flex py-2 flex-wrap">
          {[...new Set(books.map((book) => book.genre))].map((g) => (
            <p
              onClick={() => handleParamUpdate(g)}
              key={g}
              className={cn(
                "bg-muted rounded-md text-xs px-2 py-2 whitespace-nowrap cursor-pointer",
                genre === g && "bg-primary text-white"
              )}
            >
              {g}
            </p>
          ))}
        </div>

        <SectionCard>
          <div className="flex items-center justify-between py-2 sticky top-0 z-50">
            <div className="w-8 h-8 rounded-full flex items-center justify-center border bg-background/70">
              <ArrowUpDown
                className="cursor-pointer"
                size={14}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center border bg-background/70">
                <ArrowLeft
                  className="cursor-pointer"
                  size={14}
                />
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center border bg-background/70">
                <ArrowRight
                  className="cursor-pointer"
                  size={14}
                />
              </div>
            </div>
          </div>

          <BookList data={allBooks.slice(1, 10)} />
        </SectionCard>
      </div>
    </div>
  );
};
export default Page;
