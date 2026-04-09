import { Key } from 'lucide-react'

export default function UserBookingCompletionOtpCard({ otpInput, onOtpChange, onSubmit, isVerifying }) {
  return (
    <div className="bg-white border border-amber-100 rounded-2xl p-6 mb-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
        <Key size={18} className="text-amber-500" /> Enter Completion OTP
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        The provider will give you a 6-digit OTP after completing the service. Enter it below to confirm and proceed to payment.
      </p>
      <form onSubmit={onSubmit} className="flex gap-3">
        <input
          type="text"
          value={otpInput}
          onChange={onOtpChange}
          placeholder="000000"
          maxLength={6}
          className="flex-1 text-center text-2xl font-black tracking-[0.4em] border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-400 focus:outline-none font-mono"
        />
        <button
          type="submit"
          disabled={isVerifying || otpInput.length !== 6}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl disabled:opacity-50 transition-colors"
        >
          {isVerifying ? 'Verifying...' : 'Confirm'}
        </button>
      </form>
    </div>
  )
}
