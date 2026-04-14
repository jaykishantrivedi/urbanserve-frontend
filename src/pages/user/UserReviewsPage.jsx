import { useGetUserReviewsQuery } from '../../redux/reviewApi';
import { Star } from 'lucide-react';

function StarRow({ rating }) {
    return (
        <div className="flex gap-0.5">
            {[1,2,3,4,5].map(s => (
                <Star key={s} size={14} className={s <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
            ))}
        </div>
    );
}

export default function UserReviewsPage() {
    const { data, isLoading } = useGetUserReviewsQuery();
    const reviews = data?.reviews || [];

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center pt-20">
            <span className="animate-spin text-4xl text-blue-500"></span>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-[var(--height-navbar)] pb-12 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto mt-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Reviews</h1>
                    <p className="text-gray-500 mt-2">Feedback you've shared for completed services.</p>
                </div>

                {reviews.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                        <Star size={32} className="text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">No reviews yet</h3>
                        <p className="text-gray-500 mt-2">Reviews for completed bookings will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {reviews.map(rev => (
                            <div key={rev._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{rev.service?.serviceName}</h3>
                                        <p className="text-sm text-gray-500">Provider: {rev.provider?.businessName}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <StarRow rating={rev.rating} />
                                        <p className="text-xs text-gray-400 mt-1">{new Date(rev.createdAt).toLocaleDateString('en-IN')}</p>
                                    </div>
                                </div>
                                {rev.review && (
                                    <p className="text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3 italic border border-gray-100">"{rev.review}"</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
