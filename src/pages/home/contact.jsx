import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-background min-h-screen py-12 px-4 sm:px-10 lg:px-24 text-text">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-text mb-6">
          Contact Us
        </h1>
        <p className="text-center text-lg mb-10 max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question about our
          products, your order, or anything else, our team is ready to answer
          all your questions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-background p-6 rounded-xl shadow-lg">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">Our Office</h2>
              <p>
                CrystalClear Beauty Products Co. <br />
                123 Radiant Avenue, <br />
                Los Angeles, CA 90001
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">Email</h2>
              <p>support@CrystalClearBeautyProducts.com</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">Phone</h2>
              <p>+1 (800) 555-1234</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label className="block font-medium mb-1 text-text">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-[#be843d] bg-white"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-text">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-[#be843d] bg-white"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-heading">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-[#be843d] bg-white"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-accent text-white font-semibold px-6 py-2 rounded-md transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
