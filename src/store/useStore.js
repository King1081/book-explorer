import { create } from "zustand";

const useBookStore = create((set) => ({
  books: [],
  favorites: [],
  searchQuery: '',
  setBooks: (books) => set({ books }),
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
      } else {
        return { favorites: [...state.favorites, book] };
      }
    }),
}));

export default useBookStore;
