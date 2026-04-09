import UserRequestCard from './UserRequestCard';

export default function UserRequestsList({ requests, onView, onCancel }) {
    return (
        <div className="space-y-4">
            {requests.map((request) => (
                <UserRequestCard
                    key={request._id}
                    request={request}
                    onView={onView}
                    onCancel={onCancel}
                />
            ))}
        </div>
    );
}
