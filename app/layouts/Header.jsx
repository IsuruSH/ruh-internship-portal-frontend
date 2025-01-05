"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/header.module.css";
import { useState } from "react";
import Page from "../pages/login/page";

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
      <div className="container mx-auto flex justify-between items-center px-6 ">
        <div className="flex items-center">
          <Image
            src="/assets/uni-logo.png"
            alt="Logo"
            width={100}
            height={100}
          />
          <h1 className={styles.headerTitle}>
            RUHUNA
            <br />
            INTERNSHIP
          </h1>
        </div>
        <nav className="flex items-center space-x-20">
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
          <div className="flex space-x-6">
            <button
              onClick={() => handleOpenModal(true)}
              className="max-w-xs px-4 py-2 border border-yellow-500 text-yellow-500 rounded"
            >
              Login
            </button>

            <button
              onClick={() => handleOpenModal(false)}
              className="max-w-xs px-4 py-2 bg-yellow-500 text-black rounded"
            >
              Sign Up
            </button>

            {isModalOpen && (
              <div className="fixed inset-0 bg-opacity-90 flex justify-center items-center z-50">
                <Page onClose={handleCloseModal} initialMode={mode} />
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
