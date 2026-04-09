import { CheckCircle, Eye, XCircle } from "lucide-react";

function TableRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-gray-50">
      {[...Array(7)].map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className={`h-4 bg-gray-100 rounded ${i === 0 ? "w-40" : i === 1 ? "w-44" : "w-24"}`} />
        </td>
      ))}
    </tr>
  );
}

function ProviderAvatar({ name }) {
  const initials = name?.slice(0, 2).toUpperCase() || "??";
  return (
    <div className="h-9 w-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
      {initials}
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === "approved") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Approved
      </span>
    );
  }
  if (status === "blocked") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />Blocked
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Pending
    </span>
  );
}

export default function PendingProvidersTable({
  isLoading,
  filtered,
  paginated,
  isFetching,
  processing,
  onView,
  onApprove,
  onReject,
  search,
  cityFilter,
  children,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {["Name", "Email", "Phone", "Location", "Experience", "Status", "Actions"].map((col) => (
                <th
                  key={col}
                  className={`px-4 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider ${
                    col === "Email"
                      ? "hidden md:table-cell"
                      : col === "Phone"
                        ? "hidden lg:table-cell"
                        : col === "Experience"
                          ? "hidden lg:table-cell"
                          : col === "Location"
                            ? "hidden sm:table-cell"
                            : ""
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => <TableRowSkeleton key={i} />)
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-16 text-center">
                  <CheckCircle size={32} className="mx-auto text-gray-200 mb-3" />
                  <p className="text-sm font-medium text-gray-400">No pending providers</p>
                  <p className="text-xs text-gray-300 mt-1">
                    {search || cityFilter !== "all" ? "Try adjusting your filters" : "All providers have been reviewed"}
                  </p>
                </td>
              </tr>
            ) : (
              paginated.map((provider) => (
                <tr
                  key={provider._id}
                  className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors ${
                    isFetching ? "opacity-60" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <ProviderAvatar name={provider.businessName} />
                      <span className="font-semibold text-gray-900 whitespace-nowrap">{provider.businessName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{provider.email || "—"}</td>
                  <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{provider.phone || "—"}</td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{provider.city || "—"}</td>
                  <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">
                    {provider.experience ? `${provider.experience} yrs` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={provider.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onView(provider._id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                      >
                        <Eye size={13} />
                        <span className="hidden sm:inline">View</span>
                      </button>
                      {provider.status === "pending" && (
                        <>
                          <button
                            type="button"
                            onClick={() => onApprove(provider._id)}
                            disabled={processing}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                          >
                            <CheckCircle size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => onReject(provider._id)}
                            disabled={processing}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                          >
                            <XCircle size={13} />
                          </button>
                        </>
                      )}
                    </div>
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
