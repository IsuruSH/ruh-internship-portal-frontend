"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/header.module.css";
import { useState } from "react";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState(true);

  const handleOpenModal = (mode) => {
    setMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className={styles.headerContainer}>
      <div className="container flex flex-wrap justify-between items-center px-4 mx-4">
        <div className="flex items-center mb-4 sm:mb-0">
          <Image
            src="/assets/uni-logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="mr-4"
          />
          <h1 className={styles.headerTitle}>
            RUHUNA
            <br />
            INTERNSHIP
          </h1>
        </div>
        <nav className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <ul className={styles.headerNav}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/pages/contactus">Contact</Link>
            </li>
            <li>
              <Link href="/pages/about">About</Link>
            </li>
            <li>
              <Link href="/pages/notices">Notices</Link>
            </li>
          </ul>
          <div className="flex space-x-4">
            <Link
              href={"/pages/auth?mode=login"}
              className="max-w-xs px-4 py-2 border border-yellow-500 text-yellow-500 rounded"
            >
              Login
            </Link>

            <Link
              href={"/pages/auth?mode=signup"}
              className="max-w-xs px-4 py-2 bg-yellow-500 text-black rounded"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
