import ProviderRequestCard from './ProviderRequestCard';

export default function ProviderRequestsGrid({
  requests,
  onOpenUser,
  onReject,
  onAccept,
  isRejecting,
}) {
  const pendingRequests = requests.filter((request) => request.status === 'pending');

  return (
    <div className="grid grid-cols-1 gap-4 mt-6">
      {pendingRequests.map((response) => (
        <ProviderRequestCard
          key={response._id}
          response={response}
          onOpenUser={() => onOpenUser(response.serviceRequest?.user)}
          onReject={(event) => onReject(response._id, event)}
          onAccept={() => onAccept(response)}
          isRejecting={isRejecting}
        />
      ))}
    </div>
  );
}
