import { useGetProviderPaymentsQuery } from '../../redux/paymentApi';
import { useGetProviderBookingsQuery } from '../../redux/bookingApi';
import { generateReceipt } from '../../utils/generateReceipt';
import { toast } from 'react-toastify';
import ProviderPaymentsEmptyState from './providerPayments/ProviderPaymentsEmptyState';
import ProviderPaymentsHeader from './providerPayments/ProviderPaymentsHeader';
import ProviderPaymentsList from './providerPayments/ProviderPaymentsList';
import ProviderPaymentsLoadingState from './providerPayments/ProviderPaymentsLoadingState';
import ProviderPaymentsSummaryCard from './providerPayments/ProviderPaymentsSummaryCard';

export default function ProviderPaymentsPage() {
    const { data, isLoading } = useGetProviderPaymentsQuery();
    const { data: bookingsData } = useGetProviderBookingsQuery();

    const payments = data?.allPayments || [];
    const bookings = bookingsData?.bookings || [];

    const totalEarned = payments
        .filter((payment) => payment.paymentStatus === 'paid')
        .reduce((sum, payment) => sum + (payment.providerAmount || 0), 0);

    const handleDownloadReceipt = (payment) => {
        const bookingId = payment.booking?._id || payment.booking;
        const booking = bookings.find(
            (candidate) =>
                candidate._id === bookingId ||
                candidate._id?.toString() === bookingId?.toString()
        );

        if (!booking) {
            toast.error('Booking details not loaded yet — please try again');
            return;
        }

        generateReceipt({ booking, payment });
    };

    if (isLoading) return <ProviderPaymentsLoadingState />;

    return (
        <div className="min-h-screen bg-gray-50 pt-(--height-navbar) pb-12 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto mt-8">
                <ProviderPaymentsHeader />
                <ProviderPaymentsSummaryCard totalEarned={totalEarned} />

                {payments.length === 0 ? (
                    <ProviderPaymentsEmptyState />
                ) : (
                    <ProviderPaymentsList
                        payments={payments}
                        onDownloadReceipt={handleDownloadReceipt}
                    />
                )}
            </div>
        </div>
    );
}
