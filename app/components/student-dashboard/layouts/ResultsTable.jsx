import React from "react";

const ResultsTable = () => {
  const resultsData = [
    {
      level1: ["Programing Techniques", "A"],
      level2: ["Object Oriented Programming", "A"],
      level3: ["Data Warehousing and Data mining", "00"],
    },
    {
      level1: ["System Analyst & Design", "A"],
      level2: ["Operating Systems", "A"],
      level3: ["Distributed Systems", "00"],
    },
    {
      level1: ["Data Structure and Algorithms", "B"],
      level2: ["Project Management", "00"],
      level3: ["E-commerce and Professional Practice", "00"],
    },
    {
      level1: ["Software Engineering", "B"],
      level2: ["Data and Network Security", "00"],
      level3: ["Internet Protocol", "00"],
    },
    {
      level1: ["Database Management Systems", "A"],
      level2: ["Internet Programming", "00"],
      level3: ["Group Projects", "00"],
    },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Result & GPA</h3>
      <h4 className="text-base font-semibold mb-2">GPA: 3.5</h4>
      <h4 className="text-base font-semibold mb-2">Results: </h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-400">
          <thead>
            <tr className="bg-slate-400 text-black text-center">
              <th colSpan="2" className="py-2 px-4 border">
                Level 1
              </th>
              <th colSpan="2" className="py-2 px-4 border">
                Level 2
              </th>
              <th colSpan="2" className="py-2 px-4 border">
                Level 3
              </th>
            </tr>
            <tr className="bg-gray-300 text-gray-800 text-center">
              <th className="py-2 px-4 border">Subject</th>
              <th className="py-2 px-4 border">Results</th>
              <th className="py-2 px-4 border">Subject</th>
              <th className="py-2 px-4 border">Results</th>
              <th className="py-2 px-4 border">Subject</th>
              <th className="py-2 px-4 border">Results</th>
            </tr>
          </thead>
          <tbody>
            {resultsData.map((item, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="py-2 px-4 border text-center">
                  {item.level1[0]}
                </td>
                <td className="py-2 px-4 border text-center">
                  {item.level1[1]}
                </td>
                <td className="py-2 px-4 border text-center">
                  {item.level2[0]}
                </td>
                <td className="py-2 px-4 border text-center">
                  {item.level2[1]}
                </td>
                <td className="py-2 px-4 border text-center">
                  {item.level3[0]}
                </td>
                <td className="py-2 px-4 border text-center">
                  {item.level3[1]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
