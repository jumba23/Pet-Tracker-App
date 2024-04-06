"use client";

import { createContext, useState } from "react";

type SearchContextProvider = {
  children: React.ReactNode;
};

type TSearchContext = {
  searchQuery: string;
  handleChangeSearchQuery: (NewValue: string) => void;
};

export const PetContext = createContext<TSearchContext | null>(null);

export const SearchContextProvider = ({ children }: SearchContextProvider) => {
  // state
  const [searchQuery, setSearchQuery] = useState("");

  //derived state

  //event handlers / actions

  //use handle function to set selected pet id
  const handleChangeSearchQuery = (NewValue: string) => {
    setSearchQuery(NewValue);
  };

  return (
    <PetContext.Provider
      value={{
        searchQuery,
        handleChangeSearchQuery,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default SearchContextProvider;
