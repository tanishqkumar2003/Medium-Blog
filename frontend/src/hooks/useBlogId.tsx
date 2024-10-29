import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface Blog {
  title: string;
  content: string;
  id: number;
  createdAt: string;
  author: {
    name: string;
  };
}

export const useBlogId = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    setLoading(true);
    setBlog(undefined); // Clear previous blog data when id changes
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false)); // Handle errors
  }, [id]);

  return {
    blog,
    loading,
  };
};
