import React from "react";
import Image from "next/image";
import {
  FaEnvelope,
  FaUserTie,
  FaUniversity,
  FaLightbulb,
  FaHandshake,
} from "react-icons/fa";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";

const DepartmentPage = () => {
  const adminMembers = [
    {
      name: "John Doe",
      designation: "Administrator",
      email: "john@example.com",
      bio: "10+ years experience in academic administration",
      imgSrc: "/assets/admin.jpg",
    },
    {
      name: "Jane Smith",
      designation: "Moderator",
      email: "jane@example.com",
      bio: "Specializes in student-industry partnerships",
      imgSrc: "/assets/admin.jpg",
    },
    {
      name: "Robert Brown",
      designation: "Editor",
      email: "robert@example.com",
      bio: "Focuses on curriculum development and internship alignment",
      imgSrc: "/assets/admin.jpg",
    },
  ];

  const features = [
    {
      icon: <FaUniversity className="text-3xl text-[#0F1D2F]" />,
      title: "Academic Integration",
      description:
        "Seamlessly connects classroom learning with real-world experience",
    },
    {
      icon: <FaLightbulb className="text-3xl text-[#0F1D2F]" />,
      title: "Innovative Platform",
      description: "Cutting-edge technology to manage your internship journey",
    },
    {
      icon: <FaHandshake className="text-3xl text-[#0F1D2F]" />,
      title: "Industry Partnerships",
      description: "Strong network of leading companies and organizations",
    },
  ];

  return (
    <div className="bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="relative w-full h-[70vh] max-h-[800px]">
        <div className="absolute inset-0">
          <Image
            src="/assets/picture.jpg"
            alt="Computer Science Department"
            layout="fill"
            objectFit="cover"
            className="brightness-75"
            priority
          />
        </div>
        <div className="relative z-10 flex items-center justify-center w-full h-full bg-gradient-to-t from-black/70 via-black/50 to-transparent">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-xl font-bold sm:text-3xl lg:text-6xl mb-4">
              Department of Computer Science
            </h1>
            <p className="text-xl sm:text-2xl mb-8">
              Bridging academia and industry through innovative internship
              programs
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-[#0F1D2F] text-white rounded-lg hover:bg-[#1E3A8A] transition">
                Explore Programs
              </button>
              <button className="px-6 py-3 bg-white/10 text-white border border-white rounded-lg hover:bg-white/20 transition">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0F1D2F] mb-4">
            Welcome to Our Department
          </h2>
          <div className="w-20 h-1 bg-[#0F1D2F] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The University Internship Management System (IMS) revolutionizes how
            students connect with industry opportunities. Our platform provides
            a comprehensive ecosystem for internship discovery, application, and
            management, ensuring every student gains valuable real-world
            experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-center mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Admin Team Section */}
      <section className="py-16 bg-[#0F1D2F] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Admin Team</h2>
            <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-lg max-w-3xl mx-auto">
              Meet the dedicated professionals who make our internship programs
              successful
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {adminMembers.map((admin, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/20 transition"
              >
                <div className="flex flex-col items-center mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white/20">
                    <Image
                      src={admin.imgSrc}
                      alt={admin.name}
                      width={128}
                      height={128}
                      objectFit="cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{admin.name}</h3>
                  <p className="text-[#FFD700]">{admin.designation}</p>
                </div>
                <div className="text-center">
                  <p className="mb-4 text-sm">{admin.bio}</p>
                  <a
                    href={`mailto:${admin.email}`}
                    className="inline-flex items-center text-sm hover:underline"
                  >
                    <FaEnvelope className="mr-2" /> {admin.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DepartmentPage;
