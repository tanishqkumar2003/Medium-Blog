# ThoughtSphere
ThoughtSphere is a user-friendly web application designed for browsing and searching blog posts. Built with React and TypeScript, it allows users to effortlessly find content by title or keywords, view detailed posts, and navigate through the app with an intuitive interface. The app utilizes a robust backend powered by Node.js and Prisma, ensuring seamless data management and user authentication. Whether you're a casual reader or a dedicated blogger, ThoughtSphere offers an engaging platform to discover and share insights.


# Project Structure
The project has a frontend and backend directory:

frontend/: Contains the React app built with TypeScript, including components, hooks, and pages for managing and displaying blogs.
backend/: Contains the Node.js server, Prisma ORM for database management, and API routes.
## Frontend Structure
components/: Contains reusable UI components like Appbar, BlogCard, and SearchBlog.
hooks/: Custom React hooks for blog data management, e.g., useBlogHook, useSearchBlog.
pages/: Main pages, including Explore for blog browsing.
config/: Configuration files for API URLs and environment variables.
## Backend Structure
routes/: Defines API endpoints, e.g., blogRouter for blog-related operations.
prisma/: Prisma schema and migrations for database structure.


# API Endpoints

GET /api/v1/blog: Fetch all blogs
POST /api/v1/blog/search/:param: Search for blogs by title or content
GET /api/v1/blog/:id: Fetch a single blog by ID
POST /api/v1/auth/login: User login
POST /api/v1/auth/register: User registration
# Usage
Browse Blogs: Go to the Explore page to see all blogs.
Search Blogs: Enter search terms to filter blogs by title or content.
View Full Blog: Click on a blog title to view detailed content.
Authentication: Use login/register pages to access restricted features.
# Tech Stack
Frontend: React, TypeScript, Tailwind CSS
Backend: Node.js, Hono, Prisma ORM
Database: PostgreSQL
Authentication: JSON Web Tokens (JWT)
