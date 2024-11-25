import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import axios from "axios";

const EditProductModal = (props) => {
  const { productData, updateProduct } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [updatedProduct, setupdatedProduct] = useState(productData || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setupdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleUpdate = async (id, onClose) => {
    try {
      const response = await axios.put(`/api/products/${id}`, updatedProduct);
      const { success, message } = response.data;
      if (success) {
        updateProduct(updatedProduct);
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Server Error:" + error.message);
    }
    onClose();
  };
  return (
    <div className="flex flex-col gap-2">
      {/* Button to Open Modal */}
      <button
        onClick={onOpen}
        className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all"
        type="button"
      >
        <FaRegEdit className="w-5 h-5" />
      </button>
      {/* Centered Modal */}
      <Modal
        isOpen={isOpen}
        placement="center" // Always center the modal
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-xl">
                Update Product
              </ModalHeader>
              <ModalBody>
                <div className="pb-6">
                  <input
                    id="productname"
                    type="text"
                    name="name"
                    value={updatedProduct.name || ""}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="pb-6">
                  <input
                    id="price"
                    type="text"
                    name="price"
                    value={updatedProduct.price || ""}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="pb-6">
                  <input
                    id="image"
                    type="text"
                    name="image"
                    value={updatedProduct.image || ""}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleUpdate(updatedProduct._id, onClose)}
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditProductModal;
