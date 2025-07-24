import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {

  const isCustomer = localStorage.getItem("Customer")

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white min-h-[90vh] flex items-center">
        <img
          src="https://th-i.thgim.com/public/incoming/kisl3g/article66886587.ece/alternates/LANDSCAPE_1200/Violations01.jpg"
          alt="tow truck"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            Welcome to <span className="text-amber-400">Tow-Smart</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8">
            Making towing notifications simple, smart, and efficient for everyone.
          </p>
          <div className="flex justify-center gap-4">
            {!isCustomer ? <Link
              to="/c/login"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Customer Login
            </Link> : null}
            <Link
              to="/about"
              className="border border-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800">Why Choose Tow-Smart?</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              icon: "🚓",
              title: "Real-time Updates",
              desc: "Send SMS alerts instantly when a vehicle is towed.",
            },
            {
              icon: "📱",
              title: "Easy to Use",
              desc: "Simple and clean UI for traffic officers and admins.",
            },
            {
              icon: "🛡️",
              title: "Secure & Reliable",
              desc: "Built with modern tools for safe data handling.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 bg-white shadow-lg rounded-xl border hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Image Banner */}
      <section className="relative">
        <img
          src="https://images.jdmagicbox.com/rep/b2b/towing-truck/towing-truck-2.jpg"
          alt="towing"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h2 className="text-white text-3xl sm:text-5xl font-bold text-center">
            Fast, Efficient, Transparent Towing System
          </h2>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 bg-amber-100 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to simplify towing updates?</h2>
        <p className="text-gray-600 text-lg mb-6">Start using Tow-Smart today!</p>
        <Link
          to="/landing"
          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
