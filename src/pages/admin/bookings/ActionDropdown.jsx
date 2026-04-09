import { useEffect, useRef, useState } from "react";
import { Calendar, CheckCircle, MoreVertical, XCircle } from "lucide-react";

export default function ActionDropdown({ booking, onAction, loadingId, navigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const busy = loadingId === booking._id;

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isAccepted = booking.status === "accepted";
  const canCancel = ["open", "accepted"].includes(booking.status);
  const hasActions = isAccepted || canCancel;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 overflow-hidden">
          <button
            type="button"
            onClick={() => {
              navigate(`/admin/bookings/${booking._id}`);
              setOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <Calendar size={14} />
            View Details
          </button>

          {hasActions && <div className="my-1 border-t border-gray-100" />}

          {isAccepted && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Mark this booking as completed?")) {
                  onAction("complete", booking._id);
                }
                setOpen(false);
              }}
              disabled={busy}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-emerald-600 hover:bg-emerald-50 transition-colors disabled:opacity-50"
            >
              <CheckCircle size={14} />
              Mark as Completed
            </button>
          )}

          {canCancel && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Cancel this booking? This cannot be undone.")) {
                  onAction("cancel", booking._id);
                }
                setOpen(false);
              }}
              disabled={busy}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <XCircle size={14} />
              Cancel Booking
            </button>
          )}

          {!hasActions && (
            <p className="px-4 py-2.5 text-xs text-gray-400 italic">No actions available</p>
          )}
        </div>
      )}
    </div>
  );
}
