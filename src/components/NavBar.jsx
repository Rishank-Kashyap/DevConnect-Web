import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-gradient-to-br from-blue-50 via-white to-pink-50 shadow-lg">
      <div className="flex-1">
        <Link
          to="/feed"
          className="btn btn-ghost text-xl font-bold text-gray-800 hover:bg-blue-100 rounded-lg group" // Add group class for child hover effects
        >
          🧑‍💻
          <span className="group-hover:text-blue-600 transition-colors duration-300">
            Dev
          </span>
          <span className="text-blue-600 group-hover:text-gray-800 transition-colors duration-300">
            Connect
          </span>
        </Link>
      </div>
      {user && (
        <div className="flex gap-2 items-center">
          <div className="form-control text-gray-700 font-medium">
            Welcome, {user.firstName}
          </div>

          <div className="dropdown dropdown-end mx-5 flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User Photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gradient-to-br from-blue-50/95 via-white/95 to-pink-50/95 backdrop-blur-sm rounded-xl border border-white/20 z-[1] mt-3 w-52 p-1 shadow-xl"
            >
              <li className="py-0.5">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-base text-gray-700 hover:text-blue-600 transition-all duration-300 px-3 py-1.5 rounded-md hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                </Link>
              </li>

              <div className="divider my-1 h-[1px] bg-gradient-to-r from-blue-200/50 via-pink-200/50 to-transparent" />

              <li className="py-0.5">
                <Link
                  to="/connections"
                  className="flex items-center gap-2 text-base text-gray-700 hover:text-blue-600 transition-all duration-300 px-3 py-1.5 rounded-md hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Connections
                </Link>
              </li>

              <li className="py-0.5">
                <Link
                  to="/requests"
                  className="flex items-center gap-2 text-base text-gray-700 hover:text-blue-600 transition-all duration-300 px-3 py-1.5 rounded-md hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-pink-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Requests
                </Link>
              </li>

              <li className="py-0.5">
                <Link
                  to="/editPassword"
                  className="flex items-center gap-2 text-base text-gray-700 hover:text-blue-600 transition-all duration-300 px-3 py-1.5 rounded-md hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Edit Password
                </Link>
              </li>

              <div className="divider my-1 h-[1px] bg-gradient-to-r from-blue-200/50 via-pink-200/50 to-transparent" />

              <li className="py-0.5">
                <a
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-base text-gray-700 hover:text-red-600 transition-all duration-300 px-3 py-1.5 rounded-md hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
