"use client";
const AdminHome = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  
  return <div className="w-full flex flex-col min-h-screen ">{children}</div>;
};
export default AdminHome;
