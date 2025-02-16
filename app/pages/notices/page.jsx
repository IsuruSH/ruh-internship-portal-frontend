import React from "react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import NoticeBox from "../../components/home/NoticeBox";

const page = () => {
  return (
    <>
      <Header />
      <div class="container mx-auto px-6 py-8">
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
      </div>
      <Footer />
    </>
  );
};

export default page;
