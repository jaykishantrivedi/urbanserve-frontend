export default function AddServiceExperienceField({ experience, setExperience }) {
  return (
    <div className="space-y-2 relative z-20">
      <label className="block text-sm font-semibold text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)] flex items-center gap-2">
        Experience (Years)
        <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-background-light)] dark:bg-white/10 text-[var(--color-muted)] font-normal">
          Optional
        </span>
      </label>
      <input
        type="number"
        value={experience}
        onChange={(event) => setExperience(event.target.value)}
        placeholder="e.g. 5"
        min="0"
        className="form-input"
      />
    </div>
  );
}
