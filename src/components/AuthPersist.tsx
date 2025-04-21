"use client";

import { useEffect, ReactNode, useState } from "react";
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
  const [refreshToken, { isLoading, isSuccess, isError }] = useRefreshTokenMutation();
  const { persist } = usePersistStore();
  const [calledRefresh, setCalledRefresh] = useState(false);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refreshToken("").unwrap();
      } catch (err) {
        console.log("Refresh token failed:", err);
      } finally {
        setCalledRefresh(true);
      }
    };

    if (persist && !token) {
      verifyRefreshToken();
    } else {
      setCalledRefresh(true); // Token already exists or no persist
    }
  }, [persist, token, refreshToken]);

  if (!token && calledRefresh && !isLoading) {
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
