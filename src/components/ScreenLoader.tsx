import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

const ScreenLoader = ({
  open,
  message,
}: {
  open: boolean;
  message?: string;
}) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogHeader>
        <AlertDialogTitle className="hidden"></AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogContent className="flex-1 flex flex-col items-center justify-center">
        <AlertDialogTitle> Loading your Request</AlertDialogTitle>
        <AlertDialogDescription>Please Wait</AlertDialogDescription>
        <Loader2
          size={100}
          className="text-primary animate-spin"
        />
        <AlertDialogDescription>{message}</AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ScreenLoader;
