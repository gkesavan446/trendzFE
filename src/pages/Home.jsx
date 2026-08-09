// import { useEffect, useState } from "react";
// import SearchFilter from "../components/SearchFilter";
// import ProductGrid from "../components/ProductGrid";

// function Home() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3333/api/v1/products"
//         );

//         const data = await response.json();

//         console.log("data", data);

//         setProducts(data.products);
//         setFilteredProducts(data.products);

//         const uniqueCategories = [
//           ...new Set(
//             data.products.map((product) => product.category)
//           ),
//         ];

//         setCategories(uniqueCategories);
//       } catch (error) {
//         console.error(error.message);
//       }
//     };

//     getProducts();
//   }, []);

//   const handleFilterChange = ({ search, category, price }) => {
//     let result = [...products];

//     if (search) {
//       result = result.filter((product) =>
//         product.title
//           .toLowerCase()
//           .includes(search.toLowerCase())
//       );
//     }

//     if (category) {
//       result = result.filter(
//         (product) => product.category === category
//       );
//     }

//     if (price === "below100") {
//       result = result.filter(
//         (product) => product.price < 100
//       );
//     }

//     if (price === "100-500") {
//       result = result.filter(
//         (product) =>
//           product.price >= 100 &&
//           product.price <= 500
//       );
//     }

//     if (price === "500-1000") {
//       result = result.filter(
//         (product) =>
//           product.price > 500 &&
//           product.price <= 1000
//       );
//     }

//     if (price === "above1000") {
//       result = result.filter(
//         (product) => product.price > 1000
//       );
//     }

//     setFilteredProducts(result);
//   };

//   return (
//     <div>
//       <SearchFilter
//         categories={categories}
//         onFilterChange={handleFilterChange}
//       />

//       <ProductGrid products={filteredProducts} />
//     </div>
//   );
// }

// export default Home;



import { useEffect, useState } from "react";
import SearchFilter from "../components/SearchFilter";
import ProductGrid from "../components/ProductGrid";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:3333/api/v1/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      console.log("data", data);

      const productList = data.products || [];

      setProducts(productList);
      setFilteredProducts(productList);

      const uniqueCategories = [
        ...new Set(
          productList.map((product) => product.category)
        ),
      ];

      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Failed to fetch products:", error);

      setError(
        "Unable to load products. Please check your connection and try again."
      );

      setProducts([]);
      setFilteredProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleFilterChange = ({ search, category, price }) => {
    let result = [...products];

    if (search) {
      result = result.filter((product) =>
        product.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (price === "below100") {
      result = result.filter(
        (product) => product.price < 100
      );
    }

    if (price === "100-500") {
      result = result.filter(
        (product) =>
          product.price >= 100 &&
          product.price <= 500
      );
    }

    if (price === "500-1000") {
      result = result.filter(
        (product) =>
          product.price > 500 &&
          product.price <= 1000
      );
    }

    if (price === "above1000") {
      result = result.filter(
        (product) => product.price > 1000
      );
    }

    setFilteredProducts(result);
  };

  return (
    <div className="mt-5">
      <SearchFilter
        categories={categories}
        onFilterChange={handleFilterChange}
      />

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl shadow-sm p-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            Loading products...
          </h2>

          <p className="text-gray-500 mt-2">
            Please wait while we load the products.
          </p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="bg-white rounded-xl shadow-sm p-10 text-center">
          <div className="text-4xl mb-4">
            ⚠️
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Unable to load products
          </h2>

          <p className="text-gray-500 mt-2">
            Please check your connection and try again.
          </p>

          <button
            onClick={getProducts}
            className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Try Again
          </button>
        </div>
      )}

      {/* No Products State */}
      {!loading && !error && products.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-10 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            No products found.
          </h2>

          <p className="text-gray-500 mt-2">
            There are currently no products available.
          </p>
        </div>
      )}

      {/* Products */}
      {!loading && !error && products.length > 0 && (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
}

export default Home;