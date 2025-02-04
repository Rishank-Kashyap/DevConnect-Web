import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
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
              Join our developer community
            </p>
          </div>

          {/* Form Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-gray-700 font-medium">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/80 text-black"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-700 font-medium">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/80 text-black"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-700 font-medium">Email ID</label>
              <input
                type="email"
                value={emailId}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/80 text-black"
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-700 font-medium">Password</label>
              <input
                type="password"
                value={password}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/80 text-black"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center py-2 px-4 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={handleSignUp}
              className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Create Account
            </button>
          </div>

          {/* Footer Section */}
          <div className="text-center pt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors cursor-pointer"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;