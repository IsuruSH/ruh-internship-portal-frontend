// pages/contact.js
import React from "react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";

const page = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-y-auto">
        <div className="md:w-1/2 p-4">
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Details</h2>
            <p>Department of Computer Science,</p>
            <br />
            <p>University of Ruhuna,</p>
            <br />
            <p>Sri Lanka, A2, Matara.</p>
            <br />
            <p>0422222701</p>
          </div>

          <div className=" flex relative overflow-hidden pb-[50%] h-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3968.4026864582193!2d80.57439577447757!3d5.939104779679527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x3ae1391b4f1c6a11%3A0xd93984c5ac97ab2b!2sDepartment%20of%20Computer%20Science%2C%20University%20of%20Ruhuna%2C%20Sri%20Lanka%2C%20A2%2C%20Matara!3m2!1d5.9386049!2d80.5765229!4m5!1s0x3ae1391b4f1c6a11%3A0xd93984c5ac97ab2b!2sDepartment%20of%20Computer%20Science%2C%20University%20of%E2%80%A6!3m2!1d5.9386049!2d80.5765229!5e0!3m2!1sen!2slk!4v1735624717329!5m2!1sen!2slk"
              className="absolute top-10 left-0 border-0 w-full h-full"
              width="600"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Responsive Google Map"
            ></iframe>
          </div>
        </div>
        <div className="md:w-1/2 p-4">
          <h2 className="text-xl font-bold mb-4 ">
            If you have any questions regarding applying for internships, Please
            feel free to ask:
          </h2>
          <div class="bg-gray-200 p-6 rounded-md">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="relative mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SC Number
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-800 text-white p-2 rounded-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default page;
