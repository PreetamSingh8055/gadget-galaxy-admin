import { useState } from "react";
import { adminCreateProduct } from "../../api/product.api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      await adminCreateProduct(data);

      // ✅ success toast
      toast.success("Product created successfully");

      // ⏳ small delay so user sees toast
      setTimeout(() => {
        navigate("/admin/products");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Create Product
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-purple-600 hover:underline"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Product name"
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <select
            name="category"
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select category</option>
            <option value="toys">Toys</option>
            <option value="books">Books</option>
            <option value="laptop">Laptop</option>
            <option value="mobilePhones">Mobile Phones</option>
            <option value="tablets">Tablets</option>
            <option value="others">Others</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
