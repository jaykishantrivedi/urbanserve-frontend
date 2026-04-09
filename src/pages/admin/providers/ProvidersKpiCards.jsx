import { Briefcase, CheckCircle, Clock, XCircle } from "lucide-react";
import { KPICard } from "../KPICard";

export default function ProvidersKpiCards({ isLoading, kpis }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total Providers"
        value={isLoading ? "—" : (kpis.totalProviders ?? 0).toLocaleString()}
        icon={Briefcase}
        iconColor="text-indigo-600"
        iconBgColor="bg-indigo-50"
      />
      <KPICard
        title="Approved Providers"
        value={isLoading ? "—" : (kpis.approvedProviders ?? 0).toLocaleString()}
        icon={CheckCircle}
        iconColor="text-emerald-600"
        iconBgColor="bg-emerald-50"
      />
      <KPICard
        title="Pending Approval"
        value={isLoading ? "—" : (kpis.pendingProviders ?? 0).toLocaleString()}
        icon={Clock}
        iconColor="text-amber-600"
        iconBgColor="bg-amber-50"
      />
      <KPICard
        title="Blocked Providers"
        value={isLoading ? "—" : (kpis.blockedProviders ?? 0).toLocaleString()}
        icon={XCircle}
        iconColor="text-red-500"
        iconBgColor="bg-red-50"
      />
    </div>
  );
}
