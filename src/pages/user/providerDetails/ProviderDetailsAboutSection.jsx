export default function ProviderDetailsAboutSection({ provider }) {
  return (
    <div className="auth-card p-6 md:p-8">
      <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-4 pb-4 border-b border-[var(--color-border)]">About the Business</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-1">Service Area</h3>
          <p className="text-[var(--color-foreground)]">
            {provider.address ? `${provider.address}, ` : ""}
            {provider.city}
          </p>
        </div>
      </div>
    </div>
  );
}
