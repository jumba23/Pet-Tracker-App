// this needs to be declarer ("use server") in order to use Server Actions and NOT for server components
"use server";

import { sleep } from "@/lib/utils";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

// ---------- USER ACTIONS ------------

export const login = (authData) => {
  console.log("login Data", authData);
};

// ---------- PET ACTIONS ------------

export const addPet = async (pet: unknown) => {
  await sleep(1000);

  // here we are using zod to validate the form data on server side
  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma?.pet.create({
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Failed to add pet",
    };
  }
  // re-render the layout to show the new pet
  revalidatePath("/app", "layout");
};

export const editPet = async (petId: unknown, newPetData: unknown) => {
  await sleep(1000);

  //validate pet id schema
  const validatedPetId = petIdSchema.safeParse(petId);

  // here we are using zod to validate the form data on server side
  const validatedPet = petFormSchema.safeParse(newPetData);
  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma?.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Failed to edit pet",
    };
  }

  // re-render the layout to show the updated pet
  revalidatePath("/app", "layout");
};

export const deletePet = async (petId: unknown) => {
  await sleep(1000);

  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Invalid pet id",
    };
  }

  try {
    await prisma?.pet.delete({
      where: {
        id: validatedPetId.data,
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
