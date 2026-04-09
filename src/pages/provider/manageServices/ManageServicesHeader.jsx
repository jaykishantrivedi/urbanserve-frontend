import { Plus } from 'lucide-react';

export default function ManageServicesHeader({ onAddService }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 animate-fade-in-up">
      <div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)] mb-2">
          Manage Your Services
        </h1>
        <p className="text-[var(--color-muted)] text-sm">
          View, edit, or toggle the status of the services you offer.
        </p>
      </div>

      <button
        onClick={onAddService}
        className="btn-primary py-2 px-5 !w-auto shadow-md flex items-center gap-2"
        style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}
      >
        <Plus size={18} />
        Add Service
      </button>
    </div>
  );
}
