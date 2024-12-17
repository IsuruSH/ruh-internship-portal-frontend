import Image from "next/image";
import Link from "next/link";
import styles from "../styles/header.module.css";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center">
          <Image src="/assets/uni-logo.png" alt="Logo" width={100} height={100} />
          <h1 className={styles.headerTitle}>RUHUNA <br></br>INTERNSHIP</h1>
        </div>
        <nav className="flex items-center space-x-20">
          <ul className={styles.headerNav}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/contactus">Contact</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/notices">Notices</Link></li>
          </ul>
          <div className="flex space-x-6">
            <button className="max-w-xs px-4 py-2 border border-yellow-500 text-yellow-500 rounded">Login</button>
            <button className="max-w-xs px-4 py-2 bg-yellow-500 text-black rounded">Sign Up</button>
          </div>


        </nav>
      </div>
    </header>
  );
};

export default Header;
