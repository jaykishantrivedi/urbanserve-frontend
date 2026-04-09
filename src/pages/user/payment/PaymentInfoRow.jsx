export default function PaymentInfoRow({ label, value, highlight }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? "text-blue-600 text-base" : "text-gray-800"}`}>{value}</span>
    </div>
  );
}
