import { Star } from 'lucide-react';
import ReviewStarRatingField from './ReviewStarRatingField';
import ReviewTextField from './ReviewTextField';

export default function ReviewFormCard({
    businessName,
    serviceName,
    rating,
    hovered,
    setRating,
    setHovered,
    reviewText,
    setReviewText,
    onSubmit,
    isLoading,
}) {
    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Leave a Review</h1>
            <p className="text-gray-500 mb-1">
                How was your experience with <strong>{businessName}</strong>?
            </p>
            <p className="text-xs text-gray-400 mb-6">Service: {serviceName}</p>

            <form onSubmit={onSubmit} className="space-y-6">
                <ReviewStarRatingField
                    rating={rating}
                    hovered={hovered}
                    setRating={setRating}
                    setHovered={setHovered}
                />

                <ReviewTextField reviewText={reviewText} setReviewText={setReviewText} />

                <button
                    type="submit"
                    disabled={isLoading || rating === 0}
                    className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                    <Star size={18} className="fill-white" />
                    {isLoading ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
}
