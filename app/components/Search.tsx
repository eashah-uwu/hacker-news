"use client";

import { useState } from "react";

function Search() {
  const [search, setSearch] = useState<string>("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(search);
    setSearch("");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="search"> Search</label>
        <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
}

export default Search;
