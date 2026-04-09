import { BellOff } from 'lucide-react';

export default function ProviderRequestsEmptyState() {
  return (
    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <BellOff size={24} className="text-blue-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900">No active requests</h3>
      <p className="text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
        You don't have any pending requests at the moment. We'll notify you when someone needs your services!
      </p>
    </div>
  );
}
