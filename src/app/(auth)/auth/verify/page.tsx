"use client";
import { verifyAuth } from "@/lib/auth";
import { useVerifyEmailMutation } from "@/redux/features/auth/authApiSlice";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const Page = () => {
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  useEffect(() => {
    const verify = async () => {
      try {
        if (token) {
          const payload = await verifyAuth(token);
          if (payload) {
            const { email, otp } = payload;
            const { success } = await verifyEmail({
              otp,
              email,
            }).unwrap();
            if (success) {
              redirect("/auth/sign-in");
            }
          }
        }
      } catch (error) {
        //@ts-expect-error error type
        if (error?.data) {
          //@ts-expect-error error type
          toast(error?.data?.message);
        }
      }
    };
    verify();
    return () => {};
  }, [token, verifyEmail]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <p className="font-semibold capitalize text-primary text-2xl">
          Verifying Your Email please wait...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <p
        onClick={() => router.refresh()}
        className="font-semibold capitalize text-primary text-2xl cursor-pointer"
      >
        retry
      </p>
    </div>
  );
};
export default Page;
