"use client";

import { useEffect, useState, ReactNode } from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useRefreshTokenMutation } from "@/redux/features/auth/authApiSlice";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { usePersistStore } from "@/zustand/zStore";
import { redirect } from "next/navigation";
import ScreenLoader from "./ScreenLoader";

interface AuthPersistProps {
  children: ReactNode;
}

const AuthPersist = ({ children }: AuthPersistProps) => {
  const token = useAppSelector(selectCurrentToken);
  const [refreshToken, { isLoading }] = useRefreshTokenMutation();
  const { persist } = usePersistStore();

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (!persist) {
        redirect("/auth/sign-in");
      }
      if (token) {
        redirect("/");
      }
      if (!token && persist) {
        try {
          await refreshToken("").unwrap();
          setAuthChecked(true);
        } catch (error) {
          console.error("Token refresh failed:", error);
          redirect("/auth/sign-in");
        }
      }
    };

    verifyToken();
  }, [token, persist, refreshToken]);

  return (
    <>
      <ScreenLoader open={!authChecked && isLoading} />
      {children}
    </>
  );
};

export default AuthPersist;
