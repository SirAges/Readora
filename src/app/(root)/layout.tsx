import AuthPersist from "@/components/AuthPersist";
import Home from "@/components/Home";
import ScreenLoader from "@/components/ScreenLoader";
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
    <Suspense fallback={<ScreenLoader open={true} />}>
      <AuthPersist>
        <Home>{children}</Home>
      </AuthPersist>
    </Suspense>
  );
}
