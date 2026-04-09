import { Key } from 'lucide-react'

export default function UserProviderStartOtpModal({ otpModal, onClose }) {
  if (!otpModal) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm text-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <Key size={28} className="text-indigo-600" />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Booking Confirmed! 🎉</h2>
        <p className="text-gray-500 text-sm mb-5">
          Save your Service Start OTP - share this with the provider when they arrive to start the service.
        </p>
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl py-5 px-4 mb-5">
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Your Start OTP</p>
          <p className="text-4xl font-black tracking-[0.4em] text-indigo-700 font-mono">{otpModal.startOTP}</p>
          <p className="text-xs text-indigo-400 mt-2">This is shown only once. Save it somewhere safe!</p>
        </div>
        <button onClick={onClose} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-colors">
          Got it - View My Bookings
        </button>
      </div>
    </div>
  )
}
