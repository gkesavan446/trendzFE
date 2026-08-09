// import { useEffect, useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import {
//   HiOutlineShoppingCart,
//   HiOutlineMenu,
//   HiOutlineX,
// } from "react-icons/hi";

// const navLinkStyle = ({ isActive }) =>
//   isActive
//     ? "text-indigo-600 font-medium"
//     : "text-gray-600 hover:text-indigo-600";

// function Navbar() {
//   const navigate = useNavigate();

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);

//   const token = localStorage.getItem("token");

//   const user = JSON.parse(
//     localStorage.getItem("user") || "null"
//   );

//   useEffect(() => {
//     const updateCartCount = () => {
//       const cart =
//         JSON.parse(localStorage.getItem("cart")) || [];

//       setCartCount(cart.length);
//     };

//     updateCartCount();

//     window.addEventListener(
//       "cartUpdated",
//       updateCartCount
//     );

//     return () => {
//       window.removeEventListener(
//         "cartUpdated",
//         updateCartCount
//       );
//     };
//   }, []);



//   const handleLogout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
//   localStorage.removeItem("cart");

//   setCartCount(0);
//   setMenuOpen(false);

//   navigate("/");
// };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">

//       <div className="max-w-7xl mx-auto px-4 sm:px-6">

//         {/* Main Navbar */}
//         <div className="h-16 flex items-center justify-between">

//           {/* Logo */}
//           <Link
//             to="/"
//             onClick={() => setMenuOpen(false)}
//           >
//             <img
//               src="/logo.png"
//               alt="Trendz"
//               className="h-12 w-auto object-contain"
//             />
//           </Link>

//           {/* Desktop Navbar */}
//           <div className="hidden md:flex items-center gap-6">

//             <NavLink
//               to="/"
//               className={navLinkStyle}
//             >
//               Home
//             </NavLink>

//             {token && (
//               <NavLink
//                 to="/orders"
//                 className={navLinkStyle}
//               >
//                 Orders
//               </NavLink>
//             )}

//             {user?.role === "admin" && (
//               <NavLink
//                 to="/addproduct"
//                 className={navLinkStyle}
//               >
//                 Add Product
//               </NavLink>
//             )}

//             {/* Cart */}
//             <NavLink
//               to="/cart"
//               className="relative text-gray-600 hover:text-indigo-600"
//             >
//               <HiOutlineShoppingCart className="text-2xl" />

//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </NavLink>

//             {/* User */}
//             {token ? (
//               <>
//                 <span className="text-gray-700 font-medium">
//                   Hello, {user?.username}
//                 </span>

//                 <button
//                   onClick={handleLogout}
//                   className="text-red-500 hover:text-red-600 font-medium cursor-pointer"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <NavLink
//                   to="/login"
//                   className={navLinkStyle}
//                 >
//                   Login
//                 </NavLink>

//                 <NavLink
//                   to="/signup"
//                   className={navLinkStyle}
//                 >
//                   Signup
//                 </NavLink>
//               </>
//             )}

//           </div>

//           {/* Mobile Navbar */}
//           <div className="md:hidden flex items-center gap-3">

//             {/* Hello should remain visible */}
//             {token && (
//               <span className="text-sm text-gray-700 font-medium">
//                 Hello, {user?.username}
//               </span>
//             )}

//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="text-gray-700 text-2xl cursor-pointer"
//               aria-label="Toggle menu"
//             >
//               {menuOpen ? (
//                 <HiOutlineX />
//               ) : (
//                 <HiOutlineMenu />
//               )}
//             </button>

//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className="md:hidden border-t border-gray-100 py-4">

//             <div className="flex flex-col gap-4">

//               <NavLink
//                 to="/"
//                 className={navLinkStyle}
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Home
//               </NavLink>

//               {token && (
//                 <NavLink
//                   to="/orders"
//                   className={navLinkStyle}
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   Orders
//                 </NavLink>
//               )}

//               {user?.role === "admin" && (
//                 <NavLink
//                   to="/addproduct"
//                   className={navLinkStyle}
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   Add Product
//                 </NavLink>
//               )}

//               {/* Mobile Cart */}
//               <NavLink
//                 to="/cart"
//                 className={navLinkStyle}
//                 onClick={() => setMenuOpen(false)}
//               >
//                 <div className="flex items-center gap-2">
//                   <HiOutlineShoppingCart className="text-xl" />

//                   <span>Cart</span>

//                   {cartCount > 0 && (
//                     <span className="bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                       {cartCount}
//                     </span>
//                   )}
//                 </div>
//               </NavLink>

//               {token ? (
//                 <button
//                   onClick={handleLogout}
//                   className="text-red-500 hover:text-red-600 text-left font-medium cursor-pointer"
//                 >
//                   Logout
//                 </button>
//               ) : (
//                 <>
//                   <NavLink
//                     to="/login"
//                     className={navLinkStyle}
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     Login
//                   </NavLink>

//                   <NavLink
//                     to="/signup"
//                     className={navLinkStyle}
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     Signup
//                   </NavLink>
//                 </>
//               )}

//             </div>
//           </div>
//         )}

//       </div>
//     </nav>
//   );
// }

// export default Navbar;



import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineShoppingCart,
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi";
import logo from '../assets/images/logo.png'

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Load user and cart from localStorage
  const loadUserAndCart = () => {
    try {
      const savedUser = JSON.parse(
        localStorage.getItem("user")
      );

      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

      setUser(savedUser);

      const totalQuantity = savedCart.reduce((total, item) => total + (Number(item.quantity) || 1), 0);

      setCartCount(savedCart.length);

    } catch (error) {
      console.error(
        "Error loading user/cart:",
        error
      );

      setUser(null);
      setCartCount(0);
    }
  };

  useEffect(() => {
    // Load when Navbar first mounts
    loadUserAndCart();

    // Login/logout changes
    window.addEventListener(
      "userUpdated",
      loadUserAndCart
    );

    // Cart changes
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

  const handleLogout = () => {
    // Remove login information
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Remove local cart for logged-out session
    localStorage.removeItem("cart");

    // Immediately update Navbar
    setUser(null);
    setCartCount(0);
    setMenuOpen(false);

    // Go home
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">

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
              className="h-24 w-auto "
            />
          </Link>

          {/* Desktop Navbar */}
          <div className="hidden md:flex items-center gap-6">

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

              

            {/* Logged In */}
            {user ? (
              <>
                <span className="text-gray-700 font-medium">
                  Hello, {user.username}
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

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">

            {user && (
              <span className="text-sm text-gray-700 font-medium">
                Hello, {user.username}
              </span>
            )}

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

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">

            <div className="flex flex-col gap-4">

              <NavLink
                to="/"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="text-gray-600 hover:text-indigo-600"
              >
                Home
              </NavLink>

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

              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-600 text-left font-medium cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="text-gray-600 hover:text-indigo-600"
                  >
                    Login
                  </NavLink>

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

    </nav>
  );
}

export default Navbar;