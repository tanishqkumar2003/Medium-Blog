import { NoUserAppbar } from "../components/NoUserAppbar";

export const AboutUs = () => {
  return (
    <>
      <NoUserAppbar />
      <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex flex-col items-center">
        <div className="max-w-3xl mx-auto mt-16 p-10 bg-white rounded-xl shadow-lg">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 text-center">
            About Us
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Welcome to <strong>ThoughtSphere</strong>, your go-to space for
            sharing and discovering ideas, stories, and knowledge! Whether
            you're here to write, read, or explore, we aim to provide a seamless
            and enjoyable experience for all.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            We believe in the power of words and ideas to connect people. Our
            mission is to create an inclusive platform where everyone can freely
            express their thoughts, share their expertise, and connect with
            like-minded individuals.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            What We Offer
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed mb-6">
            <li> A user-friendly interface for readers and writers alike.</li>
            <li> AI-Powered Creations.</li>
            <li> Quick and efficient blog search to discover new content.</li>
            <li> Simple tools for blog creation and content sharing.</li>
            <li> Personalized author profiles to showcase your work.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Join Our Community
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At ThoughtSphere, we’re more than just a blog platform. We’re a
            community. Whether you're a seasoned writer, a budding blogger, or
            simply someone who loves to read, we invite you to join us on this
            journey. Your voice matters, and we’re here to amplify it.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
              onClick={() => (window.location.href = "/")}
            >
              Explore Blogs
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
