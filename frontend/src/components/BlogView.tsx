import { Blog } from "../hooks/useBlogHook";
import { Appbar } from "./Appbar";

export const BlogView = ({ blog }: { blog: Blog }) => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
      <Appbar />
      <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-2xl transition-transform hover:-translate-y-1 hover:shadow-lg duration-300">
        <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200">
          <h1 className="text-4xl font-bold text-gray-800">{blog.title}</h1>
          {/* <div className="text-right"></div> */}
        </div>

        <div className="text-gray-700 text-lg leading-relaxed mb-8">
          {blog.content}
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-end">
            <div className="relative inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full shadow-md">
              <span className="text-gray-800 font-semibold text-lg">
                {blog.author.name ? blog.author.name[0].toUpperCase() : "A"}
              </span>
            </div>
            <div className="ml-4">
              <p className="text-gray-800 font-semibold">
                {blog.author.name || "Anonymous"}
              </p>
              <p className="text-sm text-gray-500">Author</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
