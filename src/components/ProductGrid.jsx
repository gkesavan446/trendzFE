import ProductCard from "./ProductCard";

function ProductGrid({ products = [] }) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm py-16 text-center mt-5">
        <p className="text-gray-500 text-lg">
          No products found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductGrid;