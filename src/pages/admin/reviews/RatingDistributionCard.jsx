import { Star } from "lucide-react";

export default function RatingDistributionCard({ ratingDistribution }) {
  const maxCount = Math.max(...((ratingDistribution || []).map((d) => d.count) || [0]));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
      <div className="space-y-3">
        {(ratingDistribution || []).map((item) => (
          <div key={item.rating} className="flex items-center gap-4">
            <div className="flex items-center gap-1 w-12">
              <span className="text-sm font-medium text-gray-700">{item.rating}</span>
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
            <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
              <div
                className={`h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500 ${
                  item.rating === 5
                    ? "bg-green-500"
                    : item.rating === 4
                      ? "bg-blue-500"
                      : item.rating === 3
                        ? "bg-yellow-500"
                        : item.rating === 2
                          ? "bg-orange-500"
                          : "bg-red-500"
                }`}
                style={{ width: `${maxCount > 0 ? (item.count / maxCount) * 100 : 0}%` }}
              >
                {item.count > 0 && <span className="text-xs font-medium text-white">{item.count}</span>}
              </div>
            </div>
            <div className="w-20 text-right">
              <span className="text-sm font-medium text-gray-700">
                {item.count} <span className="text-xs text-gray-400 font-normal">({item.percentage}%)</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
