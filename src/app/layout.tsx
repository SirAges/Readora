import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/hooks/theme-provide";
import StoreProvider from "@/components/StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";
import AuthPersist from "@/components/AuthPersist";

const ibmPlexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});
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
    <html lang="en">
      <body
        className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased
 text-foreground bg-background `}
      >
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <AuthPersist>
              <main className=" min-h-screen">{children}</main>
            </AuthPersist>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
