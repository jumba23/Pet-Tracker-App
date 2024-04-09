"use server";

import { sleep } from "@/lib/utils";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const addPet = async (formData) => {
  await sleep(2000);

  try {
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
  } catch (error) {
    return {
      message: "Failed to add pet",
    };
  }

  revalidatePath("/app", "layout");
};

export const editPet = async (petId, formData) => {
  prisma?.pet.update({
    where: {
      id: petId,
    },
    data: {
      name: formData.get("name"),
      ownerName: formData.get("ownerName"),
      imageUrl:
        formData.get("imageUrl") ||
        "      https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png      ",
      age: parseInt(formData.get("age")),
      notes: formData.get("notes"),
    },
  });
};
