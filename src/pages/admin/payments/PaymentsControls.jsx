import { AlertTriangle, Filter, Search } from "lucide-react";

export default function PaymentsControls({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  methodFilter,
  onMethodChange,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or transaction ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div className="relative min-w-[160px]">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 border border-gray-300 rounded-lg appearance-none cursor-pointer text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        <div className="relative min-w-[160px]">
          <AlertTriangle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={methodFilter}
            onChange={(e) => onMethodChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 border border-gray-300 rounded-lg appearance-none cursor-pointer text-sm"
          >
            <option value="all">All Methods</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            <option value="netbanking">NetBanking</option>
            <option value="wallet">Wallet</option>
            <option value="cash">Cash</option>
          </select>
        </div>
      </div>
    </div>
  );
}
