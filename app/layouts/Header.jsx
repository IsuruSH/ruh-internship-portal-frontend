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
            <Link
              href={"pages/auth?mode=login"}
              className="max-w-xs px-4 py-2 border border-yellow-500 text-yellow-500 rounded"
            >
              Login
            </Link>

            <Link
              href={"pages/auth?mode=signup"}
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
