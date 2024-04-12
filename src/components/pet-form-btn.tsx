import React from "react";
import { Button } from "./ui/button";

type PetFormBtnProps = {
  actionType: "add" | "edit";
};

const PetFormBtn = ({ actionType }: PetFormBtnProps) => {
  // useFormStatus comes with server action in parent component
  // const { pending } = useFormStatus();

  return (
    <Button type="submit" className="mt-5 self-end">
      {actionType === "add" ? "Add a new pet" : "Edit Pet"}
    </Button>
  );
};

export default PetFormBtn;
