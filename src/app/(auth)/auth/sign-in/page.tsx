"use client";
import AuthForm from "@/components/AuthForm";
import ScreenLoader from "@/components/ScreenLoader";
import { SignUpSchemaType } from "@/lib/schema";
import { useSignInMutation } from "@/redux/features/auth/authApiSlice";
import { toast } from "sonner";

export default function Home() {
  const [signIn, { isLoading }] = useSignInMutation();

  const onSubmit = async (values: SignUpSchemaType) => {
    try {
      const { success, message } = await signIn(values).unwrap();
      if (success) {
        toast(message);
      }
    } catch (error) {
      //@ts-expect-error error type
      if (error?.data) {
        //@ts-expect-error error type
        toast(error?.data?.message);
      }
    }
  };
  return (
    <main className="flex flex-col max-h-screen min-h-screen items-center justify-center">
      <ScreenLoader
        open={isLoading}
        message={"Signing you in"}
      />
      <h1 className="font-semibold text-2xl py-4">Sign In</h1>
      <AuthForm
        //  @ts-expect-error type
        onSubmit={onSubmit}
        isLoading={isLoading}
        defaultValues={{
          email: "ekele19stephen96u@gmail.com",
          password: "password",
        }}
        name="sign_in"
      />
    </main>
  );
}
