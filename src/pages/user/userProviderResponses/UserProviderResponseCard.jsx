import { Briefcase, CheckCircle, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function UserProviderResponseCard({ resp, isChoosing, isDeclining, onReject, onAccept }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-lg transition-all flex flex-col">
      <div className="flex items-start gap-4 mb-5">
        <div className="shrink-0 w-16 h-16 rounded-xl bg-gray-100 overflow-hidden">
          {resp.provider?.profileImage ? (
            <img src={resp.provider.profileImage} alt={resp.provider.businessName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-2xl">
              {resp.provider?.businessName?.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">{resp.provider?.businessName}</h3>
          <div className="flex items-center gap-1.5 text-sm mb-2">
            <Star size={14} className="fill-amber-400 text-amber-500" />
            <span className="font-bold text-gray-700">{resp.provider?.rating > 0 ? resp.provider.rating.toFixed(1) : 'New'}</span>
            {resp.provider?.totalReviews > 0 && <span className="text-gray-400">({resp.provider.totalReviews})</span>}
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
              <MapPin size={12} /> {resp.provider?.city}
            </span>
            <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
              <Briefcase size={12} /> {resp.provider?.experience} yrs
            </span>
          </div>
        </div>
      </div>

      {resp.message && (
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-50/80 mb-5 relative">
          <div className="absolute -top-2 left-4 px-2 bg-blue-50/50 text-[10px] font-bold text-blue-400 uppercase tracking-widest rounded-full">
            Provider Note
          </div>
          <p className="text-sm text-gray-600 font-medium italic mt-2 line-clamp-3">"{resp.message}"</p>
        </div>
      )}

      <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Proposed Quote</p>
          {resp.priceType === 'inspection' ? (
            <span className="text-emerald-600 font-black text-lg bg-emerald-50 px-3 py-1 rounded-lg">On Visit</span>
          ) : (
            <div className="flex items-end gap-1">
              <span className="text-gray-900 font-extrabold text-2xl leading-none">₹{resp.price?.toLocaleString('en-IN') || 0}</span>
              <span className="text-gray-500 font-medium text-sm mb-0.5">{resp.priceType === 'hourly' ? '/hr' : 'fixed'}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReject}
            disabled={isChoosing || isDeclining}
            className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 px-4 py-2.5 rounded-xl font-bold transition-all text-sm shrink-0"
          >
            Reject
          </button>
          <button
            onClick={onAccept}
            disabled={isChoosing || isDeclining}
            className="bg-gray-900 hover:bg-blue-600 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1.5 text-sm shrink-0"
          >
            <CheckCircle size={16} /> Accept
          </button>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-50">
        <Link
          to={`/providers/${resp.provider?._id}`}
          className="block text-center text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50/50 hover:bg-blue-50 py-2 rounded-lg"
        >
          View Provider Profile
        </Link>
      </div>
    </div>
  )
}
