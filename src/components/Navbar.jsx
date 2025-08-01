import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaClipboardList, FaBars, FaTimes } from 'react-icons/fa';

// Custom NavLink component with active state
const CustomNavLink = ({ to, children, ...props }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        isActive 
          ? 'text-white bg-white/20' 
          : 'text-white/90 hover:text-white hover:bg-white/10'
      }`
    }
    {...props}
  >
    {children}
  </NavLink>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isUserSection = location.pathname.startsWith('/user');
  const isDashboard = location.pathname === '/user';
  const isManagementPage = isUserSection && !isDashboard;
  const isAuthenticated = localStorage.getItem('user_authenticated') === 'true';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_authenticated');
    navigate('/user');
    window.location.reload(); // Ensures state resets everywhere
  };

  const handleBack = () => {
    navigate('/user');
  };

  return (
    <div className="relative font-body">
      <div 
        className="absolute inset-0 z-0 navbar-bg-overlay"
      />
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-nav' : 'bg-gray-900/80'
        } text-white border-b border-gray-700/30 navbar-bg-image`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center group">
              <div className="relative h-12 w-12 mr-3 rounded-full overflow-hidden border-2 border-amber-400 group-hover:border-amber-300 transition-all duration-300">
                <img 
                  src={`${process.env.PUBLIC_URL}/7a92a001-64d4-4b74-b294-d1d9f120cf3a.jpeg`} 
                  alt="Logo" 
                  className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="text-2xl font-display font-bold text-white">
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent bg-300% animate-gradient">
                  Dudu's
                </span>
                <span className="text-white/90">Clothing</span>
              </span>
            </div>
            {/* Management Back/Logout Buttons */}
            {isUserSection && isAuthenticated && (
              <div className="flex items-center gap-2">
                {isDashboard && (
                  <button
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors duration-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
                {isManagementPage && (
                  <button
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors duration-200"
                    onClick={handleBack}
                  >
                    &larr; Back
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {location.pathname !== '/user' && (
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-1">
            <div className="flex items-center space-x-1">
              <CustomNavLink to="/" className="block px-4 py-2 rounded-md text-sm sm:text-base font-medium whitespace-nowrap">
                Home
              </CustomNavLink>
              <CustomNavLink to="/products" className="block px-4 py-2 rounded-md text-sm sm:text-base font-medium whitespace-nowrap">
                Products
              </CustomNavLink>


              {isAuthenticated && (
                <Link
                  to="/user"
                  className="block px-4 py-2 rounded-md text-sm sm:text-base font-medium whitespace-nowrap text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        )}
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <Link 
            to="/order" 
            className="relative p-2 text-white/90 hover:text-white mr-2"
          >
            <FaClipboardList className="h-5 w-5" />
            {orderCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {orderCount}
              </span>
            )}
          </Link>
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-white/90 hover:text-white focus:outline-none"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <FaTimes className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <FaBars className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>
      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-md">
          <CustomNavLink to="/" className="block px-3 py-2 rounded-md text-sm sm:text-base font-medium">
            Home
          </CustomNavLink>
          <CustomNavLink to="/products" className="block px-3 py-2 rounded-md text-sm sm:text-base font-medium">
            Products
          </CustomNavLink>


          {isAuthenticated && (
            <>
              <Link
                to="/user"
                className="block w-full text-left px-3 py-2 rounded-md text-sm sm:text-base font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-sm sm:text-base font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
