import { AlertTriangle } from "lucide-react";

export default function ProviderDetailsNotFoundState({ onBack }) {
  return (
    <div className="min-h-screen bg-[var(--color-background-light)] pt-[var(--height-navbar)] flex flex-col items-center justify-center p-4 text-center">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-2">Provider Not Found</h2>
      <p className="text-[var(--color-muted)] mb-6">The provider you are looking for might be unavailable or does not exist.</p>
      <button onClick={onBack} className="btn-primary">
        Go Back
      </button>
    </div>
  );
}
