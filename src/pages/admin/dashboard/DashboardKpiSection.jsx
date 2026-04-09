import { Briefcase, Calendar, CheckCircle, Clock, DollarSign, TrendingUp, Users } from "lucide-react"
import { KPICard } from "../KPICard"
import { DASHBOARD_COLORS, formatDashboardNumber, formatTrendLabel } from "./dashboardConstants"

export function DashboardKpiSection({ kpis, isLoading }) {
    return (
        <div>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <KPICard
                    title="Total Users"
                    value={isLoading ? "-" : formatDashboardNumber(kpis?.totalUsers)}
                    icon={Users}
                    iconColor="text-indigo-600"
                    iconBgColor="bg-indigo-50"
                    trend={kpis?.usersPctChange ? formatTrendLabel(kpis.usersPctChange) : undefined}
                />
                <KPICard
                    title="Active Providers"
                    value={isLoading ? "-" : formatDashboardNumber(kpis?.activeProviders)}
                    icon={CheckCircle}
                    iconColor="text-emerald-600"
                    iconBgColor="bg-emerald-50"
                />
                <KPICard
                    title="Pending Providers"
                    value={isLoading ? "-" : formatDashboardNumber(kpis?.pendingProviders)}
                    icon={Clock}
                    iconColor="text-amber-600"
                    iconBgColor="bg-amber-50"
                />
                <KPICard
                    title="Total Bookings"
                    value={isLoading ? "-" : formatDashboardNumber(kpis?.totalBookings)}
                    icon={Calendar}
                    iconColor="text-blue-600"
                    iconBgColor="bg-blue-50"
                    trend={kpis?.bookingsPctChange ? formatTrendLabel(kpis.bookingsPctChange) : undefined}
                />
                <KPICard
                    title="Total Revenue"
                    value={isLoading ? "-" : `₹${formatDashboardNumber(kpis?.totalRevenue)}`}
                    icon={DollarSign}
                    iconColor="text-emerald-600"
                    iconBgColor="bg-emerald-50"
                    trend={kpis?.revenuePctChange ? formatTrendLabel(kpis.revenuePctChange) : undefined}
                />
                <KPICard
                    title="Bookings Last Month"
                    value={isLoading ? "-" : formatDashboardNumber(kpis?.bookingsLastMonth)}
                    icon={TrendingUp}
                    iconColor="text-purple-600"
                    iconBgColor="bg-purple-50"
                />
                <KPICard
                    title="Platform Earnings"
                    value={isLoading ? "-" : `₹${formatDashboardNumber(kpis?.adminEarnings)}`}
                    icon={Briefcase}
                    iconColor="text-cyan-600"
                    iconBgColor="bg-cyan-50"
                />
                <KPICard
                    title="Blocked Providers"
                    value={isLoading ? "-" : formatDashboardNumber(kpis?.blockedProviders)}
                    icon={CheckCircle}
                    iconColor="text-red-500"
                    iconBgColor="bg-red-50"
                />
            </div>
        </div>
    )
}
