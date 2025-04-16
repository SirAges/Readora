interface Book {
  id: number;
  title: string;
  isbn: string;
  author: string;
  publisher: string;
  series: string;
  edition: string;
  bookFormat: string;
  pages: number;
  language: string;
  genre: string;
  status: string;
  year: number;
  copies: number;
  availableCopies: number;
  borrowCount: number;
  description: string;
  coverUrl: File;
  ebookUrl: string;
  summary: string;
  videoUrl: string;
  callNumber: string;
  avgRating?: number;
  createdAt: string;
  updatedAt: string;
}

interface File {
  size: number;
  format: string;
  public_id: string;
  secure_url: string;
}
interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}
interface BookReview {
  userId: number;
  bookId: number;
  comment: string;
  rating: number;
  id: number;
}

interface BorrowBook {
  id: number;
  userId?: number;
  bookId: number;
  librarianId: number;
  borrowDate: Date;
  returnDate: Date;
  status: number;
  book: {
    coverUrl: File;
    title: string;
  };
  user: {
    firstName: string;
    lastName: string;
  };
}

interface ErrorResponse {
  message: string;
  error: boolean;
}

interface User {
  id: number;
  email: string;
  lastName: string;
  firstName: string;
  lastLogin: Date;
  isVerified: boolean;
  role: Roles;
  status: StudentStatus;
  idCardUrl: File;
}

enum Roles {
  "STUDENT",
  "ADMIN",
  "LIBRARIAN",
}

enum StudentStatus {
  "ACTIVE",
  "INACTIVE",
  "SUSPENDED",
}

enum BorrowStatus {
  "APPROVED",
  "PENDING",
  "REJECTED",
  "CANCELLED",
  "RETURNED",
  "COLLECTED",
}

enum BookStatus {
  "AVAILABLE",
  "CHECKED_OUT",
  "RESERVED",
  "LOST",
}
