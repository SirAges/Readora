import Home from "@/components/Home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Readora",
  description: "Readora e-library system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return <Home>{children}</Home>;
}
