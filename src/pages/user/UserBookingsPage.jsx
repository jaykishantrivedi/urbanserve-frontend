import { useState } from 'react';
import { useGetUserBookingsQuery, useCancelBookingMutation } from '../../redux/bookingApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UserBookingsLoadingState from './userBookings/UserBookingsLoadingState';
import UserBookingsHeader from './userBookings/UserBookingsHeader';
import UserBookingsEmptyState from './userBookings/UserBookingsEmptyState';
import UserBookingsList from './userBookings/UserBookingsList';

export default function UserBookingsPage() {
    // Poll every 15s so status updates (after provider OTP / payment) reflect without manual refresh
    const { data, isLoading, refetch } = useGetUserBookingsQuery(undefined, { pollingInterval: 15000 });
    const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
    const [cancellingId, setCancellingId] = useState(null);
    const navigate = useNavigate();

    const bookings = data?.bookings || [];

    const handleCancel = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        setCancellingId(bookingId);
        try {
            await cancelBooking(bookingId).unwrap();
            toast.success("Booking cancelled successfully.");
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || "Failed to cancel booking.");
        } finally {
            setCancellingId(null);
        }
    };

    if (isLoading) {
        return <UserBookingsLoadingState />;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-(--height-navbar) pb-12 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto mt-8">
                <UserBookingsHeader />

                {bookings.length === 0 ? (
                    <UserBookingsEmptyState onViewRequests={() => navigate('/user/requests')} />
                ) : (
                    <UserBookingsList
                        bookings={bookings}
                        cancellingId={cancellingId}
                        onCancel={handleCancel}
                        onViewDetails={(bookingId) => navigate(`/user/bookings/${bookingId}`)}
                    />
                )}
            </div>
        </div>
    );
}
