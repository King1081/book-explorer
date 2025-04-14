import { create } from "zustand";
import { shallow } from "zustand/shallow";

const useBookStore = create((set, get) => ({
  books: [],
  favorites: [],
  searchQuery: '',
  isLoading: false,
  
  // Actions
  setBooks: (books) => set({ books }),
  setLoading: (isLoading) => set({ isLoading }),
  
  setSearchQuery: (query) => {
    set({ searchQuery: query });
    return query;
  },

  toggleFavorite: (book) =>
    set((state) => {
      const exists = state.favorites.some((fav) => fav.key === book.key);
      if (exists) {
        return {
          favorites: state.favorites.filter((fav) => fav.key !== book.key),
        };
      }
      return { favorites: [...state.favorites, book] };
    }),

  // Selectors
  filteredBooks: () => {
    const { books, searchQuery } = get();
    if (!searchQuery) return books;
    const query = searchQuery.toLowerCase();
    return books.filter(book => 
      book.title?.toLowerCase().includes(query) ||
      book.author_name?.some(author => author.toLowerCase().includes(query))
    );
  },

  filteredFavorites: () => {
    const { favorites, searchQuery } = get();
    if (!searchQuery) return favorites;
    const query = searchQuery.toLowerCase();
    return favorites.filter(book => 
      book.title?.toLowerCase().includes(query) ||
      book.author_name?.some(author => author.toLowerCase().includes(query))
    );
  }
}));

export const useBooks = () => useBookStore(state => ({
  books: state.filteredBooks(),
  setBooks: state.setBooks,
  isLoading: state.isLoading
}), shallow);

export const useFavorites = () => useBookStore(state => ({
  favorites: state.filteredFavorites(),
  toggleFavorite: state.toggleFavorite
}), shallow);

export default useBookStore;
