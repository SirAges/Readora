"use client";
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
import { Sheet, SheetClose, SheetHeader } from "./ui/sheet";
import {
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search } from "lucide-react";
const schema = z.object({
  search: z.string(),
});
const Searchbar = () => {
  const method = useForm({ resolver: zodResolver(schema) });
  const { handleSubmit, control } = method;

  const onSubmit = (data: z.infer<typeof schema>) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className=" ">
      <Sheet>
        <SheetTrigger className="border-none ring-0 outline-0 flex text-xs gap-x-2 cursor-pointer">
          <Search
            size={14}
            strokeWidth={1.5}
          />
          <p>search book name, author, edition...</p>
        </SheetTrigger>
        <SheetContent
          side="top"
          className="bg-popover flex flex-col items-center justify-center  py-20 px-10 "
        >
          <div className="flex flex-col  md:w-2/5 items-center">
            <SheetHeader>
              <SheetTitle className="font-semibold text-center">
                Search all books here
              </SheetTitle>
              <SheetDescription className="text-center">
                La Book is loaded with all types of books from various authors
                and publishers with upto date editions
              </SheetDescription>
            </SheetHeader>

            <Form {...method}>
              <form
                className="flex flex-1 w-3/4 items-center flex-col gap-y-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <FormField
                  control={control}
                  name="search"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Search</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          className=" text-xs placeholder:text-secondary/60"
                          placeholder="search books..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        enter Book name, Author, Publisher, Year, Edition...
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <SheetClose
                  type="submit"
                  className="flex items-center justify-center w-12 h-12 bg-primary rounded-full cursor-pointer"
                >
                  <Search
                    className="text-background"
                    strokeWidth={2}
                    size={24}
                  />
                </SheetClose>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default Searchbar;
