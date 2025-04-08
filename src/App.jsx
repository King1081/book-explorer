import { useState, useEffect } from "react";
import "./index.css";
import useBookStore from "./UseBookStore.jsx";

function App() {
  const { 
    query, 
    books, 
    favorites,
    setQuery, 
    setBooks,
    toggleFavorite
  } = useBookStore();

  const searchBooks = async (searchTerm = "harry potter") => {
    try {
      if (!searchTerm.trim()) return;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const res = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error('API request failed');
      
      const data = await res.json();
      setBooks(data.docs.slice(0, 12));
    } catch (error) {
      console.error('Search error:', error);
      alert('Search failed. Please try again later.');
    }
  };

  useEffect(() => {
    searchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-3xl font-bold text-center mb-4">📚 Book Explorer</h1>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchBooks(query)}
              placeholder="Search books..."
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-md"
            />
            <button
              onClick={() => searchBooks(query)}
              className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* Results and Favorites */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Book Results */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4">Search Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {books.map((book, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow">
                  {book.cover_i ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
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
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-sm font-semibold">{book.title}</h2>
                      <p className="text-xs text-gray-600">{book.author_name?.[0]}</p>
                    </div>
                    <button
                      onClick={() => toggleFavorite(book)}
                      className={`p-1 rounded-full ${
                        favorites.some(fav => fav.key === book.key)
                          ? "text-yellow-500"
                          : "text-gray-400"
                      } hover:text-yellow-500`}
                    >
                      ⭐
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Favorites Sidebar */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Favorites ({favorites.length})</h2>
            {favorites.length === 0 ? (
              <p className="text-gray-500">No favorites yet</p>
            ) : (
              <div className="space-y-3">
                {favorites.map((book) => (
                  <div key={book.key} className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sm">{book.title}</h4>
                      <p className="text-xs text-gray-600">
                        {book.author_name?.[0]}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleFavorite(book)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;