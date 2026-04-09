import { Users as UsersIcon } from "lucide-react";
import UserActionDropdown from "./UserActionDropdown";
import UserAvatar from "./UserAvatar";

function TableRowSkeleton() {
  return (
    <tr className="animate-pulse">
      {[...Array(6)].map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-gray-100 rounded w-3/4" />
        </td>
      ))}
    </tr>
  );
}

function UserStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
        status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${status === "active" ? "bg-emerald-500" : "bg-red-500"}`} />
      {status === "active" ? "Active" : "Blocked"}
    </span>
  );
}

export default function UsersTable({
  users,
  isLoading,
  isFetching,
  itemsPerPage,
  onToggleBlock,
  blockingId,
  navigate,
  children,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["User", "Email", "Phone", "City", "Status", "Bookings", "Actions"].map((col) => (
                <th
                  key={col}
                  className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              [...Array(itemsPerPage)].map((_, i) => <TableRowSkeleton key={i} />)
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-16 text-center">
                  <UsersIcon size={32} className="mx-auto text-gray-200 mb-3" />
                  <p className="text-sm font-medium text-gray-400">No users found</p>
                  <p className="text-xs text-gray-300 mt-1">Try adjusting your search or filter</p>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className={`hover:bg-gray-50 transition-colors ${isFetching ? "opacity-60" : ""}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={user.name} />
                      <span className="text-sm font-semibold text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{user.email}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{user.phone || "—"}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{user.city || "—"}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <UserStatusBadge status={user.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">
                      {user.bookings}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <UserActionDropdown
                      user={user}
                      onToggleBlock={onToggleBlock}
                      isLoading={blockingId === user._id}
                      navigate={navigate}
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
