import { Package } from 'lucide-react';

export default function ProviderBookingsEmptyState() {
  return (
    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
      <Package size={24} className="text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-bold text-gray-900">No bookings yet</h3>
      <p className="text-gray-500 mt-2">Accepted quotes appear here once a user confirms.</p>
    </div>
  );
}
