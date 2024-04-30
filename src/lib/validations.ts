import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";

export const petIdSchema = z.string().uuid();

//we are using external validation library zod to validate the form
export const petFormSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required" }).max(100),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: "Owner Name is required" })
      .max(100),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Image Url is not a valid URL" }),
    ]),
    age: z.coerce
      .number()
      .int()
      .positive()
      .min(0, { message: "Age must be a positive number" }),
    notes: z.union([z.literal(""), z.string().trim().max(1000)]),
  })
  //transform the data before validation - we can customize the data before validation
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl.trim() || DEFAULT_PET_IMAGE,
  }));

// zod will give us the type of the form data
export type TPetFormData = z.infer<typeof petFormSchema>;

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
