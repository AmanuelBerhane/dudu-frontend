import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaBars, 
  FaTimes, 
  FaShoppingCart, 
  FaUser, 
  FaSignInAlt, 
  FaSignOutAlt, 
  FaHome, 
  FaBoxOpen,
  FaArrowLeft
} from 'react-icons/fa';
import '../styles/components/Navbar.css';

// Custom NavLink component with active state
const CustomNavLink = ({ to, children, ...props }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `nav-link ${isActive ? 'active' : ''}`
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
    <div className="navbar-container">
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-content">
            <div className="logo-container">
              <span className="logo-text">
                <span className="logo-highlight">Dudu's</span>
                <span className="logo-subtext">Clothing</span>
              </span>
            </div>
            
            {/* Management Back/Logout Buttons */}
            {isUserSection && isAuthenticated && (
              <div className="auth-buttons">
                {isDashboard && (
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="icon-left" /> Logout
                  </button>
                )}
                {isManagementPage && (
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={handleBack}
                  >
                    <FaArrowLeft className="icon-left" /> Back
                  </button>
                )}
              </div>
            )}

            {/* Desktop Navigation */}
            <div className="desktop-nav">
              <div className="nav-links">
                <CustomNavLink to="/products">
                  <FaBoxOpen className="icon-left" /> Products
                </CustomNavLink>

                {isAuthenticated ? (
                  <CustomNavLink to="/user">
                    <FaUser className="icon-left" /> Dashboard
                  </CustomNavLink>
                ) : (
                  <CustomNavLink to="/user" className="login-button">
                    <FaSignInAlt className="icon-left" /> Login
                  </CustomNavLink>
                )}
              </div>
            </div>

            <div className="nav-actions">
              {!isAuthenticated && (
                <Link to="/user" className="mobile-login-button">
                  <FaSignInAlt className="icon-left" /> Login
                </Link>
              )}
              <Link 
                to="/order" 
                className="cart-icon"
              >
                <FaShoppingCart className="icon" />
                {orderCount > 0 && (
                  <span className="cart-badge">
                    {orderCount}
                  </span>
                )}
              </Link>
              <button
                onClick={toggleMenu}
                className="menu-toggle"
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation"
              >
                {isMenuOpen ? (
                  <FaTimes className="icon" />
                ) : (
                  <FaBars className="icon" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <CustomNavLink to="/">
            <FaHome className="icon-left" /> Home
          </CustomNavLink>
          <CustomNavLink to="/products">
            <FaBoxOpen className="icon-left" /> Products
          </CustomNavLink>

          {isAuthenticated && (
            <>
              <CustomNavLink to="/user">
                <FaUser className="icon-left" /> Dashboard
              </CustomNavLink>
              <button
                onClick={handleLogout}
                className="mobile-menu-link"
              >
                <FaSignOutAlt className="icon-left" /> Logout
              </button>
            </>
          )}
          
          {!isAuthenticated && (
            <CustomNavLink to="/login">
              <FaSignInAlt className="icon-left" /> Login
            </CustomNavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
