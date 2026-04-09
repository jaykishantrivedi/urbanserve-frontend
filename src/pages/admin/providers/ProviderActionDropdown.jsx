import { useEffect, useRef, useState } from "react";
import { CheckCircle, Eye, MoreVertical, ShieldCheck, ShieldOff, Trash2 } from "lucide-react";

export default function ProviderActionDropdown({ provider, onAction, loadingAction, navigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const busy = loadingAction !== null;

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
              navigate(`/admin/providers/${provider._id}`);
              setOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Eye size={14} className="text-indigo-500" />
            View Profile
          </button>

          {provider.status === "pending" && (
            <button
              type="button"
              onClick={() => {
                onAction("approve", provider._id);
                setOpen(false);
              }}
              disabled={busy}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-emerald-600 hover:bg-emerald-50 transition-colors disabled:opacity-50"
            >
              <CheckCircle size={14} className="text-emerald-500" />
              Approve Provider
            </button>
          )}

          <div className="my-1 border-t border-gray-100" />

          <button
            type="button"
            onClick={() => {
              onAction("block", provider._id);
              setOpen(false);
            }}
            disabled={busy}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 ${
              provider.status === "blocked"
                ? "text-emerald-600 hover:bg-emerald-50"
                : "text-red-600 hover:bg-red-50"
            }`}
          >
            {provider.status === "blocked" ? (
              <>
                <ShieldCheck size={14} /> Unblock Provider
              </>
            ) : (
              <>
                <ShieldOff size={14} /> Block Provider
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Delete "${provider.businessName}"? This cannot be undone.`)) {
                onAction("delete", provider._id);
              }
              setOpen(false);
            }}
            disabled={busy}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            <Trash2 size={14} className="text-red-500" />
            Delete Provider
          </button>
        </div>
      )}
    </div>
  );
}
