import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, setSelectedRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Requests = () => {
    const {requests} = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleProfile = ( request ) => {
        try{
            dispatch(setSelectedRequest(request.fromUserId));
            navigate("/requests/info")
        }
        catch(err){console.log(err)}
      }

    const fetchRequests = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/requests/received", {withCredentials: true,})

            dispatch(addRequests(res.data.data))
        }
        catch (err){
            console.error(err);
        }
    }

    useEffect(() => {
        fetchRequests();
    },[])

    
  if (!requests)
    return (
      <h1 className="flex justify-center items-center text-xl">Loading....</h1>
    );

  if (requests.length === 0)
    return (
      <h1 className="flex justify-center items-center text-xl">
        {" "}
        No Requests Found
      </h1>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-10 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
              Your Requests
              <span className="text-blue-600">.</span>
            </h1>
    
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests.map((request) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } =
                  request.fromUserId;
    
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
                        <button className="btn px-5 bg-gray-900 text-white border-transparent hover:bg-gray-950 active:bg-black disabled:bg-gray-700 disabled:opacity-50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300" onClick={() => handleProfile(request)}>
                          View Profile
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
}

export default Requests