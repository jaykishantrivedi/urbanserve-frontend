export default function ProviderDashboardWalletWarning({ onGoWallet }) {
  return (
    <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg shadow-sm flex items-start gap-4 animate-fade-in">
      <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <div>
        <h3 className="text-red-800 dark:text-red-400 font-bold">Action Required: Low Wallet Balance</h3>
        <p className="text-red-700 dark:text-red-300 mt-1 text-sm">
          You have less than the minimum balance required (₹100). Please add money to your wallet to start receiving new service requests.
        </p>
        <button
          onClick={onGoWallet}
          className="mt-3 inline-flex items-center text-sm font-semibold text-red-700 dark:text-red-200 hover:text-red-800 bg-red-100 dark:bg-red-800/40 px-3 py-1.5 rounded-md transition-colors"
        >
          Go to Wallet
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
