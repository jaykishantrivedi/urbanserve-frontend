import { ArrowLeft, Clock } from "lucide-react";

export default function PendingProvidersHeader({ onBack, pendingCount, isLoading }) {
  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors mb-3"
      >
        <ArrowLeft size={16} /> Back to Providers
      </button>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
          <Clock size={20} className="text-amber-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pending Providers</h2>
          <p className="text-sm text-gray-500 mt-0.5">Review and approve new provider registrations</p>
        </div>
        {!isLoading && pendingCount > 0 && (
          <span className="ml-auto inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-amber-100 text-amber-700">
            {pendingCount} pending
          </span>
        )}
      </div>
    </div>
  );
}
