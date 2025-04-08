import { useState } from "react";
import "./index.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    const res = await fetch(`https://openlibrary.org/search.json?q=\${query}`);
    const data = await res.json();
    setBooks(data.docs.slice(0, 10));
  };

  return (
    <div className="p-4 font-sans">
      <h1 className="text-3xl font-bold text-center mb-4">📚 Book Explorer</h1>
      <div className="flex justify-center mb-4">
        <input
          className="border p-2 rounded w-1/2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
        />
        <button onClick={searchBooks} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {books.map((book, i) => (
          <div key={i} className="border p-2 rounded">
            <img
              src={`https://covers.openlibrary.org/b/id/\${book.cover_i}-M.jpg`}
              alt={book.title}
              className="h-40 w-full object-cover mb-2"
            />
            <h2 className="text-sm font-semibold">{book.title}</h2>
            <p className="text-xs">{book.author_name?.[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;