import { Star } from 'lucide-react';

const RATING_LABELS = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent!'];

export default function ReviewStarRatingField({ rating, hovered, setRating, setHovered }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Your Rating *</label>

            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        className="focus:outline-none transition-transform hover:scale-125"
                    >
                        <Star
                            size={36}
                            className={`transition-colors ${star <= (hovered || rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300 hover:text-amber-300'}`}
                        />
                    </button>
                ))}
            </div>

            {rating > 0 && <p className="text-sm text-amber-600 font-medium mt-2">{RATING_LABELS[rating]}</p>}
        </div>
    );
}
