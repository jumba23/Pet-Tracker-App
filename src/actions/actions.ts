"use server";

import { Pet } from "@prisma/client";

export const addPet = async (pet: Pet) => {
  await prisma?.pet.create({
    data: pet,
  });
};
