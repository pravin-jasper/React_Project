
import React, { useState } from "react";

const products = [
  { id: 1, name: "iPhone 15", category: "Electronics", price: 75000 },
  { id: 2, name: "Samsung Galaxy", category: "Electronics", price: 55000 },
  { id: 3, name: "Nike Shoes", category: "Fashion", price: 4500 },
  { id: 4, name: "Adidas T-Shirt", category: "Fashion", price: 1800 },
  { id: 5, name: "Laptop", category: "Electronics", price: 65000 },
  { id: 6, name: "Watch", category: "Accessories", price: 2500 },
  { id: 7, name: "Backpack", category: "Accessories", price: 1500 },
  { id: 8, name: "Headphones", category: "Electronics", price: 3500 },
];

function Day4() {
  // PROJECT 1: SEARCH AND FILTER PRODUCTS

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(100000);

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || product.category === category;

    const matchPrice = product.price <= maxPrice;

    return matchSearch && matchCategory && matchPrice;
  });

  // PROJECT 2: FORM VALIDATION

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccess("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSuccess("Registration successful!");

      console.log("Submitted Data:", {
        name: formData.name,
        email: formData.email,
      });

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#080B12] text-white px-4 py-10">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-blue-400 mb-3">
          React Practice Projects
        </h1>

        <p className="text-center text-gray-400 mb-12">
          Search • Filter • map() • filter() • Controlled Inputs • Form Validation
        </p>

        {/* PROJECT 1 */}

        <section className="bg-[#151B2B] p-6 md:p-8 rounded-2xl border border-blue-500/30 mb-12">

          <h2 className="text-2xl font-bold text-blue-400 mb-6">
            1. Search and Filter Products
          </h2>

          {/* Search and Filter Inputs */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#080B12] border border-gray-600 rounded-lg p-3 outline-none focus:border-blue-400"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-[#080B12] border border-gray-600 rounded-lg p-3 outline-none focus:border-blue-400"
            >
              <option value="All">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Accessories">Accessories</option>
            </select>

            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="bg-[#080B12] border border-gray-600 rounded-lg p-3 outline-none focus:border-blue-400"
            >
              <option value="100000">All Prices</option>
              <option value="5000">Under ₹5,000</option>
              <option value="20000">Under ₹20,000</option>
              <option value="60000">Under ₹60,000</option>
            </select>

          </div>

          <p className="text-gray-400 mb-5">
            Products Found:{" "}
            <span className="text-blue-400 font-bold">
              {filteredProducts.length}
            </span>
          </p>

          {/* Product Cards using map() */}

          {filteredProducts.length > 0 ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {filteredProducts.map((product) => (

                <div
                  key={product.id}
                  className="bg-[#080B12] border border-gray-700 hover:border-blue-400 p-5 rounded-xl transition duration-300"
                >

                  <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center text-xl font-bold mb-4">
                    {product.name.charAt(0)}
                  </div>

                  <h3 className="text-xl font-bold mb-2">
                    {product.name}
                  </h3>

                  <p className="text-gray-400 mb-2">
                    {product.category}
                  </p>

                  <p className="text-rose-400 text-lg font-bold">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>

                </div>

              ))}

            </div>

          ) : (

            <p className="text-center text-rose-400 py-10">
              No products found!
            </p>

          )}

        </section>

        {/* PROJECT 2 */}

        <section className="bg-[#151B2B] p-6 md:p-8 rounded-2xl border border-rose-500/30">

          <h2 className="text-2xl font-bold text-rose-400 mb-6">
            2. Registration Form Validation
          </h2>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* NAME */}

            <div>
              <label className="block mb-2 text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full bg-[#080B12] border border-gray-600 rounded-lg p-3 outline-none focus:border-rose-400"
              />

              {errors.name && (
                <p className="text-rose-400 text-sm mt-2">
                  {errors.name}
                </p>
              )}
            </div>

            {/* EMAIL */}

            <div>
              <label className="block mb-2 text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-[#080B12] border border-gray-600 rounded-lg p-3 outline-none focus:border-rose-400"
              />

              {errors.email && (
                <p className="text-rose-400 text-sm mt-2">
                  {errors.email}
                </p>
              )}
            </div>

            {/* PASSWORD */}

            <div>
              <label className="block mb-2 text-gray-300">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                className="w-full bg-[#080B12] border border-gray-600 rounded-lg p-3 outline-none focus:border-rose-400"
              />

              {errors.password && (
                <p className="text-rose-400 text-sm mt-2">
                  {errors.password}
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}

            <div>
              <label className="block mb-2 text-gray-300">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full bg-[#080B12] border border-gray-600 rounded-lg p-3 outline-none focus:border-rose-400"
              />

              {errors.confirmPassword && (
                <p className="text-rose-400 text-sm mt-2">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* SUCCESS MESSAGE */}

            {success && (
              <p className="bg-green-500/10 border border-green-500 text-green-400 p-3 rounded-lg">
                {success}
              </p>
            )}

            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              className="w-full bg-rose-500 hover:bg-rose-600 py-3 rounded-lg font-bold transition duration-300"
            >
              Register
            </button>

          </form>

        </section>

        <p className="text-center text-gray-500 mt-10">
          Built with React and Tailwind CSS
        </p>

      </div>

    </div>
  );
}

export default Day4;
