import InternshipDetail from "../../../components/internships/InternshipDetail";
import * as React from "react";

export default function InternshipDetailPage({ params }) {
  const { id } = React.use(params);
  return (
    <div className="bg-white rounded-lg  overflow-hidden">
      <InternshipDetail internshipId={id} />
    </div>
  );
}
