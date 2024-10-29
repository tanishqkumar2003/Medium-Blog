import { useParams } from "react-router-dom"
import { BlogView } from "../components/BlogView";
import { useBlogId } from "../hooks/useBlogId";



export const BlogWithId = ()=>{
    const { id } = useParams();
    const { loading, blog } = useBlogId({id: id || ""}) 

    if(loading){
        return <div>
            loading...
        </div>
    }
    return (
        <div>
          {blog && <BlogView blog={blog} />}
        </div>
      );
    };
