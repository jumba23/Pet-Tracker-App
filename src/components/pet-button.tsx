import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PetForm from "./pet-form";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  children?: React.ReactNode;
  onClick?: () => void;
};

const PetButton = ({ actionType, children, onClick }: PetButtonProps) => {
  if (actionType === "add")
    return (
      <Dialog>
        <DialogTrigger>
          <Button size="icon">
            <PlusIcon className="h-6 w-6" />{" "}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new pet</DialogTitle>
          </DialogHeader>
          <PetForm />
        </DialogContent>
      </Dialog>
    );

  if (actionType === "edit") {
    return <Button variant="secondary">{children}</Button>;
  }

  if (actionType === "checkout") {
    return (
      <Button variant="secondary" onClick={onClick}>
        {children}
      </Button>
    );
  }
};

export default PetButton;
