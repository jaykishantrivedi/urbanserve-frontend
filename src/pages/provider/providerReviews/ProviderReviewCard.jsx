import ProviderReviewsStars from './ProviderReviewsStars';

export default function ProviderReviewCard({ review }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <p className="font-bold text-gray-900">{review.user?.name || 'Customer'}</p>
          <p className="text-sm text-gray-500">{review.service?.serviceName}</p>
        </div>
        <div className="text-right shrink-0">
          <ProviderReviewsStars rating={review.rating} />
          <p className="text-xs text-gray-400 mt-1">{new Date(review.createdAt).toLocaleDateString('en-IN')}</p>
        </div>
      </div>
      {review.review && (
        <p className="text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3 italic border border-gray-50">"{review.review}"</p>
      )}
    </div>
  );
}
