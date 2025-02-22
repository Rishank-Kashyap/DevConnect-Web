import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addConnections,
  setSelectedConnection,
} from "../utils/connectionSlice";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const { connections } = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleProfile = (connection) => {
    try {
      dispatch(setSelectedConnection(connection));
      navigate("/connections/info");
    } catch (err) {
      console.error(err);
    }
  };

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center">
        <div className="animate-pulse text-2xl font-semibold text-gray-600">
          Loading connections...
        </div>
      </div>
    );
  }

  if (!loading && connections.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-md space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">
            🚀 Ready to Connect?
          </h1>
          <p className="text-gray-600 text-lg">
            Your future collaborators are waiting! Explore the feed to find
            developers who share your interests.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Your Developer Network
          <span className="text-blue-600">.</span>
        </h1>

        <div className="flex justify-center">
          <div
            className={`grid gap-8 ${
              connections.length === 1
                ? "grid-cols-1 max-w-md"
                : connections.length === 2
                ? "grid-cols-2 max-w-2xl"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {connections.map((connection) => {
              const { _id, firstName, lastName, photoUrl, age, gender, about } =
                connection;

              return (
                <div
                  key={_id}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col items-center space-y-4">
                    {/* Profile Image */}
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-100 to-pink-100 rounded-full blur opacity-30"></div>
                      <img
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        src={photoUrl || "/default-avatar.png"}
                        onError={(e) => {
                          e.target.src = "/default-avatar.png";
                        }}
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
                    <p className="text-gray-600 text-center line-clamp-3">
                      {about || "Passionate developer looking to collaborate"}
                    </p>

                    {/* Action Button */}
                    <button
                      onClick={() => handleProfile(connection)}
                      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;
