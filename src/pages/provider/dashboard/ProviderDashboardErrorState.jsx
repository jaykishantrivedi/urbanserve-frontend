export default function ProviderDashboardErrorState() {
  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8 mt-16 max-w-4xl mx-auto text-center">
      <div className="auth-card p-8">
        <h2 className="text-2xl font-bold text-[var(--color-danger)] mb-4">Profile Unavailable</h2>
        <p className="text-[var(--color-muted)]">Please ensure your provider profile is approved or try again later.</p>
      </div>
    </div>
  );
}
