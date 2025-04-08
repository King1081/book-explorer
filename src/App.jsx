import { useState, useEffect } from "react";
import "./index.css";
import useBookStore from "./UseBookStore.jsx";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const searchBooks = async (searchTerm = "harry potter") => {
    const res = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}`);
    // https://covers.openlibrary.org/b/id/{cover_i}-M.jpg

    const data = await res.json();
    setBooks(data.docs.slice(0, 12));
  };

  // 🧠 useEffect to auto-search on load
  useEffect(() => {
    searchBooks(); // searches "harry potter" on mount
  }, []);


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
        <button
          onClick={() => searchBooks(query)}
          className="ml-3 px-5 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition-all"
        >
          Search
        </button>

      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {books.map((book, i) => (
          <div key={i} className="border p-2 rounded">
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/\${book.cover_i}-M.jpg`}
                alt={book.title}
                className="h-40 w-full object-cover mb-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23e5e7eb"><rect width="100" height="100"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-family="sans-serif" font-size="12">No Cover</text></svg>';
                }}
              />
            ) : (
              <div className="h-40 w-full bg-gray-200 flex items-center justify-center mb-2">
                <span className="text-gray-500">No Cover</span>
              </div>
            )}
            <h2 className="text-sm font-semibold">{book.title}</h2>
            <p className="text-xs">{book.author_name?.[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;