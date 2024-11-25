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

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Appbar />
      <div className="flex">
        <div className="px-7 mt-5 w-3/5 ">
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
        <div className="w-4/12 flex items-center justify-center text-center font-extrabold text-2xl bg-white shadow-md rounded-lg p-6 h-auto mt-28 fixed right-9">
          <div>
            "Empower your voice with our blog app — a seamless platform to
            write, share, and inspire. From storytelling to thought leadership,
            unleash creativity and connect with a global audience effortlessly.
            Your story, your way!"
          </div>
        </div>
      </div>
    </>
  );
};
