import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, setSelectedUser } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((store) => store.feed);
  const [loading, setLoading] = useState(true);

  const handleViewProfile = (user) => {
    dispatch(setSelectedUser(user));
    navigate("/feed/info");
  };

  const getFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Error fetching feed:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center">
        <div className="animate-pulse text-2xl font-semibold text-gray-600">
          Loading feed...
        </div>
      </div>
    );
  }

  if (!loading && users.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-md space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">
            🌟 No New Users Found
          </h1>
          <p className="text-gray-600 text-lg">
            You&apos;ve seen all available profiles. Check back later for new
            connections!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Discover Developers
          <span className="text-blue-600">.</span>
        </h1>

        <div className="flex justify-center">
          <div className={`grid gap-8 ${
            users.length === 1 
              ? "grid-cols-1 max-w-md" 
              : users.length === 2 
              ? "grid-cols-2 max-w-2xl" 
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          } justify-items-center`}>
            {users.map((user) => (
              <UserCard 
                key={user._id}
                user={user}
                onViewProfile={() => handleViewProfile(user)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
