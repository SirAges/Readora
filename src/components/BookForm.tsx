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

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import FilePicker from "./FilePicker";
import { addBookSchema, AddBookSchemaType } from "@/lib/schema";
import { Textarea } from "./ui/textarea";

const Placeholder = {
  title: "The Wizard of Oz",
  isbn: "978-3-16-148410-0",
  author: "L. Frank Baum",
  publisher: "Scholastic Inc.",
  series: "Oz Series",
  edition: "1st Edition",
  bookFormat: "Hardcover",
  pages: "320",
  language: "English",
  genre: "Fantasy",
  year: "1900",
  copies: "10",
  description:
    "A children's novel about Dorothy's adventure in the Land of Oz.",
  coverUrl: "Upload book cover image",
  ebookUrl: "Upload ebook file (PDF, EPUB)",
  summary: "Dorothy is swept away by a tornado to a magical land.",
  videoUrl: "https://www.youtube.com/watch?v=video_id",
  callNumber: "823.912 BAU",
};

const InputType = {
  title: "text",
  isbn: "text",
  author: "text",
  publisher: "text",
  series: "text",
  edition: "text",
  bookFormat: "text",
  pages: "number",
  language: "text",
  genre: "text",
  year: "number",
  copies: "number",
  description: "text",
  coverUrl: "file",
  ebookUrl: "file",
  summary: "text",
  videoUrl: "file",
  callNumber: "text",
};

const LabelText = {
  title: "Book Title",
  isbn: "ISBN",
  author: "Author",
  publisher: "Publisher",
  series: "Series",
  edition: "Edition",
  bookFormat: "Format",
  pages: "Number of Pages",
  language: "Language",
  genre: "Genre",
  year: "Year Published",
  copies: "Total Copies",
  description: "Book Description",
  coverUrl: "Cover Image",
  ebookUrl: "Ebook File",
  summary: "Book Summary",
  videoUrl: "Video File",
  callNumber: "Call Number",
};

const BookForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: {
  name: string;
  isLoading: boolean;
  onSubmit: (value: AddBookSchemaType) => Promise<void>;
  defaultValues: object | FieldValue<FieldValues> | undefined;
}) => {
  const method = useForm({
    resolver: zodResolver(addBookSchema),
    defaultValues,
  });
  const { handleSubmit, control } = method;
  return (
    <div className="flex flex-col items-center  w-full max-sm:px-10 sm:px-40 md:px-10 lg:px-40 py-10">
      <Form {...method}>
        <form
          className="flex flex-col items-center justify-center gap-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-2 w-full gap-x-4">
            <div className="flex flex-col gap-y-4 w-full h-full  items-center justify-center">
              <FormField
                control={control}
                name={"title"}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{LabelText["title"]}</FormLabel>
                    <FormControl>
                      <Input
                        type={InputType["title"]}
                        className="py-2 placeholder:text-foreground/50"
                        placeholder={Placeholder["title"]}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={"author"}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{LabelText["author"]}</FormLabel>
                    <FormControl>
                      <Input
                        type={InputType["author"]}
                        className="py-2 placeholder:text-foreground/50"
                        placeholder={Placeholder["author"]}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={"publisher"}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{LabelText["publisher"]}</FormLabel>
                    <FormControl>
                      <Input
                        type={InputType["publisher"]}
                        className="py-2 placeholder:text-foreground/50"
                        placeholder={Placeholder["publisher"]}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={"description"}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{LabelText["description"]}</FormLabel>
                    <FormControl>
                      <Textarea
                        className="py-2 placeholder:text-foreground/50"
                        placeholder={Placeholder["description"]}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={"summary"}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{LabelText["summary"]}</FormLabel>
                    <FormControl>
                      <Input
                        type={InputType["summary"]}
                        className="py-2 placeholder:text-foreground/50"
                        placeholder={Placeholder["summary"]}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <FormField
                  control={control}
                  name={"bookFormat"}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{LabelText["bookFormat"]}</FormLabel>
                      <FormControl>
                        <Input
                          type={InputType["bookFormat"]}
                          className="py-2 placeholder:text-foreground/50"
                          placeholder={Placeholder["bookFormat"]}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={"series"}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{LabelText["series"]}</FormLabel>
                      <FormControl>
                        <Input
                          type={InputType["series"]}
                          className="py-2 placeholder:text-foreground/50"
                          placeholder={Placeholder["series"]}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={"edition"}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{LabelText["edition"]}</FormLabel>
                      <FormControl>
                        <Input
                          type={InputType["edition"]}
                          className="py-2 placeholder:text-foreground/50"
                          placeholder={Placeholder["edition"]}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-x-2">
                <FormField
                  control={control}
                  name={"genre"}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{LabelText["genre"]}</FormLabel>
                      <FormControl>
                        <Input
                          type={InputType["genre"]}
                          className="py-2 placeholder:text-foreground/50"
                          placeholder={Placeholder["genre"]}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={"language"}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{LabelText["language"]}</FormLabel>
                      <FormControl>
                        <Input
                          type={InputType["language"]}
                          className="py-2 placeholder:text-foreground/50"
                          placeholder={Placeholder["language"]}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={"isbn"}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{LabelText["isbn"]}</FormLabel>
                      <FormControl>
                        <Input
                          type={InputType["isbn"]}
                          className="py-2 placeholder:text-foreground/50"
                          placeholder={Placeholder["isbn"]}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-x-2">
                <FormField
                  control={control}
                  name={"year"}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{LabelText["year"]}</FormLabel>
                      <FormControl>
                        <Input
                          type={InputType["year"]}
                          className="py-2 placeholder:text-foreground/50"
                          placeholder={Placeholder["year"]}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={"pages"}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{LabelText["pages"]}</FormLabel>
                      <FormControl>
                        <Input
                          type={InputType["pages"]}
                          className="py-2 placeholder:text-foreground/50"
                          placeholder={Placeholder["pages"]}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={"copies"}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{LabelText["copies"]}</FormLabel>
                      <FormControl>
                        <Input
                          type={InputType["copies"]}
                          className="py-2 placeholder:text-foreground/50"
                          placeholder={Placeholder["copies"]}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={"callNumber"}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{LabelText["callNumber"]}</FormLabel>
                      <FormControl>
                        <Input
                          type={InputType["callNumber"]}
                          className="py-2 placeholder:text-foreground/50"
                          placeholder={Placeholder["callNumber"]}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-4 w-full h-full  items-center justify-center">
              <FilePicker
                identifier={"coverUrl"}
                label={LabelText["coverUrl"]}
                type={InputType["coverUrl"]}
                placeholder={Placeholder["coverUrl"]}
                control={control}
                accept="image/png, image/jpeg"
                acceptedSize={5}
              />
              <FilePicker
                className="h-56"
                identifier={"ebookUrl"}
                label={LabelText["ebookUrl"]}
                type={InputType["ebookUrl"]}
                placeholder={Placeholder["ebookUrl"]}
                control={control}
                accept="application/pdf"
                acceptedSize={10}
              />
              <FilePicker
                identifier={"videoUrl"}
                label={LabelText["videoUrl"]}
                type={InputType["videoUrl"]}
                placeholder={Placeholder["videoUrl"]}
                control={control}
                accept="video/mp4"
                acceptedSize={10}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="cursor-pointer w-fit min-w-44 font-semibold text-white capitalize "
          >
            {isLoading ? (
              <p className="flex items-center justify-center">
                <Loader2 className="animate-spin " />
              </p>
            ) : (
              "add book"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default BookForm;
