const SearchForm = () => {
  return (
    <form className="h-full w-full">
      <input
        type="search"
        className="h-full w-full bg-white/20 rounded-md px-5 outline-none transition focus:bg-white/50 hover:bg-white/30 placeholder:text-white/50"
        placeholder="Search pets"
      />
    </form>
  );
};

export default SearchForm;
