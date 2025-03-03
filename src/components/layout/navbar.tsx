
import { Link } from "react-router-dom";
import { FileText, User, Home, Package, Calendar, Shield } from "lucide-react";

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-semibold text-sage-600 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-sage-600" />
              HealthPal
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-sage-600 transition-colors px-3 py-2 rounded-lg hover:bg-sage-50 flex items-center"
            >
              <Home className="h-4 w-4 mr-1.5" />
              Dashboard
            </Link>
            <Link
              to="/products"
              className="text-gray-600 hover:text-sage-600 transition-colors px-3 py-2 rounded-lg hover:bg-sage-50 flex items-center"
            >
              <Package className="h-4 w-4 mr-1.5" />
              Products
            </Link>
            <Link
              to="/quotation"
              className="text-gray-600 hover:text-sage-600 transition-colors px-3 py-2 rounded-lg hover:bg-sage-50 flex items-center"
            >
              <FileText className="h-4 w-4 mr-1.5" />
              Get Quote
            </Link>
            <Link
              to="/appointments"
              className="text-gray-600 hover:text-sage-600 transition-colors px-3 py-2 rounded-lg hover:bg-sage-50 flex items-center"
            >
              <Calendar className="h-4 w-4 mr-1.5" />
              Book Appointment
            </Link>
            <Link
              to="/profile"
              className="text-gray-600 hover:text-sage-600 transition-colors px-3 py-2 rounded-lg hover:bg-sage-50 flex items-center"
            >
              <User className="h-4 w-4 mr-1.5" />
              Profile
            </Link>
            <Link
              to="/signin"
              className="bg-sage-50 text-sage-600 hover:bg-sage-100 transition-colors px-4 py-2 rounded-lg shadow-sm hover:shadow"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
