import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const HomePage = () => {
  const { darkMode } = useOutletContext();
  const [productData, setproductData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // to update the UI after updating the product
  const updateProduct = (updatedProduct) => {
    const filteredData = productData.map((item) =>
      item._id === updatedProduct._id ? updatedProduct : item
    );
    setproductData(filteredData);
  };

  // to remove the product from the UI
  const removeProduct = (id) => {
    const filteredData = productData.filter((item) => item._id !== id);
    setproductData(filteredData);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/productS");
      const { data } = response.data;
      setproductData(data);
    } catch (error) {
      toast.error(`Server Error: ${error.message}`);
    }
  };

  if (productData.length === 0) {
    return (
      <div
        className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
      >
        <p
          className={`text-xl text-center pt-12 ${
            darkMode ? "text-slate-100" : "text-slate-900"
          }`}
        >
          No products found.
        </p>
        <p
          className={`text-lg text-center underline font-semibold transition-all hover:cursor-pointer ${
            darkMode
              ? "text-slate-100 hover:text-blue-800"
              : "text-blue-800  hover:text-blue-600"
          }`}
        >
          <Link to="/create">Add a new product</Link>
        </p>
      </div>
    );
  }
  return (
    <div className={darkMode ? "dark bg-gray-900 text-gray-200" : "bg-white"}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ml-8 py-10  ">
        {productData.map((item) => {
          return (
            <ProductCard
              productData={item}
              key={item._id}
              removeProduct={removeProduct}
              updateProduct={updateProduct}
              darkMode={darkMode}
            />
          );
        })}
      </div>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
};

export default HomePage;
