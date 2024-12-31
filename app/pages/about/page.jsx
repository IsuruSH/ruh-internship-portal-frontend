import React from "react";
import Image from "next/image";
import NoticeBox from "../../components/home/NoticeBox";

const page = () => {
  return ( 
  <div>
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
      <p>Welcome to the University Internship Management System (IMS)! 
        Our platform connects students with valuable internship opportunities,
        bridging the gap between academic learning and real-world experience. With IMS, students can seamlessly find, apply for, and manage their internships,
        while employers gain access to a pool of talented and motivated individuals. Empower your future with IMS today!
        Welcome to the University Internship Management System (IMS)! 
        Our platform connects students with valuable internship opportunities,
        bridging the gap between academic learning and real-world experience. With IMS, students can seamlessly find, apply for, and manage their internships,
        while employers gain access to a pool of talented and motivated individuals. Empower your future with IMS today!</p>
    </div>
    <div class="container mx-auto px-6 py-8">
      <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">Administrative Panel</h2>
      <div class="flex flex-wrap justify-center gap-6">
        <NoticeBox title="Notice 1" content="Details about notice 1." imgSrc="/assets/notice.jpg" imgAlt="Notice 1" />
        <NoticeBox title="Notice 2" content="Details about notice 2." imgSrc="/assets/notice.jpg" imgAlt="Notice 2" />
        <NoticeBox title="Notice 3" content="Details about notice 3." imgSrc="/assets/notice.jpg" imgAlt="Notice 3" />

      </div>
      
    </div>

  </div>
  );
};

export default page;
