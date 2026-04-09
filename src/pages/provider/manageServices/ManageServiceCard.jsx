import { Briefcase, Edit2, IndianRupee, Power, Trash2 } from 'lucide-react';

export default function ManageServiceCard({
  providerService,
  onToggle,
  onDelete,
  onEdit,
  isToggling,
  isDeleting,
}) {
  const { _id, service, price, priceType, experience, isActive, description } = providerService;
  const serviceName = service?.serviceName || 'Unknown Service';
  const categoryName = service?.category?.categoryName || 'Uncategorized';

  return (
    <div
      className={`auth-card p-6 rounded-3xl flex flex-col transition-all duration-300 relative overflow-hidden group border ${
        isActive ? 'border-transparent' : 'border-gray-200 dark:border-gray-700 opacity-75'
      }`}
    >
      <div
        className={`absolute top-0 right-0 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-bl-xl ${
          isActive
            ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]'
            : 'bg-[var(--color-muted)]/10 text-[var(--color-muted)]'
        }`}
      >
        {isActive ? 'Active' : 'Deactivated'}
      </div>

      <div className="mb-2">
        <span className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-primary)]">
          {categoryName}
        </span>
        <h3 className="text-xl font-bold text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)] mt-1 pr-20">
          {serviceName}
        </h3>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4 text-sm font-semibold">
        {priceType !== 'inspection' ? (
          <div className="flex items-center gap-1 text-[var(--color-success)] bg-[var(--color-success)]/10 px-2.5 py-1 rounded-md">
            <IndianRupee size={14} />
            {price} {priceType === 'hourly' ? '/hr' : ''}
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[var(--color-warning)] bg-[var(--color-warning)]/10 px-2.5 py-1 rounded-md">
            On Visit
          </div>
        )}

        {experience > 0 && (
          <div className="flex items-center gap-1 text-[var(--color-foreground)] dark:text-[var(--color-muted)] bg-[var(--color-background-light)] dark:bg-white/5 px-2.5 py-1 rounded-md border border-[var(--color-border)] dark:border-white/5">
            <Briefcase size={14} />
            {experience} yr exp
          </div>
        )}
      </div>

      <p className="text-sm text-[var(--color-muted)] line-clamp-2 mb-6 flex-1 min-h-[40px]">
        {description || 'No description provided.'}
      </p>

      <div className="flex items-center justify-between border-t border-[var(--color-border)] dark:border-white/10 pt-4 mt-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggle(_id)}
            disabled={isToggling}
            className={`p-2 rounded-xl transition-all ${
              isActive
                ? 'text-[var(--color-warning)] hover:bg-[var(--color-warning)]/10 hover:ring-1 ring-[var(--color-warning)]'
                : 'text-[var(--color-success)] hover:bg-[var(--color-success)]/10 hover:ring-1 ring-[var(--color-success)]'
            }`}
            title={isActive ? 'Deactivate Service' : 'Activate Service'}
          >
            <Power size={18} />
          </button>

          <button
            onClick={() => onDelete(_id)}
            disabled={isDeleting}
            className="p-2 rounded-xl text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 hover:ring-1 ring-[var(--color-danger)] transition-all"
            title="Delete Service"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <button
          onClick={() => onEdit(providerService)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-sm"
          style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}
          title="Edit Service"
        >
          <Edit2 size={14} />
          Edit
        </button>
      </div>
    </div>
  );
}
