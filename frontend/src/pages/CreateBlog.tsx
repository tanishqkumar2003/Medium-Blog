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
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<string>("");
  const { content } = useEditor();
  const navigate = useNavigate();

  const handleClick = () => {
    setChecked(!checked);
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      alert("Please enter a valid search query.");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/blog/ai`, {
        prompt: search,
      });
      // const x = await response.data.content;
      if (response?.data) {
        setData(response.data.content);
        // console.log("AI Response:", data);
      } else {
        console.warn("No data received from AI.");
      }
    } catch (e) {
      alert("Error while fetching data from AI. Please try again later.");
      console.error("Error during API call:", e);
    }
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
      // console.log(response);
      // console.log("Title:", title);
      // console.log("Content:", content);
      navigate("/blogs");
    } catch (e) {
      alert("Error while creating the blog post");
    }
  }

  return (
    <div className="flex space-x-11">
      <div className="max-w-2xl w-2/3 p-2 bg-white rounded-lg shadow-md mt-2 m-16">
        <div className="flex justify-center items-center mb-5">
          <h2 className="text-5xl font-extrabold">Create a New Blog Post</h2>
        </div>
        <BlogTitle
          onchange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <TextEditor />

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

        <button
          onClick={createPost}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Post
        </button>
      </div>

      <div className="w-1/3 bg-slate-400 min-h-96 mt-16 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-5">
        <form className="space-y-4">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-200 ease-in-out transform hover:scale-105"
              placeholder="What are you looking for? Let AI help..."
              required
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition-all duration-200 ease-in-out transform hover:scale-105 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        <div className={`transition-all duration-300 ${data ? "pt-4" : ""}`}>
          {data ? (
            <p className="text-sm text-gray-900 dark:text-white">{data}</p>
          ) : (
            <p className="text-lg text-center mt-9 text-gray-700 dark:text-gray-400 ">
              No results to display.
            </p>
          )}
        </div>
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
