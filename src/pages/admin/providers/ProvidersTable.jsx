import { Briefcase, Star } from "lucide-react";
import ProviderActionDropdown from "./ProviderActionDropdown";
import ProviderStatusBadge from "./ProviderStatusBadge";

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

export default function ProvidersTable({
  providers,
  isLoading,
  isFetching,
  itemsPerPage,
  navigate,
  onAction,
  loadingId,
  children,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Business", "Email", "Phone", "City", "Rating", "Completed", "Status", "Actions"].map((col) => (
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
            ) : providers.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-16 text-center">
                  <Briefcase size={32} className="mx-auto text-gray-200 mb-3" />
                  <p className="text-sm font-medium text-gray-400">No providers found</p>
                  <p className="text-xs text-gray-300 mt-1">Try adjusting your search or filter</p>
                </td>
              </tr>
            ) : (
              providers.map((provider) => (
                <tr key={provider._id} className={`hover:bg-gray-50 transition-colors ${isFetching ? "opacity-60" : ""}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/providers/${provider._id}`)}
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline text-left"
                    >
                      {provider.businessName}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{provider.email || "—"}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{provider.phone || "—"}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{provider.city || "—"}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Star size={13} className="text-amber-400 fill-amber-400" />
                      <span className="text-sm font-semibold text-gray-800">{provider.rating?.toFixed(1) || "—"}</span>
                      {provider.totalReviews > 0 && (
                        <span className="text-xs text-gray-400">({provider.totalReviews})</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">
                      {provider.totalServicesCompleted ?? 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ProviderStatusBadge status={provider.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ProviderActionDropdown
                      provider={provider}
                      onAction={onAction}
                      loadingAction={loadingId === provider._id ? loadingId : null}
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
