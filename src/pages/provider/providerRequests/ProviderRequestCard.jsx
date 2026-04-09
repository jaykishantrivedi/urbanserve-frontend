import {
  Calendar,
  Check,
  Clock,
  MapPin,
  User,
  UserCircle,
  X,
} from 'lucide-react';

export default function ProviderRequestCard({
  response,
  onOpenUser,
  onReject,
  onAccept,
  isRejecting,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm lg:p-6 lg:flex lg:items-center lg:justify-between">
      <div className="flex-1 lg:pr-8">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-xl font-bold text-gray-900">
            {response.serviceRequest?.service?.serviceName || 'New Service Enquiry'}
          </h3>
          <span className="bg-amber-100 text-amber-700 px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wide">
            Awaiting Quote
          </span>
        </div>

        {response.serviceRequest?.user && (
          <div className="flex items-center gap-2 mb-3">
            {response.serviceRequest.user.pfpUrl ? (
              <img
                src={response.serviceRequest.user.pfpUrl}
                alt={response.serviceRequest.user.name}
                className="w-7 h-7 rounded-full object-cover border border-gray-200"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
                <User size={14} className="text-indigo-500" />
              </div>
            )}
            <span className="text-sm font-semibold text-gray-700">{response.serviceRequest.user.name}</span>
          </div>
        )}

        <div className="text-sm font-medium text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100 mb-4">
          {response.serviceRequest?.message
            ? `"${response.serviceRequest.message}"`
            : 'No additional details provided by user.'}
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-1.5">
            <MapPin size={15} className="text-gray-400" />
            {response.serviceRequest?.location}{' '}
            <span className="text-xs text-gray-400">({response.serviceRequest?.address})</span>
          </div>
          <div className="flex items-center gap-1.5 bg-blue-50 px-2 py-0.5 rounded-lg text-blue-700 border border-blue-100">
            <Calendar size={14} className="text-blue-500" />
            {new Date(response.serviceRequest?.preferredDate).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1.5 bg-blue-50 px-2 py-0.5 rounded-lg text-blue-700 border border-blue-100">
            <Clock size={14} className="text-blue-500" />
            {response.serviceRequest?.preferredTime}
          </div>
        </div>
      </div>

      <div className="mt-5 lg:mt-0 flex flex-col sm:flex-row gap-3 min-w-55">
        <button
          onClick={onOpenUser}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-bold rounded-xl transition-colors"
        >
          <UserCircle size={17} /> Profile
        </button>

        <button
          onClick={onReject}
          disabled={isRejecting}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-red-200 text-red-600 hover:bg-red-50 font-bold rounded-xl transition-colors shrink-0"
        >
          <X size={18} /> Decline
        </button>

        <button
          onClick={onAccept}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-md active:scale-95 shrink-0"
        >
          <Check size={18} /> Accept
        </button>
      </div>
    </div>
  );
}
