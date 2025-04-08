import InternshipDetail from "../../../components/internships/InternshipDetail";

export default function InternshipDetailPage({ params }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <InternshipDetail internshipId={params.id} />
    </div>
  );
}
