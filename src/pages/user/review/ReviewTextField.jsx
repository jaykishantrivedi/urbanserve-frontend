export default function ReviewTextField({ reviewText, setReviewText }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Review (optional)</label>
            <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                maxLength={500}
                rows={4}
                placeholder="Tell others about your experience..."
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-400 focus:outline-none resize-none transition-colors"
            />
            <p className="text-xs text-gray-400 text-right mt-1">{reviewText.length}/500</p>
        </div>
    );
}
