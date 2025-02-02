const NavBar = () => {
    return (
      <nav className="navbar bg-base-300 shadow-md px-6">
        {/* Left Side: Logo */}
        <div className="flex-1">
          <a className="btn btn-ghost text-2xl font-bold tracking-wide">
            🧑‍💻 DevConnect
          </a>
        </div>
  
        {/* Right Side: Profile Dropdown */}
        <div className="flex-none gap-4">
          <div className="dropdown dropdown-end">
            {/* Profile Image Button */}
            <button
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:bg-base-200 transition"
            >
              <div className="w-12 rounded-full border border-base-100 shadow-md">
                <img
                  alt="Profile"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </button>
  
            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu dropdown-content z-50 mt-4 w-56 rounded-lg bg-base-100 p-3 shadow-xl transition-all duration-200 ease-in-out"
            >
              <li>
                <a className="justify-between hover:bg-base-200 rounded-lg p-2 transition">
                  Profile
                  <span className="badge badge-primary">New</span>
                </a>
              </li>
              <li>
                <a className="hover:bg-base-200 rounded-lg p-2 transition">
                  Settings
                </a>
              </li>
              <li>
                <a className="hover:bg-red-500 hover:text-white rounded-lg p-2 transition">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };
  
  export default NavBar;
  