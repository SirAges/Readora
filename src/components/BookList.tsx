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
      className={cn(
        "w-full flex flex-wrap justify-center gap-2 md:gap-5",
        className
      )}
    >
      {data.map(({ id, coverUrl, title }) => {
        return (
          <BookCard
            className={cn("w-32 h-52", bookCardStyle)}
            key={id}
            id={id}
            coverUrl={coverUrl}
            title={title}
          />
        );
      })}
    </div>
  );
};
export default BookList;
