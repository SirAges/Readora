"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Rough from "@/assets/images/rough.png";
type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverUrl: string;
}

const BookCover3D = ({
  className,
  variant = "regular",

  coverUrl = "https://placehold.co/400x600.png",
}: Props) => {
  return (
    <div
      className={cn(
        "relative h-52 transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <div className="z-20 h-full w-full relative ">
        <Image
          src={Rough}
          alt="Book cover"
          fill
          className=" object-fill opacity-20"
          loading="lazy"
        />
      </div>

      <Image
        src={coverUrl}
        alt="Book cover"
        fill
        className=" object-fill"
        loading="lazy"
      />
    </div>
  );
};
export default BookCover3D;
