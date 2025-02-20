import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/footer.module.css";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className="ml-3">
        <Image
          src="/assets/unilogo.png"
          alt="University Logo"
          width={500}
          height={300}
        />
      </div>

      <div className={styles.footerGrid}>
        <div className={styles.footerSection}>
          <div className="justify-items-start">
            University of Ruhuna <br></br>
            Wellamadam<br></br>
            Matara<br></br>
            81000<br></br>
            Sri Lanka<br></br>
            Telephone: 0412033253<br></br>
            Fax: 0412227008
          </div>
        </div>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>ABOUT THE CS DEPARTMENT</h3>
          <p>
            The Department of Computer Science commenced Bachelor of Computer
            Science(BCS) in 2010. The main aim of the degree programme is to
            prepare the undergraduates for a career in Computer Science and
            Information Technology
          </p>
        </div>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>QUICK LINKS</h3>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/pages/about">About</Link>
            </li>
            <li>
              <Link href="/pages/notices">Contact Us</Link>
            </li>
          </ul>
          <div>
            <p>Follow us:</p>

            <ul className={styles.socialList}>
              <br></br>
              <li className={styles.facebook}>
                <Link href="https://www.facebook.com/ruhunadcs" passHref>
                  <FaFacebook />
                </Link>
              </li>
              <li className={styles.linkedin}>
                <Link href="https://www.linkedin.com/" passHref>
                  <FaLinkedin />
                </Link>
              </li>
              <li className={styles.youtube}>
                <Link href="https://www.youtube.com" passHref>
                  <FaYoutube />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <p className={styles.footerText}>
          © 2024 UNIVERSITY OF RUHUNA. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
