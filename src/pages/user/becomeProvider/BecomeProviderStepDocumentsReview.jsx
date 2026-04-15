import { FileText, Loader2, Plus, UploadCloud, X } from "lucide-react"
import { Link } from "react-router-dom"

export default function BecomeProviderStepDocumentsReview({
  formData,
  formErrors,
  docInput,
  onDocInputChange,
  onAddDocumentUrl,
  galleryInput,
  onGalleryInputChange,
  onAddGalleryUrl,
  onRemoveItem,
  isUploadingDoc,
  onDocUpload,
  isUploadingGallery,
  onGalleryUpload,
  onAgreedChange,
}) {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Almost there!</h1>
        <p className="text-sm text-gray-500 mt-1">Upload your documents and review your details before submitting.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">
            Documents <span className="text-red-500">*</span>{" "}
            <span className="font-normal text-xs text-gray-400">(ID proof, certificates - at least one required)</span>
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <FileText size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                value={docInput}
                onChange={(e) => onDocInputChange(e.target.value)}
                placeholder="URL or Upload File"
                className="w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 pl-9 pr-4 py-2.5 text-sm outline-none transition-all shadow-sm"
              />
            </div>
            <label
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-3 py-2.5 rounded-lg text-sm flex items-center justify-center transition-colors border border-gray-200"
              title="Upload File"
            >
              {isUploadingDoc ? <Loader2 size={16} className="animate-spin text-indigo-600" /> : <UploadCloud size={16} />}
              <input
                type="file"
                className="hidden"
                accept="image/jpeg, image/png, image/webp, application/pdf"
                onChange={onDocUpload}
                disabled={isUploadingDoc}
              />
            </label>
            <button
              type="button"
              onClick={onAddDocumentUrl}
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-4 py-2.5 rounded-lg text-sm flex items-center gap-1 transition-colors border border-indigo-200"
            >
              <Plus size={16} /> Add URL
            </button>
          </div>
          {formData.documents.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md text-xs font-bold border border-indigo-100 flex items-center gap-1.5 break-all"
                >
                  <span className="max-w-[150px] sm:max-w-xs truncate">{doc}</span>
                  <button onClick={() => onRemoveItem("documents", idx)} className="hover:text-red-500">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          {formErrors.documents && <p className="text-sm text-red-500 mt-2">{formErrors.documents}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">
            Portfolio / Gallery Links <span className="font-normal text-xs text-gray-400">(Past work images)</span>
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={galleryInput}
              onChange={(e) => onGalleryInputChange(e.target.value)}
              placeholder="URL or Upload File"
              className="flex-1 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 px-4 py-2.5 text-sm outline-none transition-all shadow-sm"
            />
            <label
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-3 py-2.5 rounded-lg text-sm flex items-center justify-center transition-colors border border-gray-200"
              title="Upload File"
            >
              {isUploadingGallery ? <Loader2 size={16} className="animate-spin text-indigo-600" /> : <UploadCloud size={16} />}
              <input
                type="file"
                className="hidden"
                accept="image/jpeg, image/png, image/webp"
                onChange={onGalleryUpload}
                disabled={isUploadingGallery}
              />
            </label>
            <button
              type="button"
              onClick={onAddGalleryUrl}
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-4 py-2.5 rounded-lg text-sm flex items-center gap-1 transition-colors border border-indigo-200"
            >
              <Plus size={16} /> Add URL
            </button>
          </div>
          {formData.gallery.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-xs font-bold border border-gray-200 flex items-center gap-1.5"
                >
                  <span className="max-w-[150px] sm:max-w-xs truncate">{img}</span>
                  <button onClick={() => onRemoveItem("gallery", idx)} className="hover:text-red-500">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5 mt-8">
          <h3 className="font-extrabold text-sm text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">
            Review Your Details
          </h3>
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
            <div className="text-gray-500 font-medium">Business</div>
            <div className="text-gray-900 font-bold text-right truncate" title={formData.businessName}>
              {formData.businessName || "-"}
            </div>

            <div className="text-gray-500 font-medium">City</div>
            <div className="text-gray-900 font-bold text-right">{formData.city || "-"}</div>

            <div className="text-gray-500 font-medium">Address</div>
            <div className="text-gray-900 font-bold text-right truncate" title={formData.address}>
              {formData.address || "-"}
            </div>

            <div className="text-gray-500 font-medium">Experience</div>
            <div className="text-gray-900 font-bold text-right">
              {formData.experienceYears ? `${formData.experienceYears} Years` : "-"}
            </div>

            <div className="text-gray-500 font-medium">Range</div>
            <div className="text-gray-900 font-bold text-right">{formData.serviceRadius} km</div>

            <div className="text-gray-500 font-medium">Documents</div>
            <div className="text-gray-900 font-bold text-right">{formData.documents.length} added</div>

            <div className="text-gray-500 font-medium">Open Days</div>
            <div className="text-gray-900 font-bold text-right leading-snug">
              {Object.keys(formData.availability)
                .filter((d) => formData.availability[d].open)
                .join(", ") || "None"}
            </div>
          </div>
        </div>

        <label className="flex items-start gap-3 mt-6 cursor-pointer group">
          <input
            type="checkbox"
            checked={formData.agreedToTerms}
            onChange={(e) => onAgreedChange(e.target.checked)}
            className="mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
          />
          <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
            I agree to UrbanServe's{" "}
            <Link to="/terms" target="_blank" className="text-indigo-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" target="_blank" className="text-indigo-600 hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>
      </div>
    </div>
  )
}
