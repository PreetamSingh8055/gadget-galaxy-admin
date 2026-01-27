import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/auth/AdminLogin";
import Dashboard from "../pages/dashboard/Dashboard";
import ProductList from "../pages/products/ProdectList.jsx";
import OrderList from "../pages/orders/OrderList";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../components/layout/AdminLayout";
import CreateProduct from "../pages/products/CreateProduct";
import Profile from "../pages/profile/Profile";



const AdminRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected with Layout */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ProductList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <OrderList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
  path="/admin/profile"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <Profile />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

    <Route
  path="/admin/products/create"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <CreateProduct />
      </AdminLayout>
    </ProtectedRoute>
  }
/>


    </Routes>
  );
};

export default AdminRoutes;
