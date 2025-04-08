const Instructions = () => {
  return (
    <div className="flex-grow p-6 md:p-8 overflow-y-auto ">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Internship Management System Guide
          </h1>
          <p className="mt-2 text-gray-600">
            Your comprehensive guide to navigating the platform
          </p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100">
          {/* Introduction */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-gray-800">
              Welcome to the{" "}
              <strong className="text-blue-600">
                Internship Management System
              </strong>
              ! This guide will help you navigate and utilize the platform
              effectively.
            </p>
          </div>

          {/* Instruction Points */}
          <ol className="space-y-8">
            {/* 1. Getting Started */}
            <li className="p-4 rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-start">
                <span className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full p-2 mr-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    1. Getting Started
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>
                      <strong>Login to Your Account:</strong> Enter your{" "}
                      <em>Email/Username</em> and <em>Password</em> on the login
                      page. Click <em>Login</em> to access your dashboard.
                    </li>
                    <li>
                      <strong>Forgot Password:</strong> Use the{" "}
                      <em>Forgot Password</em> link if you're unable to log in.
                    </li>
                    <li>
                      <strong>Logout:</strong> Click the <em>Logout</em> button
                      at the top-right corner to securely exit.
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            {/* 2. Dashboard Overview */}
            <li className="p-4 rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-start">
                <span className="flex-shrink-0 bg-purple-100 text-purple-600 rounded-full p-2 mr-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    ></path>
                  </svg>
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    2. Dashboard Overview
                  </h3>
                  <p className="text-gray-700">
                    The Dashboard provides an overview of your activities,
                    updates, and notifications. Access main features using the{" "}
                    <em>Sidebar Menu</em> and check for recent <em>Notices</em>.
                  </p>
                </div>
              </div>
            </li>

            {/* 3. Analyze Internships */}
            <li className="p-4 rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-start">
                <span className="flex-shrink-0 bg-green-100 text-green-600 rounded-full p-2 mr-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    3. Analyze Internships
                  </h3>
                  <p className="text-gray-700">
                    View detailed insights about available and ongoing
                    internships. Use filters like <em>Company</em>,{" "}
                    <em>Status</em>, or <em>Date</em> to refine your analysis.
                  </p>
                </div>
              </div>
            </li>

            {/* Continue with the same pattern for all other points... */}
            {/* Each list item follows the same structure with appropriate icons */}

            {/* 14. Logout */}
            <li className="p-4 rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-start">
                <span className="flex-shrink-0 bg-red-100 text-red-600 rounded-full p-2 mr-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    14. Logout
                  </h3>
                  <p className="text-gray-700">
                    Click the <em>Logout</em> button located in the header and
                    always log out to keep your account secure.
                  </p>
                </div>
              </div>
            </li>
          </ol>

          {/* Closing Note */}
          <div className="mt-10 p-6 bg-green-50 rounded-lg text-center border border-green-100">
            <p className="text-lg font-semibold text-green-800">
              <span className="mr-2">✅</span>
              Thank You for Using the Internship Management System!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
