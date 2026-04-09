export default function ProviderWalletTransactionsCard({ transactions }) {
  return (
    <div className="auth-card p-6 min-h-full animate-fade-in-up" style={{ animationDelay: '150ms' }}>
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Recent Transactions
        </h3>

        {transactions.length > 0 && (
          <span className="text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-1 rounded-full">
            {Math.min(transactions.length, 10)} of {transactions.length}
          </span>
        )}
      </div>

      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 text-gray-400">
          <svg className="w-12 h-12 mb-3 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium">No transactions yet</p>
          <p className="text-xs text-gray-300 mt-1">Your wallet activity will appear here</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wide">
                  <th className="px-4 py-3 font-semibold rounded-tl-xl">Date & Time</th>
                  <th className="px-4 py-3 font-semibold">Description</th>
                  <th className="px-4 py-3 font-semibold hidden sm:table-cell">Reference ID</th>
                  <th className="px-4 py-3 font-semibold text-right rounded-tr-xl">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[...transactions].slice(0, 10).map((tx) => (
                  <tr key={tx._id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="text-xs font-medium text-gray-700">
                        {new Date(tx.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(tx.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800 text-sm">{tx.description}</p>
                      {tx.status === 'failed' && <span className="text-xs text-red-500 font-medium">Failed</span>}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="font-mono text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                        {tx.referenceId
                          ? tx.referenceId.slice(0, 16) + (tx.referenceId.length > 16 ? '...' : '')
                          : '-'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                          tx.type === 'credit'
                            ? 'bg-green-50 text-green-700 border border-green-100'
                            : 'bg-red-50 text-red-600 border border-red-100'
                        }`}
                      >
                        {tx.type === 'credit' ? '+' : '-'} Rs{tx.amount?.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {transactions.length > 10 && (
            <p className="text-xs text-gray-400 text-center mt-3">
              Showing 10 most recent transactions. {transactions.length - 10} older transactions not shown.
            </p>
          )}
        </>
      )}
    </div>
  );
}
