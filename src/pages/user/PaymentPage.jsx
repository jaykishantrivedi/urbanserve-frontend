import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetSingleBookingQuery } from '../../redux/bookingApi';
import { useCreatePaymentOrderMutation, useVerifyRazorpayPaymentMutation, useCreateCashPaymentMutation } from '../../redux/paymentApi';
import { useGetAdminSettingsQuery } from '../../redux/adminDashboardApi';
import { generateReceipt } from '../../utils/generateReceipt';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import PaymentLoadingState from './payment/PaymentLoadingState';
import PaymentNotFoundState from './payment/PaymentNotFoundState';
import PaymentSuccessState from './payment/PaymentSuccessState';
import PaymentBookingSummarySection from './payment/PaymentBookingSummarySection';
import PaymentOptionsSection from './payment/PaymentOptionsSection';

const loadRazorpay = () => new Promise(resolve => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
});

export default function PaymentPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading } = useGetSingleBookingQuery(id);
    const [createOrder] = useCreatePaymentOrderMutation();
    const [verifyPayment] = useVerifyRazorpayPaymentMutation();
    const [createCash] = useCreateCashPaymentMutation();
    const { data: settingData } = useGetAdminSettingsQuery();

    const [isProcessing, setIsProcessing] = useState(false);
    const [paidPayment, setPaidPayment] = useState(null);
    const [showReviewPrompt, setShowReviewPrompt] = useState(false);

    const booking = data?.booking;

    const handleOnlinePayment = async () => {
        setIsProcessing(true);
        try {
            const orderData = await createOrder(id).unwrap();
            const loaded = await loadRazorpay();
            if (!loaded) { toast.error('Razorpay SDK failed to load'); setIsProcessing(false); return; }

            const options = {
                key: orderData.razorpayKey || import.meta.env.VITE_RAZORPAY_KEY,
                amount: orderData.order.amount,
                currency: 'INR',
                name: 'UrbanServe',
                description: `Payment for ${booking?.service?.serviceName}`,
                image: '/favicon.ico',
                order_id: orderData.order.id,
                handler: async (response) => {
                    try {
                        const result = await verifyPayment({
                            bookingId: id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        }).unwrap();
                        setPaidPayment(result.payment);
                        setShowReviewPrompt(true);
                        toast.success('Payment successful! 🎉');
                    } catch (err) {
                        toast.error(err?.data?.message || 'Payment verification failed');
                    }
                },
                prefill: {},
                theme: { color: '#2563EB' },
                modal: { ondismiss: () => setIsProcessing(false) }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to initiate payment');
            setIsProcessing(false);
        }
    };

    const handleCashPayment = async () => {
        if (!window.confirm('Confirm cash payment? The booking will be marked as completed.')) return;
        setIsProcessing(true);
        try {
            const result = await createCash(id).unwrap();
            setPaidPayment(result.payment);
            setShowReviewPrompt(true);
            toast.success('Cash payment confirmed!');
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to record cash payment');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownloadReceipt = () => {
        if (!booking || !paidPayment) return;
        generateReceipt({ booking, payment: paidPayment });
    };

    if (isLoading) return <PaymentLoadingState />;

    if (!booking) return <PaymentNotFoundState />;

    const amount = booking.finalPrice || booking.price || 0;
    const maxCashAllowed = settingData?.settings?.maximumCashLimit || 5000;
    const commissionPct = settingData?.settings?.platformCommission || 10;
    const estimatedAdmin = Math.round((amount * commissionPct) / 100);
    const estimatedProvider = amount - estimatedAdmin;

    // SUCCESS STATE
    if (showReviewPrompt) {
        return (
            <PaymentSuccessState
                booking={booking}
                paidPayment={paidPayment}
                amount={amount}
                id={id}
                onDownloadReceipt={handleDownloadReceipt}
                navigate={navigate}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-(--height-navbar) pb-16 px-4 sm:px-6">
            <div className="max-w-xl mx-auto mt-8">
                <button onClick={() => navigate(`/user/bookings/${id}`)} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium text-sm mb-6 transition-colors">
                    <ArrowLeft size={16} /> Back to Booking
                </button>

                <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Complete Payment</h1>
                <p className="text-gray-500 mb-6">Choose how you'd like to pay for your service.</p>

                <PaymentBookingSummarySection
                    booking={booking}
                    amount={amount}
                    commissionPct={commissionPct}
                    estimatedAdmin={estimatedAdmin}
                    estimatedProvider={estimatedProvider}
                />

                <PaymentOptionsSection
                    amount={amount}
                    maxCashAllowed={maxCashAllowed}
                    isProcessing={isProcessing}
                    onOnlinePayment={handleOnlinePayment}
                    onCashPayment={handleCashPayment}
                />

                <p className="text-center text-xs text-gray-400 mt-6">
                    🔒 Secured by UrbanServe · SSL Encrypted
                </p>
            </div>
        </div>
    );
}
