import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/AuthContext";

const AdminLogin = () => {
  const [seen, setSeen] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formData);
    if (res?.role === "admin") navigate("/admin/dashboard");
    else alert("Admins only");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-purple-300">
      <div className="bg-gray-900 border border-purple-700 p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            placeholder="Admin Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 rounded bg-black border border-purple-600"
          />

          <div className="relative">
            <input
              type={seen ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-2 rounded bg-black border border-purple-600"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setSeen(!seen)}
            >
              {seen ? <Eye /> : <EyeOff />}
            </span>
          </div>

          <button className="w-full bg-purple-600 text-black py-2 rounded hover:bg-purple-500">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
