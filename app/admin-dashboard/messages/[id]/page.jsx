import MessageThread from "../../../components/messages/MessageThread";

export default function MessageThreadPage({ params }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mt-10">
      <MessageThread messageId={params.id} />
    </div>
  );
}
