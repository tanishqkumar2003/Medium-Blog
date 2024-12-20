import { BACKEND_URL } from "../config";
import axios from "axios";
import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { Link } from "react-router-dom";

interface Blog {
  id: number;
  author: { name: string | null } | null;
  title: string;
  content: string;
  createdAt: string;
  published: boolean;
}

export const MyBlog = () => {
  const [myblog, setMyBlog] = useState<Blog[]>([]);

  function formatToIST(createdAt: string) {
    const date = new Date(createdAt);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  useEffect(() => {
    async function fetchMyBlogs() {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/blog/myblog`,
          {
            authorId: localStorage.getItem("id"),
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setMyBlog(response.data);
      } catch (e) {
        alert("Error while fetching the blog posts");
        console.error("Error:", e);
      }
    }

    fetchMyBlogs();
  }, []);

  return (
    <>
      <Appbar />
      <div className="px-7 mt-5 w-full md:w-3/5 mx-auto">
        {myblog.length > 0 ? (
          myblog.map((blog) => (
            <Link to={`/myblog/${blog.id}`} key={blog.id}>
              <BlogCard
                id={blog.id}
                authorName={blog.author?.name || "Anonymous"}
                title={blog.title}
                content={blog.content || ""}
                publishedDate={formatToIST(blog.createdAt)}
              />
            </Link>
          ))
        ) : (
          <p className="text-gray-700 text-center mt-10">
            No blogs found. Start writing your first blog!
          </p>
        )}
      </div>
    </>
  );
};
