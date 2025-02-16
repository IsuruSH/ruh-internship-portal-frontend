import NoticeBox from "./NoticeBox";
import styles from "../../styles/layout.module.css";

const NoticesSection = () => {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>NOTICES</h2>
      <div className="flex flex-wrap justify-center gap-6">
        <NoticeBox
          title="Notice 1"
          content="Details about notice 1."
          imgSrc="/assets/notice.jpg"
          imgAlt="Notice 1"
        />
        <NoticeBox
          title="Notice 2"
          content="Details about notice 2."
          imgSrc="/assets/notice.jpg"
          imgAlt="Notice 2"
        />
        <NoticeBox
          title="Notice 3"
          content="Details about notice 3."
          imgSrc="/assets/notice.jpg"
          imgAlt="Notice 3"
        />
        <NoticeBox
          title="Notice 4"
          content="Details about notice 4."
          imgSrc="/assets/notice.jpg"
          imgAlt="Notice 4"
        />
      </div>
      <div className="flex justify-center mt-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          <a href="/pages/notices">See more</a>
        </button>
      </div>
    </section>
  );
};

export default NoticesSection;
