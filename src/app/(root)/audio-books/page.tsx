"use client";
import BookList from "@/components/BookList";
import SectionCard from "@/components/SectionCard";
import books from "@/lib/dummybooks.json";
import { ArrowLeft, ArrowRight, ArrowUpDown } from "lucide-react";

const Page = () => {
  return (
    <div className="w-full flex bg-muted max-h-[calc(100vh-3rem)] hide-scrollbar py-4 overflow-auto items-center flex-col px-2 space-y-2">
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

          <BookList
            //@ts-expect-error type errpr
            data={books.slice(1, 10)}
          />
        </SectionCard>
      </div>
    </div>
  );
};
export default Page;
