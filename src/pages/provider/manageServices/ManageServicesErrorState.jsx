export default function ManageServicesErrorState() {
  return (
    <div className="p-4 rounded-xl bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20 text-[var(--color-danger)] text-center font-medium animate-fade-in-up">
      Failed to fetch services. Please try refreshing the page.
    </div>
  );
}
