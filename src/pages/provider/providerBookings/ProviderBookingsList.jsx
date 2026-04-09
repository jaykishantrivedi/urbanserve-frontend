import ProviderBookingCard from './ProviderBookingCard';

export default function ProviderBookingsList({
  bookings,
  completionOTPs,
  hourInputs,
  inspectionInputs,
  savingPrice,
  setHourInputs,
  onSetHours,
  setInspectionInputs,
  onSetInspectionPrice,
  onGenerateCompletionOTP,
  onOpenStartOtp,
}) {
  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <ProviderBookingCard
          key={booking._id}
          booking={booking}
          genOTP={completionOTPs[booking._id]}
          hourInput={hourInputs[booking._id] || ''}
          inspectionInput={inspectionInputs[booking._id] || ''}
          isSavingPrice={savingPrice[booking._id]}
          onHourInputChange={(value) => setHourInputs((state) => ({ ...state, [booking._id]: value }))}
          onSetHours={() => onSetHours(booking._id)}
          onInspectionInputChange={(value) => setInspectionInputs((state) => ({ ...state, [booking._id]: value }))}
          onSetInspectionPrice={() => onSetInspectionPrice(booking._id)}
          onGenerateCompletionOTP={() => onGenerateCompletionOTP(booking)}
          onOpenStartOtp={() => onOpenStartOtp(booking._id)}
        />
      ))}
    </div>
  );
}
