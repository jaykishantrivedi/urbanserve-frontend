import {
  Calendar,
  CheckCircle2,
  Clock,
  Clock3,
  IndianRupee,
  KeyRound,
  MapPin,
  Share2,
} from 'lucide-react';
import { getProviderBookingStatus } from './providerBookingStatusConfig';

export default function ProviderBookingCard({
  booking,
  genOTP,
  hourInput,
  inspectionInput,
  isSavingPrice,
  onHourInputChange,
  onSetHours,
  onInspectionInputChange,
  onSetInspectionPrice,
  onGenerateCompletionOTP,
  onOpenStartOtp,
}) {
  const status = getProviderBookingStatus(booking.status);
  const needsPriceSet =
    booking.status === 'accepted' &&
    !booking.finalPrice &&
    (booking.priceType === 'hourly' || booking.priceType === 'inspection');

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{booking.service?.serviceName}</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Customer: <span className="font-semibold text-gray-700">{booking.user?.name}</span>
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
            <p className="text-xs font-semibold text-gray-400 uppercase mb-0.5">
              {booking.priceType === 'inspection'
                ? 'On Inspection'
                : booking.priceType === 'hourly'
                  ? 'Rate / hr'
                  : 'Fixed Price'}
            </p>
            {booking.priceType === 'inspection' ? (
              <p className="font-bold text-gray-500 italic text-sm">To be assessed</p>
            ) : (
              <p className="font-bold text-gray-700">
                Rs{booking.price?.toLocaleString('en-IN')}
                {booking.priceType === 'hourly' ? '/hr' : ''}
              </p>
            )}
          </div>
          {booking.finalPrice ? (
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase mb-0.5">Final Amount</p>
              <p className="font-extrabold text-emerald-600 text-lg">Rs{booking.finalPrice?.toLocaleString('en-IN')}</p>
              {booking.hoursWorked && (
                <p className="text-xs text-gray-400">
                  {booking.hoursWorked} hrs x Rs{booking.price}/hr
                </p>
              )}
            </div>
          ) : needsPriceSet ? (
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">Set price first</span>
          ) : null}
        </div>

        {booking.status === 'accepted' && booking.priceType === 'hourly' && !booking.finalPrice && (
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-4">
            <p className="text-sm font-bold text-amber-700 flex items-center gap-2 mb-3">
              <Clock3 size={16} /> Set Hours Worked
            </p>
            <p className="text-xs text-amber-600 mb-3">
              Rate: Rs{booking.price}/hr - Enter total hours to calculate the final amount.
            </p>
            <div className="flex gap-2">
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={hourInput}
                onChange={(event) => onHourInputChange(event.target.value)}
                placeholder="e.g. 2.5"
                className="flex-1 border-2 border-amber-200 rounded-xl px-3 py-2 text-sm font-semibold focus:border-amber-400 focus:outline-none"
              />
              <button
                onClick={onSetHours}
                disabled={isSavingPrice}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl disabled:opacity-50 transition-colors"
              >
                {isSavingPrice ? '...' : 'Confirm'}
              </button>
            </div>
            {hourInput > 0 && (
              <p className="text-xs text-amber-700 font-semibold mt-2">
                Final: Rs{Math.round(hourInput * booking.price).toLocaleString('en-IN')}
              </p>
            )}
          </div>
        )}

        {booking.status === 'accepted' && booking.priceType === 'inspection' && !booking.finalPrice && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
            <p className="text-sm font-bold text-blue-700 flex items-center gap-2 mb-3">
              <IndianRupee size={16} /> Set Inspection Price
            </p>
            <p className="text-xs text-blue-600 mb-3">After inspecting, set the final price for the customer.</p>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">Rs</span>
                <input
                  type="number"
                  min="1"
                  value={inspectionInput}
                  onChange={(event) => onInspectionInputChange(event.target.value)}
                  placeholder="Final amount"
                  className="w-full border-2 border-blue-200 rounded-xl pl-9 pr-3 py-2 text-sm font-semibold focus:border-blue-400 focus:outline-none"
                />
              </div>
              <button
                onClick={onSetInspectionPrice}
                disabled={isSavingPrice}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl disabled:opacity-50 transition-colors"
              >
                {isSavingPrice ? '...' : 'Set Price'}
              </button>
            </div>
          </div>
        )}

        {genOTP && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 mb-4">
            <Share2 size={18} className="text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-emerald-500 uppercase mb-0.5">Completion OTP - Share with Customer</p>
              <p className="text-2xl font-black tracking-[0.3em] text-emerald-700 font-mono">{genOTP}</p>
              <p className="text-xs text-emerald-500 mt-0.5">
                Customer enters this to confirm service and proceed to payment
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100">
          {booking.status === 'open' && (
            <button
              onClick={onOpenStartOtp}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors"
            >
              <KeyRound size={16} /> Enter Start OTP
            </button>
          )}
          {booking.status === 'accepted' && !genOTP && (
            <button
              onClick={onGenerateCompletionOTP}
              disabled={needsPriceSet}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors"
              title={needsPriceSet ? 'Set the price first' : ''}
            >
              <CheckCircle2 size={16} />
              {needsPriceSet ? 'Set Price First' : 'Generate Completion OTP'}
            </button>
          )}
          {booking.status === 'accepted' && genOTP && (
            <button
              onClick={onGenerateCompletionOTP}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-xl font-bold text-sm transition-colors"
            >
              Regenerate OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
