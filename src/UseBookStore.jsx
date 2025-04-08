import { create } from "zustand";

const useBookStore = create((set) => ({
  query: "",
  books: [],
  setQuery: (query) => set({ query }),
  setBooks: (books) => set({ books }),
}));

export default useBookStore;
