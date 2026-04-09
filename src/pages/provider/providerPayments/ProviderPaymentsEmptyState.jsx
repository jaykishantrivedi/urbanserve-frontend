import { CreditCard } from 'lucide-react';

export default function ProviderPaymentsEmptyState() {
  return (
    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
      <CreditCard size={32} className="text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-bold text-gray-900">No payments yet</h3>
      <p className="text-gray-500 mt-2">Payments from completed bookings will appear here.</p>
    </div>
  );
}
