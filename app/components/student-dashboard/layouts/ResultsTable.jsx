import React from "react";

const ResultsTable = ({ results }) => {
  const transformResultsData = (resultsByYear) => {
    const maxRows = Math.max(
      ...resultsByYear.map((year) => year.subjects.length)
    );

    return Array.from({ length: maxRows }).map((_, rowIndex) => {
      const rowData = {};

      resultsByYear.forEach((year) => {
        const subject = year.subjects[rowIndex] || {
          subject_name: "-",
          grade: "-",
        };
        rowData[`level${year.year}`] = [subject.subject_name, subject.grade];
      });

      return rowData;
    });
  };

  const resultsData = results ? transformResultsData(results) : [];

  return (
    <div className="bg-white  p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2">
        Academic Results
      </h2>

      <div className="overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {results?.map((year) => (
                <th
                  key={year.year}
                  colSpan="2"
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700"
                >
                  Year {year.year}
                </th>
              ))}
            </tr>
            <tr>
              {results?.map((year) => (
                <React.Fragment key={`headers-${year.year}`}>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Grade
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {resultsData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {results?.map((year) => {
                  const subjectData = row[`level${year.year}`] || ["-", "-"];
                  return (
                    <React.Fragment key={`data-${year.year}-${rowIndex}`}>
                      <td className="px-4 py-3 text-sm text-gray-800">
                        {subjectData[0]}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">
                        {subjectData[1]}
                      </td>
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
