export function EditServiceSectionHeader({ icon: Icon, iconBg, iconColor, title, subtitle }) {
    return (
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-5">
            <div className={`p-2 rounded-lg ${iconBg}`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div>
                <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
            </div>
        </div>
    )
}
