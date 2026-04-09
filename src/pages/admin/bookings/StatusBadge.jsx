const STATUS_CONFIG = {
  open: { label: "Open", cls: "bg-sky-50 text-sky-700" },
  accepted: { label: "In Progress", cls: "bg-blue-50 text-blue-700" },
  closed: { label: "Closed", cls: "bg-purple-50 text-purple-700" },
  completed: { label: "Completed", cls: "bg-emerald-50 text-emerald-700" },
  cancelled: { label: "Cancelled", cls: "bg-red-50 text-red-600" },
};

export default function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || {
    label: status,
    cls: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.cls}`}
    >
      {cfg.label}
    </span>
  );
}
