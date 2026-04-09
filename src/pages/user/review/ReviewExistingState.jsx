import { CheckCircle2, Star } from 'lucide-react';

export default function ReviewExistingState({ existingReview, onBack }) {
    return (
        <div className="min-h-screen bg-gray-50 pt-[var(--height-navbar)] pb-16 px-4 flex items-center justify-center">
            <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center">
                <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-4" />
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Already Reviewed!</h2>

                <div className="flex gap-1 justify-center my-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={24}
                            className={star <= existingReview.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                        />
                    ))}
                </div>

                {existingReview.review && <p className="text-gray-500 italic mb-5">"{existingReview.review}"</p>}

                <button
                    onClick={onBack}
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                    Back to Booking
                </button>
            </div>
        </div>
    );
}
