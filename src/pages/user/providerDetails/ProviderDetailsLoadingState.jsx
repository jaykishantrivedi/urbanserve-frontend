export default function ProviderDetailsLoadingState() {
  return (
    <div className="min-h-screen bg-[var(--color-background-light)] pt-[var(--height-navbar)] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <span className="animate-spin text-4xl mb-4 text-[var(--color-primary)]">🌀</span>
        <p className="text-[var(--color-muted)] font-semibold">Loading Provider Details...</p>
      </div>
    </div>
  );
}
