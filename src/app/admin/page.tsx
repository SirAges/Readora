// import books from "@/lib/dummybooks.json";

import AdminBooks from "@/components/admin/AdminBooks";
import AdminBorrows from "@/components/admin/AdminBorrows";
import AdminReviews from "@/components/admin/AdminReviews";
import AdminUsers from "@/components/admin/AdminUsers";
import SectionCard from "@/components/SectionCard";

export default function Home() {
  return (
    <main className="flex flex-col h-full">
      <div className="flex p-2 gap-x-2">
        <SectionCard className="w-1/2 min-h-96 max-h-96 grid grid-cols-2">
          <AdminBooks />
          <AdminReviews />
        </SectionCard>
        <SectionCard className="w-1/2 min-h-96 grid grid-cols-2">
          <AdminUsers />
          <AdminBorrows />
        </SectionCard>
      </div>
      <div className="flex px-2 gap-x-2 flex-1">
        <SectionCard className="w-1/4 min-h-52">
          <h1>hello</h1>
        </SectionCard>
        <SectionCard className="w-1/4 min-h-52">
          <h1>hello</h1>
        </SectionCard>
        <SectionCard className="w-1/4 min-h-52">
          <h1>hello</h1>
        </SectionCard>
        <SectionCard className="w-1/4 min-h-52">
          <h1>hello</h1>
        </SectionCard>
      </div>
    </main>
  );
}
