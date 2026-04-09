import { Briefcase, IndianRupee, Tag } from "lucide-react"

export function ProviderProfileServicesSection({ isServicesLoading, providerServices }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Services Offered</h2>
            {isServicesLoading ? (
                <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-2 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
                </div>
            ) : providerServices.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <Briefcase size={28} className="text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400 font-medium">No services listed yet</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {providerServices.map((ps) => (
                        <div key={ps._id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-indigo-50 flex items-center justify-center">
                                {ps.service?.imageUrl?.[0] ? (
                                    <img
                                        src={ps.service.imageUrl[0]}
                                        alt={ps.service?.serviceName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Briefcase size={20} className="text-indigo-300" />
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                                    <p className="font-bold text-gray-800 text-sm">{ps.service?.serviceName || "-"}</p>
                                    <span
                                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            ps.isActive
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "bg-gray-100 text-gray-400"
                                        }`}
                                    >
                                        {ps.isActive ? "Active" : "Inactive"}
                                    </span>
                                </div>
                                {ps.service?.category?.categoryName && (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full mb-1.5">
                                        <Tag size={9} />
                                        {ps.service.category.categoryName}
                                    </span>
                                )}
                                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                                    {ps.priceType !== "inspection" ? (
                                        <span className="flex items-center gap-1 font-semibold text-emerald-600">
                                            <IndianRupee size={11} />
                                            {ps.price} {ps.priceType === "hourly" ? "/hr" : ""}
                                        </span>
                                    ) : (
                                        <span className="text-amber-600 font-semibold">On Visit</span>
                                    )}
                                    {ps.experience > 0 && (
                                        <span className="flex items-center gap-1">
                                            <Briefcase size={11} />
                                            {ps.experience} yrs exp
                                        </span>
                                    )}
                                </div>
                                {ps.description && (
                                    <p className="text-xs text-gray-400 mt-1.5 line-clamp-1">{ps.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
