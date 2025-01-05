import Image from "next/image";
import styles from "../../styles/noticebox.module.css";

const NoticeBox = ({ title, content, imgSrc, imgAlt }) => {
  return (
    <div className={styles.noticeBox}>
      <Image
        src={imgSrc}
        alt={imgAlt}
        width={300}
        height={200}
        className={styles.noticeImage}
      />
      <h4 className={styles.noticeTitle}>{title}</h4>
      <p className={styles.noticeContent}>{content}</p>
    </div>
  );
};

export default NoticeBox;
