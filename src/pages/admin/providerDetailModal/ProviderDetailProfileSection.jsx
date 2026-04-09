import { Star } from "lucide-react"
import { ProviderDetailStatChip } from "./ProviderDetailStatChip"

function ProviderDetailStatusBadge({ status }) {
    const isApproved = status === "approved"
    const isBlocked = status === "blocked"

    return (
        <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                isApproved
                    ? "bg-emerald-50 text-emerald-700"
                    : isBlocked
                      ? "bg-red-50 text-red-600"
                      : "bg-amber-50 text-amber-700"
            }`}
        >
            <span
                className={`w-1.5 h-1.5 rounded-full ${
                    isApproved ? "bg-emerald-500" : isBlocked ? "bg-red-500" : "bg-amber-400"
                }`}
            />
            {isApproved ? "Approved" : isBlocked ? "Blocked" : "Pending"}
        </span>
    )
}

export function ProviderDetailProfileSection({ provider, stats }) {
    const initials = provider?.businessName?.slice(0, 2).toUpperCase() || "??"

    return (
        <>
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow">
                    {provider.profileImage ? (
                        <img
                            src={provider.profileImage}
                            alt={provider.businessName}
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    ) : (
                        <span className="text-white text-xl font-bold">{initials}</span>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-gray-900 truncate">{provider.businessName}</h2>
                    <div className="flex flex-wrap gap-2 mt-1">
                        <ProviderDetailStatusBadge status={provider.status} />
                        {provider.rating > 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">
                                <Star size={11} className="fill-amber-400 text-amber-400" />
                                {provider.rating.toFixed(1)}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {stats && (
                <div className="grid grid-cols-4 gap-2">
                    <ProviderDetailStatChip label="Total" value={stats.totalBookings} color="bg-indigo-50 text-indigo-700" />
                    <ProviderDetailStatChip label="Completed" value={stats.completed} color="bg-emerald-50 text-emerald-700" />
                    <ProviderDetailStatChip label="Active" value={stats.inProgress} color="bg-amber-50 text-amber-700" />
                    <ProviderDetailStatChip label="Cancelled" value={stats.cancelled} color="bg-red-50 text-red-500" />
                </div>
            )}
        </>
    )
}
