import { cn } from "@/lib/utils";
import BookCard from "./BookCard";

const BookList = ({
  data,
  className,
  bookCardStyle,
}: {
  data: Book[];
  className?: string;
  bookCardStyle?: string;
  isCentered?: number;
}) => {
  return (
    <div
      className={cn("w-full flex flex-wrap justify-center gap-2", className)}
    >
      {data.map(({ id, coverColor, coverUrl, title }) => {
        return (
          <BookCard
            className={cn("w-32 h-52", bookCardStyle)}
            key={id}
            id={id}
            coverColor={coverColor}
            coverUrl={coverUrl}
            title={title}
          />
        );
      })}
    </div>
  );
};
export default BookList;
