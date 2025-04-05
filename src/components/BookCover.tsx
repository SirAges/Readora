"use client";

import React from "react";
import Image from "next/image";
import Rough from "@/assets/images/rough.png";

interface Props {
  className?: string;
  coverColor: string;
  coverUrl: string;
}

const BookCover = ({
  coverColor,
  coverUrl = "https://placehold.co/400x600.png",
}: Props) => {
  return (
    <div
      style={{ backgroundColor: coverColor }}
      className="flex h-full w-full p-3  rounded-t-md"
    >
      <div className="h-full w-full relative shadow-lg">
        <Image
          src={Rough}
          alt="Book cover"
          fill
          className="absolute z-20 object-fill opacity-20"
          loading="lazy"
        />

        <Image
          src={coverUrl}
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
