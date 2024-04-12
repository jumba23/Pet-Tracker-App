"use client";

import { usePetContext } from "@/lib/hooks";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import PetFormBtn from "./pet-form-btn";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

type TPetFormData = {
  name: string;
  ownerName: string;
  imageUrl: string;
  age: number;
  notes: string;
};

//we are using external validation library zod to validate the form
const petFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100),
  ownerName: z
    .string()
    .trim()
    .min(1, { message: "Owner Name is required" })
    .max(100),
  imageUrl: z.union([
    z.literal(""),
    z.string().trim().url({ message: "Image Url is not a valid URL" }),
  ]),
  age: z.coerce
    .number()
    .int()
    .positive()
    .min(0, { message: "Age must be a positive number" }),
  notes: z.union([z.literal(""), z.string().trim().max(1000)]),
});

const PetForm = ({ actionType, onFormSubmission }: PetFormProps) => {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  // We are using react-hook-form to handle errors and validation
  // we are not using it for loading state since we are using optimistic UI updates
  const {
    register,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<TPetFormData>({
    //this is we are connecting external validation library zod to react-hook-form
    resolver: zodResolver(petFormSchema),
  });

  return (
    <form
      // Server side action
      action={async (formData) => {
        //validation
        const result = await trigger();
        if (!result) {
          return;
        }

        onFormSubmission();

        const petData = {
          name: formData.get("name") as string,
          ownerName: formData.get("ownerName") as string,
          imageUrl:
            (formData.get("imageUrl") as string) ||
            "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
          age: Number(formData.get("age")),
          notes: formData.get("notes") as string,
        };

        if (actionType === "add") {
          await handleAddPet(petData);
        } else if (actionType === "edit") {
          await handleEditPet(selectedPet!.id, petData);
        }
        //no longer needed - loading state indicator
        // onFormSubmission();
      }}
      className="flex flex-col"
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name")} // register is a react-hook-form function that registers the input with the form
            // type="text" - not needed - react-hook-form will automatically use the type if not provided
            // name="name" - not needed - react-hook-form will automatically use the id if name is not provided
            // required - not needed - native HTML validation
            // defaultValue={actionType === "edit" ? selectedPet?.name : ""} - not needed - react-hook-form will automatically populate the input with the value if defaultValue is not provided
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" {...register("ownerName")} />
          {errors.ownerName && (
            <p className="text-red-500">{errors.ownerName.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input id="name" {...register("imageUrl")} />
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" {...register("age")} />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="name" {...register("notes")} />
          {errors.notes && (
            <p className="text-red-500">{errors.notes.message}</p>
          )}
        </div>
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  );
};

export default PetForm;
