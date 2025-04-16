import FallBack from "@/components/FallBack";
import Home from "@/components/Home";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Readora",
  description: "Readora e-library system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<FallBack />}>
      <Home>{children}</Home>
    </Suspense>
  );
}
