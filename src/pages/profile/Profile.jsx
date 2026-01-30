import { ShieldCheck, Mail, User } from "lucide-react";
import { useUser } from "../../context/AuthContext";

const Profile = () => {
  // Later you can fetch real data from backend
  const admin = {
    name: "Super Admin",
    email: "admin@gmail.com",
    role: "ADMIN",
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-6 sm:pt-10 px-4">
      <div className="w-full max-w-xl bg-gray-950 border border-purple-800 rounded-xl shadow-lg p-4 sm:p-6">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
         <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-purple-700/30 flex items-center justify-center text-purple-400 text-xl sm:text-2xl font-bold">
            A
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              {admin.name}
            </h2>
            <span className="inline-block mt-1 text-xs bg-purple-700/20 text-purple-400 px-2 py-1 rounded">
              {admin.role}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-gray-900 p-3 rounded-lg border border-purple-800">
            <User size={18} className="text-purple-400" />
            <div>
              <p className="text-xs text-gray-400">Name</p>
              <p className="text-sm text-white">{admin.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-900 p-3 rounded-lg border border-purple-800">
            <Mail size={18} className="text-purple-400" />
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm text-white">{admin.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-900 p-3 rounded-lg border border-purple-800">
            <ShieldCheck size={18} className="text-purple-400" />
            <div>
              <p className="text-xs text-gray-400">Role</p>
              <p className="text-sm text-white">{admin.role}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-6">
          Profile editing is disabled for security reasons.
        </p>
      </div>
    </div>
  );
};

export default Profile;
