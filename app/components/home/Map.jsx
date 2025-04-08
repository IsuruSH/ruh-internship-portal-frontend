// components/home/Map.js
import React from "react";

const Map = () => {
  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-md">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3968.4026864582193!2d80.57439577447757!3d5.939104779679527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x3ae1391b4f1c6a11%3A0xd93984c5ac97ab2b!2sDepartment%20of%20Computer%20Science%2C%20University%20of%20Ruhuna%2C%20Sri%20Lanka%2C%20A2%2C%20Matara!3m2!1d5.9386049!2d80.5765229!4m5!1s0x3ae1391b4f1c6a11%3A0xd93984c5ac97ab2b!2sDepartment%20of%20Computer%20Science%2C%20University%20of%E2%80%A6!3m2!1d5.9386049!2d80.5765229!5e0!3m2!1sen!2slk!4v1735624717329!5m2!1sen!2slk"
        className="absolute top-0 left-0 w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Department of Computer Science Location"
      />
    </div>
  );
};

export default Map;
