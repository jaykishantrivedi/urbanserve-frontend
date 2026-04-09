import PaymentInfoRow from "./PaymentInfoRow";

export default function PaymentBookingSummarySection({ booking, amount, commissionPct, estimatedAdmin, estimatedProvider }) {
  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <h2 className="font-bold text-gray-700 text-xs uppercase tracking-wider mb-3">Booking Summary</h2>
        <div className="space-y-2">
          <PaymentInfoRow label="Service" value={booking.service?.serviceName} />
          <PaymentInfoRow label="Provider" value={booking.provider?.businessName} />
          <PaymentInfoRow
            label="Date"
            value={new Date(booking.serviceDate).toLocaleDateString("en-IN", { dateStyle: "long" })}
          />
          <PaymentInfoRow label="Location" value={booking.location} />
          <div className="border-t border-gray-100 pt-2 mt-2">
            <PaymentInfoRow label="Total Amount" value={`₹${amount.toLocaleString("en-IN")}`} highlight />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-6 text-sm text-blue-700">
        <p className="font-semibold mb-1">How your payment is used:</p>
        <p>
          Platform fee (~{commissionPct}%): <strong>₹{estimatedAdmin.toLocaleString("en-IN")}</strong> · Provider receives:{" "}
          <strong>₹{estimatedProvider.toLocaleString("en-IN")}</strong>
        </p>
      </div>
    </>
  );
}
