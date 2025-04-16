import * as z from "zod";
export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  lastName: z.string().min(1, "Last name is required"),
  firstName: z.string().min(1, "First name is required"),
  idCardUrl: z.instanceof(File, { message: "ID Card file is required" }),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export const addBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  isbn: z.string().min(10, "ISBN should be at least 10 characters"),
  author: z.string().min(1, "Author is required"),
  publisher: z.string().min(1, "Publisher is required"),
  series: z.string().min(1, "Series is required").optional(),
  edition: z.string().min(1, "Edition is required").optional(),
  bookFormat: z.string().min(1, "Book format is required"),
  pages: z.coerce.number().min(10).nonnegative(),
  language: z.string().min(1, "Language is required"),
  genre: z.string().min(1, "Genre is required"),
  year: z.coerce.number().int().min(0).max(new Date().getFullYear()),
  copies: z.coerce.number().int().nonnegative(),
  description: z.string().min(300, "Description is required"),
  coverUrl: z.instanceof(File, { message: "Cover image is required" }),
  ebookUrl: z
    .instanceof(File, { message: "Ebook file is required" })
    .optional(),
  summary: z
    .string()
    .min(100, "Summarry is required")
    .max(150, "Character length exceeded"),
  videoUrl: z
    .instanceof(File, { message: "Video file is required" })
    .optional(),
  callNumber: z.string().min(1, "Call Number is required").optional(),
});
export type AddBookSchemaType = z.infer<typeof addBookSchema>;
