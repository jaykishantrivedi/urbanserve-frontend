import ProviderPaymentCard from './ProviderPaymentCard';

export default function ProviderPaymentsList({ payments, onDownloadReceipt }) {
  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <ProviderPaymentCard
          key={payment._id}
          payment={payment}
          onDownloadReceipt={onDownloadReceipt}
        />
      ))}
    </div>
  );
}
