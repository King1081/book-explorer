import { Link } from "react-router-dom";
import { BookOpen, Home, ArrowLeft, HeartOff, X, Info } from 'lucide-react';
import SearchBar from "./SearchBar";

export default function Header({ onSearch }) {
  return (
    <header className="bg-white shadow-sm mb-6">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              <BookOpen className="inline-block w-5 h-5 mr-1" /> Book Explorer
            </Link>
            <nav className="flex space-x-4 md:hidden">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              <Home className="inline-block w-4 h-4 mr-1" /> Home
            </Link>
              <Link
                to="/favorites"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                <HeartOff className="inline-block w-4 h-4 mr-1" /> Favorites
              </Link>
            </nav>
          </div>
          
          <div className="w-full md:w-1/2">
            <SearchBar onSearch={onSearch} placeholder="Search books..." />
          </div>

          <nav className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              <Home className="inline-block w-4 h-4 mr-1" /> Home
            </Link>
            <Link
              to="/favorites"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              <HeartOff className="inline-block w-4 h-4 mr-1" /> Favorites
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
