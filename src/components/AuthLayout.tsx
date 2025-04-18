"use client";

import { Suspense } from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // const { isSignedIn } = useAuth();
  // if (isSignedIn) {
  //   redirect("/");
  // }
  return <Suspense>{children}</Suspense>;
};
export default AuthLayout;
