import React from "react";
import books from "@/lib/dummybooks.json";
import BookCard from "./BookCard";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Separator } from "./ui/separator";

const RightSidebar = () => {
  const {
    id,
    coverColor,
    coverUrl,
    title,
    author,
    rating,
    summary,
    genre,
    availableCopies,
  } = books[3];
  return (
    <div className="max-h-[calc(100vh-3rem)] flex flex-col  bg-background px-2 py-2 sticky top-0 w-64 items-center ">
      <BookCard
        className={cn("w-28 h-44")}
        key={id}
        id={id}
        coverUrl={coverUrl}
        coverColor={coverColor}
      />
      <h1 className="text-center text-xs">{title}</h1>
      <p className="text-xs opacity-80 ">{author}</p>
      <p className="text-xs opacity-80 ">{genre}</p>
      <div className="flex items-center gap-x-2 py-1 text-xs">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            color="#f1a900"
            fill={i + 1 <= rating ? "#f1a900" : undefined}
            size={10}
            key={i}
          />
        ))}
        {rating}
      </div>
      <div className="flex items-center gap-x-2 opacity-80 py-2">
        <div className="flex flex-col items-center ">
          <p className="text-xs">Page</p>
          <p className="text-xs">{323}</p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col items-center">
          <p className="text-xs"> copies</p>
          <p className="text-xs">{availableCopies}</p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col items-center">
          <p className="text-xs">Reviews</p>
          <p className="text-xs">3233</p>
        </div>
      </div>
      <p className="text-xs ">{summary.slice(0, 150)}...</p>
    </div>
  );
};
export default RightSidebar;
