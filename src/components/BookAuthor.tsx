const Avatar = ({ author,genre }: { author: string,genre:string }) => {
  const [lastName, firstName] = author.split(" ");
  return (
    <div>
      <div className="flex items-center gap-x-2">
        <div className="flex h-10 w-10 bg-primary border cursor-pointer rounded-full items-center justify-center">
          <p className="uppercase text-card font-semibold text-lg">{`${lastName.charAt(
            0
          )} ${firstName.charAt(0)}`}</p>
        </div>
        <div>
          <p className="text-xs italic opacity-90">Author</p>
          <p className="font-semibold capitalize text-sm">{author}</p>
          <p className="text-xs italic opacity-90">{genre}</p>
        </div>
      </div>
    </div>
  );
};
export default Avatar;
