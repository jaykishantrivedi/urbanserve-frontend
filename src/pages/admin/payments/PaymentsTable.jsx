import { AlertCircle } from "lucide-react";
import PaymentActionDropdown from "./PaymentActionDropdown";

function TableRowSkeleton() {
  return (
    <tr className="animate-pulse">
      {[...Array(9)].map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-gray-100 rounded w-3/4" />
        </td>
      ))}
    </tr>
  );
}

export default function PaymentsTable({
  payments,
  isLoading,
  isFetching,
  itemsPerPage,
  navigate,
  onAction,
  loadingId,
  getMethodBadgeColor,
  getStatusBadgeColor,
  formatDate,
  children,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {[
                "Transaction ID",
                "User",
                "Provider",
                "Booking ID",
                "Amount",
                "Method",
                "Status",
                "Date",
                "Actions",
              ].map((label) => (
                <th
                  key={label}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              [...Array(itemsPerPage)].map((_, i) => <TableRowSkeleton key={i} />)
            ) : payments.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-16 text-center">
                  <AlertCircle size={32} className="mx-auto text-gray-200 mb-3" />
                  <p className="text-sm font-medium text-gray-400">No payments found</p>
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr
                  key={payment._id}
                  className={`hover:bg-gray-50 transition-colors ${isFetching ? "opacity-60" : ""}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs font-mono font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {payment.transactionId || payment._id.slice(-8).toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700 font-medium">{payment.user || "—"}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">{payment.provider || "—"}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.bookingId ? (
                      <button
                        type="button"
                        onClick={() => navigate(`/admin/bookings/${payment.bookingId}`)}
                        className="text-xs font-bold text-indigo-600 hover:underline bg-indigo-50 px-2 py-0.5 rounded"
                      >
                        #{payment.bookingId.toString().slice(-8).toUpperCase()}
                      </button>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">₹{(payment.amount || 0).toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium uppercase ${getMethodBadgeColor(
                        payment.paymentMethod,
                      )}`}
                    >
                      {payment.paymentMethod || "Unknown"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadgeColor(
                        payment.paymentStatus,
                      )}`}
                    >
                      {payment.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs text-gray-600">{formatDate(payment.paidAt || payment.createdAt)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <PaymentActionDropdown
                      payment={payment}
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
