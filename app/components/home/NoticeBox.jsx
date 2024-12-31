import Image from "next/image";
import styles from "../../styles/noticebox.module.css";

const NoticeBox = ({ title, content, imgSrc, imgAlt }) => {
  return (
    <div class={styles.noticeBox}>
      <Image src={imgSrc} alt={imgAlt} width={300} height={200} class={styles.noticeImage} />
      <h4 class={styles.noticeTitle}>{title}</h4>
      <p class={styles.noticeContent}>{content}</p>
    </div>
  );
};

export default NoticeBox;
