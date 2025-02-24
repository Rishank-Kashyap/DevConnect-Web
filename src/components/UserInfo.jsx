import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const navigate = useNavigate();
  const { selectedUser } = useSelector((store) => store.feed);

  if (!selectedUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            🕵️ No Profile Selected
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Please select a profile from the feed to view details
          </p>
          <button
            onClick={() => navigate("/feed")}
            className="btn btn-primary px-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            Back to Feed
          </button>
        </div>
      </div>
    );
  }

  const { firstName, lastName, photoUrl, age, gender, about } = selectedUser;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <button
          onClick={() => navigate("/feed")}
          className="mb-8 px-6 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-white/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group"
        >
          <span className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
            ←
          </span>
          <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-300">
            Back to Feed
          </span>
        </button>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative">
                <img
                  src={photoUrl || "/default-avatar.png"}
                  alt={`${firstName} ${lastName}`}
                  className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
                  onError={(e) => (e.target.src = "/default-avatar.png")}
                />
              </div>
            </div>

            <div className="w-full md:w-2/3 space-y-4">
              <h1 className="text-4xl font-bold text-gray-800">
                {firstName} {lastName}
              </h1>
              {(age || gender) && (
                <p className="text-lg text-gray-600">
                  {[age, gender].filter(Boolean).join(" • ")}
                </p>
              )}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  About
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {about ||
                    "This developer prefers to let their work speak for itself."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
