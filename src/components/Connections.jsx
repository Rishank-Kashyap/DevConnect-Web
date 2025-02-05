import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections, setSelectedConnection } from "../utils/connectionSlice";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const {connections} = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfile = ( connection ) => {
    try{
        dispatch(setSelectedConnection(connection));
        navigate("/connections/info")
    }
    catch(err){console.log(err)}
  }

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);


  if (!connections) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            🌟 Build Your Network
          </h1>
          <p className="text-gray-600 text-lg">
            Start connecting with amazing developers and grow your professional
            circle!
          </p>
        </div>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            🚀 Ready to Connect?
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Your future collaborators are waiting! Explore the feed to find
            developers who share your interests.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-10 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Your Developer Network
          <span className="text-blue-600">.</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              connection;

            return (
              <div
                key={_id}
                className="bg-gradient-to-br from-blue-100/50 to-pink-100/50 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Profile Image */}
                  <div className="relative mb-4">
                    <img
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white/80 shadow-lg"
                      src={photoUrl || "/default-avatar.png"}
                      onError={(e) => {
                        e.target.src = "/default-avatar.png";
                      }}
                    />
                  </div>

                  {/* Name and Details */}
                  <h2 className="text-2xl font-bold text-gray-800">
                    {firstName} {lastName}
                  </h2>
                  {(age || gender) && (
                    <p className="text-sm text-gray-600 mt-1">
                      {[age, gender].filter(Boolean).join(" • ")}
                    </p>
                  )}

                  {/* About Section */}
                  <p className="text-gray-700 mt-4 text-center line-clamp-3">
                    {about || "Passionate developer looking to collaborate"}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-3 w-full justify-center">
                    <button className="btn px-5 bg-gray-900 text-white border-transparent hover:bg-gray-950 active:bg-black disabled:bg-gray-700 disabled:opacity-50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300" onClick={() => handleProfile(connection)}>
                      Profile
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;
