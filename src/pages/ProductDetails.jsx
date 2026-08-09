import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  HiOutlineShoppingCart,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3333/api/v1/products/${id}`
        );

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (product.stock <= 0) {
      alert("This product is out of stock");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      alert("This product is already added to your cart");
      return;
    }

    cart.push({
      ...product,
      quantity: 1,
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to your cart");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3333/api/v1/products/${id}`,
        {
          method: "DELETE",
          headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete product");
        return;
      }

      alert("Product deleted successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="py-10">
        <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="h-96 bg-gray-200 rounded-lg"></div>

            <div className="space-y-5">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-5 bg-gray-200 rounded w-1/4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-500 text-lg">
          Product not found.
        </p>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-10">

          {/* Product Image */}
          <div className="h-96 bg-gray-50 rounded-lg p-6 flex items-center justify-center">
            <img
              src={product.image?.url}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col">

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mt-4">
              <span className="text-yellow-500 text-lg">
                ★★★★★
              </span>

              <span className="text-gray-500">
                {product.rating}
              </span>
            </div>

            <p className="text-gray-600 leading-7 mt-6">
              {product.description}
            </p>

            <p className="text-3xl font-bold text-green-600 mt-6">
              ₹{product.price}
            </p>

            <p className="text-gray-600 mt-4">
              Category:{" "}
              <span className="font-medium text-gray-900">
                {product.category}
              </span>
            </p>

            <p
              className={`mt-2 font-medium ${
                product.stock > 0
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {product.stock > 0
                ? `In Stock (${product.stock})`
                : "Out of Stock"}
            </p>

            {/* User Actions */}
            {!isAdmin && (
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="mt-8 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <HiOutlineShoppingCart className="text-xl" />
                {product.stock > 0
                  ? "Add to Cart"
                  : "Out of Stock"}
              </button>
            )}

            {/* Admin Actions */}
            {isAdmin && (
              <div className="flex flex-col sm:flex-row gap-3 mt-8">

                <button
                  onClick={() =>
                    navigate("/addproduct", {
                      state: product,
                    })
                  }
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  <HiOutlinePencil />
                  Edit Product
                </button>

                <button
                  onClick={handleDelete}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors cursor-pointer"
                >
                  <HiOutlineTrash />
                  Delete Product
                </button>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;