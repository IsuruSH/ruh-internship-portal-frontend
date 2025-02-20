import NoticeBox from "./NoticeBox";

const Adminpanel = () => {
  const adminMembers = [
    { name: "John Doe", designation: "Administrator", email: "john@example.com" },
    { name: "Jane Smith", designation: "Moderator", email: "jane@example.com" },
    { name: "Robert Brown", designation: "Editor", email: "robert@example.com" }
  ];

  return (
    <section className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Panel</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {adminMembers.map((admin, index) => (
          <NoticeBox
            key={index}
            title={admin.name}
            content={
              <>
                <div className="font-semibold">{admin.designation}</div>
                <div className="text-gray-600">Email: {admin.email}</div>
              </>
            }
            imgSrc="/assets/admin.jpg"
            imgAlt={admin.name}
          />
        ))}
      </div>
    </section>
  );
};

export default Adminpanel;
