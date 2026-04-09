import { useEffect, useRef, useState } from "react";
import { MoreVertical, Trash2 } from "lucide-react";

export default function ReviewActionDropdown({ review, onDelete, loadingId, navigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const busy = loadingId === review._id;

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="p-1 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
        disabled={busy}
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 z-20 flex flex-col overflow-hidden">
          {review.booking && (
            <button
              type="button"
              onClick={() => {
                navigate(`/admin/bookings/${review.booking}`);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-indigo-700 hover:bg-indigo-50 transition-colors font-medium border-b border-gray-100 flex items-center gap-2"
            >
              View Linked Booking
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this review?")) {
                onDelete(review._id);
              }
              setOpen(false);
            }}
            className="w-full flex items-center justify-start gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
          >
            <Trash2 className="w-4 h-4" /> Delete Review
          </button>
        </div>
      )}
    </div>
  );
}
