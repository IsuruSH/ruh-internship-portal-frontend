import Image from "next/image";
import styles from "../styles/banner.module.css";

const Banner = () => {
  return (
    <div className={styles.bannerContainer}>
      <Image src="/assets/university-building.png" alt="University Building" layout="fill" objectFit="cover" className={styles.bannerImage} />
      <div className={styles.bannerTextContainer}>
        <h1 className={styles.bannerTitle}>Welcome to the University Internship Management System</h1>
        <p className={styles.bannerSubtitle}>Connecting students with internship opportunities</p>
      </div>
    </div>
  );
};

export default Banner;
