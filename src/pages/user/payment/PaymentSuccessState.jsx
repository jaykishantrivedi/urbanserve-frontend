import { Download, ShieldCheck } from "lucide-react";
import PaymentInfoRow from "./PaymentInfoRow";

export default function PaymentSuccessState({ booking, paidPayment, amount, id, onDownloadReceipt, navigate }) {
  return (
    <div className="min-h-screen bg-gray-50 pt-[var(--height-navbar)] pb-16 px-4 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <ShieldCheck size={40} className="text-emerald-600" />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Payment Complete!</h2>
        <p className="text-gray-500 mb-6">Your booking has been completed successfully.</p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2">
          <PaymentInfoRow label="Service" value={booking.service?.serviceName} />
          <PaymentInfoRow label="Provider" value={booking.provider?.businessName} />
          <PaymentInfoRow label="Amount Paid" value={`₹${amount.toLocaleString("en-IN")}`} highlight />
          <PaymentInfoRow label="Payment Method" value={(paidPayment?.paymentMethod || "-").toUpperCase()} />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onDownloadReceipt}
            className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors"
          >
            <Download size={18} /> Download Receipt (PDF)
          </button>
          <button
            onClick={() => navigate(`/user/bookings/${id}/review`)}
            className="w-full border-2 border-amber-400 text-amber-600 hover:bg-amber-50 font-bold py-3 rounded-xl transition-colors"
          >
            Star Write a Review
          </button>
          <button
            onClick={() => navigate("/user/bookings")}
            className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors text-sm"
          >
            Back to My Bookings
          </button>
        </div>
      </div>
    </div>
  );
}
