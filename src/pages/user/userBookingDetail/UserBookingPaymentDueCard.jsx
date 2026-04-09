import { CreditCard } from 'lucide-react'

export default function UserBookingPaymentDueCard({ amountDue, onProceed }) {
  return (
    <div className="bg-white border border-purple-100 rounded-2xl p-6 mb-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-1">Service Complete - Pay Now</h3>
      <p className="text-sm text-gray-500 mb-4">The service has been confirmed. Choose your payment method.</p>
      <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 mb-4">
        <span className="font-semibold text-gray-600">Amount Due</span>
        <span className="text-2xl font-extrabold text-gray-900">₹{amountDue.toLocaleString('en-IN')}</span>
      </div>
      <button
        onClick={onProceed}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        <CreditCard size={18} /> Proceed to Payment
      </button>
    </div>
  )
}
