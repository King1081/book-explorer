import { useEffect } from "react";
import BookCard from "../components/BookCard";
import { useBooks } from "../store/useStore"; // or wherever your store file is

export default function Home() {
  const { books, setBooks, isLoading } = useBooks(); // uses filteredBooks internally

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Optional: You can use setLoading from the store if needed
        const url = books.length === 0
          ? "https://openlibrary.org/search.json?q=subject:fiction&limit=12&sort=rating"
          : `https://openlibrary.org/search.json?q=${encodeURIComponent(
              books[0]?.title || ""
            )}`;

        const res = await fetch(url);
        const data = await res.json();
        setBooks(data.docs);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book, i) => (
              <BookCard key={book.key || i} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
