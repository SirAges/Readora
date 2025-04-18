"use client";
import BookForm from "@/components/BookForm";
import { SignUpSchemaType } from "@/lib/schema";
import { useCreateBookMutation } from "@/redux/features/book/bookApiSlice";
import { toast } from "sonner";

export default function Home() {
  const [createBook, { isLoading }] = useCreateBookMutation();

  const onSubmit = async (values: SignUpSchemaType) => {
    try {
      const formData = new FormData();
      const entries = Object.entries(values);
      for (const [key, value] of entries) {
        formData.append(key, value);
      }
      const { success, message } = await createBook(formData).unwrap();
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
    <main className="flex flex-col items-center justify-center">
      <h1 className="font-semibold text-2xl py-4">Add a Book</h1>
      <BookForm
        //  @ts-expect-error type
        onSubmit={onSubmit}
        isLoading={isLoading}
        defaultValues={{
          title: "The Wizard of Oz",
          isbn: "978-3-16-148410-0",
          author: "L. Frank Baum",
          publisher: "Scholastic Inc.",
          series: "Oz Series",
          edition: "1st Edition",
          bookFormat: "Hardcover",
          pages: 320,
          language: "English",
          genre: "Fantasy",
          year: 1900,
          copies: 10,
          description:
            "The Wizard of Oz is a timeless children's fantasy novel by L. Frank Baum that follows the magical journey of Dorothy Gale, a young girl from Kansas who is swept away by a tornado to the vibrant land of Oz. Alongside her beloved dog Toto, she encounters unforgettable characters like the Scarecrow, the Tin Woodman, and the Cowardly Lion as they travel the Yellow Brick Road in search of the powerful Wizard of Oz. Each character is on a quest for something they lack—brains, heart, courage, or a way home—and their adventure teaches valuable lessons about friendship, self-discovery, and the idea that what we seek is often already within us. With rich symbolism, whimsical settings, and enduring themes, this beloved classic continues to enchant readers of all ages.",
          summary:
            "Dorothy is swept to Oz by a tornado and journeys with new friends to find the Wizard, discovering courage, love, and home along the way.",
          callNumber: "823.912 BAU",
        }}
      />
    </main>
  );
}
