export default function ProviderStartOtpModal({
  otpModal,
  otpInput,
  setOtpInput,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  if (!otpModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Enter Start OTP</h2>
        <p className="text-sm text-gray-500 mb-5">Ask the customer for their 6-digit OTP to confirm service start.</p>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={otpInput}
            onChange={(event) => setOtpInput(event.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="000000"
            maxLength={6}
            className="w-full text-center text-3xl font-black tracking-[0.5em] border-2 border-gray-200 rounded-xl px-4 py-4 focus:border-indigo-500 focus:outline-none font-mono mb-4"
            autoFocus
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || otpInput.length !== 6}
              className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Verifying...' : 'Verify & Start'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
