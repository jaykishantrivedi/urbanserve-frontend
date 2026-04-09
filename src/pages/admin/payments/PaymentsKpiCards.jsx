import { CheckCircle, Clock, DollarSign, XCircle } from "lucide-react";
import { KPICard } from "../KPICard";

export default function PaymentsKpiCards({ isLoading, kpis }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total Payments"
        value={isLoading ? "—" : (kpis.totalPayments ?? 0).toLocaleString()}
        icon={DollarSign}
        iconColor="text-indigo-600"
        iconBgColor="bg-indigo-50"
      />
      <KPICard
        title="Total Revenue"
        value={isLoading ? "—" : `₹${(kpis.totalRevenue ?? 0).toLocaleString()}`}
        icon={CheckCircle}
        iconColor="text-green-600"
        iconBgColor="bg-green-50"
      />
      <KPICard
        title="Pending Payments"
        value={isLoading ? "—" : (kpis.pendingPayments ?? 0).toLocaleString()}
        icon={Clock}
        iconColor="text-yellow-600"
        iconBgColor="bg-yellow-50"
      />
      <KPICard
        title="Failed Payments"
        value={isLoading ? "—" : (kpis.failedPayments ?? 0).toLocaleString()}
        icon={XCircle}
        iconColor="text-red-600"
        iconBgColor="bg-red-50"
      />
    </div>
  );
}
