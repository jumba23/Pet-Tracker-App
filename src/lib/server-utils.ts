import "server-only";

import { redirect } from "next/navigation";
import { auth } from "./auth";
import { Pet, User } from "@prisma/client";
import prisma from "./db";

export const checkAuth = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return session;
};

export const getPetById = async (petId: Pet["id"]) => {
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  });
  return pet;
};

export const getPetByUserId = async (userId: User["id"]) => {
  const pet = await prisma.pet.findMany({
    where: {
      userId,
    },
  });
  return pet;
};
