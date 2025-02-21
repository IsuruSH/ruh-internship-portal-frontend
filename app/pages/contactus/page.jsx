// pages/contact.js
import React from "react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Map from "../../components/home/Map";

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
            <Map/>
          </div>
        </div>
        <div className="md:w-1/2 p-4">
          <h2 className="text-xl font-bold mb-4 ">
            If you have any questions regarding applying for internships, Please
            feel free to ask:
          </h2>
          <div className="bg-slate-100 p-6 rounded-md">
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
                className="w-full bg-[#0F1D2F] text-white p-2 rounded-md"
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
