import { Download, Star } from 'lucide-react'

export default function UserBookingCompletedSection({ payment, hasReview, reviewData, onDownloadReceipt, onWriteReview }) {
  return (
    <div className="space-y-4">
      {payment && (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="font-bold text-gray-900">Payment Receipt</p>
            <p className="text-sm text-gray-500 mt-0.5">Download your official UrbanServe receipt</p>
          </div>
          <button
            onClick={onDownloadReceipt}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-colors"
          >
            <Download size={16} /> Download PDF
          </button>
        </div>
      )}

      {!hasReview ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Star size={18} className="text-amber-400 fill-amber-400" /> Leave a Review
          </p>
          <p className="text-sm text-gray-500 mb-3">How was your experience? Your feedback helps others.</p>
          <button
            onClick={onWriteReview}
            className="w-full border-2 border-amber-400 text-amber-600 hover:bg-amber-50 font-bold py-2.5 rounded-xl transition-colors"
          >
            Write a Review
          </button>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 shadow-sm">
          <p className="font-bold text-amber-700 flex items-center gap-2">
            <Star size={18} className="fill-amber-400 text-amber-400" /> Review Submitted
          </p>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={16}
                className={s <= reviewData.review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
              />
            ))}
          </div>
          {reviewData.review.review && <p className="text-sm text-gray-600 mt-2 italic">"{reviewData.review.review}"</p>}
        </div>
      )}
    </div>
  )
}
