import StudentDetail from "../../../components/students/StudentDetail";

export default function StudentDetailPage({ params }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mt-10">
      <StudentDetail studentId={params.id} />
    </div>
  );
}
