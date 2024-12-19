// import { useEffect, useState } from "react";
// import { BACKEND_URL } from "../config";
// import axios from "axios";

// interface Blog {
//   title: string;
//   content: string;
//   id: number;
//   createdAt: string;
//   author: {
//     name: string;
//   };
// }

// export const useBlogId = ({ id }: { id: string }) => {
//   const [loading, setLoading] = useState(true);
//   const [blog, setBlog] = useState<Blog>();

//   useEffect(() => {
//     setLoading(true);
//     setBlog(undefined); // Clear previous blog data when id changes
//     axios
//       .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//       })
//       .then((response) => {
//         setBlog(response.data);
//         // console.log(response);
        
//         setLoading(false);
//       })
//       .catch(() => setLoading(false)); // Handle errors
//   }, [id]);

//   return {
//     blog,
//     loading,
//   };
// };



import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface Blog {
  title: string;
  content: string;
  id: number;
  published: boolean;
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
    setBlog(undefined); // Clear previous data on ID change

    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const data = response.data;

        if (Array.isArray(data)) {
          // If response is an array of blogs, filter by published
          const publishedBlogs = data.filter((item: Blog) => item.published);
          setBlog(publishedBlogs.length > 0 ? publishedBlogs[0] : undefined);
        } else if (data.published) {
          // If response is a single blog object
          setBlog(data);
        } else {
          setBlog(undefined);
        }

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setBlog(undefined); // Clear blog on error
      });
  }, [id]);

  return {
    blog,
    loading,
  };
};
