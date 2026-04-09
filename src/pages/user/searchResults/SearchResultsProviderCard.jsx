import { BadgeCheck, Briefcase, MessagesSquare, Star } from "lucide-react"

export default function SearchResultsProviderCard({ result, onClick, onEnquiry }) {
  const { provider, price, priceType, description } = result

  const priceConfig = {
    fixed: { label: `Rs${price?.toLocaleString("en-IN")}`, bg: "bg-[#0d9488]", text: "text-white" },
    hourly: { label: `Rs${price?.toLocaleString("en-IN")}/hr`, bg: "bg-[#0d9488]", text: "text-white" },
    inspection: { label: "On Visit", bg: "bg-[#0d9488]", text: "text-white" },
  }
  const pc = priceConfig[priceType] || priceConfig.inspection

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl overflow-hidden flex flex-col">
      <div className="relative w-full h-[180px] bg-gray-100 shrink-0">
        {provider.profileImage ? (
          <img src={provider.profileImage} alt={provider.businessName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white text-5xl font-extrabold tracking-tight">
              {provider.businessName?.charAt(0)?.toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-[#0d9488] text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
          <div className="w-[5px] h-[5px] bg-white rounded-full" />
          Verified
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 bg-white">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-[20px] font-extrabold text-gray-900 leading-tight">{provider.businessName}</h3>
          <div className={`${pc.bg} ${pc.text} px-3.5 py-1.5 rounded-full text-[13px] font-bold tracking-wide shrink-0`}>{pc.label}</div>
        </div>

        {result.service?.serviceName && (
          <span className="inline-flex items-center self-start px-2.5 py-1 mb-3 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
            {result.service.serviceName}
          </span>
        )}

        <div className="flex items-center gap-2 mb-4 text-[13px]">
          <div className="flex items-center gap-1">
            <Star size={13} className="fill-amber-400 text-amber-500" />
            <span className="font-bold text-amber-500">{provider.rating > 0 ? provider.rating.toFixed(1) : "New"}</span>
          </div>
          {provider.totalReviews > 0 && <span className="text-gray-500">({provider.totalReviews})</span>}
          <span className="text-gray-300">-</span>
          <span className="text-gray-600 font-medium">{provider.city}</span>
        </div>

        <div className="flex items-center gap-5 mb-4">
          {provider.experience > 0 && (
            <div className="flex items-center gap-1.5">
              <Briefcase size={14} className="text-gray-400" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{provider.experience} YRS EXP</span>
            </div>
          )}
          {provider.totalServicesCompleted > 0 && (
            <div className="flex items-center gap-1.5">
              <BadgeCheck size={14} className="text-gray-400" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{provider.totalServicesCompleted} JOBS</span>
            </div>
          )}
        </div>

        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 mb-5">{description || provider.description}</p>

        <div className="mt-auto flex items-center gap-3">
          <button
            className="flex-1 bg-[#0b4a8e] hover:bg-blue-800 text-white font-bold py-3 text-[14px] rounded-xl transition-colors shadow-sm"
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
          >
            View Profile
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEnquiry?.(result)
            }}
            className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl border border-blue-200 font-bold text-[14px] transition-all shadow-sm flex items-center gap-2 shrink-0"
          >
            <MessagesSquare size={16} />
            Enquiry
          </button>
        </div>
      </div>
    </div>
  )
}
