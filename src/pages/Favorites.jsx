import BookCard from "../components/BookCard";
import useBookStore from "../store/useStore";

export default function Favorites() {
  const { favorites, searchQuery } = useBookStore();
  console.log('Favorites - current searchQuery:', searchQuery);
  console.log('Favorites - favorites count:', favorites.length);

  const filteredFavorites = favorites.filter((book) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    console.log('Checking book:', book.title, 'for query:', query);
    return (
      book.title?.toLowerCase().includes(query) ||
      book.author_name?.some((author) =>
        author.toLowerCase().includes(query)
      )
    );
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Your Favorite Books</h1>
                
        {filteredFavorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {favorites.length === 0 
                ? "You haven't saved any favorites yet"
                : "No favorites match your search"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredFavorites.map((book, i) => (
              <BookCard key={i} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
