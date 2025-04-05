import { ChevronRight } from "lucide-react";
import RightSidebar from "@/components/RightSidebar";

import BookList from "@/components/BookList";
import books from "@/lib/dummybooks.json";

import SectionCard from "@/components/SectionCard";
export default function Home() {
  return (
    <main className="flex">
      <div className="grid grid-cols-1 gap-y-5 overflow-y-scroll  bg-muted  px-10 py-10 max-h-[calc(100vh-3rem)] hide-scrollbar">
        <SectionCard>
          <div className="flex items-center justify-between py-2">
            <h1 className="font-semibold text-xs capitalize">Recommended</h1>
            <p className="flex items-center text-xs bg-muted text-primary px-3 py-2">
              See All
              <ChevronRight size={12} />
            </p>
          </div>
          <div>
            <BookList
              className="flex gap-x-2 overflow-x-scroll hide-scrollbar"
              //@ts-expect-error type errpr
              data={books.slice(0, 12)}
            />
          </div>
        </SectionCard>
        <SectionCard>
          <div className="flex items-center justify-between py-2">
            <h1 className="font-semibold text-xs capitalize ">Genres</h1>
            <p className="flex items-center rounded-md text-xs bg-muted text-foreground px-3 py-2">
              See All
              <ChevronRight size={12} />
            </p>
          </div>
          <div>
            <BookList
              //@ts-expect-error type errpr
              data={books.slice(8, 20)}
            />
          </div>
        </SectionCard>
      </div>
      <RightSidebar />
    </main>
  );
}
