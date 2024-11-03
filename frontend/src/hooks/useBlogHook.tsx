import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
  title: string;
  content: string;
  id: number;
  createdAt: string;
  author: {
    name: string;
  };
}

export const useBlogHook = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
        console.log(response.data);
        
      });
  }, []);

  return {
    blogs,
    loading,
  };
};
