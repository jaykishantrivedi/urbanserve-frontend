import { AlertCircle } from "lucide-react";
import ActionDropdown from "./ActionDropdown";
import StatusBadge from "./StatusBadge";

function TableRowSkeleton() {
  return (
    <tr className="animate-pulse">
      {[...Array(8)].map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-gray-100 rounded w-3/4" />
        </td>
      ))}
    </tr>
  );
}

export default function BookingsTable({
  bookings,
  isLoading,
  isFetching,
  itemsPerPage,
  loadingId,
  navigate,
  onAction,
  formatDate,
  formatPrice,
  children,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {[
                "Booking ID",
                "User",
                "Provider",
                "Service",
                "Date & Time",
                "Price",
                "Status",
                "Actions",
              ].map((col) => (
                <th
                  key={col}
                  className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              [...Array(itemsPerPage)].map((_, i) => <TableRowSkeleton key={i} />)
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-16 text-center">
                  <AlertCircle size={32} className="mx-auto text-gray-200 mb-3" />
                  <p className="text-sm font-medium text-gray-400">No bookings found</p>
                  <p className="text-xs text-gray-300 mt-1">Try adjusting your search or filter</p>
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className={`hover:bg-gray-50 transition-colors ${isFetching ? "opacity-60" : ""}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs font-mono font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                      #{booking._id.slice(-8).toUpperCase()}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-800">{booking.user?.name || "-"}</span>
                      <span className="text-xs text-gray-400">{booking.user?.email || ""}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">{booking.provider?.businessName || "-"}</span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap max-w-40">
                    <span className="text-sm text-gray-700 truncate block">
                      {booking.service?.serviceName || "-"}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {formatDate(booking.serviceDate, booking.serviceTime)}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800">
                        {formatPrice(booking.finalPrice, booking.price)}
                      </span>
                      <span className="text-xs text-gray-400 capitalize">{booking.priceType}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={booking.status} />
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <ActionDropdown
                      booking={booking}
                      onAction={onAction}
                      loadingId={loadingId}
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
