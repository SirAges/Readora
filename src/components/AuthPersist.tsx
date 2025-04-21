"use client";

import { useEffect, useState, ReactNode } from "react";
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
  const { persist, hasHydrated } = usePersistStore();
  const [calledRefresh, setCalledRefresh] = useState(false);

  useEffect(() => {
    if (!hasHydrated) return;

    const verifyRefreshToken = async () => {
      try {
        await refreshToken("").unwrap();
      } catch (err) {
        console.log("Refresh token error:", err);
      } finally {
        setCalledRefresh(true);
      }
    };

    if (persist && !token) {
      verifyRefreshToken();
    } else {
      setCalledRefresh(true); // Either token is present or persist is off
    }
  }, [persist, token, hasHydrated, refreshToken]);

  if (!token && calledRefresh) {
    redirect("/auth/sign-in");
  }

  return (
    <>
      <ScreenLoader open={isLoading || !calledRefresh || !hasHydrated} />
      {calledRefresh && hasHydrated && children}
    </>
  );
};

export default AuthPersist;
