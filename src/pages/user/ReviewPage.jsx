import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetSingleBookingQuery } from '../../redux/bookingApi';
import { useCreateReviewMutation, useGetMyReviewForBookingQuery } from '../../redux/reviewApi';
import { toast } from 'react-toastify';
import ReviewBackButton from './review/ReviewBackButton';
import ReviewExistingState from './review/ReviewExistingState';
import ReviewFormCard from './review/ReviewFormCard';

export default function ReviewPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: bookingData } = useGetSingleBookingQuery(id);
    const { data: reviewData } = useGetMyReviewForBookingQuery(id);
    const [createReview, { isLoading }] = useCreateReviewMutation();

    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const booking = bookingData?.booking;
    const existingReview = reviewData?.review;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) { toast.error('Please select a star rating'); return; }
        try {
            await createReview({ bookingId: id, rating, review: reviewText }).unwrap();
            toast.success('Review submitted! Thank you.');
            navigate(`/user/bookings/${id}`);
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to submit review');
        }
    };

    if (existingReview) {
        return (
            <ReviewExistingState
                existingReview={existingReview}
                onBack={() => navigate(`/user/bookings/${id}`)}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-(--height-navbar) pb-16 px-4 sm:px-6">
            <div className="max-w-xl mx-auto mt-8">
                <ReviewBackButton onBack={() => navigate(`/user/bookings/${id}`)} />

                <ReviewFormCard
                    businessName={booking?.provider?.businessName}
                    serviceName={booking?.service?.serviceName}
                    rating={rating}
                    hovered={hovered}
                    setRating={setRating}
                    setHovered={setHovered}
                    reviewText={reviewText}
                    setReviewText={setReviewText}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
