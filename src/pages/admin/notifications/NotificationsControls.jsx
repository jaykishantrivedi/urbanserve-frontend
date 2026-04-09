import { Filter, Search } from "lucide-react";

export default function NotificationsControls({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search notifications by title or message..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div className="relative min-w-[200px]">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 border border-gray-300 rounded-lg appearance-none cursor-pointer text-sm"
          >
            <option value="all">All Types</option>
            <option value="Service Request">Service Request</option>
            <option value="Provider Response">Provider Response</option>
            <option value="Booking Confirmed">Booking Confirmed</option>
            <option value="Service Completed">Service Completed</option>
            <option value="Payment Received">Payment Received</option>
            <option value="New Review">New Review</option>
          </select>
        </div>

        <div className="relative min-w-[160px]">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 border border-gray-300 rounded-lg appearance-none cursor-pointer text-sm"
          >
            <option value="all">All Status</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
          </select>
        </div>
      </div>
    </div>
  );
}
