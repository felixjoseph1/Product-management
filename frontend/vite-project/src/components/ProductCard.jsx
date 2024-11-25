import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import EditProductModal from "./EditProductModal";

const ProductCard = (props) => {
  const { productData, removeProduct, updateProduct, darkMode } = props;
  const { name, price, image } = productData;

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/products/${id}`);
      const { success, message } = response.data;
      removeProduct(id);
      toast.success(message);
    } catch (error) {
      toast.error(`Server Error: ${error.message}`);
    }
  };

  return (
    <div className="hover:scale-105 transform transition-all duration-300">
      <div
        className={`relative flex flex-col my-6  shadow-lg border  rounded-xl w-80 ${
          darkMode
            ? "bg-black-500 border-blue-800"
            : "bg-blue-900 border-gray-800"
        }`}
      >
        {/* Image Section */}
        <div
          className={`relative h-60 overflow-hidden rounded-t-xl ${
            darkMode ? "bg-black-900" : "bg-white"
          } `}
        >
          <img
            src={image}
            alt="card-image"
            className="h-full w-full object-cover hover:scale-110 transform transition-all duration-500"
          />
        </div>
        {/* Details Section */}
        <div className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <p
              className={`text-lg font-bold tracking-wide ${
                darkMode ? "text-slate-100" : "text-slate-100"
              }`}
            >
              {name}
            </p>
            <p className="text-teal-500 text-lg font-semibold">₹{price}</p>
          </div>

          <div className="flex justify-end items-center">
            <div className="flex space-x-4">
              {/* Edit Button */}

              <EditProductModal
                productData={productData}
                updateProduct={updateProduct}
              />
              {/* Delete Button */}
              <button
                className="flex items-center justify-center px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all"
                type="button"
                onClick={() => handleDelete(productData._id)}
              >
                <MdDelete className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
