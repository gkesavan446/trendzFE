import { useState } from "react";



function SearchFilter({ categories = [], onFilterChange }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearch(value);

    onFilterChange({
      search: value,
      category,
      price,
    });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;

    setCategory(value);

    onFilterChange({
      search,
      category: value,
      price,
    });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;

    setPrice(value);

    onFilterChange({
      search,
      category,
      price: value,
    });
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setPrice("");

    onFilterChange({
      search: "",
      category: "",
      price: "",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
      <div className="flex flex-col md:flex-row gap-3">

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
          className="w-full md:flex-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />

        {/* Category */}
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-full md:w-48 px-4 py-3 border border-gray-300 rounded-lg bg-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        >
          <option value="">All Categories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Price */}
        <select
          value={price}
          onChange={handlePriceChange}
          className="w-full md:w-48 px-4 py-3 border border-gray-300 rounded-lg bg-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        >
          <option value="">All Prices</option>
          <option value="below100">Below ₹100</option>
          <option value="100-500">₹100 - ₹500</option>
          <option value="500-1000">₹500 - ₹1000</option>
          <option value="above1000">Above ₹1000</option>
        </select>

        {/* Clear Filter */}
        <button
          onClick={clearFilters}
          className="w-full md:w-auto px-5 py-3 rounded-lg border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
        >
          Clear Filter
        </button>

      </div>
    </div>
  );
}

export default SearchFilter;