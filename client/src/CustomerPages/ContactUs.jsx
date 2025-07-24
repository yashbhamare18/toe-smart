import React from "react";
import { MdOutlineLocalPolice } from "react-icons/md";

const ContactUs = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-orange-100 via-white to-green-100">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-xl border-2 border-amber-400 relative">
        {/* Badge icon at top center */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white rounded-full p-3 shadow-lg">
          <MdOutlineLocalPolice className="text-3xl" />
        </div>

        <h2 className="text-3xl font-bold text-center text-amber-600 mt-4 mb-6">
          Connect with Traffic Department
        </h2>

        <p className="text-center text-gray-600 mb-6">
          We’re here to help. Whether it's about towing complaints, queries, or feedback — feel free to reach out.
        </p>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
            required
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold transition"
          >
            🚨 Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
