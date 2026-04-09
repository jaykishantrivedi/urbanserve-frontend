import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { DashboardChartSkeleton } from "./DashboardChartSkeleton"
import { DASHBOARD_TOOLTIP_STYLE, PIE_BOOKING_COLORS, PIE_PROVIDER_COLORS } from "./dashboardConstants"

function StatusPieCard({ title, subtitle, data, colors, isLoading }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
            <h3 className="text-base font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-xs text-gray-400 mb-4">{subtitle}</p>
            {isLoading ? (
                <DashboardChartSkeleton />
            ) : (
                <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                        <Pie
                            data={data || []}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={95}
                            dataKey="value"
                        >
                            {(data || []).map((_, index) => (
                                <Cell key={index} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip {...DASHBOARD_TOOLTIP_STYLE} />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                    </PieChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}

export function DashboardStatusPieRow({
    providerStatusData,
    bookingStatusData,
    isProviderStatusLoading,
    isBookingStatusLoading,
}) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <StatusPieCard
                title="Provider Status"
                subtitle="Distribution across approval states"
                data={providerStatusData}
                colors={PIE_PROVIDER_COLORS}
                isLoading={isProviderStatusLoading}
            />
            <StatusPieCard
                title="Booking Status"
                subtitle="Distribution by current booking state"
                data={bookingStatusData}
                colors={PIE_BOOKING_COLORS}
                isLoading={isBookingStatusLoading}
            />
        </div>
    )
}
