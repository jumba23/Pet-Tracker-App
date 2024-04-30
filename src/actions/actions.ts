// this needs to be declarer ("use server") in order to use Server Actions and NOT for server components
"use server";

import { signIn, signOut } from "@/lib/auth";
import { sleep } from "@/lib/utils";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { checkAuth, getPetById } from "@/lib/server-utils";
import { redirect } from "next/navigation";

// ---------- USER ACTIONS ------------

export const logIn = async (formData: unknown) => {
  // check if the form data is a FormData type
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }

  // convert form data to javascript object
  const formDataObject = Object.fromEntries(formData.entries());
  const validatedFormDataObject = authSchema.safeParse(formDataObject);
  if (!validatedFormDataObject.success) {
    return {
      message: "Invalid login data",
    };
  }
  //another way to get the form data
  // const data = {
  //   email: formData.get("email"),
  //   password: formData.get("password"),
  // };

  //converting form data to javascript object
  // const authData = Object.fromEntries(formData.entries());

  console.log("login Data", formDataObject);

  await signIn("credentials", validatedFormDataObject.data);

  redirect("/app/dashboard");
};

export const logOut = async () => {
  await signOut({ redirectTo: "/" });
};

export const signUp = async (formData: FormData) => {
  const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    10
  );

  // create new user in db using prisma
  await prisma.user.create({
    data: {
      email: formData.get("email") as string,
      hashedPassword,
    },
  });

  await signIn("credentials", formData);
};

// ---------- PET ACTIONS ------------

export const addPet = async (pet: unknown) => {
  await sleep(1000);

  //authentication check
  const session = await checkAuth();

  // here we are using zod to validate the form data on server side
  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma?.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
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

  // ============ Checks before interacting with the database ============

  //authentication check
  const session = await checkAuth();

  //validate pet id schema
  const validatedPetId = petIdSchema.safeParse(petId);
  // here we are using zod to validate the form data on server side
  const validatedPet = petFormSchema.safeParse(newPetData);

  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  //authorization check (user owns the pet)
  const pet = await getPetById(validatedPetId.data);

  // checking if the pet exists even if the id is valid
  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "You are not authorized to edit this pet",
    };
  }

  //============ End of checks ============

  // interact with the database - database operation
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

  // ============ Checks before interacting with the database ============
  //authentication check
  const session = await checkAuth();

  //validation
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Invalid pet id",
    };
  }

  //authorization check (user owns the pet)
  const pet = await getPetById(validatedPetId.data);

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "You are not authorized to delete this pet",
    };
  }

  // ============ End of checks ============

  // interact with the database
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
