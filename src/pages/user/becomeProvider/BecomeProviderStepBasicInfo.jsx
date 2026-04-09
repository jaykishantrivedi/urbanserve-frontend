import { Loader2, UploadCloud, User } from "lucide-react"

export default function BecomeProviderStepBasicInfo({
  formData,
  formErrors,
  isUploadingProfile,
  onFieldChange,
  onProfileUpload,
}) {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Tell us about your business</h1>
        <p className="text-sm text-gray-500 mt-1">This is what customers will see on your profile.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">
            Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) => onFieldChange("businessName", e.target.value)}
            placeholder="e.g. Sharma Electricals"
            className="w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 px-4 py-2.5 outline-none transition-all shadow-sm"
          />
          {formErrors.businessName && <p className="text-sm text-red-500 mt-1.5">{formErrors.businessName}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Experience Years</label>
            <input
              type="number"
              min="0"
              value={formData.experienceYears}
              onChange={(e) => onFieldChange("experienceYears", e.target.value)}
              placeholder="e.g. 5"
              className="w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 px-4 py-2.5 outline-none transition-all shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Service Radius (km)</label>
            <input
              type="number"
              min="1"
              value={formData.serviceRadius}
              onChange={(e) => onFieldChange("serviceRadius", Number(e.target.value))}
              className="w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 px-4 py-2.5 outline-none transition-all shadow-sm"
            />
            <p className="text-xs text-gray-400 mt-1.5 font-medium">How far are you willing to travel for a job?</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center justify-between">
            <span>Profile Picture URL</span>
            <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">Optional</span>
          </label>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 shrink-0 border border-gray-200">
              {formData.profilePicture ? (
                <img
                  src={formData.profilePicture}
                  alt="Profile preview"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.style.display = "none"
                  }}
                />
              ) : (
                <User size={20} />
              )}
            </div>
            <input
              type="text"
              value={formData.profilePicture}
              onChange={(e) => onFieldChange("profilePicture", e.target.value)}
              placeholder="Image URL or upload a file"
              className="flex-1 w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 px-4 py-2.5 outline-none transition-all shadow-sm"
            />
            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-2.5 rounded-lg text-sm flex items-center gap-2 transition-colors shrink-0 border border-gray-200">
              {isUploadingProfile ? <Loader2 size={16} className="animate-spin text-indigo-600" /> : <UploadCloud size={16} />}
              <span className="hidden sm:inline">{isUploadingProfile ? "Uploading..." : "Upload"}</span>
              <input
                type="file"
                className="hidden"
                accept="image/jpeg, image/png, image/webp"
                onChange={onProfileUpload}
                disabled={isUploadingProfile}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
