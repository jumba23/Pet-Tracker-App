"use server";

import { Pet } from "@prisma/client";

export const addPet = async (formData) => {
  await prisma?.pet.create({
    data: {
      name: formData.get("name"),
      ownerName: formData.get("ownerName"),

      imageUrl: formData.get("imageUrl"),
      age: parseInt(formData.get("age")),
      notes: formData.get("notes"),
    },
  });
};
