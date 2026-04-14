export default function ProviderDashboardBusinessDetails({ profile }) {
  return (
    <div className="auth-card p-6 sm:p-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
      <h3 className="text-lg font-bold mb-4 border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)] pb-4 flex items-center">
        <svg className="w-5 h-5 mr-3 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        Business Details
      </h3>

      <p className="text-[var(--color-muted)] mb-6 text-sm leading-relaxed">{profile.description || 'No description provided.'}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-primary)] transition-colors">
          <p className="text-xs text-[var(--color-placeholder)] font-bold uppercase tracking-wider mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Address
          </p>
          <p className="font-medium text-sm text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)]">{profile.address || 'N/A'}</p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-primary)] transition-colors">
          <p className="text-xs text-[var(--color-placeholder)] font-bold uppercase tracking-wider mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Status
          </p>
          <p className="font-medium text-sm text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)]">
            {profile.isAvailable ? ' Available for Requests' : ' Not Available'}
          </p>
        </div>
      </div>
    </div>
  );
}
