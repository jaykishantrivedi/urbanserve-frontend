import { CheckCircle, Package, PlusCircle, XCircle } from "lucide-react";
import { KPICard } from "../KPICard";

export default function ServicesKpiCards({ isLoading, kpis }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total Services"
        value={isLoading ? "-" : (kpis.totalServices ?? 0).toLocaleString()}
        icon={Package}
        iconColor="text-indigo-600"
        iconBgColor="bg-indigo-50"
      />
      <KPICard
        title="Active Services"
        value={isLoading ? "-" : (kpis.activeServices ?? 0).toLocaleString()}
        icon={CheckCircle}
        iconColor="text-emerald-600"
        iconBgColor="bg-emerald-50"
      />
      <KPICard
        title="Inactive Services"
        value={isLoading ? "-" : (kpis.inactiveServices ?? 0).toLocaleString()}
        icon={XCircle}
        iconColor="text-red-600"
        iconBgColor="bg-red-50"
      />
      <KPICard
        title="New This Month"
        value={isLoading ? "-" : (kpis.newThisMonth ?? 0).toLocaleString()}
        icon={PlusCircle}
        iconColor="text-amber-600"
        iconBgColor="bg-amber-50"
      />
    </div>
  );
}
