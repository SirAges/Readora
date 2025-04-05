"use client";

import Link from "next/link";

const UserAvatar = () => {
  return (
    <Link
      href={"/borrows"}
      className="flex items-center gap-x-2 cursor-pointer "
    >
      <div className="flex h-8 w-8 bg-foreground border  rounded-full items-center justify-center">
        <p className="uppercase text-card font-semibold text-xs">Jm</p>
      </div>

      <p className="font-semibold capitalize text-xs">John Mark</p>
    </Link>
  );
};
export default UserAvatar;
