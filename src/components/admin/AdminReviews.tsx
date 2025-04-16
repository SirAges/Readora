"use client";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  Loader2,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useGetBookReviewsQuery } from "@/redux/features/book/bookApiSlice";
import UserAvatar from "../UserAvatar";
const AdminReviews = ({ selectedBook }: { selectedBook: number | null }) => {
  const [reviews, setReviews] = useState<BookReview[]>([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const { data, isFetching } = useGetBookReviewsQuery({
    bookId: selectedBook,
    params: {
      page,
      limit: 10,
      sortBy: "rating",
      sort,
    },
  });
  useEffect(() => {
    if (data?.success) {
      setReviews(data.data.reviews);
    }
    return () => {};
  }, [data]);

  if (isFetching) {
    return (
      <div className="w-full h-full  px-2 flex flex-col items-center justify-center">
        <Loader2
          size={100}
          strokeWidth={1}
          className="text-primary animate-spin"
        />
        <p>Fetching reviews stats from library...</p>
      </div>
    );
  }
  return (
    <div className=" px-2 overflow-y-scroll hide-scrollbar space-y-2 ">
      <div className="sticky top-0 z-50">
        <h1 className="text-center">Reviews of selected book</h1>
        <div className=" flex items-center justify-between py-2 ">
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

      {reviews.map(({ comment, rating, userId, id }) => {
        return (
          <div key={id}>
            <div className="flex space-x-2 items-center justify-between">
              <UserAvatar userId={userId} />
              <div className="flex gap-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    color="#f1a900"
                    fill={i + 1 <= rating ? "#f1a900" : undefined}
                    size={10}
                    key={i}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs pl-10">{comment}</p>
          </div>
        );
      })}
    </div>
  );
};
export default AdminReviews;
