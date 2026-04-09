import { BookOpen, CheckCircle, Clock, XCircle } from "lucide-react"
import { ProviderProfileStatCard } from "./ProviderProfileStatCard"

export function ProviderProfileStatsGrid({ stats }) {
    if (!stats) return null

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <ProviderProfileStatCard
                label="Total Bookings"
                value={stats.totalBookings}
                icon={BookOpen}
                color={{ bg: "bg-indigo-50", text: "text-indigo-600" }}
            />
            <ProviderProfileStatCard
                label="Completed"
                value={stats.completed}
                icon={CheckCircle}
                color={{ bg: "bg-emerald-50", text: "text-emerald-600" }}
            />
            <ProviderProfileStatCard
                label="In Progress"
                value={stats.inProgress}
                icon={Clock}
                color={{ bg: "bg-amber-50", text: "text-amber-600" }}
            />
            <ProviderProfileStatCard
                label="Cancelled"
                value={stats.cancelled}
                icon={XCircle}
                color={{ bg: "bg-red-50", text: "text-red-500" }}
            />
        </div>
    )
}
