import { useGetUserRequestsQuery, useCancelServiceRequestMutation } from '../../redux/serviceRequestApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserRequestsEmptyState from './userRequests/UserRequestsEmptyState';
import UserRequestsHeader from './userRequests/UserRequestsHeader';
import UserRequestsList from './userRequests/UserRequestsList';
import UserRequestsLoadingState from './userRequests/UserRequestsLoadingState';

export default function UserRequestsPage() {
    const { data, isLoading } = useGetUserRequestsQuery();
    const [cancelRequest] = useCancelServiceRequestMutation();
    const navigate = useNavigate();

    const requests = data?.requests || [];

    const handleCancel = async (id, e) => {
        e.stopPropagation();
        if(!window.confirm("Are you sure you want to cancel this enquiry?")) return;
        try {
            await cancelRequest(id).unwrap();
            toast.success("Request cancelled successfully.");
        } catch (error) {
            toast.error(error?.data?.message || "Failed to cancel request.");
        }
    };

    if (isLoading) return <UserRequestsLoadingState />;

    return (
        <div className="min-h-screen bg-gray-50 pt-(--height-navbar) pb-12 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto mt-8">
                <UserRequestsHeader />

                {requests.length === 0 ? (
                    <UserRequestsEmptyState onBrowseServices={() => navigate('/categories')} />
                ) : (
                    <UserRequestsList
                        requests={requests}
                        onView={(requestId) => navigate(`/user/requests/${requestId}`)}
                        onCancel={handleCancel}
                    />
                )}
            </div>
        </div>
    );
}
