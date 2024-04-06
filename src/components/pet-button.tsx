import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
};

const PetButton = ({ actionType }: PetButtonProps) => {
  if (actionType === "add")
    return (
      <Button size="icon">
        <PlusIcon className="h-6 w-6" />{" "}
      </Button>
    );

  if (actionType === "edit") {
    return <Button variant="secondary">Edit </Button>;
  }

  if (actionType === "checkout") {
    return <Button variant="secondary">Checkout </Button>;
  }

  return <Button>Edit </Button>;
};

export default PetButton;
