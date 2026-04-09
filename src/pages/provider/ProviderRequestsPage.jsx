import { useState } from 'react';
import {
  useAcceptServiceRequestMutation,
  useGetProviderRequestsQuery,
  useRejectServiceRequestMutation,
} from '../../redux/providerResponseApi';
import { toast } from 'react-toastify';
import ProviderAcceptQuoteModal from './providerRequests/ProviderAcceptQuoteModal';
import ProviderRequestsEmptyState from './providerRequests/ProviderRequestsEmptyState';
import ProviderRequestsGrid from './providerRequests/ProviderRequestsGrid';
import ProviderRequestsHeader from './providerRequests/ProviderRequestsHeader';
import ProviderRequestsLoadingState from './providerRequests/ProviderRequestsLoadingState';
import ProviderUserProfileModal from './providerRequests/ProviderUserProfileModal';

export default function ProviderRequestsPage() {
  const { data, isLoading } = useGetProviderRequestsQuery();
  const [acceptRequest, { isLoading: isAccepting }] = useAcceptServiceRequestMutation();
  const [rejectRequest, { isLoading: isRejecting }] = useRejectServiceRequestMutation();

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [message, setMessage] = useState('');

  const requests = data?.responses || [];

  const handleReject = async (id, event) => {
    event.stopPropagation();
    if (!window.confirm('Are you sure you want to decline this job opportunity?')) return;

    try {
      await rejectRequest(id).unwrap();
      toast.success('Request declined.');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to decline request.');
    }
  };

  const submitAcceptance = async (event) => {
    event.preventDefault();

    try {
      await acceptRequest({
        responseId: selectedRequest._id,
        message: message.trim(),
      }).unwrap();
      toast.success('Quote submitted to user!');
      setSelectedRequest(null);
      setMessage('');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to submit quote.');
    }
  };

  if (isLoading) return <ProviderRequestsLoadingState />;

  return (
    <div className="min-h-screen bg-gray-50 pt-(--height-navbar) pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto mt-8">
        <ProviderRequestsHeader />

        {requests.length === 0 ? (
          <ProviderRequestsEmptyState />
        ) : (
          <ProviderRequestsGrid
            requests={requests}
            onOpenUser={setViewingUser}
            onReject={handleReject}
            onAccept={setSelectedRequest}
            isRejecting={isRejecting}
          />
        )}
      </div>

      <ProviderUserProfileModal
        viewingUser={viewingUser}
        onClose={() => setViewingUser(null)}
      />

      <ProviderAcceptQuoteModal
        selectedRequest={selectedRequest}
        setSelectedRequest={setSelectedRequest}
        message={message}
        setMessage={setMessage}
        submitAcceptance={submitAcceptance}
        isAccepting={isAccepting}
      />
    </div>
  );
}
