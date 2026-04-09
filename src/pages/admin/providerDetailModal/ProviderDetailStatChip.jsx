export function ProviderDetailStatChip({ label, value, color }) {
    return (
        <div className={`flex flex-col items-center justify-center p-3 rounded-xl ${color}`}>
            <span className="text-xl font-bold">{value ?? 0}</span>
            <span className="text-[11px] font-medium mt-0.5 opacity-80">{label}</span>
        </div>
    )
}
