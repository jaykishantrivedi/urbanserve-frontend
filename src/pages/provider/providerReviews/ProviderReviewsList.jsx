import ProviderReviewCard from './ProviderReviewCard';

export default function ProviderReviewsList({ reviews }) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ProviderReviewCard key={review._id} review={review} />
      ))}
    </div>
  );
}
