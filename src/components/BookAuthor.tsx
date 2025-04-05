const Avatar = () => {
  return (
    <div>
      <div className="flex items-center gap-x-2">
        <div className="flex h-10 w-10 bg-primary border cursor-pointer rounded-full items-center justify-center">
          <p className="uppercase text-card font-semibold text-lg">gr</p>
        </div>
        <div>
          <p className="font-semibold capitalize text-sm">George RR Martin</p>
          <p className="text-xs italic opacity-90">Author</p>
        </div>
      </div>
    </div>
  );
};
export default Avatar;
