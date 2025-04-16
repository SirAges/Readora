"use client";

import Image from "next/image";
import DemoImage from "@/assets/images/red_cover.png";

interface Props {
  className?: string;
  coverUrl: File;
}

const BookCover = ({ coverUrl }: Props) => {
  return (
    <div className="flex h-full w-full p-3  rounded-t-md relative">
      <div className="absolute inset-0 opacity-20 rounded-t-md">
        <Image
          src={coverUrl?.secure_url || DemoImage}
          alt="Book cover"
          fill
          className="object-fill rounded-t-md"
          loading="lazy"
        />
      </div>
      <div className="h-full w-full relative shadow-lg">
        <Image
          src={coverUrl?.secure_url || DemoImage}
          alt="Book cover"
          fill
          className="object-fill"
          loading="lazy"
        />
      </div>
    </div>
  );
};
export default BookCover;
