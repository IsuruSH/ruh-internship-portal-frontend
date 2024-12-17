import Link from "next/link";
import Image from "next/image";
import styles from "../styles/footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.overlay}></div>
      <div className={styles.footerGrid}>
        <div className={styles.footerSection}>
          <Image src="/assets/unilogo.png" alt="University Logo" width={1147} height={186} />
          <br></br>
          <p>University of Ruhuna</p>
          <p>Wellamadama</p>
          <p>Matara</p>
          <p>81000</p>
          <p>Sri Lanka</p>
          <p>Telephone: 0412033253</p>
          <p>Fax: 0412227008</p>
        </div>
        <div className={styles.footerSection}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h3 className={styles.footerTitle}>ABOUT THE CS DEPARTMENT</h3>
          <p>The Department of Computer 
            Science commenced Bachelor
            of Computer Science(BCS) in 2010.
            The main aim of the degree
            programme is to prepare the 
            undergraduates for a career in 
            Computer Science and Information
            Technology 
          </p>
        </div>
        <div className={styles.footerSection}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h3 className={styles.footerTitle}>QUICK LINKS</h3>
          <ul>
            <li><Link href="/">HOME</Link></li>
            <li><Link href="/about">ABOUT</Link></li>
            <li><Link href="/contactus">CONTACT US</Link></li>
          </ul>
          <p>Follow us:</p>
          <ul className="flex space-x-4">
            <li><Link href="https://www.facebook.com"><Image src="/assets/facebook.png" alt="Facebook" width={30} height={24} className={styles.socialIcon} /></Link></li>
            <li><Link href="https://www.linkedin.com"><Image src="/assets/linkedin.png" alt="LinkedIn" width={24} height={24} className={styles.socialIcon} /></Link></li>
            <li><Link href="https://www.youtube.com"><Image src="/assets/youtube.png" alt="YouTube" width={24} height={24} className={styles.socialIcon} /></Link></li>
          </ul>
        </div>
      </div>
      <p className={styles.footerText}>
        © 2024 UNIVERSITY OF RUHUNA. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
