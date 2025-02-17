"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-[#0D1B2A] py-4 px-8">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <Image
            src="/assets/uni-logo.png"
            alt="University Logo"
            width={50}
            height={50}
          />
          <h1 className="text-white font-bold text-lg leading-tight">
             RUHUNA <span className="block">INTERNSHIP</span>
          </h1>

        </div>

        {/* Navigation Links */}
        <nav>
          <div className="flex space-x-8 text-white font-semibold">
            <a
              href="/"
              className="hover:text-gray-300 text-lg"
            >
              Home
            </a>
            <a
              href="/pages/about"
              className="hover:text-gray-300 text-lg"
            >
              About
            </a>
            <a
              href="/pages/contactus"
              className="hover:text-gray-300 text-lg"
            >
              Contact
            </a>
            <a
              href="/pages/notices"
              className="hover:text-gray-300 text-lg"
            >
              Notices
            </a>
          </div>
        </nav>

        {/* Login & Sign-Up Buttons */}
        <div className="flex space-x-4">
          <Link
            href={"/pages/auth?mode=login"}
            className="px-6 py-2 border border-yellow-400 text-yellow-400 rounded font-semibold transition duration-300 hover:bg-yellow-400 hover:text-black"
          >
            Login
          </Link>

          <Link
            href={"/pages/auth?mode=signup"}
            className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded transition duration-300 hover:bg-yellow-500"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
