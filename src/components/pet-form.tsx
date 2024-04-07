"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type PetFormProps = {
  actionType: "add" | "edit";
};

const PetForm = ({ actionType }: PetFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget); // Get form data
    const pet = Object.fromEntries(formData.entries()); // Convert form data to object
    console.log(pet);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" name="name" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="name" type="text" name="ownerName" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input id="name" type="text" name="imageUrl" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="name" type="text" name="age" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="name" rows={3} name="notes" />
        </div>
      </div>

      <Button type="submit" className="mt-5 self-end">
        {actionType === "add" ? "Add a new pet" : "Edit Pet"}
      </Button>
    </form>
  );
};

export default PetForm;
