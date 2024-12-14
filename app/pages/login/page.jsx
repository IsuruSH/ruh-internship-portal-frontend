import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
    <div className="w-[533px] h-[600px] rounded-[20px] bg-light-gray shadow-lg">
      <div>
        <h2 className="mt-10 text-center text-black text-[32px] font-libre font-bold leading-normal">
          Welcome
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="font-normal text-black text-[24px] font-libre leading-normal"
            >
              User name
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                className="block w-[395px] h-[50px] rounded-[10px] border border-black/5 bg-light-gray-blue px-3 py-1.5 text-base text-gray-900 flex-shrink-0"
              />
            </div>

          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="font-normal text-black text-[24px] font-libre leading-normal"
              >
                Password
              </label>
              
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-[395px] h-[50px] rounded-[10px] border border-black/5 bg-light-gray-blue px-3 py-1.5 text-base text-gray-900 flex-shrink-0"
              />
            </div>
          </div>
          <div className=" mt-3 text-right">
                <a
                  href="#"
                  className="font-normal text-[20px] text-black hover:text-gray-600 leading-normal font-libre"
                >
                  Forgot password?
                </a>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="flex w-[200px] h-[50px] justify-center items-center rounded-[15px] bg-blue-darkest hover:bg-blue-darker transition"
            >
              <h3 className="text-white text-[24px] font-bold leading-normal font-libre">
                Log In
              </h3>
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center mt-4">
        <p className="mt-10 font-normal text-[20px] text-black hover:text-gray-600 leading-normal font-libre">
          Don't have an account?{" "}
          <a
            href="#"
            className="font-bold text-[20px] text-black hover:text-gray-600 leading-normal font-libre"
          >
            Sign up
          </a>
        </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default page;
