import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user, onViewProfile }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  const handleSendRequest = async (status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 w-full">
      <div className="flex flex-col items-center space-y-4 h-full">
        {/* Profile Image */}
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-100 to-pink-100 rounded-full blur opacity-30"></div>
          <img
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            src={photoUrl || "/default-avatar.png"}
            onError={(e) => (e.target.src = "/default-avatar.png")}
          />
        </div>

        {/* Profile Details */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">
            {firstName} {lastName}
          </h2>
          {(age || gender) && (
            <p className="text-sm text-gray-500">
              {[age, gender].filter(Boolean).join(" • ")}
            </p>
          )}
        </div>

        {/* About Section */}
        <p className="text-gray-600 text-center line-clamp-3 flex-grow">
          {about || "Passionate developer looking to collaborate"}
        </p>

        {/* Action Buttons */}
        <div className="w-full space-y-2">
          <button
            onClick={onViewProfile}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            View Profile
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => handleSendRequest("ignored")}
              className="w-1/2 py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-all duration-300"
            >
              Ignore
            </button>
            <button
              onClick={() => handleSendRequest("interested")}
              className="w-1/2 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
