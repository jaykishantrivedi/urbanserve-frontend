import ProviderReviewsStars from './ProviderReviewsStars';

export default function ProviderReviewsSummaryCard({ avgRating, reviewCount }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6 flex items-center gap-5">
      <div className="text-center">
        <p className="text-5xl font-black text-gray-900">{avgRating}</p>
        <ProviderReviewsStars rating={Math.round(avgRating)} />
      </div>
      <div className="border-l border-gray-100 pl-5">
        <p className="text-lg font-bold text-gray-700">
          {reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'}
        </p>
        <p className="text-sm text-gray-400 mt-0.5">Overall customer satisfaction</p>
      </div>
    </div>
  );
}
