"use client";
import StudentDetail from "../../../components/students/StudentDetail";

import * as React from "react";

export default function StudentDetailPage({ params }) {
  const { id } = React.use(params);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mt-10">
      <StudentDetail studentId={id} />
    </div>
  );
}
