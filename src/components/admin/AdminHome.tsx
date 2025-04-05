const AdminHome = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full flex flex-col bg-muted min-h-screen min-w-screen">
      {children}
    </div>
  );
};
export default AdminHome;
