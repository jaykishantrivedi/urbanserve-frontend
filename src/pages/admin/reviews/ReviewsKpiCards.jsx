import { AlertTriangle, MessageSquare, Star, TrendingUp } from "lucide-react";
import { KPICard } from "../KPICard";

export default function ReviewsKpiCards({ isLoading, kpis }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total Reviews"
        value={isLoading ? "—" : (kpis.totalReviews ?? 0).toLocaleString()}
        icon={MessageSquare}
        iconColor="text-indigo-600"
        iconBgColor="bg-indigo-50"
      />
      <KPICard
        title="Average Rating"
        value={isLoading ? "—" : `${kpis.averageRating ?? "0.0"} ★`}
        icon={Star}
        iconColor="text-yellow-600"
        iconBgColor="bg-yellow-50"
      />
      <KPICard
        title="5-Star Reviews"
        value={isLoading ? "—" : (kpis.fiveStarReviews ?? 0).toLocaleString()}
        icon={TrendingUp}
        iconColor="text-green-600"
        iconBgColor="bg-green-50"
      />
      <KPICard
        title="Low Ratings (≤2)"
        value={isLoading ? "—" : (kpis.lowRatings ?? 0).toLocaleString()}
        icon={AlertTriangle}
        iconColor="text-red-600"
        iconBgColor="bg-red-50"
      />
    </div>
  );
}
