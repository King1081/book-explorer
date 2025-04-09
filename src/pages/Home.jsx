import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import useBookStore from "../store/useStore";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { books, setBooks, searchQuery } = useBookStore();

  useEffect(() => {
    const fetchPopularBooks = async () => {
      if (books.length === 0) {
        setLoading(true);
        try {
          const res = await fetch(
            "https://openlibrary.org/search.json?q=subject:fiction&limit=12&sort=rating"
          );
          const data = await res.json();
          setBooks(data.docs);
        } catch (error) {
          console.error("Error fetching popular books:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPopularBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    if (!searchQuery) return true;
    return (
      book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author_name?.some((author) =>
        author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

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
