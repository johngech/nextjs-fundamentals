"use client";

const SearchBox = () => {
  return (
    <div className="form-control flex-none hidden sm:block">
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered w-24 md:w-auto input-sm focus:input-primary"
      />
    </div>
  );
};

export default SearchBox;
