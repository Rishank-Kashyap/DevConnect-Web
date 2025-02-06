import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");

      if (currentPassword === newPassword) {
        setError("Enter a new Password");
        return;
      }

      if (newPassword !== confirmPassword) {
        setError(
          "Enter same password in New and Confirm new password sections"
        );
        return;
      }

      const res = await axios.patch(
        `${BASE_URL}/profile/editPassword`,
        { currentPassword, newPassword },
        { withCredentials: true }
      );

      if (res.data.success) {
        setSuccess(res.data.success);

        // clearing form after successfull password change
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          navigate("/feed");
        }, 3000);
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError(err.message || "An error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border border-white/20">
        <div className="p-8 space-y-6">
          {/* Header Section */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-800">
              Dev<span className="text-blue-600">Connect</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Update your account password
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-1">
              <label className="text-gray-700 font-medium">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/80 text-gray-800"
                placeholder="Enter current password"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-700 font-medium">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/80 text-gray-800"
                placeholder="Enter new password"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Must be at least 8 characters with uppercase, lowercase, number,
                and symbol
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-gray-700 font-medium">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/80 text-gray-800"
                placeholder="Confirm new password"
                required
              />
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="text-red-500 text-sm text-center py-2 px-4 bg-red-50 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-600 text-sm text-center py-2 px-4 bg-green-50 rounded-lg">
                {success}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/feed")}
                className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
