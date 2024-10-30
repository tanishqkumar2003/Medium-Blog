import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogHook } from "../hooks/useBlogHook";

export const Blogs = () => {
  const { blogs, loading } = useBlogHook();

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

  if(loading){
    return <div>
        loading...
    </div>
  }

  return (
    <>
      <Appbar />
      <div className="px-7 mt-5">
        {blogs.map((blog) => (
          <BlogCard
            id={blog.id}
            key={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={formatToIST(blog.createdAt)}
          />
        ))}
      </div>
    </>
  );
};
