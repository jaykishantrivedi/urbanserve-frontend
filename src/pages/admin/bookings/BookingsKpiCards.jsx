import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react";
import { KPICard } from "../KPICard";

export default function BookingsKpiCards({ isLoading, kpis }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total Bookings"
        value={isLoading ? "-" : (kpis.totalBookings ?? 0).toLocaleString()}
        icon={Calendar}
        iconColor="text-indigo-600"
        iconBgColor="bg-indigo-50"
      />
      <KPICard
        title="In Progress"
        value={isLoading ? "-" : (kpis.acceptedBookings ?? 0).toLocaleString()}
        icon={Clock}
        iconColor="text-blue-600"
        iconBgColor="bg-blue-50"
      />
      <KPICard
        title="Completed"
        value={isLoading ? "-" : (kpis.completedBookings ?? 0).toLocaleString()}
        icon={CheckCircle}
        iconColor="text-emerald-600"
        iconBgColor="bg-emerald-50"
      />
      <KPICard
        title="Cancelled"
        value={isLoading ? "-" : (kpis.cancelledBookings ?? 0).toLocaleString()}
        icon={XCircle}
        iconColor="text-red-600"
        iconBgColor="bg-red-50"
      />
    </div>
  );
}
