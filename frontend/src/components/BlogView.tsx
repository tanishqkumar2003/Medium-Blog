import { Blog } from "../hooks/useBlogHook";
import { Appbar } from "./Appbar";

export const BlogView = ({ blog }: { blog: Blog }) => {
  
  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
      <Appbar />
      <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-2xl transition-transform hover:-translate-y-1 hover:shadow-lg duration-300">
        <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200">
          <div className="font-bold text-3xl text-gray-800 mb-2">
            {blog.title}
          </div>
        </div>

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>

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
            <div>
              {localStorage.getItem('name') === blog.author.name && (
                <div className="mt-2 flex space-x-4">
                  <button
                    onClick={handleEdit}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
