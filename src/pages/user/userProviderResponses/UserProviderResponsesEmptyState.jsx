import { Clock } from 'lucide-react'

export default function UserProviderResponsesEmptyState() {
  return (
    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <Clock size={28} className="text-blue-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900">Awaiting Responses</h3>
      <p className="text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
        Providers in your area have been notified. We will notify you via the bell icon as soon as quotes arrive.
      </p>
    </div>
  )
}
