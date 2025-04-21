import AdminHome from "@/components/admin/AdminHome";
import type { Metadata } from "next";
import AuthPersist from "@/components/AuthPersist";
export const metadata: Metadata = {
 title: "Readora Admin Dashboard",
  description: "Readora e-library system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthPersist><AdminHome>{children}</AdminHome></AuthPersist>;
}
