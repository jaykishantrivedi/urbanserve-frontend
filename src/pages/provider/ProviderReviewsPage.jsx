import { useGetProviderProfileQuery } from '../../redux/providerApi';
import { useGetProviderReviewsQuery } from '../../redux/reviewApi';
import ProviderReviewsEmptyState from './providerReviews/ProviderReviewsEmptyState';
import ProviderReviewsHeader from './providerReviews/ProviderReviewsHeader';
import ProviderReviewsList from './providerReviews/ProviderReviewsList';
import ProviderReviewsLoadingState from './providerReviews/ProviderReviewsLoadingState';
import ProviderReviewsSummaryCard from './providerReviews/ProviderReviewsSummaryCard';

export default function ProviderReviewsPage() {
    const { data: profileData } = useGetProviderProfileQuery();
    const providerId = profileData?.profile?._id;

    const { data, isLoading } = useGetProviderReviewsQuery(providerId, { skip: !providerId });
    const reviews = data?.reviews || [];

    const avgRating = reviews.length
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
        : null;

    if (isLoading) return <ProviderReviewsLoadingState />;

    return (
        <div className="min-h-screen bg-gray-50 pt-(--height-navbar) pb-12 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto mt-8">
                <ProviderReviewsHeader />

                {avgRating && (
                    <ProviderReviewsSummaryCard
                        avgRating={avgRating}
                        reviewCount={reviews.length}
                    />
                )}

                {reviews.length === 0 ? (
                    <ProviderReviewsEmptyState />
                ) : (
                    <ProviderReviewsList reviews={reviews} />
                )}
            </div>
        </div>
    );
}
