import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";

export default function PaymentActionDropdown({ payment, onAction, loadingId, navigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const busy = loadingId === payment._id;

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const canRefund = payment.paymentStatus === "paid";
  const canFail = payment.paymentStatus === "pending";
  const hasActions = canRefund || canFail;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="p-1 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 z-10 flex flex-col overflow-hidden">
          {payment.bookingId && (
            <button
              type="button"
              onClick={() => {
                navigate(`/admin/bookings/${payment.bookingId}`);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-indigo-700 hover:bg-indigo-50 transition-colors border-b border-gray-100"
            >
              View Linked Booking
            </button>
          )}

          {canRefund && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Issue a full refund for this payment?")) {
                  onAction("refund", payment._id);
                }
                setOpen(false);
              }}
              disabled={busy}
              className="w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 transition-colors disabled:opacity-50"
            >
              Refund Payment
            </button>
          )}

          {canFail && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Mark this pending transaction as failed?")) {
                  onAction("fail", payment._id);
                }
                setOpen(false);
              }}
              disabled={busy}
              className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              Mark as Failed
            </button>
          )}

          {!payment.bookingId && !hasActions && (
            <div className="px-4 py-3 text-xs text-center text-gray-400 italic">No actions available</div>
          )}
        </div>
      )}
    </div>
  );
}
