import { Bell, BellRing, Briefcase, Users } from "lucide-react";
import { KPICard } from "../KPICard";

export default function NotificationsKpiCards({ isLoading, kpis }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total Notifications"
        value={isLoading ? "—" : (kpis.totalNotifications ?? 0).toLocaleString()}
        icon={Bell}
        iconColor="text-indigo-600"
        iconBgColor="bg-indigo-50"
      />
      <KPICard
        title="Unread Notifications"
        value={isLoading ? "—" : (kpis.unreadNotifications ?? 0).toLocaleString()}
        icon={BellRing}
        iconColor="text-amber-600"
        iconBgColor="bg-amber-50"
      />
      <KPICard
        title="User Notifications"
        value={isLoading ? "—" : (kpis.userNotifications ?? 0).toLocaleString()}
        icon={Users}
        iconColor="text-blue-600"
        iconBgColor="bg-blue-50"
      />
      <KPICard
        title="Provider Notifications"
        value={isLoading ? "—" : (kpis.providerNotifications ?? 0).toLocaleString()}
        icon={Briefcase}
        iconColor="text-green-600"
        iconBgColor="bg-green-50"
      />
    </div>
  );
}
