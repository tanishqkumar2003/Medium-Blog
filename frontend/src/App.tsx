import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup.tsx'
import { Signin } from './pages/Signin.tsx'
import { Blogs } from './pages/Blogs.tsx'
import { BlogWithId } from './pages/BlogWithId.tsx'
import { LandingPage } from './pages/LandingPage.tsx'
import { CreateBlog } from './pages/CreateBlog.tsx'

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
          <Route path="/blog/:id" element={<BlogWithId />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App