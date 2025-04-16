import {
  Book,
  BookOpen,
  Cross,
  DollarSign,
  GraduationCap,
  Home,
  Facebook,
  Instagram,
  MessageCircle,
  Phone,
  X,
  Mail,
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
    id: "childrens",
    name: "Religion",
    link: "/genres?genre=Childrens",
    Icon: Cross,
  },
  {
    id: "fiction",
    name: "accademics",
    link: "/genres?genre=Fiction",
    Icon: GraduationCap,
  },
  {
    id: "fantasy",
    name: "finance",
    link: "/genres?genre=Fantasy",
    Icon: DollarSign,
  },
];

export const socialLinks = [
  {
    id: "call",
    name: "Call",
    link: "www.call.com",
    Icon: Phone,
  },
  {
    id: "email",
    name: "Email",
    link: "www.email.com",
    Icon: Mail,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    link: "www.whatsapp.com",
    Icon: MessageCircle,
  },
  {
    id: "facebook",
    name: "Facebook",
    link: "www.facebook.com",
    Icon: Facebook,
  },
  {
    id: "instagram",
    name: "Instagram",
    link: "www.instagram.com",
    Icon: Instagram,
  },
  {
    id: "x",
    name: "x",
    link: "www.x.com",
    Icon: X,
  },
];
