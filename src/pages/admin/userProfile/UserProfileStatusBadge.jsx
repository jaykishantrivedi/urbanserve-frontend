import { ShieldCheck } from "lucide-react"

export function UserProfileStatusBadge({ isBlocked, isVerified }) {
    return (
        <>
            <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    isBlocked ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-700"
                }`}
            >
                <span className={`w-1.5 h-1.5 rounded-full ${isBlocked ? "bg-red-500" : "bg-emerald-500"}`} />
                {isBlocked ? "Blocked" : "Active"}
            </span>
            {isVerified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600">
                    <ShieldCheck size={11} /> Verified
                </span>
            )}
        </>
    )
}
