export default function AddServiceActions({ onCancel, isCreating }) {
  return (
    <div className="pt-4 flex flex-col sm:flex-row gap-4">
      <button
        type="button"
        onClick={onCancel}
        className="w-full sm:flex-1 px-6 py-3 rounded-xl border-2 border-[var(--color-border)] dark:border-[var(--color-border-dark)] font-semibold text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)] hover:border-[var(--color-muted)] hover:bg-[var(--color-background-light)] dark:hover:bg-white/5 transition-all text-sm"
      >
        Cancel
      </button>
      <button type="submit" disabled={isCreating} className="btn-primary w-full sm:flex-1 group">
        {isCreating ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Saving...
          </span>
        ) : (
          'Add Service'
        )}
      </button>
    </div>
  );
}
