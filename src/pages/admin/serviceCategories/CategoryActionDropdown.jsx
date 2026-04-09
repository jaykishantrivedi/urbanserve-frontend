import { useEffect, useRef, useState } from "react";
import { MoreVertical, Pencil, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";

export default function CategoryActionDropdown({ category, onAction, loadingId, navigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const busy = loadingId === category._id;

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
        className="p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 overflow-hidden">
          <button
            type="button"
            onClick={() => {
              navigate(`/admin/categories/${category._id}/edit`);
              setOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <Pencil size={14} />
            Edit Category
          </button>

          <div className="my-1 border-t border-gray-100" />

          <button
            type="button"
            onClick={() => {
              onAction("toggle", category._id);
              setOpen(false);
            }}
            disabled={busy}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 ${
              category.isActive ? "text-amber-700 hover:bg-amber-50" : "text-emerald-600 hover:bg-emerald-50"
            }`}
          >
            {category.isActive ? (
              <>
                <ToggleLeft size={14} /> Deactivate
              </>
            ) : (
              <>
                <ToggleRight size={14} /> Activate
              </>
            )}
          </button>

          <div className="my-1 border-t border-gray-100" />

          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Permanently delete "${category.categoryName}"? This cannot be undone.`)) {
                onAction("delete", category._id);
              }
              setOpen(false);
            }}
            disabled={busy}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            <Trash2 size={14} className="text-red-500" />
            Delete Category
          </button>
        </div>
      )}
    </div>
  );
}
