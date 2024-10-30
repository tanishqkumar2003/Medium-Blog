import { useState } from "react";
import { BlogTitle } from "../components/BlogTitle";
import { Appbar } from "../components/Appbar";
import { BlogDescription } from "../components/BlogDescription";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateBlog = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setChecked(!checked);
    };

    async function createPost() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog/create`, {
                title: title,
                content: description,
                authorId: localStorage.getItem('id'),
                published: checked
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            console.log(response);
            console.log(title);
            console.log("description "+description);
            navigate("/blogs");
        } catch (e) {
            alert("Error while creating the blog post");
        }
    }

    return (
        <>
            <Appbar />
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create a New Blog Post</h2>
                <BlogTitle onchange={e => {
                    setTitle(e.target.value);
                }} />
                <BlogDescription onchange={e => {
                    setDescription(e.target.value);
                }} />
                <div className="flex items-center pt-5">
                    <label className="inline-flex items-center cursor-pointer">
                    <input onClick={handleClick} type="checkbox" value="true" className="sr-only peer"/>
   <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
   <span className="ms-3 text-sm font-medium text-gray-900 dark:text-black">{ checked ? "Publish" : "Draft" }</span>
                    </label>
                </div>
                <button
                    onClick={createPost}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    Post
                </button>
            </div>
        </>
    );
};

