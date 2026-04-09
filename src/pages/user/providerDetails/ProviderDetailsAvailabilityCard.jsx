import { Clock } from "lucide-react";

export default function ProviderDetailsAvailabilityCard({ availability }) {
  return (
    <div className="auth-card p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 pointer-events-none"></div>

      <h2 className="text-lg font-bold text-[var(--color-foreground)] mb-4 flex items-center gap-2 relative z-10">
        <Clock className="w-5 h-5 text-[var(--color-primary)]" /> Business Hours
      </h2>

      <div className="space-y-3 relative z-10">
        {Object.entries(availability || {}).map(([day, times]) => (
          <div key={day} className="flex items-center justify-between text-sm pb-2 border-b border-gray-100 last:border-0 last:pb-0">
            <span className={`font-semibold ${times.open ? "text-[var(--color-foreground)]" : "text-gray-400"}`}>{day}</span>
            {times.open ? (
              <span className="text-[var(--color-muted)]">
                {times.start} - {times.end}
              </span>
            ) : (
              <span className="text-red-400 font-medium text-xs uppercase tracking-wide bg-red-50 px-2 py-0.5 rounded">
                Closed
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
