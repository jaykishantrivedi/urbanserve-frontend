import { Briefcase, Plus } from 'lucide-react';

export default function ManageServicesEmptyState({ onAddFirstService }) {
  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8 mt-16 max-w-6xl mx-auto flex flex-col items-center justify-center animate-fade-in-up">
      <div className="w-24 h-24 bg-[var(--color-primary-light)] dark:bg-[var(--color-primary)]/20 rounded-full flex items-center justify-center mb-6">
        <Briefcase size={40} className="text-[var(--color-primary)]" />
      </div>

      <h1 className="text-3xl font-display font-bold text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)] mb-3">
        You haven't added any services yet.
      </h1>

      <p className="text-[var(--color-muted)] max-w-lg text-center mb-8">
        Start expanding your reach by adding the services you offer. Customers will be able to see and book these services once approved.
      </p>

      <button onClick={onAddFirstService} className="btn-primary flex items-center gap-2">
        <Plus size={20} />
        Add Your First Service
      </button>
    </div>
  );
}
