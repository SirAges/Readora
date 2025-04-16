"use client";
import { useEffect, useState } from "react";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { verifyAuth } from "@/lib/auth";
import { useAppSelector } from "./reduxHooks";

export const useAuth = () => {
  const token = useAppSelector(selectCurrentToken);

  const [authState, setAuthState] = useState<{
    userId: number | undefined;
    role: string;
    email: string;
    isAdmin: boolean;
    isStudent: boolean;
    isLibrarian: boolean;
    isSignedIn: boolean;
    status: string;
  }>({
    userId: undefined,
    role: "",
    email: "",
    isAdmin: false,
    isStudent: false,
    isLibrarian: false,
    isSignedIn: token ? true : false,
    status: "",
  });

  useEffect(() => {
    const fetchAuthDetails = async () => {
      if (!token && authState.isSignedIn) {
        setAuthState({
          userId: undefined,
          role: "",
          email: "",
          isAdmin: false,
          isStudent: false,
          isLibrarian: false,
          isSignedIn: false,
          status: "",
        });
      }
      if (token) {
        try {
          const payload = await verifyAuth(token);
          if (payload) {
            const { userId, role, email } = payload;
            setAuthState({
              userId: userId as number,
              role: role as string,
              email: email as string,
              isAdmin: role === "ADMIN",
              isStudent: role === "STUDENT",
              isLibrarian: role === "LIBRARIAN",
              isSignedIn: true,
              status:
                role === "admin" ? "Admin" : role === "user" ? "User" : "",
            });
          }
        } catch (error) {
          console.error("Error during authentication:", error);
        }
      }
    };

    fetchAuthDetails();
  }, [authState.isSignedIn, token]);

  return authState;
};
