import { AlertCircle, Filter, Search } from "lucide-react";

export default function ProvidersControls({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onOpenPending,
  pendingCount,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by business name, email, or city..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-gray-50 placeholder-gray-400"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="pl-9 pr-8 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-gray-50 appearance-none cursor-pointer"
          >
            <option value="all">All Providers</option>
            <option value="approved">Approved</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        <button
          type="button"
          onClick={onOpenPending}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors text-sm font-semibold whitespace-nowrap"
        >
          <AlertCircle className="w-4 h-4" />
          Pending Providers {pendingCount > 0 ? `(${pendingCount})` : ""}
        </button>
      </div>
    </div>
  );
}
