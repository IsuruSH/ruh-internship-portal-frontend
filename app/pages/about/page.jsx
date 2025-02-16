import React from "react";
import Image from "next/image";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Admin from "../../components/home/Adminpanel";

const page = () => {
  return (
    <div>
      <Header />
      <div className=" mt-10 flex relative w-3/4  h-[300px] lg:h-[400px] mx-40">
        <div className=" absolute inset-0">
          <Image
            src="/assets/picture.jpg" // Replace with your image
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center w-full h-full bg-black/50 rounded-xl">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
              Department Of Computer Science
            </h1>
            <p className="mt-2 text-sm sm:text-base lg:text-lg">
              Our professional advisors can craft your perfect itinerary
            </p>
          </div>
        </div>
      </div>
      <div class="w-3/4 mx-40 mt-10 font-normal text-xl text-center">
        <p>
          Welcome to the University Internship Management System (IMS)! Our
          platform connects students with valuable internship opportunities,
          bridging the gap between academic learning and real-world experience.
          With IMS, students can seamlessly find, apply for, and manage their
          internships, while employers gain access to a pool of talented and
          motivated individuals. Empower your future with IMS today! Welcome to
          the University Internship Management System (IMS)! Our platform
          connects students with valuable internship opportunities, bridging the
          gap between academic learning and real-world experience. With IMS,
          students can seamlessly find, apply for, and manage their internships,
          while employers gain access to a pool of talented and motivated
          individuals. Empower your future with IMS today!
        </p>
      </div>
      <div class="container mx-auto px-6 py-8">
        <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">
          Administrative Panel
        </h2>
        <div class="flex flex-wrap justify-center gap-6">
          <Admin
            title="Member 1"
            content="Details about admin 1."
            imgSrc="/assets/admin.jpg"
            imgAlt="admin 1"
          />
          <Admin
            title="Member 2"
            content="Details about admin 2."
            imgSrc="/assets/admin.jpg"
            imgAlt="admin 2"
          />
          <Admin
            title="Member 3"
            content="Details about admin 3."
            imgSrc="/assets/admin.jpg"
            imgAlt="admin 3"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
