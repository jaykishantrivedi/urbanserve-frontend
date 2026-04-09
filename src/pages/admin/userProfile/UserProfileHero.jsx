import { ArrowLeft, ShieldCheck, ShieldOff } from "lucide-react"
import { UserProfileStatusBadge } from "./UserProfileStatusBadge"

const AVATAR_COLORS = [
    "from-indigo-500 to-purple-600",
    "from-emerald-400 to-cyan-500",
    "from-pink-500 to-rose-500",
    "from-amber-400 to-orange-500",
]

export function UserProfileHero({ user, isBlocked, blocking, onBack, onToggleBlock }) {
    const initials =
        user.name
            ?.split(" ")
            .map((part) => part[0])
            .slice(0, 2)
            .join("")
            .toUpperCase() || "?"

    const gradientClass = AVATAR_COLORS[user.name?.charCodeAt(0) % AVATAR_COLORS.length] || AVATAR_COLORS[0]

    return (
        <>
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
            >
                <ArrowLeft size={16} /> Back to Users
            </button>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div
                        className={`w-20 h-20 rounded-2xl bg-linear-to-br ${gradientClass} flex items-center justify-center shrink-0 shadow-md`}
                    >
                        {user.pfpUrl ? (
                            <img
                                src={user.pfpUrl}
                                alt={user.name}
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        ) : (
                            <span className="text-white text-2xl font-bold">{initials}</span>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                            <UserProfileStatusBadge isBlocked={isBlocked} isVerified={user.isVerified} />
                        </div>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-xs text-gray-400 mt-1">
                            Member since {new Date(user.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })}
                        </p>
                    </div>

                    <button
                        onClick={onToggleBlock}
                        disabled={blocking}
                        className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 ${
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
                        {blocking ? "Processing..." : isBlocked ? "Unblock User" : "Block User"}
                    </button>
                </div>
            </div>
        </>
    )
}
