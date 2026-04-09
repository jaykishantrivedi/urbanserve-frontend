import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetSingleBookingQuery, useVerifyCompletionOTPMutation } from '../../redux/bookingApi';
import { useGetMyReviewForBookingQuery } from '../../redux/reviewApi';
import { useGetUserPaymentsQuery } from '../../redux/paymentApi';
import { generateReceipt } from '../../utils/generateReceipt';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import UserBookingDetailLoadingState from './userBookingDetail/UserBookingDetailLoadingState';
import UserBookingDetailNotFoundState from './userBookingDetail/UserBookingDetailNotFoundState';
import UserBookingStatusBanner from './userBookingDetail/UserBookingStatusBanner';
import UserBookingMainCard from './userBookingDetail/UserBookingMainCard';
import UserBookingStartOtpCard from './userBookingDetail/UserBookingStartOtpCard';
import UserBookingCompletionOtpCard from './userBookingDetail/UserBookingCompletionOtpCard';
import UserBookingPaymentDueCard from './userBookingDetail/UserBookingPaymentDueCard';
import UserBookingCompletedSection from './userBookingDetail/UserBookingCompletedSection';

const statusConfig = {
    open:      { label: 'Confirmed',    cls: 'bg-blue-100 text-blue-700',    desc: 'Awaiting service start' },
    accepted:  { label: 'In Progress',  cls: 'bg-amber-100 text-amber-700',  desc: 'Service is being performed' },
    closed:    { label: 'Awaiting Payment', cls: 'bg-purple-100 text-purple-700', desc: 'Service done — please pay' },
    completed: { label: 'Completed',    cls: 'bg-emerald-100 text-emerald-700', desc: 'All done!' },
    cancelled: { label: 'Cancelled',    cls: 'bg-red-100 text-red-700',      desc: 'Booking cancelled' },
}

export default function UserBookingDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, refetch } = useGetSingleBookingQuery(id);
    const { data: reviewData } = useGetMyReviewForBookingQuery(id);
    const { data: paymentsData } = useGetUserPaymentsQuery();

    const [verifyCompletionOTP, { isLoading: isVerifying }] = useVerifyCompletionOTPMutation();
    const [otpInput, setOtpInput] = useState('');

    const booking = data?.booking;
    const hasReview = !!reviewData?.review;
    const payment = paymentsData?.allPayments?.find(p => p.booking?._id === id || p.booking === id);

    const handleVerifyCompletion = async (e) => {
        e.preventDefault();
        if (!otpInput.trim()) return;
        try {
            await verifyCompletionOTP({ bookingId: id, otp: otpInput.trim() }).unwrap();
            toast.success('Service confirmed! Proceed to payment.');
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || 'Invalid OTP');
        }
    };

    const handleDownloadReceipt = () => {
        if (!booking || !payment) return;
        generateReceipt({ booking, payment });
    };

    if (isLoading) return <UserBookingDetailLoadingState />;

    if (!booking) return <UserBookingDetailNotFoundState />;

    const sc = statusConfig[booking.status] || statusConfig.open;

    return (
        <div className="min-h-screen bg-gray-50 pt-(--height-navbar) pb-16 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto mt-8">
                {/* Back */}
                <button onClick={() => navigate('/user/bookings')} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium text-sm mb-6 transition-colors">
                    <ArrowLeft size={16} /> Back to Bookings
                </button>

                <UserBookingStatusBanner status={booking.status} statusConfig={statusConfig} />

                <UserBookingMainCard booking={booking} />

                {/* START OTP — when open */}
                {booking.status === 'open' && booking.startOTP && (
                    <UserBookingStartOtpCard startOTP={booking.startOTP} />
                )}

                {/* ENTER COMPLETION OTP — when accepted (in-progress) */}
                {booking.status === 'accepted' && (
                    <UserBookingCompletionOtpCard
                        otpInput={otpInput}
                        onOtpChange={(e) => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        onSubmit={handleVerifyCompletion}
                        isVerifying={isVerifying}
                    />
                )}

                {/* PAY NOW — when closed (service confirmed, payment pending) */}
                {booking.status === 'closed' && !booking.isPaid && (
                    <UserBookingPaymentDueCard
                        amountDue={booking.finalPrice || booking.price || 0}
                        onProceed={() => navigate(`/user/bookings/${id}/pay`)}
                    />
                )}

                {/* COMPLETED — Review & Receipt */}
                {booking.status === 'completed' && (
                    <UserBookingCompletedSection
                        payment={payment}
                        hasReview={hasReview}
                        reviewData={reviewData}
                        onDownloadReceipt={handleDownloadReceipt}
                        onWriteReview={() => navigate(`/user/bookings/${id}/review`)}
                    />
                )}
            </div>
        </div>
    );
}
