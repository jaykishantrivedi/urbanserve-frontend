import { Download } from 'lucide-react';
import { providerPaymentMethodLabel } from './providerPaymentMethodLabel';

export default function ProviderPaymentCard({ payment, onDownloadReceipt }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">{payment.booking?.service?.serviceName || 'Service'}</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            Customer: <span className="font-medium">{payment.user?.name}</span>
          </p>
          <p className="text-sm text-gray-400 mt-0.5">
            {providerPaymentMethodLabel[payment.paymentMethod] || payment.paymentMethod}
            {' · '}
            {payment.paidAt ? new Date(payment.paidAt).toLocaleDateString('en-IN') : '—'}
          </p>
        </div>

        <div className="flex items-start gap-4 border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-5 shrink-0">
          <div className="space-y-1">
            <div className="flex justify-between gap-6 text-sm">
              <span className="text-gray-400">Total</span>
              <span className="text-gray-700 font-semibold">₹{payment.amount?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between gap-6 text-sm">
              <span className="text-gray-400">Platform fee ({payment.platformCommissionPct}%)</span>
              <span className="text-red-500 font-semibold">- ₹{payment.adminAmount?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between gap-6 text-sm border-t border-gray-100 pt-1">
              <span className="font-bold text-gray-700">Your Earnings</span>
              <span className="font-extrabold text-emerald-600">₹{payment.providerAmount?.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {payment.paymentStatus === 'paid' && (
            <button
              onClick={() => onDownloadReceipt(payment)}
              className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-2 rounded-xl font-semibold text-sm transition-colors shrink-0"
            >
              <Download size={15} /> Receipt
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
