import { AlertCircle, Star } from "lucide-react";
import ReviewActionDropdown from "./ReviewActionDropdown";

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

function StarsDisplay({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
        />
      ))}
    </div>
  );
}

export default function ReviewsTable({
  reviews,
  isLoading,
  isFetching,
  itemsPerPage,
  truncateReview,
  formatDate,
  loadingId,
  onDelete,
  navigate,
  children,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Review ID", "User", "Provider", "Service", "Rating", "Review", "Date", "Actions"].map((label) => (
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
            ) : reviews.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-16 text-center">
                  <AlertCircle size={32} className="mx-auto text-gray-200 mb-3" />
                  <p className="text-sm font-medium text-gray-400">No reviews found</p>
                </td>
              </tr>
            ) : (
              reviews.map((review) => (
                <tr
                  key={review._id}
                  className={`hover:bg-gray-50 transition-colors ${review.rating <= 2 ? "bg-red-50/20" : ""} ${
                    isFetching ? "opacity-60" : ""
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs font-mono font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {review._id.slice(-8).toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">{review.user || "—"}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">{review.provider || "—"}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600 block max-w-[150px] truncate">{review.service || "—"}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StarsDisplay rating={review.rating} />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 block max-w-xs xl:max-w-md break-words" title={review.review}>
                      {truncateReview(review.review)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs text-gray-600">{formatDate(review.date)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <ReviewActionDropdown
                      review={review}
                      onDelete={onDelete}
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
