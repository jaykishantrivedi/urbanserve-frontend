export default function ProviderWalletRechargeForm({
  errorMsg,
  amount,
  setAmount,
  isOrdering,
  isVerifying,
  onSubmit,
}) {
  return (
    <div className="auth-card p-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
      <h3 className="text-lg font-bold mb-4 border-b border-[var(--color-border)] pb-3">Recharge Wallet</h3>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
          {errorMsg}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Amount (Rs)</label>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-400 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
            placeholder="Enter amount to add (min Rs10)"
            disabled={isOrdering || isVerifying}
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full flex justify-center items-center"
          disabled={isOrdering || isVerifying || !amount}
        >
          {isOrdering || isVerifying ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>Top-up via Razorpay</>
          )}
        </button>
      </form>
    </div>
  );
}
