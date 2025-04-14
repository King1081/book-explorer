import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import useBookStore from "./store/useStore";
import { Toaster } from "react-hot-toast";

export default function App() {
  const setSearchQuery = useBookStore((state) => state.setSearchQuery);

  const handleSearch = (query) => {
    console.log('App - received search query:', query);
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onSearch={handleSearch} />
      <main className="pb-8">
        <Outlet />
      </main>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}
