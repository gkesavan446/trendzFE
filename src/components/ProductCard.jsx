import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    // User is not logged in
    if (!token) {
      navigate("/login");
      return;
    }

    // Product is out of stock
    if (product.stock <= 0) {
      alert("Product is out of stock");
      return;
    }

    // Get current cart
    const currentCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    // Check whether product is already in cart
    const existingProduct = currentCart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      alert("Product is already added to cart");
      return;
    }

    // Add product with quantity 1
    const updatedCart = [
      ...currentCart,
      {
        ...product,
        quantity: 1,
      },
    ];

    try {
      const response = await fetch(
        "https://trendzbe.onrender.com/api/v1/auth/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cart: updatedCart,
          }),
        }
      );

      const data = await response.json();

      // console.log("Add cart response:", data);

      if (!response.ok) {
        alert(
          data.message || "Failed to add product to cart"
        );
        return;
      }

      // Backend returns the saved cart
      const savedCart = data.cart || updatedCart;

      // Update local cart
      localStorage.setItem(
        "cart",
        JSON.stringify(savedCart)
      );

      // Tell Navbar to update cart count
      window.dispatchEvent(
        new Event("cartUpdated")
      );

    } catch (error) {
      console.error("Add to cart error:", error.message);
      alert("Something went wrong while adding to cart");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">

      {/* Product Image */}
      <div className="h-64 bg-gray-50 flex items-center justify-center p-4">
        <img
          src={product.image?.url}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">

        <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {product.title}
        </h2>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4">

          <span className="text-lg font-bold text-indigo-600">
            ₹{product.price}
          </span>

          <span className="text-sm text-gray-500">
            ⭐ {product.rating}
          </span>

        </div>

        {/* Stock */}
        {product.stock > 0 ? (
          <p className="text-sm text-green-600 mt-2">
            In Stock
          </p>
        ) : (
          <p className="text-sm text-red-500 mt-2">
            Out of Stock
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-2 mt-4">

          <button
            onClick={() =>
              navigate(`/product/${product._id}`)
            }
            className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors cursor-pointer"
          >
            View
          </button>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Add to Cart
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;