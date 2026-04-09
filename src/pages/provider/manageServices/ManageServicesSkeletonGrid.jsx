export default function ManageServicesSkeletonGrid() {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <div key={index} className="auth-card p-6 rounded-2xl animate-pulse">
          <div className="h-4 bg-[var(--color-border)] dark:bg-white/5 rounded w-1/3 mb-4" />
          <div className="h-6 bg-[var(--color-border)] dark:bg-white/5 rounded w-3/4 mb-6" />
          <div className="h-4 bg-[var(--color-border)] dark:bg-white/5 rounded w-1/2 mb-2" />
          <div className="h-4 bg-[var(--color-border)] dark:bg-white/5 rounded w-full mb-8" />
          <div className="flex justify-end gap-2">
            <div className="h-8 w-8 bg-[var(--color-border)] dark:bg-white/5 rounded-lg" />
            <div className="h-8 w-8 bg-[var(--color-border)] dark:bg-white/5 rounded-lg" />
            <div className="h-8 w-8 bg-[var(--color-border)] dark:bg-white/5 rounded-lg" />
          </div>
        </div>
      ))}
    </>
  );
}
