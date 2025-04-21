"use client";
import React, { useEffect, useRef, useState } from "react";
import BookCard from "./BookCard";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Separator } from "./ui/separator";
import { useGetBookQuery } from "@/redux/features/book/bookApiSlice";

const RightSidebar = () => {
  const [book, setBook] = useState<Book | null>(null);
  const min = 2;
  const max = 100;
  const randomId = useRef<number>(
    Math.floor(Math.random() * (max - min + 1)) + min
  );

  const { data } = useGetBookQuery(randomId.current);

  useEffect(() => {
    if (data?.success) {
      setBook(data.data);
    }
    return () => {};
  }, [data]);
  if (!book) return null;
  const {
    id,
    coverUrl,
    title,
    author,
    summary,
    genre,
    copies,
    pages,
    year,
    avgRating,
  } = book;
  return (
    <div className="hidden max-h-[calc(100vh-3rem)] sm:flex flex-col  bg-background px-2 py-2 sticky top-0 w-64 items-center ">
      <BookCard
        id={id}
        className={cn("w-28 h-44")}
        key={id}
        coverUrl={coverUrl}
      />
      <h1 className="text-center text-xs">{title}</h1>
      <p className="text-xs opacity-80 ">{author}</p>
      <p className="text-xs opacity-80 ">{genre}</p>
      {avgRating ? (
        <div className="flex items-center gap-x-2 py-1 text-xs">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              color="#f1a900"
              fill={i + 1 <= avgRating! ? "#f1a900" : undefined}
              size={10}
              key={i}
            />
          ))}
          <p className="w-6 h-6 rounded-full bg-primary text-white font-semibold flex items-center justify-center">
            {avgRating}
          </p>
        </div>
      ) : null}
      <div className="flex items-center gap-x-2 opacity-80 py-2">
        <div className="flex flex-col items-center ">
          <p className="text-xs">Page</p>
          <p className="text-xs">{pages}</p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col items-center">
          <p className="text-xs"> copies</p>
          <p className="text-xs">{copies}</p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col items-center">
          <p className="text-xs">Year</p>
          <p className="text-xs">{year}</p>
        </div>
      </div>
      <p className="text-xs ">{summary}...</p>
    </div>
  );
};
export default RightSidebar;
