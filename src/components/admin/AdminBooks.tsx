"use client";
import { cn } from "@/lib/utils";
import { useGetBooksQuery } from "@/redux/features/book/bookApiSlice";
import { ArrowLeft, ArrowRight, ArrowUpDown, Loader2 } from "lucide-react";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Input } from "../ui/input";
const AdminBooks = ({
  setSelectedBook,
  selectedBook,
}: {
  selectedBook: number | null;
  setSelectedBook: Dispatch<SetStateAction<number | null>>;
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const { data, isFetching } = useGetBooksQuery(
    {
      page,
      limit: 100,
      sortBy: "title",
      sort,
    },
    { refetchOnMountOrArgChange: false }
  );

  useEffect(() => {
    if (data?.success) {
      setBooks(data.data.book);
    }
    return () => {};
  }, [data]);
  useEffect(() => {
    if (data?.success) {
      const filtered = data.data.book.filter(({ title }: { title: string }) =>
        title.toLowerCase().includes(search.toLowerCase())
      );
      setBooks(filtered);
    }
    return () => {};
  }, [data, search]);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  if (isFetching) {
    return (
      <div className="w-full h-full  px-2 flex flex-col items-center justify-center">
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
    <div className="border-r px-2 overflow-y-scroll hide-scrollbar space-y-2 ">
      <div className="sticky top-0 z-50">
        <Input
          name="search"
          placeholder="search book"
          value={search}
          onChange={handleSearch}
          className="flex-1 py-3 px-2 bg-background"
        />

        <div className="flex items-center justify-between py-2 ">
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
      {books.map(
        ({ id, title, coverUrl, availableCopies, copies, borrowCount }, i) => {
          return (
            <div
              onClick={() => setSelectedBook(id)}
              key={i}
              className={cn(
                "flex items-center h-12 my-2 cursor-pointer",
                selectedBook === id && "bg-muted"
              )}
            >
              <div className="relative h-full w-8">
                <Image
                  className="object-cover object-center"
                  src={coverUrl.secure_url}
                  fill
                  alt={title}
                />
              </div>
              <div className="px-2 py-1 space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold capitalize text-xs flex-1 pr-2 truncate">
                    {title}
                  </h1>
                  <p className="text-xs ">{copies} copies</p>
                </div>

                <div className="flex items-center justify-between">
                  <h1 className={cn(" text-xs")}>
                    {availableCopies} available
                  </h1>
                  <p className="text-xs ">{borrowCount} borrowed</p>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};
export default AdminBooks;
