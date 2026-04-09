export default function AddServiceDescriptionField({ description, setDescription }) {
  return (
    <div className="space-y-2 relative z-10">
      <label className="block text-sm font-semibold text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)] flex items-center gap-2">
        Service Description
        <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-background-light)] dark:bg-white/10 text-[var(--color-muted)] font-normal">
          Optional
        </span>
      </label>
      <p className="text-xs text-[var(--color-muted)] mb-2">
        Provide any specific details clients should know before booking.
      </p>
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="I provide professional grade services using top quality materials..."
        rows="4"
        className="form-input resize-none"
      />
    </div>
  );
}
