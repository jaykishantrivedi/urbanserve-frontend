export function BookingDetailsActorCard({
    title,
    name,
    email,
    profilePath,
    initial,
    watermarkIcon: WatermarkIcon,
    avatarClass,
    onNavigate,
    buttonLabel,
}) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <WatermarkIcon size={64} />
            </div>
            <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">{title}</h3>
            <div className="flex items-center gap-3 mb-5">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${avatarClass}`}>
                    {initial}
                </div>
                <div>
                    <h4 className="text-base font-bold text-gray-900">{name}</h4>
                    <p className="text-sm text-gray-500">{email}</p>
                </div>
            </div>
            <button
                onClick={() => onNavigate(profilePath)}
                className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-sm font-semibold text-gray-700 rounded-xl transition-colors border border-gray-200"
            >
                {buttonLabel}
            </button>
        </div>
    )
}
