"use server";

import { PetEssentials } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const addPet = async (pet: PetEssentials) => {
  await sleep(1000);

  try {
    await prisma?.pet.create({
      data: pet,
    });
  } catch (error) {
    return {
      message: "Failed to add pet",
    };
  }
  // re-render the layout to show the new pet
  revalidatePath("/app", "layout");
};

export const editPet = async (petId: Pet["id"], newPetData: PetEssentials) => {
  await sleep(1000);
  try {
    await prisma?.pet.update({
      where: {
        id: petId,
      },
      data: newPetData,
    });
  } catch (error) {
    return {
      message: "Failed to edit pet",
    };
  }

  // re-render the layout to show the updated pet
  revalidatePath("/app", "layout");
};

export const deletePet = async (petId: Pet["id"]) => {
  await sleep(1000);

  try {
    await prisma?.pet.delete({
      where: {
        id: petId,
      },
    });
  } catch (error) {
    return {
      message: "Failed to delete pet",
    };
  }

  // re-render the layout to show the updated pet list
  revalidatePath("/app", "layout");
};
