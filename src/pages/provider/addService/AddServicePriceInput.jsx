export default function AddServicePriceInput({ priceType, price, setPrice }) {
  if (priceType === 'inspection') return null;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)]">
        {priceType === 'hourly' ? 'Hourly Rate (Rs)' : 'Price (Rs)'}
        <span className="text-[var(--color-danger)] ml-1">*</span>
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)] font-medium">Rs</span>
        <input
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="0.00"
          min="0"
          step="0.01"
          className="form-input pl-12"
        />
      </div>
    </div>
  );
}
