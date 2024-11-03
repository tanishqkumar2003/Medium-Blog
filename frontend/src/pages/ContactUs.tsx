import React, { useState } from 'react';
import { NoUserAppbar } from '../components/NoUserAppbar';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2">Connect with Us</h2>
        <p className="text-gray-300 mb-4">Follow us on our social media platforms:</p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://twitter.com/tanishqpayla"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Twitter
          </a>
          <a
            href="https://github.com/tanishqkumar2003"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            GitHub
          </a>
          <a
            href="tanishqkumar1003@gmail.com"
            className="text-blue-400 hover:underline"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <>
      <NoUserAppbar />
      <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex flex-col items-center py-4">
        <h1 className="text-3xl font-bold mb-6 mt-2">Contact Us</h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg w-full bg-white shadow-md rounded-lg p-6"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
      
      {/* Footer with Connect Us Section */}
      <Footer />
    </>
  );
};
