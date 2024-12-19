import { useParams } from "react-router-dom";
import { useBlogId } from "../hooks/useBlogId";
import { BlogView } from "../components/BlogView";

export const MyBlogWithId = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, blog } = useBlogId({ id: id || "" }); 

  if (loading) {
    return (
      <div
        role="status"
        className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 animate-pulse"
      >
        <div className="w-full max-w-4xl px-4">
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-6"></div>

          {/* Content Rows */}
          <div className="space-y-4">
            <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-700 w-5/6"></div>
            <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-700 w-2/3"></div>
            <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-700 w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-700 w-4/5"></div>
            <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
          </div>

          {/* Footer Rows */}
          <div className="mt-8 space-y-2">
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4"></div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }


  return <>
  {blog && <BlogView blog={blog} />}
  </>; 
};




