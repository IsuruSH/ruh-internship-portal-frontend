import Image from "next/image";
import Banner from "./components/home/Banner";
import NoticesSection from "./components/home/NoticeSection";

export default function HomePage() {
  return (
    <div>
      <Banner />
      <section className="container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2">
          <Image
            src="/assets/internship.jpg"
            alt="Internship"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="lg:w-1/2 lg:pl-6 text-center lg:text-left mt-6 lg:mt-0">
          <p
            className="text-black text-center font-normal text-2xl leading-normal mb-6"
            style={{ fontFamily: "'Libre Caslon Text'", fontStyle: "normal" }}
          >
            Welcome to the University Internship Management System (IMS)! Our
            platform connects students with valuable internship opportunities,
            bridging the gap between academic learning and real-world
            experience. With IMS, students can seamlessly find, apply for, and
            manage their internships, while employers gain access to a pool of
            talented and motivated individuals. Empower your future with IMS
            today!
          </p>
          <p
            className="text-black text-center text-2xl mb-4"
            style={{
              fontFamily: "'Libre Caslon Text'",
              fontStyle: "normal",
              fontSize: "26px",
              fontWeight: "700",
              lineHeight: "normal",
            }}
          >
            Get your internship.
          </p>
        </div>
      </section>
      <NoticesSection />
    </div>
  );
}
