import AdminHome from "@/components/admin/AdminHome";
import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Readora Admin Dashboard",
  description: "Readora e-library system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminHome>{children}</AdminHome>;
}
