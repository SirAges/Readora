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
  const [refreshTried, setRefreshTried] = useState(false);

  useEffect(() => {
    if (!hasHydrated) return;

    const verifyRefreshToken = async () => {
      try {
        await refreshToken("").unwrap();
      } catch (err) {
        console.log("Failed to refresh:", err);
      } finally {
        setRefreshTried(true);
      }
    };

    if (persist && !token) {
      verifyRefreshToken();
    } else {
      setRefreshTried(true);
    }
  }, [persist, token, hasHydrated]);

  // Prevent redirect until store is hydrated and refresh was attempted
  if (hasHydrated && refreshTried && !token) {
    redirect("/auth/sign-in");
  }

  return (
    <>
      <ScreenLoader open={isLoading || !hasHydrated || !refreshTried} />
      {hasHydrated && refreshTried && children}
    </>
  );
};

export default AuthPersist;
