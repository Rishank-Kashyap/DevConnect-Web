import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 text-center p-8 space-y-6">
        <div className="text-9xl text-blue-500 mb-4">😕</div>

        <h1 className="text-4xl font-bold text-gray-800">
          Oops!
          <span className="text-blue-600">!</span>
        </h1>

        <h2 className="text-2xl text-gray-600 mb-6">Page Not Found</h2>

        <p className="text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/feed")}
          className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default Error;
