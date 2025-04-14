import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useBookStore from "../store/useStore";
import SearchBar from "../components/SearchBar";
import  toast from "react-hot-toast";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useBookStore();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        if (!res.ok) throw new Error("Failed to fetch book details");
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
        toast.error("Failed to fetch book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleSearch = (query) => { };
  const setSearchQuery = useBookStore((state) => state.setSearchQuery);
  const searchQuery = useBookStore((state) => state.searchQuery);
  

  if (loading) return <div className="p-4">Loading...</div>;
  if (!book) return <div className="p-4">Book not found</div>;

  
 
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8"> 
      <div className="break-words max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <button 
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          🔙 To results
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            {book.covers?.[0] ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
                alt={book.title}
                className="w-full rounded-lg shadow"
              />
            ) : (
              <div className="h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">No cover available</span>
              </div>
            )}
          </div>

          <div className="md:w-2/3">
            <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
            {book.subtitle && (
              <h2 className="text-xl text-gray-600 mb-4">{book.subtitle}</h2>
            )}
            
            <div className="flex items-center mb-4">
              <button
                onClick={() => {
                  const isCurrentlyFavorite = favorites.some(fav => fav.key === book.key);
                  toggleFavorite(book);
                  if (isCurrentlyFavorite) {
                    toast('Removed from favorites 💔', {
                      icon: '❌',
                      style: {
                        borderRadius: '8px',
                        background: '#fef2f2',
                        color: '#b91c1c',
                      },
                    });
                  } else {
                    toast('Added to favorites ❤️', {
                      icon: '⭐',
                      style: {
                        borderRadius: '8px',
                        background: '#ecfdf5',
                        color: '#065f46',
                      },
                    });
                  }
                }}
                
                

                className={`text-2xl mr-2 ${
                  favorites.some(fav => fav.key === book.key)
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
              >
                ❤️
              </button>
              <span className="text-sm text-gray-600">
                {favorites.some(fav => fav.key === book.key)
                  ? "Saved to favorites"
                  : "Add to favorites"}
              </span>
            </div>

            {book.description && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700">
                  {typeof book.description === 'string' 
                    ? book.description
                    : book.description.value}
                </p>
              </div>
            )}

            {book.subjects && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Subjects</h3>
                <div className="flex flex-wrap gap-2">
                  {book.subjects.slice(0, 5).map((subject, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
