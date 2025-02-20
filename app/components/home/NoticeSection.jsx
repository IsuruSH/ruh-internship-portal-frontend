import NoticeBox from "./NoticeBox";

const NoticesSection = () => {
  return (
    <section className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">NOTICES</h2>
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
        <button className="px-4 py-2 bg-[#0F1D2F] text-white rounded hover:bg-blue-700">
          <a href="/pages/notices">See more</a>
        </button>
      </div>
    </section>
  );
};

export default NoticesSection;
