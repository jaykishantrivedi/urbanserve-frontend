import { useEffect, useRef, useState } from "react";
import { Eye, MoreVertical } from "lucide-react";

export default function UserActionDropdown({ user, onToggleBlock, isLoading, navigate }) {
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

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 overflow-hidden">
          <button
            type="button"
            onClick={() => {
              navigate(`/admin/users/${user._id}`);
              setOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Eye size={14} className="text-indigo-500" />
            View Profile
          </button>

          <div className="my-1 border-t border-gray-100" />

          <button
            type="button"
            onClick={() => {
              onToggleBlock(user._id, user.status);
              setOpen(false);
            }}
            disabled={isLoading}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors ${
              user.status === "active" ? "text-red-600 hover:bg-red-50" : "text-emerald-600 hover:bg-emerald-50"
            } disabled:opacity-50`}
          >
            {isLoading ? "Processing..." : user.status === "active" ? "Block User" : "Unblock User"}
          </button>
        </div>
      )}
    </div>
  );
}
