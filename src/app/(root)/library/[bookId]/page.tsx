"use client"; // import ColorBackground from "@/components/ColorBackground";

import { useEffect, useState } from "react";
import books from "@/lib/dummybooks.json";
import Image from "next/image";
import BookAuthor from "@/components/BookAuthor";
import ImageCover from "@/assets/images/red_cover.png";
import { Button } from "@/components/ui/button";
import { ArrowDownRight, BookmarkPlus, Download, Share2 } from "lucide-react";

const Page = ({ params }: { params: { bookId: string } }) => {
  const [book, setBook] = useState<Book | undefined | null>(null);
  const { bookId } = params;
  useEffect(() => {
    const fetchedBook = books.find(({ id }) => id === bookId);
    if (fetchedBook?.id) {
      //@ts-expect-error type error
      setBook(fetchedBook);
    }
    return () => {};
  }, [bookId]);
  const isBorrowed = false;
  return (
    book && (
      <>
        <main className="w-full h-full">
          <div className="w-full grid grid-cols-1 md:grid-cols-2  md:h-[24vh] ">
            <div className="flex flex-1 w-full relative items-center justify-center">
              <div className="h-96 w-[80%] md:h-52 relative md:w-36 md:absolute md:-bottom-25 ">
                <Image
                  src={ImageCover}
                  alt="Book cover"
                  fill
                  className="absolute z-20 object-fill"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="py-5">
              <div className="space-y-2 px-10 flex-1">
                <h1 className="text-2xl">{book.title}</h1>
                <BookAuthor />
                <p className="text-xs  italic truncate max-w-96">
                  {book.summary}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-foreground text-background md:mx-20 flex-1  px-2 py-2 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 ">
              <div className="flex-1"></div>
              <div className="flex-1 flex justify-between items-center border-b py-2 px-5">
                {isBorrowed ? (
                  <Button>
                    Start Reading <ArrowDownRight />
                  </Button>
                ) : (
                  <Button>
                    Borrow Book <ArrowDownRight />
                  </Button>
                )}
                <div className="flex items-center space-x-2 text-background">
                  <Download />
                  <Share2 />
                  <BookmarkPlus />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:pt-14 px-10 ">
              <div className="py-2 space-y-2 md:pr-10">
                <h3 className="font-semibold text-md">Description</h3>
                <p className="text-xs text-justify">{book.description}</p>
                <p className="font-semibold text-md">
                  <span className="text-primary px-1 ">3.8</span>/ 455 Reviews
                </p>
                <div className="space-y-2 ">
                  {Array.from({ length: 3 }, (_, i) => (
                    <div key={i}>
                      <div className="flex space-x-2 items-center">
                        <h1 className="font-semibold text-xs">Roberto mark</h1>
                        <p className="text-primary text-xs">4.5</p>
                      </div>
                      <p className="text-xs">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-5 space-y-2">
                <h3 className="font-semibold text-md">Editors</h3>
                <p className="text-xs">
                  JK Rowling (Author), Christopher Roset , Alena Castabon, Steve
                  Kong
                </p>
                <h3 className="font-semibold text-md">Language</h3>
                <p className="text-xs">Standard English (USA)</p>
                <h3 className="font-semibold text-md">Paperback</h3>
                <p className="text-xs">Paper Textured Full Color, 365 Pages</p>
                <p className="text-xs">ISBN: 443 3 53556 598 13</p>
              </div>
            </div>
          </div>
        </main>
        {/* <ColorBackground orientation="bottom" /> */}
      </>
    )
  );
};
export default Page;
