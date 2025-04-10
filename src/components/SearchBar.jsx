import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('SearchBar - submitting query:', query);
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
          className="flex-grow rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button
          type="submit"
          className="rounded-l-none"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
