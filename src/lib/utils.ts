import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// this function is used to simulate a delay in the API response
export const sleep = async (ms: number) => {
  return await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
