import AuthLayout from "@/components/AuthLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Readora Authentication",
  description: "Sign in or create a new account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return <AuthLayout>{children}</AuthLayout>;
}
