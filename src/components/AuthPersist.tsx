"use client";

import { useEffect, ReactNode, useState } from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useRefreshTokenMutation } from "@/redux/features/auth/authApiSlice";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { usePersistStore } from "@/zustand/zStore";
import ScreenLoader from "./ScreenLoader";
import { redirect } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface AuthPersistProps {
  children: ReactNode;
}

const AuthPersist = ({ children }: AuthPersistProps) => {
  const token = useAppSelector(selectCurrentToken);
  const [refreshToken, { isLoading }] = useRefreshTokenMutation();
  const { persist } = usePersistStore();
  const [tokenRefreshed, setTokenRefreshed] = useState(false);
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refreshToken("").unwrap();
        setTokenRefreshed(true);
      } catch (err) {
        console.log("err", err);
      }
    };

    if (persist && !token) {
      verifyRefreshToken();
    }
  }, [persist, token]);
  if (!token && tokenRefreshed) {
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
