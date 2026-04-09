export function UserProfileInfoRow({ icon: Icon, label, value }) {
    return (
        <div className="flex items-start gap-3 py-3.5 border-b border-gray-50 last:border-0">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 mt-0.5">
                <Icon size={15} className="text-gray-400" />
            </div>
            <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-sm font-medium text-gray-800 break-words">{value || "-"}</p>
            </div>
        </div>
    )
}
