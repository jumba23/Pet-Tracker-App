import "server-only";

import { redirect } from "next/navigation";
import { auth } from "./auth";
import { Pet } from "@prisma/client";
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
