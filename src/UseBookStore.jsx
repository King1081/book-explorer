import { create } from "zustand";

const useBookStore = create((set) => ({
  query: "",
  books: [],
  favorites: [],
  setQuery: (query) => set({ query }),
  setBooks: (books) => set({ books }),
  addToFavorites: (book) => 
    set((state) => ({ favorites: [...state.favorites, book] })),
  removeFromFavorites: (bookId) =>
    set((state) => ({ 
      favorites: state.favorites.filter((book) => book.id !== bookId) 
    })),
  toggleFavorite: (book) => 
    set((state) => {
      const isFavorite = state.favorites.some((fav) => fav.id === book.id);
      return {
        favorites: isFavorite
          ? state.favorites.filter((fav) => fav.id !== book.id)
          : [...state.favorites, book]
      };
    }),
}));

export default useBookStore;
