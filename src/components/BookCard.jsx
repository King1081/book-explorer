import { useNavigate } from "react-router-dom";
import useBookStore from "../store/useStore";

export default function BookCard({ book }) {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useBookStore();

  return (
    <div 
      className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/book/${book.key.replace('/works/', '')}`)}
    >
      {/* Book cover image */}
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

      {/* Book title and author */}
      <h3 className="font-semibold line-clamp-2">{book.title}</h3>
      {book.author_name && (
        <p className="text-sm text-gray-600 mt-1">
          {book.author_name.join(', ')}
        </p>
      )}

      {/* Favorite button */}
      <div className="flex items-center mt-2 text-lg sm">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(book);
            alert(favorites.some(fav => fav.key === book.key) ? "Removed from favorites" : "Added to favorites");
          }}
          className={`text-xl ${
            favorites.some(fav => fav.key === book.key)
              ? "text-yellow-500"
              : "text-gray-400"
          }`}
        >
          ❤️ Add to Favourites
        </button>
      </div>
    </div>
  );
}
