import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineShoppingCart,
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi";
import logo from "../assets/images/logo.png";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  // Load user and cart
  const loadUserAndCart = () => {
    try {
      const savedUser = JSON.parse(
        localStorage.getItem("user")
      );

      const savedCart =
        JSON.parse(localStorage.getItem("cart")) || [];

      setUser(savedUser);

      const totalQuantity = savedCart.reduce(
        (total, item) =>
          total + (Number(item.quantity) || 1),
        0
      );

      // If you want number of different products:
      setCartCount(savedCart.length);

      // If you want total quantity instead:
      // setCartCount(totalQuantity);

    } catch (error) {
      console.error(
        "Error loading user/cart:",
        error
      );

      setUser(null);
      setCartCount(0);
    }
  };

  // Load user/cart and listen for changes
  useEffect(() => {
    loadUserAndCart();

    window.addEventListener(
      "userUpdated",
      loadUserAndCart
    );

    window.addEventListener(
      "cartUpdated",
      loadUserAndCart
    );

    return () => {
      window.removeEventListener(
        "userUpdated",
        loadUserAndCart
      );

      window.removeEventListener(
        "cartUpdated",
        loadUserAndCart
      );
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    setUser(null);
    setCartCount(0);
    setMenuOpen(false);

    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Main Navbar */}
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src={logo}
              alt="Trendz"
              className="h-24 w-auto"
            />
          </Link>

          {/* ================= DESKTOP NAVBAR ================= */}
          <div className="hidden md:flex items-center gap-6">

            {/* Home */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-600 font-medium"
                  : "text-gray-600 hover:text-indigo-600"
              }
            >
              Home
            </NavLink>

            {/* Orders */}
            {user && (
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-medium"
                    : "text-gray-600 hover:text-indigo-600"
                }
              >
                Orders
              </NavLink>
            )}

            {/* Add Product - Admin */}
            {user && user.role === "admin" && (
              <NavLink
                to="/addproduct"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-medium"
                    : "text-gray-600 hover:text-indigo-600"
                }
              >
                Add Product
              </NavLink>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-gray-600 hover:text-indigo-600"
            >
              <HiOutlineShoppingCart className="text-2xl" />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            {user ? (
              <>
                <span className="text-gray-700 font-medium">
                  Hello,{" "}
                  {user.username
                    .slice(0, 1)
                    .toUpperCase() +
                    user.username.slice(1)}
                </span>

                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-600 font-medium cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-600 font-medium"
                      : "text-gray-600 hover:text-indigo-600"
                  }
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-600 font-medium"
                      : "text-gray-600 hover:text-indigo-600"
                  }
                >
                  Signup
                </NavLink>
              </>
            )}

          </div>

          {/* ================= MOBILE NAVBAR ================= */}
          <div
            ref={menuRef}
            className="md:hidden"
          >

            {/* Mobile Header */}
            <div className="flex items-center gap-3">

              {/* Username */}
              {user && (
                <span className="text-sm text-gray-700 font-medium">
                  Hello,{" "}
                  {user.username
                    .slice(0, 1)
                    .toUpperCase() +
                    user.username.slice(1)}
                </span>
              )}

              {/* Hamburger */}
              <button
                onClick={() =>
                  setMenuOpen(!menuOpen)
                }
                className="text-gray-700 text-2xl cursor-pointer"
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <HiOutlineX />
                ) : (
                  <HiOutlineMenu />
                )}
              </button>

            </div>

            {/* Mobile Menu */}
            {menuOpen && (
              <div className="absolute right-4 sm:right-6 top-16 w-56 bg-white border border-gray-100 shadow-lg rounded-lg py-4 z-50">

                <div className="flex flex-col gap-4 px-4">

                  {/* Home */}
                  <NavLink
                    to="/"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="text-gray-600 hover:text-indigo-600"
                  >
                    Home
                  </NavLink>

                  {/* Orders */}
                  {user && (
                    <NavLink
                      to="/orders"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className="text-gray-600 hover:text-indigo-600"
                    >
                      Orders
                    </NavLink>
                  )}

                  {/* Add Product */}
                  {user &&
                    user.role === "admin" && (
                      <NavLink
                        to="/addproduct"
                        onClick={() =>
                          setMenuOpen(false)
                        }
                        className="text-gray-600 hover:text-indigo-600"
                      >
                        Add Product
                      </NavLink>
                    )}

                  {/* Cart */}
                  <NavLink
                    to="/cart"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="text-gray-600 hover:text-indigo-600"
                  >
                    <div className="flex items-center gap-2">

                      <HiOutlineShoppingCart className="text-xl" />

                      <span>Cart</span>

                      {cartCount > 0 && (
                        <span className="bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}

                    </div>
                  </NavLink>

                  {/* User Actions */}
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="text-red-500 hover:text-red-600 text-left font-medium cursor-pointer"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      {/* Login */}
                      <NavLink
                        to="/login"
                        onClick={() =>
                          setMenuOpen(false)
                        }
                        className="text-gray-600 hover:text-indigo-600"
                      >
                        Login
                      </NavLink>

                      {/* Signup */}
                      <NavLink
                        to="/signup"
                        onClick={() =>
                          setMenuOpen(false)
                        }
                        className="text-gray-600 hover:text-indigo-600"
                      >
                        Signup
                      </NavLink>
                    </>
                  )}

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;