import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/feed`, {
                withCredentials: true,
            });
            dispatch(addFeed(res?.data?.data));
        } catch (err) {
            console.error("Error fetching feed:", err.response?.data || err.message);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    if (!feed) return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center">
            <div className="animate-pulse text-2xl font-semibold text-gray-600">
                Loading feed...
            </div>
        </div>
    );

    if (feed.length === 0) return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex flex-col items-center justify-center p-8">
            <div className="text-center max-w-md space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">🌟 No New Users Found</h1>
                <p className="text-gray-600 text-lg">
                    You&apos;ve seen all available profiles. Check back later for new connections!
                </p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <div className="flex justify-center">
                    {feed.map((user) => (
                        <UserCard key={user._id} user={user} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Feed;