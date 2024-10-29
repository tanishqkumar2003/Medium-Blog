import { useState } from "react";
import { BlogTitle } from "../components/BlogTitle"
import { Appbar } from "../components/Appbar";
import { BlogDescription } from "../components/BlogDescription";


export const CreateBlog = () => {
    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    const[checked, setChecked] = useState(true)
    const handleClick = () => {
       setChecked(!checked)
       console.log(checked);
    }
    
    return <>
        <Appbar />
        <BlogTitle onchange={e=>{
            setTitle(e.target.value)
        }} />
        <BlogDescription onchange={e=>{
            setDescription(e.target.value)
        }} />
        <div className="flex pt-5">
            

        <label className="inline-flex items-center cursor-pointer">
  <input onClick={handleClick} type="checkbox" value="true" className="sr-only peer"/>
  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
</label>
        </div>
    </>
}