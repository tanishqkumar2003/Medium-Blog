import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Aavtar } from "./Avatar";

export const Appbar = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="border-b bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-3 text-2xl font-extrabold cursor-pointer">
          <span className="bg-white rounded-full h-10 w-10 flex items-center justify-center text-blue-600">
            T
          </span>
          <span>
            <Link to="/">ThoughtSphere</Link>
          </span>
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          className="md:hidden flex items-center text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-8 w-full md:w-auto`}
        >
          <nav className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 font-medium">
            <Link
              to={"/blogs"}
              className="hover:text-gray-200 transition block md:inline"
            >
              Home
            </Link>
            <Link
              to={"/explore"}
              className="hover:text-gray-200 transition block md:inline"
            >
              Explore
            </Link>
            <Link
              to={"/myblogs"}
              className="hover:text-gray-200 transition block md:inline"
            >
              My Blogs
            </Link>
            <Link
              to={"/create"}
              className="hover:text-gray-200 transition block md:inline"
            >
              Write
            </Link>
            <Link
              to={"/community"}
              className="hover:text-gray-200 transition block md:inline"
            >
              Community
            </Link>
          </nav>

          {/* Profile and Logout */}
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
            <Aavtar name={localStorage?.getItem("username") || ""} />
            <button
              onClick={handleClick}
              className="bg-white text-blue-600 px-4 py-1 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
