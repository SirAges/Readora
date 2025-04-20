"use client"; // import ColorBackground from "@/components/ColorBackground";

import { useEffect, useState } from "react";
import BookAuthor from "@/components/BookAuthor";
import { Button } from "@/components/ui/button";
import {
  ArrowDownRight,
  Download,
  Edit,
  Loader2,
  Share2,
  Star,
} from "lucide-react";
import {
  useGetBookQuery,
  useGetBookReviewsQuery,
  useReviewBookMutation,
} from "@/redux/features/book/bookApiSlice";
import { useParams } from "next/navigation";
import BookCard from "@/components/BookCard";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useBorrowBookMutation } from "@/redux/features/borrow/borrowApiSlice";
import ScreenLoader from "@/components/ScreenLoader";
const schema = z.object({
  comment: z.string(),
  rating: z.coerce.number().min(1).max(5),
});
const Page = () => {
  const [book, setBook] = useState<Book | null>(null);
  const params = useParams();
  const bookId = params.bookId;
  const { data: review } = useGetBookReviewsQuery({ bookId });
  const [reviewBook, { isLoading }] = useReviewBookMutation();
  const { data, isFetching } = useGetBookQuery(bookId);
  const [borrowBook, {}] = useBorrowBookMutation();
  const method = useForm({ resolver: zodResolver(schema) });
  const { handleSubmit, control, reset } = method;
  const isFinished = book && book?.availableCopies < 1;

  const onSubmit = async (value: z.infer<typeof schema>) => {
    try {
      const data = await reviewBook({ bookId, value }).unwrap();

      if (data?.success) {
        toast(data.message);
        reset();
      }
    } catch (error) {
      //@ts-expect-error error type
      if (error?.data) {
        //@ts-expect-error error type
        toast(error?.data?.message);
      }
    }
  };
  useEffect(() => {
    if (data?.success) {
      setBook(data.data);
    }
    return () => {};
  }, [data]);
  const handleBoookBorrow = async () => {
    try {
      const data = await borrowBook({
        bookId: parseInt(bookId?.toString() as string),
      }).unwrap();

      if (data?.success) {
        toast(data.message);
      }
    } catch (error) {
      //@ts-expect-error error type
      if (error?.data) {
        //@ts-expect-error error type
        toast(error?.data?.message);
      }
    }
  };

  return (
    <>
      <ScreenLoader
        open={isFetching}
        message={"Fetching book details"}
      />
      {book && (
        <main className="w-full max-h-[calc(90vh)] overflow-y-scroll hide-scrollbar">
          <div className="w-full grid grid-cols-1 md:grid-cols-2  md:h-[24vh] ">
            <div className="flex flex-1 w-full relative items-center justify-center">
              <div className=" w-[80%] flex items-center flex-col relative md:w-36 md:absolute md:-bottom-25 ">
                <BookCard
                  id={book.id}
                  className={cn("w-36 h-56")}
                  key={book.id}
                  coverUrl={book.coverUrl}
                />
              </div>
            </div>
            <div className="py-5">
              <div className="space-y-2 px-10 flex-1">
                <h1 className="text-2xl">{book.title}</h1>
                <BookAuthor
                  genre={book.genre}
                  author={book.author}
                />
                <p className="text-xs  italic truncate max-w-96">
                  {book.summary}
                </p>
              </div>
            </div>
          </div>

          <div className="my-2 mx-2  bg-foreground text-background md:mx-20 flex-1  px-2 py-2 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 ">
              <div className="flex-1"></div>
              <div>
                <div className="flex-1  flex justify-between items-center border-b py-2 px-3">
                  {isFinished ? (
                    <Button className="flex text-xs whitespace-nowrap">
                      Book Unavailable
                      <ArrowDownRight size={20} />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleBoookBorrow}
                      className="flex text-xs whitespace-nowrap text-white"
                    >
                      Borrow Book <ArrowDownRight />
                    </Button>
                  )}
                  <div className="flex flex-1 justify-end items-center gap-x-2 text-background ">
                    {book.ebookUrl && <Download />}
                    <Share2 />
                    <Popover>
                      <PopoverTrigger className="cursor-pointer">
                        <Edit />
                      </PopoverTrigger>
                      <PopoverContent className="px-2 py-2 mx-4 min-w-56 max-w-56">
                        <Form {...method}>
                          <form
                            className="flex flex-1 items-center flex-col gap-y-3"
                            onSubmit={handleSubmit(onSubmit)}
                          >
                            <FormField
                              control={control}
                              name="comment"
                              render={({ field }) => (
                                <FormItem className="w-full gap-y-3">
                                  <FormLabel className="">Comment</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      rows={5}
                                      autoComplete="off"
                                      className="text-xs  py-3 placeholder:text-secondary/60"
                                      placeholder="search books..."
                                      {...field}
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={control}
                              name="rating"
                              render={({ field }) => (
                                <FormItem className="w-full gap-y-3">
                                  <div className="flex items-center w-full gap-x-2">
                                    <div className=" max-w-12">
                                      <FormLabel className="hidden">
                                        Rating
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          autoComplete="off"
                                          type="number"
                                          min={1}
                                          max={5}
                                          step={1}
                                          className="text-xs px-2 py-3 placeholder:text-secondary/60"
                                          placeholder="4"
                                          {...field}
                                        />
                                      </FormControl>
                                    </div>
                                    <Button
                                      type="submit"
                                      className="cursor-pointer w-full font-semibold text-white capitalize"
                                    >
                                      {isLoading ? (
                                        <p className="flex items-center justify-center">
                                          <Loader2 className="animate-spin " />
                                        </p>
                                      ) : (
                                        "Review"
                                      )}
                                    </Button>
                                  </div>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </form>
                        </Form>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-x-2 gap-y-2">
                  <p className="text-xs">{book.copies} copies</p>
                  <p className="text-xs">{book.availableCopies} available</p>
                  <p className="text-xs">{book.pages} pages</p>
                  <p className="text-xs">since {book.year}</p>
                  <p className="text-xs">{book.status}</p>
                  <p className="text-xs">{book.borrowCount} borrowed</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:pt-14 px-10 ">
              <div className="py-2 space-y-2 md:pr-10">
                <h3 className="font-semibold text-md">Description</h3>
                <p className="text-xs text-justify">{book.description}</p>

                <div className="px-5 space-y-2">
                  <h3 className="font-semibold text-md">Publisher</h3>
                  <p className="text-xs">{book.publisher}</p>
                  <p className="text-xs">{book.series}</p>
                  <h3 className="font-semibold text-md">Language</h3>
                  <p className="text-xs">{book.language}</p>
                  <h3 className="font-semibold text-md capitalize">
                    {book.bookFormat}
                  </h3>
                  {book.callNumber && (
                    <p className="text-xs">Call Number:{book.callNumber}</p>
                  )}
                  <p className="text-xs">ISBN: {book.isbn}</p>
                </div>
              </div>

              <div className="flex flex-col gap-y-2 border-t py-5">
                {review?.data?.totalReviews > 0 && (
                  <>
                    <h1>Reviews</h1>
                    <div className="flex items-center gap-x-2">
                      <div className="flex gap-x-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            color="#f1a900"
                            fill={
                              i + 1 <= review?.data?.averageRating
                                ? "#f1a900"
                                : undefined
                            }
                            size={10}
                            key={i}
                          />
                        ))}
                      </div>

                      <p className="text-primary text-xs">
                        {review?.data?.averageRating}
                      </p>
                      <p className="font-semibold text-xs">/</p>
                      <p className="font-semibold text-xs">
                        {review?.data?.totalReviews} Review
                        {review?.data?.totalReviews ? "s" : ""}
                      </p>
                    </div>

                    <div className="space-y-2 max-h-60">
                      {review.data.reviews.map(
                        (
                          {
                            comment,
                            rating,
                            userId,
                          }: {
                            rating: string;
                            comment: string;
                            userId: number;
                          },
                          i: number
                        ) => (
                          <div key={i}>
                            <div className="flex space-x-2 items-center">
                              <UserAvatar userId={userId} />
                              <p className="text-primary text-xs">{rating}</p>
                            </div>
                            <p className="text-xs pl-10">{comment}</p>
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}
                {book.videoUrl && (
                  <>
                    <h3 className="font-semibold text-md">Book Video</h3>
                    <video
                      className="h-56 w-full bg-gray-900"
                      src={book.videoUrl}
                    ></video>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};
export default Page;
