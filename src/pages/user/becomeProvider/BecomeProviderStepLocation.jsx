import { Info } from "lucide-react"

export default function BecomeProviderStepLocation({ formData, formErrors, onFieldChange }) {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Where are you based?</h1>
        <p className="text-sm text-gray-500 mt-1">We use this to match you with nearby customers.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => onFieldChange("city", e.target.value)}
            placeholder="e.g. Navsari, Surat, Mumbai"
            className="w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 px-4 py-2.5 outline-none transition-all shadow-sm"
          />
          {formErrors.city && <p className="text-sm text-red-500 mt-1.5">{formErrors.city}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => onFieldChange("address", e.target.value)}
            placeholder="e.g. 12, MG Road, Near Bus Stand"
            className="w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 px-4 py-2.5 outline-none transition-all shadow-sm"
          />
          {formErrors.address && <p className="text-sm text-red-500 mt-1.5">{formErrors.address}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">
            Service Location (Coordinates) <span className="font-normal text-xs text-gray-400">(Optional)</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={formData.latitude}
              onChange={(e) => onFieldChange("latitude", e.target.value)}
              placeholder="Latitude e.g. 18.5204"
              className="w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 px-4 py-2.5 outline-none transition-all shadow-sm"
            />
            <input
              type="text"
              value={formData.longitude}
              onChange={(e) => onFieldChange("longitude", e.target.value)}
              placeholder="Longitude e.g. 73.8567"
              className="w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 px-4 py-2.5 outline-none transition-all shadow-sm"
            />
          </div>

          <div className="mt-4 bg-[#eff6ff] text-blue-800 p-3 rounded-xl flex items-start gap-2.5 text-sm border border-blue-100 shadow-inner">
            <Info size={16} className="text-blue-500 mt-0.5 shrink-0" />
            <p className="leading-snug">
              <span className="font-bold block mb-0.5">Tip:</span>
              You can pick your coordinates from Google Maps, then right click and copy coordinates.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
