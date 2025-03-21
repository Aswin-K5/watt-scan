
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MeterEase</Link>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/login" className="hover:text-gray-200">Login</Link>
          <Link to="/register" className="hover:text-gray-200">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
