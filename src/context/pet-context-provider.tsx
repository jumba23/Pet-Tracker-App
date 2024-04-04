"use client";

import { Pet } from "@/lib/types";
import { createContext, useState } from "react";

type PetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  handleSetSelectedPetId: (id: string) => void;
};

export const PetContext = createContext<PetContext | null>(null);

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

const PetContextProvider = ({ data, children }: PetContextProviderProps) => {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //use handle function to set selected pet id
  const handleSetSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleSetSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
