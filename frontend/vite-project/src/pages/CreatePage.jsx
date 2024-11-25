import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const CreatePage = () => {
  const { darkMode } = useOutletContext();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleSubmit = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.warning("Please fill all fields");
      return;
    }
    try {
      const response = await axios.post("/api/products", newProduct, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        setNewProduct({ name: "", price: "", image: "" });
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };

  return (
    <div
      className={`h-screen flex flex-col justify-center items-center ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      } `}
    >
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 pb-8">
          Create New Product
        </h1>
        <div className="pb-6">
          <input
            id="productname"
            type="text"
            name="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            placeholder="Product Name"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="pb-6">
          <input
            id="price"
            type="text"
            name="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            placeholder="Price"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="pb-6">
          <input
            id="image"
            type="text"
            name="image"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            placeholder="Image URL"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="button"
          className="w-full px-6 py-3 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-xl text-center"
          onClick={handleSubmit}
        >
          Add Product
        </button>
      </div>

      <div className="mt-8">
        <p className="text-lg text-blue-800 underline font-semibold hover:text-blue-600 transition-all hover:cursor-pointer">
          <Link to="/">View all products</Link>
        </p>
      </div>

      <ToastContainer position="bottom-center" autoClose={1500} />
    </div>
  );
};

export default CreatePage;
