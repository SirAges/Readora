"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  signInSchema,
  SignInSchemaType,
  signUpSchema,
  SignUpSchemaType,
} from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import FilePicker from "./FilePicker";
import { Label } from "./ui/label";
import { usePersistStore } from "@/zustand/zStore";

const Placeholder = {
  email: "example@mail.com",
  password: "********",
  lastName: "Ekele",
  firstName: "Stephen",
  idCardUrl: "Upload your school ID card",
};

const InputType = {
  email: "email",
  password: "password",
  lastName: "text",
  firstName: "text",
  idCardUrl: "file",
};

const LabelText = {
  email: "Email",
  password: "Password",
  lastName: "Last Name",
  firstName: "First Name",
  idCardUrl: "ID Card",
};

const AuthForm = ({
  name,
  onSubmit,
  defaultValues,
  isLoading,
}: {
  name: string;
  isLoading: boolean;
  onSubmit: (value: SignInSchemaType | SignUpSchemaType) => Promise<void>;
  defaultValues: object | FieldValue<FieldValues> | undefined;
}) => {
  const isSignIn = name === "sign_in";
  const { persist, setPersist } = usePersistStore();
  const method = useForm({
    resolver: zodResolver(isSignIn ? signInSchema : signUpSchema),
    defaultValues,
  });
  const { handleSubmit, control } = method;

  return (
    <Form {...method}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-1/2 lg:w-2/5  px-4 flex flex-col gap-y-4 h-full  items-center justify-center"
      >
        {Object.keys(defaultValues).map(
          (key) =>
            //@ts-expect-error indexing
            InputType[key] !== "file" && (
              <FormField
                key={key}
                control={control}
                name={key}
                render={({ field }) => (
                  <FormItem className="w-full">
                    {/* @ts-expect-error type */}
                    <FormLabel>{LabelText[key]}</FormLabel>
                    <FormControl>
                      <Input
                        //@ts-expect-error type
                        type={InputType[key]}
                        className="py-3"
                        //@ts-expect-error type
                        placeholder={Placeholder[key]}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
            )
        )}

        {defaultValues?.idCardUrl && (
          <FilePicker
            key={"idCardUrl"}
            identifier={"idCardUrl"}
            label={LabelText["idCardUrl"]}
            type={InputType["idCardUrl"]}
            placeholder={Placeholder["idCardUrl"]}
            control={control}
          />
        )}
        {isSignIn && (
          <div className="w-full flex flex-1 gap-x-2">
            <Input
              type="checkbox"
              checked={persist}
              className="checked:text-primary w-5 h-5"
              onChange={setPersist}
            />
            <Label>I trust this device</Label>
          </div>
        )}
        {isSignIn ? (
          <div className="flex items-center gap-x-2">
            <p>Don&apos;t have an account</p>
            <Link
              href="sign-up"
              className="text-primary"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-x-2">
            <p>Already have an account</p>
            <Link
              href="sign-in"
              className="text-primary"
            >
              Sign In
            </Link>
          </div>
        )}
        <Button
          type="submit"
          className="cursor-pointer w-full font-semibold text-white capitalize"
        >
          {isLoading ? (
            <p className="flex items-center justify-center">
              <Loader2 className="animate-spin " />
            </p>
          ) : (
            name.replace("_", " ")
          )}
        </Button>
      </form>
    </Form>
  );
};
export default AuthForm;
