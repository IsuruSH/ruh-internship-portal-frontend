import Image from "next/image";
import Banner from "./components/home/Banner";
import NoticesSection from "./components/home/NoticeSection";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { FaSearch, FaHandshake, FaUserTie, FaChartLine } from "react-icons/fa";

export default function HomePage() {
  const features = [
    {
      icon: <FaSearch className="text-3xl text-blue-600" />,
      title: "Find Opportunities",
      description: "Discover internships matching your skills and interests",
    },
    {
      icon: <FaHandshake className="text-3xl text-green-600" />,
      title: "Connect with Employers",
      description: "Build relationships with industry professionals",
    },
    {
      icon: <FaUserTie className="text-3xl text-purple-600" />,
      title: "Gain Experience",
      description: "Develop real-world skills in your field of study",
    },
    {
      icon: <FaChartLine className="text-3xl text-orange-600" />,
      title: "Track Progress",
      description: "Monitor your internship journey from start to finish",
    },
  ];

  return (
    <div className="bg-gray-50">
      <Header />
      <Banner />
      <NoticesSection />

      {/* Improved Middle Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/assets/internship.jpg"
                alt="Students at internship"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Transform Your{" "}
              <span className="text-[#0F1D2F]">Academic Journey</span> into
              Professional Success
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              The University Internship Management System (IMS) bridges the gap
              between classroom learning and real-world experience. Our
              comprehensive platform empowers students to discover meaningful
              internship opportunities while providing employers access to
              emerging talent.
            </p>

            <div className="mb-8">
              <button className="px-8 py-3 bg-[#0F1D2F] hover:bg-[#1E3A8A] text-white rounded-lg font-medium transition shadow-md hover:shadow-lg">
                Explore Internships
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center mb-2">
                    <div className="mr-3">{feature.icon}</div>
                    <h3 className="font-semibold text-gray-800">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
