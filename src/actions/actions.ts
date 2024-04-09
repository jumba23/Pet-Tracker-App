"use server";

import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";
import placeholderImage from "../../public/pet-placeholder.png";

export const addPet = async (formData) => {
  await prisma?.pet.create({
    data: {
      name: formData.get("name"),
      ownerName: formData.get("ownerName"),

      imageUrl:
        formData.get("imageUrl") ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      age: parseInt(formData.get("age")),
      notes: formData.get("notes"),
    },
  });

  revalidatePath("/app", "layout");
};
