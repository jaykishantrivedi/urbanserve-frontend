import { MapPin, X } from 'lucide-react'

const EnquiryModal = ({
  selectedProvider,
  enquiryForm,
  onChange,
  onClose,
  onSubmit,
  isSubmitting,
}) => {
  if (!selectedProvider) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/0 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border border-gray-100 w-full max-w-lg relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-slide-down">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#F8FAFC]">
          <div>
            <h3 className="text-xl font-extrabold text-[#0a3d6f] tracking-tight">Direct Enquiry</h3>
            <p className="text-[13px] font-bold text-gray-500 mt-0.5 tracking-wide uppercase">
              To: <span className="text-blue-600">{selectedProvider.provider.businessName}</span>
            </p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-2xl bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm">
            <X size={16} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar bg-white">
          <form id="enquiry-form" onSubmit={onSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5 focus-within:text-[#1a5ea8] group">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-[#1a5ea8] transition-colors pl-1">
                  Location
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1a5ea8]" />
                  <input
                    required
                    type="text"
                    value={enquiryForm.location}
                    onChange={(event) => onChange('location', event.target.value)}
                    className="form-input shadow-sm pl-11"
                    placeholder="City or area"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 focus-within:text-[#1a5ea8] group">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-[#1a5ea8] transition-colors pl-1">
                  Preferred Date
                </label>
                <input
                  required
                  min={new Date().toISOString().split('T')[0]}
                  type="date"
                  value={enquiryForm.preferredDate}
                  onChange={(event) => onChange('preferredDate', event.target.value)}
                  className="form-input shadow-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 focus-within:text-[#1a5ea8] group">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-[#1a5ea8] transition-colors pl-1">
                Complete Address
              </label>
              <input
                required
                type="text"
                value={enquiryForm.address}
                onChange={(event) => onChange('address', event.target.value)}
                className="form-input shadow-sm"
                placeholder="Flat, Building, Street"
              />
            </div>

            <div className="flex flex-col gap-1.5 focus-within:text-[#1a5ea8] group">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-[#1a5ea8] transition-colors pl-1">
                Preferred Time (Optional)
              </label>
              <input
                type="time"
                value={enquiryForm.preferredTime}
                onChange={(event) => onChange('preferredTime', event.target.value)}
                className="form-input shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5 focus-within:text-[#1a5ea8] group">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-[#1a5ea8] transition-colors pl-1">
                Message to Provider (Optional)
              </label>
              <textarea
                rows="3"
                value={enquiryForm.message}
                onChange={(event) => onChange('message', event.target.value)}
                className="form-input shadow-sm resize-none"
                placeholder="Describe your exact requirement..."
              />
            </div>
          </form>
        </div>

        <div className="p-5 border-t border-gray-100 bg-[#F8FAFC] flex items-center justify-end gap-3 mt-auto shrink-0">
          <button onClick={onClose} type="button" className="px-5 py-2.5 text-[14px] font-extrabold text-gray-500 hover:text-[#0a3d6f] transition-colors">
            Cancel
          </button>
          <button form="enquiry-form" type="submit" disabled={isSubmitting} className="btn-primary w-auto px-7 py-2.5 shadow-[0_8px_16px_-6px_rgba(26,94,168,0.3)]">
            {isSubmitting ? 'Sending...' : 'Send Enquiry'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EnquiryModal
