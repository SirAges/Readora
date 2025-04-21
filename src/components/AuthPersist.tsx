"use client";

import { useEffect, ReactNode } from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useRefreshTokenMutation } from "@/redux/features/auth/authApiSlice";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { usePersistStore } from "@/zustand/zStore";
import ScreenLoader from "./ScreenLoader";
import { redirect } from "next/navigation";

interface AuthPersistProps {
  children: ReactNode;
}

const AuthPersist = ({ children }: AuthPersistProps) => {
  const token = useAppSelector(selectCurrentToken);
  const [refreshToken, { isLoading }] = useRefreshTokenMutation();
  const { persist } = usePersistStore();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refreshToken("").unwrap();
      } catch (err) {
        console.log("err", err);
      }
    };

    if (persist && !token) {
      verifyRefreshToken();
    }
  }, [persist, token]);
  if (!token && !isLoading) {
    redirect("/auth/sign-in");
  }

  return (
    <>
      <ScreenLoader open={isLoading} />
      {children}
    </>
  );
};

export default AuthPersist;
