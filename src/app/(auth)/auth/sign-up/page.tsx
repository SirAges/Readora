"use client";
import AuthForm from "@/components/AuthForm";
import ScreenLoader from "@/components/ScreenLoader";
import { SignUpSchemaType } from "@/lib/schema";
import { useSignUpMutation } from "@/redux/features/auth/authApiSlice";
import { toast } from "sonner";

export default function Home() {
  const [signUp, { isLoading }] = useSignUpMutation();
  const onSubmit = async (values: SignUpSchemaType) => {
    try {
      const formData = new FormData();
      const entries = Object.entries(values);
      for (const [key, value] of entries) {
        formData.append(key, value);
      }
      const { success, message } = await signUp(formData).unwrap();
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
    <main className="hide-scrollbar flex flex-col min-h-screen  overflow-y-scroll items-center justify-center py-10">
      <ScreenLoader
        open={isLoading}
        message={"Signing you up"}
      />
      <h1 className="font-semibold text-2xl py-4">Sign Up</h1>
      <AuthForm
        //  @ts-expect-error type
        onSubmit={onSubmit}
        isLoading={isLoading}
        defaultValues={{
          email: "ekele19stephen96u@gmail.com",
          password: "password",
          firstName: "John",
          lastName: "Smith",
          idCardUrl: "file",
        }}
        name="sign_up"
      />
    </main>
  );
}
