import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

const PetFormBtn = ({ actionType }) => {
  // useFormStatus comes with server action in parent component
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="mt-5 self-end" disabled={pending}>
      {actionType === "add" ? "Add a new pet" : "Edit Pet"}
    </Button>
  );
};

export default PetFormBtn;
