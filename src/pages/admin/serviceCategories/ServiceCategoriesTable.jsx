import { FolderTree } from "lucide-react";
import CategoryActionDropdown from "./CategoryActionDropdown";
import CategoryStatusBadge from "./CategoryStatusBadge";

function TableRowSkeleton() {
  return (
    <tr className="animate-pulse">
      {[...Array(5)].map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-gray-100 rounded w-3/4" />
        </td>
      ))}
    </tr>
  );
}

export default function ServiceCategoriesTable({
  categories,
  isLoading,
  isFetching,
  itemsPerPage,
  loadingId,
  navigate,
  onAction,
  children,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Category Name", "Description", "Total Services", "Status", "Actions"].map((col) => (
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
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                  <FolderTree size={32} className="mx-auto text-gray-200 mb-3" />
                  <p className="text-sm font-medium text-gray-400">No categories found</p>
                  <p className="text-xs text-gray-300 mt-1">Try adjusting your search or filter</p>
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr
                  key={cat._id}
                  className={`hover:bg-gray-50 transition-colors ${isFetching ? "opacity-60" : ""}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-indigo-600">{cat.categoryName}</span>
                  </td>

                  <td className="px-6 py-4 max-w-xs">
                    <span className="text-sm text-gray-500 line-clamp-2">{cat.description || "—"}</span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold">
                      {cat.totalServices ?? 0} service{cat.totalServices !== 1 ? "s" : ""}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <CategoryStatusBadge isActive={cat.isActive} />
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <CategoryActionDropdown
                      category={cat}
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
