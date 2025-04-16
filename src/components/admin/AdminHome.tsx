"use client";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

const AdminHome = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) redirect("/auth/sign-in");
  return <div className="w-full flex flex-col min-h-screen ">{children}</div>;
};
export default AdminHome;
