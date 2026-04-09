export default function ProviderWalletWithdrawForm({
  withdrawErrorMsg,
  withdrawAmount,
  setWithdrawAmount,
  isDebiting,
  onSubmit,
}) {
  return (
    <div className="auth-card p-6 animate-fade-in-up" style={{ animationDelay: '120ms' }}>
      <h3 className="text-lg font-bold mb-4 border-b border-[var(--color-border)] pb-3">Withdraw Wallet Balance</h3>

      {withdrawErrorMsg && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
          {withdrawErrorMsg}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Amount (Rs)</label>
          <input
            type="number"
            min="0"
            value={withdrawAmount}
            onChange={(event) => setWithdrawAmount(event.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition placeholder-gray-400 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
            placeholder="Enter amount to withdraw (min Rs10)"
            disabled={isDebiting}
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center py-2.5 px-4 font-semibold rounded-xl text-orange-600 bg-orange-100 dark:bg-orange-900/30 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
          disabled={isDebiting || !withdrawAmount}
        >
          {isDebiting ? (
            <span className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>Request Withdrawal</>
          )}
        </button>
      </form>
    </div>
  );
}
