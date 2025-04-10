import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-lg">
      <div className="flex justify-between items-center px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold">Планування подій</h1>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="text-white hover:text-blue-200 font-medium transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/logIn"
            className="text-white hover:text-blue-200 font-medium transition-colors duration-200"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="text-white hover:text-blue-200 font-medium transition-colors duration-200"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
