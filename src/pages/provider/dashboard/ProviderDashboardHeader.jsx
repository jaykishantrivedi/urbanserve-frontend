export default function ProviderDashboardHeader({ profile, onAddService }) {
  return (
    <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold gradient-text mb-2">Provider Dashboard</h1>
        <p className="text-[var(--color-muted)] text-sm">Manage your provider profile, services, and bookings.</p>
      </div>
      <div className="flex items-center gap-3">
        {profile.isApproved && (
          <span className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-[var(--color-accent-light)] text-[var(--color-accent)] border border-[var(--color-accent)] shadow-sm animate-fade-in">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] mr-2 animate-pulse" />
            Active Profile
          </span>
        )}
        <button onClick={onAddService} className="btn-primary py-2 px-5 !w-auto shadow-md">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Service
        </button>
      </div>
    </div>
  );
}
