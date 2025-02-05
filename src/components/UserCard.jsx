import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  const handleSendRequest = async (status, userId) => {
    try{
      await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {withCredentials: true})
      dispatch(removeUserFromFeed(userId))
    }
    catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="card bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 w-96">
      <figure className="relative">
        <img
          src={photoUrl || "/default-avatar.png"}
          alt={`${firstName} ${lastName}`}
          className="w-full h-64 object-cover rounded-t-xl"
          onError={(e) => {
            e.target.src = "/default-avatar.png";
          }}
        />
      </figure>
      <div className="card-body p-6">
        <h2 className="card-title text-2xl font-bold text-gray-800">
          {firstName} {lastName}
        </h2>
        {(age || gender) && (
          <p className="text-sm text-gray-600">
            {[age, gender].filter(Boolean).join(" • ")}
          </p>
        )}
        <p className="text-gray-700 mt-4">{about}</p>
        <div className="card-actions justify-center mt-6 gap-4">
          <button className="btn btn-primary px-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300" onClick={() => handleSendRequest("ignored", _id)}>
            Ignore
          </button>
          <button className="btn btn-secondary px-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300" onClick={() => handleSendRequest("interested", _id)}>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;