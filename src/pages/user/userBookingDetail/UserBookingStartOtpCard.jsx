import { Key } from 'lucide-react'

export default function UserBookingStartOtpCard({ startOTP }) {
  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 mb-6 flex items-center gap-4">
      <Key size={24} className="text-indigo-500 shrink-0" />
      <div>
        <p className="text-xs font-bold text-indigo-400 uppercase mb-1">Service Start OTP</p>
        <p className="text-3xl font-black tracking-[0.3em] text-indigo-700 font-mono">{startOTP}</p>
        <p className="text-xs text-indigo-400 mt-1">Share this OTP with the provider when they arrive to start the service.</p>
      </div>
    </div>
  )
}
