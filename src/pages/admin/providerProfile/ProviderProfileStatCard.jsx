export function ProviderProfileStatCard({ label, value, icon: Icon, color }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color.bg}`}>
                <Icon size={20} className={color.text} />
            </div>
            <div>
                <p className="text-2xl font-bold text-gray-900">{value ?? "-"}</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">{label}</p>
            </div>
        </div>
    )
}
