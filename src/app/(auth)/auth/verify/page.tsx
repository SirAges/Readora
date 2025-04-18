"use client";
import ScreenLoader from "@/components/ScreenLoader";
import { verifyAuth } from "@/lib/auth";
import { useVerifyEmailMutation } from "@/redux/features/auth/authApiSlice";
import { redirect, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

const Page = () => {
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const verify = useCallback(async () => {
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
      } else {
        toast("You do not have sufficient credentials to be verified");
      }
    } catch (error) {
      //@ts-expect-error error type
      if (error?.data) {
        //@ts-expect-error error type
        toast(error?.data?.message);
      }
    }
  }, [token, verifyEmail]);
  useEffect(() => {
    verify();
    return () => {};
  }, [token, verify]);

  return (
    <>
      {<ScreenLoader open={isLoading} />}
      <div className="flex flex-col items-center justify-center w-full h-screen space-y-5">
        <h1 className="text-5xl font-black tracking-widest uppercase">
          Readora
        </h1>
        <h3 className="font-semibold capitalize">Email Verification</h3>
        <p
          onClick={verify}
          className="font-semibold capitalize text-primary text-2xl cursor-pointer"
        >
          retry
        </p>
      </div>
    </>
  );
};
export default Page;
