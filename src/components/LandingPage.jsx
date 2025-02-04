import { useNavigate } from "react-router-dom";
import backgroundImage from "/images/FrontPage.jpeg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-6xl font-bold text-gray-800 leading-tight">
              Dev<span className="text-blue-600">Connect</span>
            </h1>

            <p className="text-xl text-gray-700 leading-relaxed">
              Join a vibrant community of developers where ideas flourish and
              innovation knows no bounds. Whether you are a seasoned
              professional or just starting your journey, DevConnect is your
              gateway to meaningful collaborations, knowledge sharing, and
              endless possibilities in the tech world.
            </p>

            <div className="flex gap-4 pt-6">
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-8 py-3 text-lg font-semibold text-blue-600 border-2 border-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-pink-200 rounded-2xl blur-lg opacity-30"></div>
              <img
                src={backgroundImage}
                alt="Developers collaborating"
                className="relative rounded-xl shadow-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose DevConnect?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Global Community
              </h3>
              <p className="text-gray-600">
                Connect with developers worldwide and expand your professional
                network.
              </p>
            </div>

            <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Collaborative Projects
              </h3>
              <p className="text-gray-600">
                Find exciting opportunities to work on real projects with
                passionate developers.
              </p>
            </div>

            <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Knowledge Exchange
              </h3>
              <p className="text-gray-600">
                Share your expertise and learn from others in a supportive
                environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
