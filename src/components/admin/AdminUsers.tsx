"use client";
import { cn, formatDateTime } from "@/lib/utils";
import { ArrowLeft, ArrowRight, ArrowUpDown, Loader2 } from "lucide-react";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Input } from "../ui/input";
import { useGetUsersQuery } from "@/redux/features/user/userApiSlice";
const AdminUsers = ({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: number | null;
  setSelectedUser: Dispatch<SetStateAction<number | null>>;
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const { data, isFetching } = useGetUsersQuery(
    {
      page,
      limit: 100,
      sortBy: "lastName",
      sort,
    },
    { refetchOnMountOrArgChange: false }
  );

  useEffect(() => {
    if (data?.success) {
      setUsers(data.data.users);
    }
    return () => {};
  }, [data]);
  useEffect(() => {
    if (data?.success) {
      const filtered = data.data.users.filter(
        ({ lastName, firstName }: { lastName: string; firstName: string }) =>
          lastName.toLowerCase().includes(search.toLowerCase()) ||
          firstName.toLowerCase().includes(search.toLowerCase())
      );
      setUsers(filtered);
    }
    return () => {};
  }, [data, search]);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  if (isFetching) {
    return (
      <div className="w-full h-full  px-2 flex flex-col items-center justify-center">
        <Loader2
          size={100}
          strokeWidth={1}
          className="text-primary animate-spin"
        />
        <p>Fetching users from library...</p>
      </div>
    );
  }
  return (
    <div className="border-r px-2 overflow-y-scroll hide-scrollbar ">
      <div className="sticky top-0 z-50">
        <Input
          name="search"
          placeholder="search user"
          value={search}
          onChange={handleSearch}
          className="flex-1 py-3 px-2 bg-background"
        />

        <div className="flex items-center justify-between py-2 ">
          <div className="w-8 h-8 rounded-full flex items-center justify-center border bg-background/70">
            <ArrowUpDown
              onClick={() =>
                setSort((prev) => (prev === "desc" ? "asc" : "desc"))
              }
              className="cursor-pointer"
              size={14}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center border bg-background/70">
              <ArrowLeft
                onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
                className="cursor-pointer"
                size={14}
              />
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center border bg-background/70">
              <ArrowRight
                onClick={() => setPage((prev) => data?.data?.nextPage || prev)}
                className="cursor-pointer"
                size={14}
              />
            </div>
          </div>
        </div>
      </div>
      {users.map(
        (
          { id, lastName, firstName, lastLogin, idCardUrl, role, status },
          i
        ) => {
          return (
            <div
              key={i}
              onClick={() => setSelectedUser(id)}
              className={cn(
                "flex  items-center h-12 my-2 cursor-pointer",
                selectedUser === id && "bg-muted"
              )}
            >
              <div className="relative h-full w-8">
                <Image
                  className="object-cover object-center"
                  src={idCardUrl.secure_url}
                  fill
                  alt={lastName}
                />
              </div>
              <div className="px-2 py-1 space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold capitalize text-xs flex-1 pr-2 truncate">
                    {`${lastName} ${firstName}`}
                  </h1>
                  <p className="text-xs ">{role} </p>
                </div>

                <div className="flex items-center justify-between">
                  <h1 className={cn(" text-xs")}>{status} </h1>
                  <p className="text-xs ">
                    {formatDateTime(lastLogin).dateTime}
                  </p>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};
export default AdminUsers;
