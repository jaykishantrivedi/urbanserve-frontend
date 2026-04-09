import { Calendar, ChevronRight, Clock, MapPin, XCircle } from 'lucide-react'
import userBookingStatusConfig from './userBookingStatusConfig'

export default function UserBookingCard({ booking, cancellingId, onCancel, onViewDetails }) {
  const status = userBookingStatusConfig[booking.status] || userBookingStatusConfig.open
  const canCancel = booking.status === 'open'

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{booking.service?.serviceName}</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              by <span className="font-semibold text-gray-700">{booking.provider?.businessName}</span>
            </p>
          </div>
          <span className={`shrink-0 px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${status.cls}`}>
            {status.label}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 font-medium mb-4">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-gray-400" />
            {booking.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-gray-400" />
            {new Date(booking.serviceDate).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-gray-400" />
            {booking.serviceTime}
          </span>
        </div>

        <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 mb-4">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase mb-0.5">Quote</p>
            {booking.priceType === 'inspection' ? (
              <p className="font-bold text-gray-700">On Inspection</p>
            ) : (
              <p className="font-bold text-gray-700">
                ₹{booking.price?.toLocaleString('en-IN')}
                <span className="text-gray-400 font-normal text-sm ml-1">{booking.priceType === 'hourly' ? '/hr' : 'fixed'}</span>
              </p>
            )}
          </div>
          {booking.finalPrice && (
            <div className="text-right">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-0.5">Final Amount</p>
              <p className="font-extrabold text-emerald-600 text-lg">₹{booking.finalPrice?.toLocaleString('en-IN')}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {canCancel ? (
            <button
              onClick={onCancel}
              disabled={cancellingId === booking._id}
              className="flex items-center gap-1.5 text-red-500 hover:text-red-700 text-sm font-semibold disabled:opacity-50"
            >
              <XCircle size={16} /> Cancel Booking
            </button>
          ) : (
            <div />
          )}
          <button onClick={onViewDetails} className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-semibold">
            View Details <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
