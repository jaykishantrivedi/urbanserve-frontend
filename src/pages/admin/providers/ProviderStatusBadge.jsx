const STATUS_CONFIG = {
  approved: {
    dot: "bg-emerald-500",
    bg: "bg-emerald-50 text-emerald-700",
    label: "Approved",
  },
  pending: {
    dot: "bg-amber-400",
    bg: "bg-amber-50 text-amber-700",
    label: "Pending",
  },
  blocked: {
    dot: "bg-red-500",
    bg: "bg-red-50 text-red-600",
    label: "Blocked",
  },
};

export default function ProviderStatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}
