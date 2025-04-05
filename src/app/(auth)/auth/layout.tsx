import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Sign in or create a new account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isSignedIn = true;
  if (isSignedIn) {
    redirect("/");
  }
  return <main className="">{children}</main>;
}
