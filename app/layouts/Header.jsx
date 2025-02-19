"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // Icons for menu toggle

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/pages/contactus" },
    { name: "About", path: "/pages/about" },
    { name: "Notices", path: "/pages/notices" },
  ];

  const getLinkClass = (path) =>
    `font-medium transition-colors ${
      pathname === path
        ? "text-yellow-400 border-b-2 border-yellow-400"
        : "text-gray-300 hover:text-yellow-300"
    }`;

  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 relative">
              <Image
                src="/assets/uni-logo.png"
                alt="Logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h1 className="text-white text-xl font-bold leading-tight">
              RUHUNA
              <br />
              INTERNSHIP
            </h1>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden text-yellow-400 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Navigation Section (Desktop) */}
          <nav className="hidden sm:block">
            <ul className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className={getLinkClass(link.path)}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              href="/pages/auth?mode=login"
              className="px-4 py-2 font-medium text-yellow-400 border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-gray-800 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/pages/auth?mode=signup"
              className="px-4 py-2 font-medium text-gray-800 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="sm:hidden absolute w-full bg-gray-900 flex flex-col items-center justify-center z-50 transition-transform transform duration-300">
          <ul className="flex flex-col items-center space-y-4 py-4 bg-gray-900">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={getLinkClass(link.path)}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {/* Auth Buttons (Mobile) */}
            <div className="flex flex-col space-y-2 w-full px-6">
              <Link
                href="/pages/auth?mode=login"
                className="px-4 py-2 text-center font-medium text-yellow-400 border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/pages/auth?mode=signup"
                className="px-4 py-2 text-center font-medium text-gray-800 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
