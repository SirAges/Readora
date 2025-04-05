import {
  Book,
  BookOpen,
  Cross,
  DollarSign,
  GraduationCap,
  Home,
} from "lucide-react";

export const sidebarItem = [
  {
    id: "discover",
    name: "discover",
    link: "/",
    Icon: Home,
  },
  {
    id: "genres",
    name: "genres",
    link: "/genres",
    Icon: Book,
  },
  {
    id: "library",
    name: "library",
    link: "/library",
    Icon: BookOpen,
  },
  {
    id: "belief",
    name: "belief",
    link: "/genres?genre=belief",
    Icon: Cross,
  },
  {
    id: "education",
    name: "education",
    link: "/genres?genre=education",
    Icon: GraduationCap,
  },
  {
    id: "finance",
    name: "finance",
    link: "/genres?genre=finance",
    Icon: DollarSign,
  },
];
