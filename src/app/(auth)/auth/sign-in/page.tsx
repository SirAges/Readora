"use client";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const schema = z.object({
  email: z.string().email(),
});
export default function Home() {
  const method = useForm({ resolver: zodResolver(schema) });
  const { handleSubmit, control } = method;

  const onSubmit = (data: z.infer<typeof schema>) => {
    alert(JSON.stringify(data));
  };

  return (
    <main className="flex flex-col min-h-screen items-center p-20">
      <Form {...method}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@mail.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>enter your email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="cursor-pointer"
          >
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
