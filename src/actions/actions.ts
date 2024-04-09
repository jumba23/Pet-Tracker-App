"use server";

import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const addPet = async (formData) => {
  await prisma?.pet.create({
    data: {
      name: formData.get("name"),
      ownerName: formData.get("ownerName"),

      imageUrl:
        formData.get("imageUrl") ||
        "https://bytegrad.com/corse-assets/react-next.js/pet-placeholder.jpg",
      age: parseInt(formData.get("age")),
      notes: formData.get("notes"),
    },
  });

  revalidatePath("/app", "layout");
};
