import React from "react";

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      
      <div className="flex w-full max-w-[1000px] h-[588px] rounded-[20px] bg-[#F7F7F7] shadow-lg">
        
        <div className="w-1/2 rounded-l-[20px] overflow-hidden">
        <img
            src="/images/register/uorCsImg.jpg"
            alt="Department"
            className="object-cover w-full h-full"
          />
        </div>

        
        <div className="w-1/2 flex flex-col justify-center px-10">
          <h2 className="text-[32px] text-black font-bold mb-5 text-center">REGISTER NOW</h2>
          <form>
            <input
              type="text"
              placeholder="SC/20XX/XXXXX"
              className="w-[403px] p-3 mb-4 border rounded-[10px] bg-light-gray-blue focus:outline-non"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-[403px] p-3 mb-4 border rounded-[10px] bg-light-gray-blue focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-[403px] p-3 mb-4 border rounded-[10px] bg-light-gray-blue focus:outline-none"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-[403px] p-3 mb-6 border rounded-[10px] bg-light-gray-blue focus:outline-none"
            />
            <div className="flex items-center justify-center">
                <button
                    type="submit"
                    className="w-[219px] py-3 bg-blue-darkest text-white rounded-[10px] hover:bg-blue-darker transition"
                >
                
                Register
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
