export function ProviderDetailInfoRow({ icon: Icon, label, value }) {
    if (!value) return null

    return (
        <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                <Icon size={14} className="text-gray-400" />
            </div>
            <div className="min-w-0">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-sm font-medium text-gray-800 wrap-break-word">{value}</p>
            </div>
        </div>
    )
}
