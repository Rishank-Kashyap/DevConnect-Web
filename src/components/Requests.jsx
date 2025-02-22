import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addRequests,
  removeRequest,
  setSelectedRequest,
} from "../utils/requestSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const { requests } = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleProfile = (request) => {
    try {
      dispatch(setSelectedRequest(request.fromUserId));
      navigate("/requests/info");
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center">
        <div className="animate-pulse text-2xl font-semibold text-gray-600">
          Loading requests...
        </div>
      </div>
    );
  }

  if (!loading && requests.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-md space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">
            📭 No Requests Found
          </h1>
          <p className="text-gray-600 text-lg">
            You don&apos;t have any pending connection requests at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Connection Requests
            <span className="text-blue-600">.</span>
          </h1>
          <p className="text-lg text-gray-600">
            Manage your incoming collaboration requests
          </p>
        </div>

        <div className="flex justify-center">
          <div
            className={`grid gap-8 ${
              requests.length === 1
                ? "grid-cols-1 max-w-md"
                : requests.length === 2
                ? "grid-cols-2 max-w-2xl"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {requests.map((request) => {
              const { _id, firstName, lastName, photoUrl, age, gender, about } =
                request.fromUserId;

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

                    {/* Action Buttons */}
                    <div className="w-full space-y-3">
                      <button
                        onClick={() => handleProfile(request)}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                      >
                        View Profile
                      </button>
                      <div className="flex gap-3">
                        <button
                          onClick={() => reviewRequest("rejected", request._id)}
                          className="flex-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => reviewRequest("accepted", request._id)}
                          className="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                        >
                          Accept
                        </button>
                      </div>
                    </div>
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

export default Requests;
