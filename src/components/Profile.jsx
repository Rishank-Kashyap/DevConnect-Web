import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center">
        <div className="animate-pulse text-2xl font-semibold text-gray-600">
          Loading profile...
        </div>
      </div>
    );

  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Image */}
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-100 to-pink-100 rounded-full blur opacity-30"></div>
                <img
                  src={photoUrl || "/default-avatar.png"}
                  alt={`${firstName} ${lastName}`}
                  className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
                  onError={(e) => (e.target.src = "/default-avatar.png")}
                />
              </div>
            </div>

            {/* Profile Details */}
            <div className="w-full md:w-2/3 space-y-4">
              <h1 className="text-4xl font-bold text-gray-800">
                {firstName} {lastName}
              </h1>

              {(age || gender) && (
                <p className="text-lg text-gray-600">
                  {[age, gender].filter(Boolean).join(" • ")}
                </p>
              )}

              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-gray-800">About</h3>
                <p className="text-gray-700 leading-relaxed">
                  {about ||
                    "This developer prefers to let their work speak for itself."}
                </p>
              </div>

              <div className="pt-6">
                <Link
                  to="/editProfile"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
