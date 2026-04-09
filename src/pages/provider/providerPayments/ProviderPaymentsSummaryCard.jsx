export default function ProviderPaymentsSummaryCard({ totalEarned }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
      <p className="text-blue-200 font-semibold text-sm uppercase tracking-wider mb-1">Total Earnings (Net)</p>
      <p className="text-4xl font-black">₹{totalEarned.toLocaleString('en-IN')}</p>
      <p className="text-blue-200 text-sm mt-1">After platform commission deductions</p>
    </div>
  );
}
