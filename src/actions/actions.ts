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
import { AuthError } from "next-auth";

// ---------- USER ACTIONS ------------

export async function logIn(prevState: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid credentials.",
          };
        }
        default: {
          return {
            message: "Error. Could not sign in.",
          };
        }
      }
    }

    throw error; // nextjs redirects throws error, so we need to rethrow it
  }
}

export const logOut = async () => {
  await signOut({ redirectTo: "/" });
};

export const signUp = async (formData: unknown) => {
  //check if formData is a FormData type
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }

  //convert formData to a plain object
  const formDataEntries = Object.fromEntries(formData.entries());

  //validation
  const validatedFormData = authSchema.safeParse(formDataEntries);
  if (!validatedFormData.success) {
    return {
      message: "Invalid form data.",
    };
  }

  const { email, password } = validatedFormData.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  // create new user in db using prisma
  await prisma.user.create({
    data: {
      email,
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
