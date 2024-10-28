import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogHook } from "../hooks/useBlogHook";

export const Blogs = () => {
    const {blogs, loading} = useBlogHook();
  return (<>
    <Appbar />
    <div className="px-7 mt-5">
      {blogs.map(blog  => <BlogCard 
            id={blog.id}
            key={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={"28 Oct"}
        />)}
    </div>
    </>
  );
};
