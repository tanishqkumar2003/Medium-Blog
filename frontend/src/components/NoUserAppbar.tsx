import { Link } from "react-router-dom";

export const NoUserAppbar = () => {
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
              <Link to={"/"}>Home</Link>
            </button>
            <button className="hover:text-gray-200 transition">
              <Link to={"/signup"}>Explore</Link>
            </button>
            <button className="hover:text-gray-200 transition">
              <Link to={"/signup"}>My Blogs</Link>
            </button>
            <button className="hover:text-gray-200 transition">
              <Link to={"/signup"}>Write</Link>
            </button>
            
          </nav>
        </div>
      </div>
    </div>
  );
};
