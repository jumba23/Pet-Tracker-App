"use client";

import { useState } from "react";

const SearchForm = () => {
  return (
    <form className="h-full w-full">
      <input
        type="search"
        className="h-full w-full bg-white/20 rounded-md px-5 outline-none transition focus:bg-white/50 hover:bg-white/30 placeholder:text-white/50"
        placeholder="Search pets"
        value={searchQuery}
        onChange={(e) => console.log(e.target.value)}
      />
    </form>
  );
};

export default SearchForm;
