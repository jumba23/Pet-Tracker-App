import { Pet } from "@prisma/client";

// Omit is a utility type that removes the specified keys from an object type.
export type PetEssentials = Omit<Pet, "id" | "createdAt" | "updatedAt">;
