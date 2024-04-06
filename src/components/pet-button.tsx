import { Button } from "./ui/button";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
};

const PetButton = ({ actionType }: PetButtonProps) => {
  return <Button>Edit </Button>;
};

export default PetButton;
