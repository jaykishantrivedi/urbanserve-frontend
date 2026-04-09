import { CheckCircle2 } from 'lucide-react'

export default function UserBookingStatusBanner({ status, statusConfig }) {
  const sc = statusConfig[status] || statusConfig.open

  return (
    <div
      className={`rounded-2xl px-6 py-4 mb-6 border ${
        status === 'completed' ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-gray-100'
      } shadow-sm flex items-center justify-between`}
    >
      <div>
        <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${sc.cls}`}>{sc.label}</span>
        <p className="text-gray-500 text-sm mt-1">{sc.desc}</p>
      </div>
      {status === 'completed' && <CheckCircle2 size={32} className="text-emerald-500" />}
    </div>
  )
}
