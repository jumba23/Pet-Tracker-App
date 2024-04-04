"use client";

import { createContext, useState } from "react";

export const PetContext = createContext(null);

const PetContextProvider = ({ data, children }) => {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState(null);

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
