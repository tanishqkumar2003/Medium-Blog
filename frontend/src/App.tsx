import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup.tsx'
import { Signin } from './pages/Signin.tsx'
import { Blogs } from './pages/Blogs.tsx'
import { BlogWithId } from './pages/BlogWithId.tsx'
import { LandingPage } from './pages/LandingPage.tsx'
import { CreateBlog } from './pages/CreateBlog.tsx'
import { MyBlog } from './components/MyBlog.tsx'
import { MyBlogWithId } from './pages/MyBlogsWithId.tsx'
import { Explore } from './pages/Explore.tsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/myblogs" element={<MyBlog />} />
          <Route path="/blog/:id" element={<BlogWithId />} />
          <Route path="/blog/:id" element={<MyBlogWithId />} /> 
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App