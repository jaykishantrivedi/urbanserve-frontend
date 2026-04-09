import { TrendingUp, TrendingDown } from "lucide-react"

export function KPICard({ title, value, icon: Icon, iconColor, iconBgColor, trend }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1 tracking-tight">{value}</p>
                    {trend && (
                        <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${trend.isPositive ? "text-emerald-600" : "text-red-500"}`}>
                            {trend.isPositive
                                ? <TrendingUp size={13} />
                                : <TrendingDown size={13} />
                            }
                            <span>{trend.value}</span>
                        </div>
                    )}
                </div>
                <div className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ml-3 ${iconBgColor}`}>
                    <Icon size={22} className={iconColor} />
                </div>
            </div>
        </div>
    )
}
