import books from "@/lib/dummybooks.json";
import { cn } from "@/lib/utils";
import Image from "next/image";
const AdminBooks = () => {
  return (
    <div className="overflow-y-scroll hide-scrollbar space-y-2">
      {books.map(
        (
          { title, coverUrl, coverColor, author, availableCopies, totalCopies },
          i
        ) => {
          return (
            <div
              key={i}
              className="flex items-center -2"
            >
              <div className="relative h-10 w-7">
                <Image
                  className="object-cover object-center"
                  src={coverUrl}
                  fill
                  alt={title}
                />
              </div>
              <div className="flex-1">
                <h1 className="font-semibold text-xs ">{title}</h1>
                <p className="text-xs italic">{author}</p>
                <div className="flex items-center justify-between">
                  <h1 className={cn("font-semibold text-xs")}>
                    Available Copies: {availableCopies}
                  </h1>
                  <p className="text-xs ">Total Copies:{totalCopies}</p>
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
