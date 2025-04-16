import { useGetUserQuery } from "@/redux/features/user/userApiSlice";

const UserAvatar = ({ userId }: { userId: number }) => {
  const { data } = useGetUserQuery(userId);
  const lastName = data?.data?.lastName;
  const firstName = data?.data?.firstName;

  return (
    lastName &&
    firstName && (
      <div className="flex items-center gap-x-2 cursor-pointer ">
        <div className="flex h-8 w-8 bg-foreground border  rounded-full items-center justify-center">
          <p className="uppercase text-card font-semibold text-xs">{`${lastName.charAt(
            0
          )} ${firstName.charAt(0)}`}</p>
        </div>

        <p className="font-semibold capitalize text-xs">{`${lastName} ${firstName}`}</p>
      </div>
    )
  );
};
export default UserAvatar;
