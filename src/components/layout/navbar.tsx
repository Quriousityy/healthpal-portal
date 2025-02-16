
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-semibold text-sage-600">
              HealthPal
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-sage-600 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="text-gray-600 hover:text-sage-600 transition-colors"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
