import { useNavigate } from "react-router-dom";
import useBookStore from "../store/useStore";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function BookCard({ book }) {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useBookStore();

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/book/${book.key.replace('/works/', '')}`)}
    >
      <CardHeader>
        {/* Book cover image */}
        {book.cover_i ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
            alt={book.title}
            className="h-40 w-full object-cover rounded-t-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23e5e7eb"><rect width="100" height="100"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-family="sans-serif" font-size="12">No Cover</text></svg>';
            }}
          />
        ) : (
          <div className="h-40 w-full bg-gray-200 flex items-center justify-center rounded-t-lg">
            <span className="text-gray-500">No Cover</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-4">
        {/* Book title and author */}
        <CardTitle className="font-semibold line-clamp-2">{book.title}</CardTitle>
        {book.author_name && (
          <p className="text-sm text-gray-600 mt-1">
            {book.author_name.join(', ')}
          </p>
        )}

        {/* Favorite button */}
        <div className="flex items-center mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(book);
              
            }}
            className={`gap-2 ${
              favorites.some(fav => fav.key === book.key)
                ? "text-yellow-500"
                : "text-gray-400"
            }`}
          >
            <span>❤️</span>
            <span>Add to Favourites</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
