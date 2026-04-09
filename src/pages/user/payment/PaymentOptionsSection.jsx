import { Banknote, CreditCard, ShieldCheck } from "lucide-react";

export default function PaymentOptionsSection({ amount, maxCashAllowed, isProcessing, onOnlinePayment, onCashPayment }) {
  return (
    <div className="space-y-4">
      <button
        onClick={onOnlinePayment}
        disabled={isProcessing}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-2xl p-5 text-left transition-all shadow-sm hover:shadow-md group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <CreditCard size={24} />
            </div>
            <div>
              <p className="font-bold text-lg">Pay Online</p>
              <p className="text-blue-200 text-sm">UPI · Cards · Net Banking via Razorpay</p>
            </div>
          </div>
          <ShieldCheck size={20} className="text-blue-200 group-hover:text-white transition-colors" />
        </div>
      </button>

      {amount <= maxCashAllowed && (
        <button
          onClick={onCashPayment}
          disabled={isProcessing}
          className="w-full bg-white hover:bg-gray-50 disabled:opacity-60 border-2 border-gray-200 hover:border-gray-300 text-gray-800 rounded-2xl p-5 text-left transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <Banknote size={24} className="text-gray-600" />
            </div>
            <div>
              <p className="font-bold text-lg">Cash on Service</p>
              <p className="text-gray-500 text-sm">Pay directly to the provider in cash</p>
            </div>
          </div>
        </button>
      )}

      {amount > maxCashAllowed && (
        <div className="w-full bg-gray-50 border border-gray-200 text-gray-500 rounded-2xl p-4 text-center text-sm">
          <Banknote className="mx-auto mb-2 text-gray-400" size={20} />
          Cash payment is not available for transactions over ₹{maxCashAllowed.toLocaleString("en-IN")}. <br /> Please pay
          securely online.
        </div>
      )}
    </div>
  );
}
