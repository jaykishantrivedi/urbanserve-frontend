import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { DashboardChartSkeleton } from "./DashboardChartSkeleton"
import { DASHBOARD_COLORS, DASHBOARD_TOOLTIP_STYLE } from "./dashboardConstants"
import { DashboardVariantToggle } from "./DashboardVariantToggle"

export function DashboardBookingTrendsCard({ variant, onVariantChange, isLoading, data }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                    <h3 className="text-base font-bold text-gray-900">Booking Trends</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Number of bookings over time</p>
                </div>
                <DashboardVariantToggle value={variant} onChange={onVariantChange} />
            </div>
            {isLoading ? (
                <DashboardChartSkeleton />
            ) : (
                <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={data || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                        <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fontSize: 11 }} tickLine={false} />
                        <YAxis stroke="#9CA3AF" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                        <Tooltip {...DASHBOARD_TOOLTIP_STYLE} />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                        <Line
                            type="monotone"
                            dataKey="bookings"
                            stroke={DASHBOARD_COLORS.indigo}
                            strokeWidth={2.5}
                            dot={{ fill: DASHBOARD_COLORS.indigo, r: 3, strokeWidth: 0 }}
                            activeDot={{ r: 5, strokeWidth: 0 }}
                            name="Bookings"
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}
