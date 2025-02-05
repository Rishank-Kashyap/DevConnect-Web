import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex flex-col items-center p-8">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
        {/* Edit Form */}
        <div className="w-full md:w-1/2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Edit Profile
          </h2>

          <div className="space-y-4 text-gray-700">
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
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm mt-4 text-center py-2 px-4 bg-red-50 rounded-lg">
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

        {/* Preview Section */}
        <div className="w-full md:w-1/2">
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>

      {/* Success Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-up">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
