import React from "react";
import Link from "next/link";
import BookCover from "@/components/BookCover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const BookCard = ({
  id,
  title,
  coverUrl,
  className,
  isLoanedBook = true,
}: {
  id: number;
  title?: string;
  className: string;
  isLoanedBook?: boolean;
  coverUrl: File;
}) => (
  <li className={cn(className, "list-none")}>
    <Link
      href={`/library/${id}`}
      className={cn(isLoanedBook && " h-full flex  flex-col items-center")}
    >
      <BookCover coverUrl={coverUrl} />
      <div className="w-full py-2 px-2">
        <p className={cn("text-xs truncate")}>{title}</p>
      </div>

      {!isLoanedBook && (
        <div className="w-full">
          <div className="book-loaned">
            <Calendar />
            <p className="text-light-100">11 days left to return</p>
          </div>

          <Button className="book-btn">Download receipt</Button>
        </div>
      )}
    </Link>
  </li>
);

export default BookCard;
