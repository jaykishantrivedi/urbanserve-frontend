import { ArrowLeft } from "lucide-react";

export default function AddServicePageHeader({ onBackToServices }) {
  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={onBackToServices}
        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Services
      </button>

      <div>
        <h2 className="text-2xl font-bold text-gray-900">Add New Service</h2>
        <p className="text-sm text-gray-500 mt-1">Create a new service on the platform</p>
      </div>

      <nav className="flex items-center gap-1.5 text-xs text-gray-400">
        <span>Dashboard</span>
        <span>/</span>
        <button type="button" onClick={onBackToServices} className="hover:text-indigo-600 transition-colors">
          Services
        </button>
        <span>/</span>
        <span className="text-gray-700 font-medium">Add New</span>
      </nav>
    </div>
  );
}
