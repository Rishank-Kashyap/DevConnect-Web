import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading profile...</p>
      </div>
    );
  }

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Edit Form */}
          <div className="w-full lg:w-1/2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 text-gray-800">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Edit Profile
                <span className="text-blue-600">.</span>
              </h1>
              <p className="text-gray-600 text-lg">
                Update your personal information
              </p>
            </div>

            <div className="space-y-6">
              {[
                { label: "First Name", value: firstName, setter: setFirstName },
                { label: "Last Name", value: lastName, setter: setLastName },
                { label: "Photo URL", value: photoUrl, setter: setPhotoUrl },
                { label: "Age", value: age, setter: setAge },
              ].map((field, index) => (
                <div key={index} className="space-y-1">
                  <label className="text-gray-700 font-medium">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/80"
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}

              {/* Gender Select */}
              <div className="space-y-1">
                <label className="text-gray-700 font-medium">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/80"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* About Section */}
              <div className="space-y-1">
                <label className="text-gray-700 font-medium">About</label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/80"
                  rows="4"
                  placeholder="Tell us about yourself"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-500 text-sm text-center py-2 px-4 bg-red-50 rounded-lg">
                  {error}
                </div>
              )}

              {/* Save Button */}
              <div className="mt-6">
                <button
                  onClick={saveProfile}
                  className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-100 to-pink-100 rounded-full blur opacity-30"></div>
                  <img
                    src={photoUrl || "/default-avatar.png"}
                    alt={`${firstName} ${lastName}`}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    onError={(e) => (e.target.src = "/default-avatar.png")}
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 text-center">
                  {firstName} {lastName}
                </h2>
                {(age || gender) && (
                  <p className="text-gray-600 text-lg">
                    {[age, gender].filter(Boolean).join(" • ")}
                  </p>
                )}
                <p className="text-gray-700 text-center line-clamp-4">
                  {about || "No description provided"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Success Toast */}
        {showToast && (
          <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Profile updated successfully!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
