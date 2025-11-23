import React from 'react';
import { useAuth } from '@/lib/useAuth';
import Link from 'next/link';

const AdminNav: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white font-bold text-xl px-3 py-2 rounded-lg">
              RSV
            </div>
            <div>
              <div className="font-bold text-gray-800">Admin Dashboard</div>
              <div className="text-xs text-gray-500">Red Sea Valley</div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-600 transition-colors text-sm font-medium"
            >
              View Site
            </Link>
            
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm text-gray-700">{user?.email}</span>
            </div>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
