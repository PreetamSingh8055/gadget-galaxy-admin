import { useEffect, useState } from "react";
import { getAllProducts, adminDeleteProduct } from "../../api/product.api";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">
          Products ({products.length})
        </h1>

        <Link
          to="/admin/products/create"
          className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          + Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className="border-t hover:bg-gray-50"
              >
                {/* Image */}
                <td className="p-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 rounded object-cover border"
                  />
                </td>

                <td className="p-3 font-medium">{p.name}</td>

                <td className="p-3">₹{p.price}</td>

                <td className="p-3 capitalize">{p.category}</td>

                <td className="p-3">{p.stock || 0}</td>

                <td className="p-3">
                  <button
                    onClick={() =>
                      adminDeleteProduct(p._id).then(fetchProducts)
                    }
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
