import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

interface Blog{
    title: string
    content: string
    id: number
    author:{
        name: string
    }
}

export const useBlogHook = () => {
    const[loading, setLoading] = useState(true);
    const[blogs, setBlogs] = useState<Blog[]>([]);

    useEffect( ()=> {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response);
            
            setBlogs(response.data);
            setLoading(false);
        })
    } ,[])

    return {
        blogs,
        loading
    }
}

