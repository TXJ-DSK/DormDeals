import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

interface NavbarProps extends PropsWithChildren {
  onSearchChange: (query: string) => void;
  searchValue: string;
}

export const Navbar = ({ onSearchChange, searchValue }: NavbarProps) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          DormDeals
        </Link>

        <div className="flex-1 mx-8">
          <input
            type="text"
            placeholder="Search by furniture type..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            +
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-700">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/signin"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
