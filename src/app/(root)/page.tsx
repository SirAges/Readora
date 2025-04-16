import RightSidebar from "@/components/RightSidebar";
import HomePage from "@/components/HomePage";
export default function Home() {
  return (
    <main className="flex">
      <HomePage />
      <RightSidebar />
    </main>
  );
}
