import {
    ArrowLeft,
    CheckCircle,
    ShieldCheck,
    ShieldOff,
    Star,
} from "lucide-react"
import { ProviderProfileStatusBadge } from "./ProviderProfileStatusBadge"

const AVATAR_COLORS = [
    "from-indigo-500 to-purple-600",
    "from-emerald-400 to-cyan-500",
    "from-pink-500 to-rose-500",
    "from-amber-400 to-orange-500",
]

export function ProviderProfileHero({
    provider,
    isPending,
    isBlocked,
    approving,
    blocking,
    onBack,
    onApprove,
    onToggleBlock,
}) {
    const initials = provider.businessName?.slice(0, 2).toUpperCase() || "??"
    const gradientClass =
        AVATAR_COLORS[provider.businessName?.charCodeAt(0) % AVATAR_COLORS.length] || AVATAR_COLORS[0]

    return (
        <>
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
            >
                <ArrowLeft size={16} /> Back to Providers
            </button>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center shrink-0 shadow-md`}>
                        {provider.profileImage ? (
                            <img
                                src={provider.profileImage}
                                alt={provider.businessName}
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        ) : (
                            <span className="text-white text-2xl font-bold">{initials}</span>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h1 className="text-2xl font-bold text-gray-900">{provider.businessName}</h1>
                            <ProviderProfileStatusBadge status={provider.status} />
                            {provider.rating > 0 && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">
                                    <Star size={11} className="fill-amber-400 text-amber-400" />
                                    {provider.rating.toFixed(1)}
                                    {provider.totalReviews > 0 && (
                                        <span className="text-amber-500 opacity-70">({provider.totalReviews})</span>
                                    )}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500">{provider.email}</p>
                        {provider.createdAt && (
                            <p className="text-xs text-gray-400 mt-1">
                                Member since {new Date(provider.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 shrink-0">
                        {isPending && (
                            <button
                                onClick={onApprove}
                                disabled={approving}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors disabled:opacity-50"
                            >
                                {approving ? (
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <CheckCircle size={15} />
                                )}
                                {approving ? "Approving..." : "Approve Provider"}
                            </button>
                        )}

                        <button
                            onClick={onToggleBlock}
                            disabled={blocking}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 ${
                                isBlocked
                                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                    : "bg-red-50 text-red-600 hover:bg-red-100"
                            }`}
                        >
                            {blocking ? (
                                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : isBlocked ? (
                                <ShieldCheck size={15} />
                            ) : (
                                <ShieldOff size={15} />
                            )}
                            {blocking ? "Processing..." : isBlocked ? "Unblock Provider" : "Block Provider"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
