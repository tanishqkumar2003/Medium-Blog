import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { Blog } from "./useBlogHook";


export const useSearchBlog = () => {
  const [loading, setLoading] = useState(true);
  const [searchBlogs, setSearchBlogs] = useState<Blog[]>([]);
  const search = localStorage.getItem('search');
 
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/search/${search|| 'a'}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setSearchBlogs(response.data.posts);
        setLoading(false);
        // console.log(searchBlogs);
        
      });
  }, []);

  return {
    searchBlogs,
    loading,
  };
};
