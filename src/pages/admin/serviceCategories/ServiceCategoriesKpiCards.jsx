import { CheckCircle, FolderTree, PlusCircle, XCircle } from "lucide-react";
import { KPICard } from "../KPICard";

export default function ServiceCategoriesKpiCards({ isLoading, kpis }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total Categories"
        value={isLoading ? "—" : (kpis.totalCategories ?? 0).toLocaleString()}
        icon={FolderTree}
        iconColor="text-indigo-600"
        iconBgColor="bg-indigo-50"
      />
      <KPICard
        title="Active Categories"
        value={isLoading ? "—" : (kpis.activeCategories ?? 0).toLocaleString()}
        icon={CheckCircle}
        iconColor="text-emerald-600"
        iconBgColor="bg-emerald-50"
      />
      <KPICard
        title="Inactive Categories"
        value={isLoading ? "—" : (kpis.inactiveCategories ?? 0).toLocaleString()}
        icon={XCircle}
        iconColor="text-red-600"
        iconBgColor="bg-red-50"
      />
      <KPICard
        title="New This Month"
        value={isLoading ? "—" : (kpis.newThisMonth ?? 0).toLocaleString()}
        icon={PlusCircle}
        iconColor="text-amber-600"
        iconBgColor="bg-amber-50"
      />
    </div>
  );
}
