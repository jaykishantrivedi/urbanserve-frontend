import { AlertCircle } from "lucide-react";
import NotificationActionDropdown from "./NotificationActionDropdown";

function TableRowSkeleton() {
  return (
    <tr className="animate-pulse">
      {[...Array(7)].map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-gray-100 rounded w-3/4" />
        </td>
      ))}
    </tr>
  );
}

export default function NotificationsTable({
  notifications,
  isLoading,
  isFetching,
  itemsPerPage,
  getTypeBadgeColor,
  getStatusBadgeColor,
  formatDate,
  truncateMessage,
  loadingId,
  onToggle,
  onDelete,
  children,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Notification", "Recipient", "Type", "Message", "Status", "Date", "Actions"].map((label) => (
                <th
                  key={label}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              [...Array(itemsPerPage)].map((_, i) => <TableRowSkeleton key={i} />)
            ) : notifications.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-16 text-center">
                  <AlertCircle size={32} className="mx-auto text-gray-200 mb-3" />
                  <p className="text-sm font-medium text-gray-400">No notifications found</p>
                </td>
              </tr>
            ) : (
              notifications.map((n) => (
                <tr
                  key={n.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    n.status === "unread" ? "bg-amber-50/20" : ""
                  } ${isFetching ? "opacity-60" : ""}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm ${
                        n.status === "unread" ? "font-bold text-gray-900" : "font-medium text-gray-700"
                      }`}
                    >
                      {n.title}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-900">{n.recipient}</span>
                      <span
                        className={`text-xs font-medium uppercase tracking-wider ${
                          n.recipientType === "User" ? "text-blue-600" : "text-green-600"
                        }`}
                      >
                        {n.recipientType}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1.5 rounded-md text-xs font-medium ${getTypeBadgeColor(n.type)}`}>
                      {n.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm ${n.status === "unread" ? "text-gray-900" : "text-gray-600"}`}
                      title={n.message}
                    >
                      {truncateMessage(n.message)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 border rounded-full text-xs font-semibold capitalize tracking-wide ${getStatusBadgeColor(
                        n.status,
                      )}`}
                    >
                      {n.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{formatDate(n.date)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <NotificationActionDropdown
                      notification={n}
                      onToggle={onToggle}
                      onDelete={onDelete}
                      loadingId={loadingId}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {children}
    </div>
  );
}
