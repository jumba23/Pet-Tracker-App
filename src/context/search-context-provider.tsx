"use client";

import { createContext, useState } from "react";

type TSearchContext = {};

export const PetContext = createContext<TSearchContext | null>(null);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  // state
  const [searchQuery, setSearchQuery] = useState("");

  //derived state

  //event handlers / actions

  //use handle function to set selected pet id

  return <SearchContext.Provider value={{}}>{children}</SearchContext.Provider>;
};

export default SearchContextProvider;
