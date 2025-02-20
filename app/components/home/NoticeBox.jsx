import Image from "next/image";


const NoticeBox = ({ title, content, imgSrc, imgAlt }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl text-center max-w-72 mx-auto">
      <Image
        src={imgSrc}
        alt={imgAlt}
        width={300}
        height={200}
        className="rounded-md mb-4"
      />
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <div className="text-gray-600">{content}</div>
    </div>
  );
};

export default NoticeBox;
