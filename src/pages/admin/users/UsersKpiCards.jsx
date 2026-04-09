import { CheckCircle, UserPlus, Users as UsersIcon, XCircle } from "lucide-react";
import { KPICard } from "../KPICard";

export default function UsersKpiCards({ isLoading, kpis, newPctLabel }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total Users"
        value={isLoading ? "—" : (kpis.totalUsers ?? "—").toLocaleString()}
        icon={UsersIcon}
        iconColor="text-indigo-600"
        iconBgColor="bg-indigo-50"
      />
      <KPICard
        title="Active Users"
        value={isLoading ? "—" : (kpis.activeUsers ?? "—").toLocaleString()}
        icon={CheckCircle}
        iconColor="text-emerald-600"
        iconBgColor="bg-emerald-50"
      />
      <KPICard
        title="Blocked Users"
        value={isLoading ? "—" : (kpis.blockedUsers ?? "—").toLocaleString()}
        icon={XCircle}
        iconColor="text-red-500"
        iconBgColor="bg-red-50"
      />
      <KPICard
        title="New This Month"
        value={isLoading ? "—" : (kpis.newThisMonth ?? "—").toLocaleString()}
        icon={UserPlus}
        iconColor="text-blue-600"
        iconBgColor="bg-blue-50"
        trend={newPctLabel}
      />
    </div>
  );
}
