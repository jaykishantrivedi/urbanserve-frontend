import { Star } from 'lucide-react';

export default function ProviderReviewsEmptyState() {
  return (
    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
      <Star size={32} className="text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-bold text-gray-900">No reviews yet</h3>
      <p className="text-gray-500 mt-2">Customer reviews for your completed services appear here.</p>
    </div>
  );
}
