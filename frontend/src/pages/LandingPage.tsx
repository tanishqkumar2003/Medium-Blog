import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-16 bg-gradient-to-b from-blue-600 to-blue-400 text-white">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to ThoughtSphere
        </h1>
        <p className="text-lg max-w-xl mb-8">
          Captures the essence of a shared space for diverse ideas and
          perspectives, timeless and symbolic—ideal for a platform centered on
          writing and creativity
        </p>
        <Link
          to="/signup"
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose Our Platform
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Write and Publish
            </h3>
            <p className="text-gray-600">
              Share your stories and knowledge with the world. Our platform
              makes it easy to create and publish engaging content.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Discover Content
            </h3>
            <p className="text-gray-600">
              Explore articles from diverse topics and interests. Follow your
              favorite authors and discover trending content.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Engage and Connect
            </h3>
            <p className="text-gray-600">
              Comment, like, and share your thoughts on blogs. Connect with
              authors and fellow readers to build your network.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
        <p className="mb-8 max-w-lg mx-auto">
          Sign up today and start sharing your thoughts with the world.
        </p>
        <Link
          to="/signup"
          className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition"
        >
          Create Your Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="max-w-6xl mx-auto text-center">
          <p>
            &copy; 2024 ThoughtSphere. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link to="/about" className="hover:text-white">
              About
            </Link>
            <Link to="/contact" className="hover:text-white">
              Contact Us
            </Link>

          </div>
        </div>
      </footer>
    </div>
  );
};
