"use client"; 
import Image from "next/image";
import { motion } from "framer-motion";


const Banner = () => {
  return (
    <div className="relative h-[640px] overflow-hidden">
      <Image src="/assets/dep.jpg" alt="University Building" layout="fill" objectFit="cover" className=" object-cover w-full h-full filter brightness-50" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <div className="text-center text-white">
        <motion.h1 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold drop-shadow-lg"
        >
          Welcome to the University Internship Management System
          </motion.h1>

          <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-2xl mt-2"
        >
          Connecting students with internship opportunities
        </motion.p>
        </div>
        
      </div>
    </div>
  );
};

export default Banner;
