import { useState } from 'react';
import { toast } from 'react-toastify';
import { Briefcase, Check, IndianRupee, Loader2, Power, X } from 'lucide-react';
import { useUpdateProviderServiceMutation } from '../../../redux/providerServiceApi';

const PRICE_TYPES = [
  { value: 'fixed', label: 'Fixed Price' },
  { value: 'hourly', label: 'Hourly Rate' },
  { value: 'inspection', label: 'On Visit / Inspection' },
];

const inputCls = `w-full px-3.5 py-2.5 rounded-xl border-2 border-[var(--color-border)]
  bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)]
  text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)]
  text-sm placeholder:text-[var(--color-placeholder)]
  focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20
  transition-all`;

const labelCls = `flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider
  text-[var(--color-muted)] mb-1.5`;

export default function EditServiceModal({ service, onClose, onSaved }) {
  const [updateService, { isLoading: isSaving }] = useUpdateProviderServiceMutation();

  const [form, setForm] = useState({
    price: service.priceType === 'inspection' ? '' : String(service.price ?? ''),
    priceType: service.priceType || 'fixed',
    experience: String(service.experience ?? ''),
    description: service.description || '',
    isActive: service.isActive !== undefined ? Boolean(service.isActive) : true,
  });
  const [error, setError] = useState('');

  const serviceName = service.service?.serviceName || 'Service';
  const categoryName = service.service?.category?.categoryName || 'Category';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((state) => ({ ...state, [name]: value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.priceType !== 'inspection' && (!form.price || Number.isNaN(Number(form.price)) || Number(form.price) < 0)) {
      setError('Please enter a valid price.');
      return;
    }

    try {
      await updateService({
        id: service._id,
        price: form.priceType === 'inspection' ? 0 : Number(form.price),
        priceType: form.priceType,
        experience: Number(form.experience) || 0,
        description: form.description,
        isActive: form.isActive,
      }).unwrap();

      await onSaved();
      toast.success('Service updated successfully');
      onClose();
    } catch (updateError) {
      setError(updateError?.data?.message || 'Failed to update service. Please try again.');
    }
  };

  const handleBackdrop = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={handleBackdrop}
    >
      <div
        className="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl animate-fade-in-up"
        style={{ background: 'var(--color-surface, #fff)', border: '1px solid var(--color-border)', animationDuration: '0.22s' }}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="relative px-7 pt-7 pb-6 rounded-t-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}
        >
          <div
            className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }}
          />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">{categoryName}</p>
              <h2 className="text-xl font-bold text-white tracking-tight">{serviceName}</h2>
              <p className="text-white/60 text-sm mt-0.5">Edit your service details</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">
          <div>
            <label className={labelCls}>
              <IndianRupee size={13} className="text-[var(--color-primary)]" />
              Pricing Type
            </label>

            <div className="grid grid-cols-3 gap-2">
              {PRICE_TYPES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setForm((state) => ({
                      ...state,
                      priceType: value,
                      price: value === 'inspection' ? '' : state.price,
                    }));
                    setError('');
                  }}
                  className={`py-2.5 px-2 rounded-xl border-2 text-xs font-bold transition-all ${
                    form.priceType === value
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)]'
                      : 'border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-primary)]/50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {form.priceType !== 'inspection' && (
            <div>
              <label htmlFor="edit-price" className={labelCls}>
                <IndianRupee size={13} className="text-[var(--color-primary)]" />
                Price {form.priceType === 'hourly' && <span className="text-[var(--color-muted)] normal-case font-normal">(per hour)</span>}
                <span className="text-[var(--color-danger)] font-black">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)] font-bold text-sm pointer-events-none">Rs</span>
                <input
                  id="edit-price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. 499"
                  className={`${inputCls} pl-8`}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="edit-experience" className={labelCls}>
              <Briefcase size={13} className="text-[var(--color-primary)]" />
              Years of Experience
            </label>
            <div className="relative">
              <input
                id="edit-experience"
                name="experience"
                type="number"
                min="0"
                max="60"
                value={form.experience}
                onChange={handleChange}
                placeholder="e.g. 3"
                className={`${inputCls} pr-12`}
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--color-muted)] pointer-events-none">yrs</span>
            </div>
          </div>

          <div>
            <label htmlFor="edit-description" className={labelCls}>
              <svg className="w-3.5 h-3.5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Description
            </label>
            <textarea
              id="edit-description"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              placeholder="Describe what this service includes..."
              className={`${inputCls} resize-none leading-relaxed`}
            />
            <p className="text-right text-xs text-[var(--color-muted)] mt-1">{form.description.length} chars</p>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] hover:border-[var(--color-primary)]/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${form.isActive ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                <Power size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)]">Service Status</p>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">
                  {form.isActive ? 'Active - visible to customers' : 'Deactivated - hidden from customers'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setForm((state) => ({ ...state, isActive: !state.isActive }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] ${
                form.isActive ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label="Toggle active status"
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${form.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          {error && (
            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
              <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-medium text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 py-3 px-4 rounded-xl border-2 border-[var(--color-border)] text-[var(--color-muted)] font-semibold text-sm hover:bg-[var(--color-background-light)] hover:text-[var(--color-foreground)] transition-all disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}
            >
              {isSaving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
