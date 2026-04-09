import { BookOpen, CheckCircle, Clock, XCircle } from "lucide-react"
import { UserProfileStatCard } from "./UserProfileStatCard"

export function UserProfileStatsGrid({ stats }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <UserProfileStatCard
                label="Total Bookings"
                value={stats?.total}
                icon={BookOpen}
                color={{ bg: "bg-indigo-50", text: "text-indigo-600" }}
            />
            <UserProfileStatCard
                label="Completed"
                value={stats?.completed}
                icon={CheckCircle}
                color={{ bg: "bg-emerald-50", text: "text-emerald-600" }}
            />
            <UserProfileStatCard
                label="In Progress"
                value={stats?.inProgress}
                icon={Clock}
                color={{ bg: "bg-amber-50", text: "text-amber-600" }}
            />
            <UserProfileStatCard
                label="Cancelled"
                value={stats?.cancelled}
                icon={XCircle}
                color={{ bg: "bg-red-50", text: "text-red-500" }}
            />
        </div>
    )
}
