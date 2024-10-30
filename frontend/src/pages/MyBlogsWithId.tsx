import { useParams } from "react-router-dom";
import { useBlogId } from "../hooks/useBlogId";
import { BlogView } from "../components/BlogView";

export const MyBlogWithId = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, blog } = useBlogId({ id: id || "" }); 

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>
  {blog && <BlogView blog={blog} />}
  </>; 
};
