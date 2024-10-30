import { Link, useNavigate } from "react-router-dom";
import { Aavtar } from "./Avatar";

export const Appbar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="border-b bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center space-x-3 text-2xl font-extrabold cursor-pointer">
          <span className="bg-white rounded-full h-10 w-10 flex items-center justify-center text-blue-600">
            T
          </span>
          <span>
            <Link to="/">ThoughtSphere</Link>
          </span>
        </div>

        <div className="flex items-center space-x-8">
          <nav className="flex space-x-6 font-medium">
            <button className="hover:text-gray-200 transition">
              <Link to={"/blogs"}>Home</Link>
            </button>
            <button className="hover:text-gray-200 transition">
              <Link to={"/explore"}>Explore</Link>
            </button>
            <button className="hover:text-gray-200 transition">
              <Link to={"/myblogs"}>My Blogs</Link>
            </button>
            <button className="hover:text-gray-200 transition">
              <Link to={"/create"}>Write</Link>
            </button>
          </nav>
          <div className="flex items-center space-x-4">
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
