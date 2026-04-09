export default function ProviderWalletBalanceCard({ balance, minimumWalletBalance }) {
  return (
    <div className="auth-card p-6 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white shadow-xl relative overflow-hidden animate-fade-in-up hover:-translate-y-1 transition-transform cursor-default">
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10" />
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-white opacity-10" />

      <div className="relative z-10">
        <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-1 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Available Balance
        </h3>

        <h2 className="text-4xl font-bold font-display tracking-tight mt-2 mb-4">Rs{balance.toFixed(2)}</h2>

        {balance < minimumWalletBalance && (
          <div className="mt-4 p-2 bg-red-500/20 rounded border border-red-400/30 text-xs font-medium">
            Action required: Balance is below minimum (Rs{minimumWalletBalance}).
          </div>
        )}

        {balance >= minimumWalletBalance && (
          <div className="mt-4 p-2 bg-green-500/20 rounded border border-green-400/30 text-xs font-medium">
            Ready to receive requests.
          </div>
        )}
      </div>
    </div>
  );
}
