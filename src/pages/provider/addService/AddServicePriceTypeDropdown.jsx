export default function AddServicePriceTypeDropdown({
  priceType,
  setPriceType,
  options,
  isOpen,
  setIsOpen,
  dropdownRef,
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)]">
        Pricing Model <span className="text-[var(--color-danger)]">*</span>
      </label>

      <div ref={dropdownRef} className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`form-input flex items-center justify-between cursor-pointer text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)] ${isOpen ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary-light)] dark:ring-[var(--color-primary)]/20' : ''}`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{options.find((opt) => opt.value === priceType)?.icon}</span>
            <span className="font-medium text-sm">{options.find((opt) => opt.value === priceType)?.label}</span>
          </div>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[var(--color-primary)]' : 'text-[var(--color-muted)]'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-xl shadow-2xl z-40 p-2 space-y-1 animate-slide-down">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  setPriceType(option.value);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 rounded-lg cursor-pointer flex items-center gap-3 transition-colors ${priceType === option.value ? 'bg-[var(--color-primary-light)] dark:bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold' : 'hover:bg-[var(--color-background-light)] dark:hover:bg-white/5 text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)]'}`}
              >
                <span className="text-xl">{option.icon}</span>
                <span className="text-sm">{option.label}</span>
                {priceType === option.value && (
                  <svg className="w-5 h-5 ml-auto text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
