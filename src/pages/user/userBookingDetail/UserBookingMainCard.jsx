import { Calendar, Clock, CreditCard, MapPin } from 'lucide-react'

function Detail({ icon, label, value, highlight }) {
  return (
    <div className="flex items-start gap-3">
      {icon && <div className="mt-0.5">{icon}</div>}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
        <p className={`font-semibold ${highlight ? 'text-emerald-600 text-lg' : 'text-gray-800'}`}>{value}</p>
      </div>
    </div>
  )
}

export default function UserBookingMainCard({ booking }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
      <div className="p-6 border-b border-gray-50">
        <h1 className="text-2xl font-extrabold text-gray-900">{booking.service?.serviceName}</h1>
        <p className="text-gray-500 mt-1">
          by <span className="font-semibold text-gray-700">{booking.provider?.businessName}</span>
        </p>
      </div>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Detail icon={<MapPin size={16} className="text-blue-500" />} label="Location" value={booking.location} />
        <Detail
          icon={<Calendar size={16} className="text-blue-500" />}
          label="Service Date"
          value={new Date(booking.serviceDate).toLocaleDateString('en-IN', { dateStyle: 'long' })}
        />
        <Detail icon={<Clock size={16} className="text-blue-500" />} label="Service Time" value={booking.serviceTime} />
        <Detail icon={<CreditCard size={16} className="text-blue-500" />} label="Price Type" value={booking.priceType?.toUpperCase()} />
        {booking.price && (
          <Detail
            label="Rate"
            value={`₹${booking.price?.toLocaleString('en-IN')}${booking.priceType === 'hourly' ? '/hr' : ''}`}
          />
        )}
        {booking.finalPrice && <Detail label="Final Amount" value={`₹${booking.finalPrice?.toLocaleString('en-IN')}`} highlight />}
      </div>
    </div>
  )
}
