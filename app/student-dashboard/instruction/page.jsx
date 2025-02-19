const Instructions = () => {
  return (
    <>
      <div className="flex-grow p-8 overflow-y-auto ">
        <h1 className="text-2xl font-bold mb-4 text-center">INSTRUCTIONS</h1>
        <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
          <div className="space-y-6 text-gray-800">
            {/* Introduction */}
            <p>
              Welcome to the <strong>Internship Management System</strong>! This
              guide will help you navigate and utilize the platform effectively.
            </p>

            {/* Instruction Points */}
            <ol className="list-inside space-y-4">
              {/* 1. Getting Started */}
              <li>
                <strong>📌 1. Getting Started</strong>
                <ul className="list-disc list-inside ml-4 space-y-2">
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
                    <strong>Logout:</strong> Click the <em>Logout</em> button at
                    the top-right corner to securely exit.
                  </li>
                </ul>
              </li>

              {/* 2. Dashboard Overview */}
              <li>
                <strong>📌 2. Dashboard Overview</strong>
                <p>
                  The Dashboard provides an overview of your activities,
                  updates, and notifications. Access main features using the{" "}
                  <em>Sidebar Menu</em> and check for recent <em>Notices</em>.
                </p>
              </li>

              {/* 3. Analyze Internships */}
              <li>
                <strong>📌 3. Analyze Internships</strong>
                <p>
                  View detailed insights about available and ongoing
                  internships. Use filters like <em>Company</em>,{" "}
                  <em>Status</em>, or <em>Date</em> to refine your analysis.
                </p>
              </li>

              {/* 4. Select Internships */}
              <li>
                <strong>📌 4. Select Internships</strong>
                <p>
                  Browse available internship opportunities. Filter by{" "}
                  <em>Company</em>, <em>Role</em>, <em>Location</em>, or{" "}
                  <em>Duration</em>. Click on <em>Apply</em> to register your
                  interest.
                </p>
              </li>

              {/* 5. Update Instructions */}
              <li>
                <strong>📌 5. Update Instructions</strong>
                <p>
                  Access detailed instructions and guidelines provided by
                  administrators.
                </p>
              </li>

              {/* 6. Add Internships */}
              <li>
                <strong>📌 6. Add Internships (Admin Only)</strong>
                <p>
                  Admins can add internships by filling in details like{" "}
                  <em>Company Name</em>, <em>Role</em>, <em>Duration</em>, and{" "}
                  <em>Stipend</em>.
                </p>
              </li>

              {/* 7. Update Preferences */}
              <li>
                <strong>📌 7. Update Preferences</strong>
                <p>
                  Update your preferences for <em>Location</em>, <em>Domain</em>
                  , or <em>Internship Type</em>.
                </p>
              </li>

              {/* 8. Add Notices */}
              <li>
                <strong>📌 8. Add Notices (Admin Only)</strong>
                <p>
                  Admins can post updates, deadlines, or important instructions
                  for users.
                </p>
              </li>

              {/* 9. Company Details */}
              <li>
                <strong>📌 9. Company Details</strong>
                <p>
                  Browse detailed company profiles and access contact
                  information and internship roles.
                </p>
              </li>

              {/* 10. Student Feedback */}
              <li>
                <strong>📌 10. Student Feedback</strong>
                <p>
                  Provide feedback about your internship experience and view
                  previous submissions.
                </p>
              </li>

              {/* 11. Supervisor Feedback */}
              <li>
                <strong>📌 11. Supervisor Feedback</strong>
                <p>
                  Supervisors can review intern performance and provide
                  evaluations.
                </p>
              </li>

              {/* 12. Diary Updates */}
              <li>
                <strong>📌 12. Diary Updates</strong>
                <p>
                  Log daily or weekly activities to ensure performance tracking.
                </p>
              </li>

              {/* 13. Support and Assistance */}
              <li>
                <strong>📌 13. Support and Assistance</strong>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>
                    <strong>Email:</strong> support@example.com
                  </li>
                  <li>
                    <strong>Phone:</strong> +1-234-567-890
                  </li>
                  <li>
                    Refer to the <em>FAQ Section</em> for quick answers.
                  </li>
                </ul>
              </li>

              {/* 14. Logout */}
              <li>
                <strong>📌 14. Logout</strong>
                <p>
                  Click the <em>Logout</em> button located in the header and
                  always log out to keep your account secure.
                </p>
              </li>
            </ol>

            {/* Closing Note */}
            <p className="mt-6 text-center font-semibold">
              ✅{" "}
              <strong>
                Thank You for Using the Internship Management System!
              </strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Instructions;
