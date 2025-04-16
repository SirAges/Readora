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
  const method = useForm({
    resolver: zodResolver(isSignIn ? signInSchema : signUpSchema),
    defaultValues,
  });
  const { handleSubmit, control } = method;
  return (
    <div className=" flex w-full flex-col h-full items-center  max-sm:px-10 sm:px-40 md:px-10 lg:px-40">
      <Form {...method}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4 w-full h-full  items-center justify-center"
        >
          <div className="flex w-full justify-center items-center h-full gap-x-10">
            <div className="flex-1 max-w-md ">
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
                              className="py-2"
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
            </div>

            {defaultValues?.idCardUrl && (
              <div className="flex-1 flex flex-col items-center">
                <FilePicker
                  key={"idCardUrl"}
                  identifier={"idCardUrl"}
                  label={LabelText["idCardUrl"]}
                  type={InputType["idCardUrl"]}
                  placeholder={Placeholder["idCardUrl"]}
                  control={control}
                />
              </div>
            )}
          </div>

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
            className="max-w-md  cursor-pointer w-full font-semibold text-white capitalize"
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
    </div>
  );
};
export default AuthForm;
