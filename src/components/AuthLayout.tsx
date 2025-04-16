"use client";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    redirect("/");
  }
  return <main>{children}</main>;
};
export default AuthLayout;
