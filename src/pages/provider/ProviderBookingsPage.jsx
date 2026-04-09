import { useState } from 'react';
import {
  useGenerateCompletionOTPMutation,
  useGetProviderBookingsQuery,
  useSetHoursWorkedMutation,
  useSetInspectionPriceMutation,
  useVerifyStartOTPMutation,
} from '../../redux/bookingApi';
import { toast } from 'react-toastify';
import ProviderBookingCard from './providerBookings/ProviderBookingCard';
import ProviderBookingsEmptyState from './providerBookings/ProviderBookingsEmptyState';
import ProviderBookingsHeader from './providerBookings/ProviderBookingsHeader';
import ProviderBookingsList from './providerBookings/ProviderBookingsList';
import ProviderBookingsLoadingState from './providerBookings/ProviderBookingsLoadingState';
import ProviderStartOtpModal from './providerBookings/ProviderStartOtpModal';

export default function ProviderBookingsPage() {
  const { data, isLoading, refetch } = useGetProviderBookingsQuery();
  const [verifyOTP] = useVerifyStartOTPMutation();
  const [generateOTP] = useGenerateCompletionOTPMutation();
  const [setHours] = useSetHoursWorkedMutation();
  const [setInspection] = useSetInspectionPriceMutation();

  const [otpModal, setOtpModal] = useState(null);
  const [otpInput, setOtpInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [hourInputs, setHourInputs] = useState({});
  const [inspectionInputs, setInspectionInputs] = useState({});
  const [completionOTPs, setCompletionOTPs] = useState({});
  const [savingPrice, setSavingPrice] = useState({});

  const bookings = data?.bookings || [];

  const handleVerifyStartOTP = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await verifyOTP({ bookingId: otpModal.bookingId, otp: otpInput.trim() }).unwrap();
      toast.success('OTP verified! Service has started.');
      setOtpModal(null);
      setOtpInput('');
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Invalid OTP');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSetHours = async (bookingId) => {
    const hours = parseFloat(hourInputs[bookingId]);
    if (!hours || hours <= 0) {
      toast.error('Enter valid number of hours');
      return;
    }

    setSavingPrice((state) => ({ ...state, [bookingId]: true }));
    try {
      await setHours({ bookingId, hoursWorked: hours }).unwrap();
      toast.success('Hours set! Final amount calculated.');
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to set hours');
    } finally {
      setSavingPrice((state) => ({ ...state, [bookingId]: false }));
    }
  };

  const handleSetInspectionPrice = async (bookingId) => {
    const price = parseFloat(inspectionInputs[bookingId]);
    if (!price || price <= 0) {
      toast.error('Enter a valid final price');
      return;
    }

    setSavingPrice((state) => ({ ...state, [bookingId]: true }));
    try {
      await setInspection({ bookingId, finalPrice: price }).unwrap();
      toast.success('Inspection price set!');
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to set price');
    } finally {
      setSavingPrice((state) => ({ ...state, [bookingId]: false }));
    }
  };

  const handleGenerateCompletionOTP = async (booking) => {
    if (booking.priceType === 'hourly' && !booking.finalPrice) {
      toast.error('Please set the hours worked first before generating OTP');
      return;
    }
    if (booking.priceType === 'inspection' && !booking.finalPrice) {
      toast.error('Please set the inspection price first before generating OTP');
      return;
    }

    try {
      const result = await generateOTP(booking._id).unwrap();
      setCompletionOTPs((state) => ({ ...state, [booking._id]: result.completionOTP }));
      toast.success('Completion OTP generated! Share it with the customer.');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to generate OTP');
    }
  };

  if (isLoading) return <ProviderBookingsLoadingState />;

  return (
    <div className="min-h-screen bg-gray-50 pt-(--height-navbar) pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto mt-8">
        <ProviderBookingsHeader />

        {bookings.length === 0 ? (
          <ProviderBookingsEmptyState />
        ) : (
          <ProviderBookingsList
            bookings={bookings}
            completionOTPs={completionOTPs}
            hourInputs={hourInputs}
            inspectionInputs={inspectionInputs}
            savingPrice={savingPrice}
            setHourInputs={setHourInputs}
            onSetHours={handleSetHours}
            setInspectionInputs={setInspectionInputs}
            onSetInspectionPrice={handleSetInspectionPrice}
            onGenerateCompletionOTP={handleGenerateCompletionOTP}
            onOpenStartOtp={(bookingId) => setOtpModal({ bookingId })}
          />
        )}
      </div>

      <ProviderStartOtpModal
        otpModal={otpModal}
        otpInput={otpInput}
        setOtpInput={setOtpInput}
        onClose={() => {
          setOtpModal(null);
          setOtpInput('');
        }}
        onSubmit={handleVerifyStartOTP}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
