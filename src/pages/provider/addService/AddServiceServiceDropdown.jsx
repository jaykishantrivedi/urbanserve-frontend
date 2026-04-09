export default function AddServiceServiceDropdown({
  selectedService,
  setSelectedService,
  isOpen,
  setIsOpen,
  dropdownRef,
  isServicesLoading,
  services,
}) {
  return (
    <div className="space-y-2 relative z-50">
      <label className="block text-sm font-semibold text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)]">
        Select Service <span className="text-[var(--color-danger)]">*</span>
      </label>

      <div ref={dropdownRef} className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`form-input flex items-center justify-between cursor-pointer ${!selectedService ? 'text-[var(--color-placeholder)]' : 'text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)]'} ${isOpen ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary-light)] dark:ring-[var(--color-primary)]/20' : ''}`}
        >
          <div className="flex items-center gap-3">
            {selectedService ? (
              <>
                <div className="w-8 h-8 rounded-full bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] flex items-center justify-center overflow-hidden">
                  {selectedService.coverImage ? (
                    <img src={selectedService.coverImage} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-[var(--color-primary)]">
                      {selectedService.serviceName.charAt(0)}
                    </span>
                  )}
                </div>
                <span className="font-medium text-sm">{selectedService.serviceName}</span>
              </>
            ) : (
              'Choose a service from our catalog...'
            )}
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
          <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto no-scrollbar animate-slide-down">
            {isServicesLoading ? (
              <div className="p-4 text-center text-[var(--color-muted)] text-sm">Loading services...</div>
            ) : services?.length > 0 ? (
              <ul className="p-2 space-y-1">
                {services.map((service) => (
                  <li
                    key={service._id}
                    onClick={() => {
                      setSelectedService(service);
                      setIsOpen(false);
                    }}
                    className={`px-4 py-3 rounded-lg cursor-pointer flex items-center gap-3 transition-colors ${selectedService?._id === service._id ? 'bg-[var(--color-primary-light)] dark:bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold' : 'hover:bg-[var(--color-background-light)] dark:hover:bg-white/5 text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)]'}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex flex-shrink-0 items-center justify-center overflow-hidden">
                      {service.coverImage ? (
                        <img src={service.coverImage} alt={service.serviceName} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs font-bold text-[var(--color-primary)]">
                          {service.serviceName.substring(0, 2)}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm">{service.serviceName}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-[var(--color-muted)] text-sm">No services available.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
