import { Loader2 } from "lucide-react"

export default function BecomeProviderStepActions({
  step,
  totalSteps,
  agreedToTerms,
  isSubmitting,
  onBack,
  onNext,
  onSubmit,
}) {
  return (
    <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
      {step > 1 ? (
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 font-bold px-4 py-2.5 rounded-lg text-sm flex items-center gap-1 transition-colors"
        >
          Back
        </button>
      ) : (
        <div />
      )}

      {step < totalSteps ? (
        <button
          onClick={onNext}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm shadow-md shadow-indigo-500/30 transition-all flex items-center gap-2"
        >
          Continue
        </button>
      ) : (
        <button
          onClick={onSubmit}
          disabled={!agreedToTerms || isSubmitting}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed text-white font-bold px-6 py-2.5 rounded-lg text-sm shadow-md shadow-indigo-500/30 transition-all flex items-center gap-2"
        >
          {isSubmitting ? <Loader2 size={16} className="animate-spin text-white" /> : null}
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      )}
    </div>
  )
}
