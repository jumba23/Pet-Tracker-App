"use client";

import { Pet } from "@/lib/types";
import { createContext, useState } from "react";

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleSetSelectedPetId: (id: string) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  // state

  //derived state

  //event handlers / actions

  //use handle function to set selected pet id

  return <SearchContext.Provider value={{}}>{children}</SearchContext.Provider>;
};

export default SearchContextProvider;
