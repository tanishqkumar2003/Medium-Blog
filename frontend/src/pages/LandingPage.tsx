import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-16 px-6 md:px-0 bg-gradient-to-b from-blue-600 to-blue-400 text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Welcome to ThoughtSphere
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
          A shared space for diverse ideas and perspectives, where AI fuels
          creativity—timeless, symbolic, and ideal for a platform focused on
          writing and innovation.
        </p>
        <Link
          to="/signup"
          className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
        >
          Start Reading
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
          Why Choose Our Platform
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
          {/* Feature 1 */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
            <h3 className="text-lg sm:text-2xl font-semibold text-blue-600 mb-2 sm:mb-4">
              Write and Publish
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Share your stories and knowledge with the world. Our platform
              makes it easy to create and publish engaging content.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
            <h3 className="text-lg sm:text-2xl font-semibold text-blue-600 mb-2 sm:mb-4">
              Discover Content
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Explore articles from diverse topics and interests. Follow your
              favorite authors and discover trending content.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
            <h3 className="text-lg sm:text-2xl font-semibold text-blue-600 mb-2 sm:mb-4">
              AI-Powered Creation
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Effortlessly write, refine, and summarize blogs with AI, while
              staying updated through email notifications.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 sm:py-16 bg-blue-600 text-white text-center px-4 sm:px-0">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
          Ready to Join?
        </h2>
        <p className="text-base sm:text-lg md:text-xl max-w-lg mx-auto mb-6 sm:mb-8 leading-relaxed">
          Sign up today and start sharing your thoughts with the world.
        </p>
        <Link
          to="/signup"
          className="px-6 py-2 sm:px-8 sm:py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
        >
          Create Your Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4 text-xs sm:text-sm md:text-base">
            &copy; 2024 ThoughtSphere. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 sm:space-x-6">
            <Link
              to="/about"
              className="hover:text-white transition duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-white transition duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
