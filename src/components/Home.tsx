"use client";
// import BottomNav from "@/components/BottomNav";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";

const Home = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { userId } = useAuth();

  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header userId={userId!} />

        <div className="w-full flex flex-col items-center ">{children}</div>
      </div>
    </div>
  );
};
export default Home;
