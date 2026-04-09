export default function ProviderDashboardQuickActions({
  onManageServices,
  onBookings,
  onReviews,
  onWallet,
}) {
  return (
    <div className="auth-card p-6 sm:p-8 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
      <h3 className="text-lg font-bold mb-4 border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)] pb-4 flex items-center">
        <svg className="w-5 h-5 mr-3 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 gap-4">
        <button onClick={onManageServices} className="p-4 flex flex-col items-center justify-center gap-3 rounded-xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] dark:hover:bg-[var(--color-surface-light)]/5 hover:-translate-y-1 transition-all shadow-sm">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-[var(--color-primary)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)] text-center">Manage Services</span>
        </button>

        <button onClick={onBookings} className="p-4 flex flex-col items-center justify-center gap-3 rounded-xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-light)] dark:hover:bg-[var(--color-surface-light)]/5 hover:-translate-y-1 transition-all shadow-sm">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-[var(--color-accent)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)] text-center">View Bookings</span>
        </button>

        <button onClick={onReviews} className="p-4 flex flex-col items-center justify-center gap-3 rounded-xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-[var(--color-surface-light)]/5 hover:-translate-y-1 transition-all shadow-sm">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)] text-center">Reviews</span>
        </button>

        <button onClick={onWallet} className="p-4 flex flex-col items-center justify-center gap-3 rounded-xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-[var(--color-surface-light)]/5 hover:-translate-y-1 transition-all shadow-sm">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)] text-center">Wallet & Payments</span>
        </button>
      </div>
    </div>
  );
}
