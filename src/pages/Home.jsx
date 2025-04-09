import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import useBookStore from "../store/useStore";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { books, setBooks, searchQuery, setSearchQuery } = useBookStore();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const url = searchQuery 
          ? `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}`
          : "https://openlibrary.org/search.json?q=subject:fiction&limit=12&sort=rating";
        
        const res = await fetch(url);
        const data = await res.json();
        setBooks(data.docs);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchQuery]);

  console.log('Home - current searchQuery:', searchQuery);
  console.log('Home - books count:', books.length);
  const filteredBooks = books.filter((book) => {
    if (!searchQuery) return true;
    const matchesTitle = book.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAuthor = book.author_name?.some((author) =>
      author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log('Book:', book.title, '| matchesTitle:', matchesTitle, '| matchesAuthor:', matchesAuthor);
    return matchesTitle || matchesAuthor;
  });
  console.log('Home - filteredBooks count:', filteredBooks.length);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book, i) => (
              <BookCard key={i} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
