import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AddProduct() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state;
  const isEdit = Boolean(product);
  console.log("isEdit", isEdit)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    rating: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
        stock: product.stock || "",
        rating: product.rating || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (!selectedImage) {
      return;
    }

    setImage(selectedImage);
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("stock", formData.stock);
      data.append("rating", formData.rating);

      if (image) {
        data.append("image", image);
      }
      console.log("product._id", product)
      const url = isEdit
        ? `http://localhost:3333/api/v1/products/${product._id}`
        : "http://localhost:3333/api/v1/products";
      console.log("url", url)
      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Something went wrong");
        return;
      }

      alert(
        isEdit
          ? "Product updated successfully"
          : "Product added successfully"
      );

      navigate("/");
    } catch (error) {
      console.error(error);      
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6 sm:p-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          {isEdit ? "Edit Product" : "Add Product"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product title"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="4"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none resize-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="0"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              min="0"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>

            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Enter rating"
              min="0"
              max="5"
              step="0.1"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isEdit ? "Change Image" : "Product Image"}
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={!isEdit}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg cursor-pointer"
            />

            {/* New Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Selected product"
                  className="w-40 h-40 object-contain rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {loading
              ? isEdit
                ? "Updating Product..."
                : "Adding Product..."
              : isEdit
              ? "Update Product"
              : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;