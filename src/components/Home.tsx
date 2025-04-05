"use client";
// import BottomNav from "@/components/BottomNav";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

import { redirect } from "next/navigation";
import { useRef } from "react";
const Home = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const scrollableDivRef = useRef(null);
  const isSignedIn = true;
  if (!isSignedIn) {
    redirect("/auth/sign-in");
  }
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />

        <div
          ref={scrollableDivRef}
          className="w-full flex flex-col items-center "
        >
          {children}
        </div>
      </div>
    </div>
  );
};
export default Home;
