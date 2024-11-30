import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextEditor } from "@/components/TextEditor";
import { EditorProvider, useEditor } from "@/context/useEditor";
import { BlogTitle } from "@/components/BlogTitle";

const CreateBlogContent = () => {
  const [title, setTitle] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const { content } = useEditor(); // Safely access the editor's context here
  const navigate = useNavigate();

  const handleClick = () => {
    setChecked(!checked);
  };

  async function createPost() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/create`,
        {
          title: title,
          content: content, // Use the global content here
          authorId: localStorage.getItem("id"),
          published: checked,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      console.log("Title:", title);
      console.log("Content:", content);
      navigate("/blogs");
    } catch (e) {
      alert("Error while creating the blog post");
    }
  }

  return (
    <div className="flex space-x-11">
      {/* Main Content (Shifted to the left) */}
      <div className="max-w-2xl w-2/3 p-2 bg-white rounded-lg shadow-md mt-2 m-10">
        <div className="flex justify-center items-center mb-5">
          <h2 className="text-5xl font-extrabold">Create a New Blog Post</h2>
        </div>
        <BlogTitle
          onchange={(e) => {
            setTitle(e.target.value);
          }}
        />

        {/* Text Editor */}
        <TextEditor />

        {/* Publish Toggle */}
        <div className="flex items-center pt-5">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              onClick={handleClick}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-black">
              {checked ? "Publish" : "Draft"}
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          onClick={createPost}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Post
        </button>
      </div>

      {/* Empty Div with 2/3 Size */}
      <div className="w-1/3 bg-slate-400 h-96 mt-16">
        {/* This space is intentionally left empty */}

        <form className="m-3">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="What are you looking for? Let AI help..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );

};

export const CreateBlog = () => {
  return (
    <EditorProvider>
      <Appbar />
      <CreateBlogContent />
    </EditorProvider>
  );
};
