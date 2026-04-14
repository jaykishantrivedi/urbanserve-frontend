import { useState } from 'react';
import { toast } from 'react-toastify';

export default function InlineOtpChange({
  type,
  currentValue,
  isVerified,
  onSendOtp,
  onVerifyOtp,
  isSending,
  isVerifying,
}) {
  const [step, setStep] = useState('idle');
  const [newValue, setNewValue] = useState('');
  const [otp, setOtp] = useState('');

  const label = type === 'phone' ? 'phone number' : 'email address';
  const placeholder = type === 'phone' ? 'Enter new phone number' : 'Enter new email';
  const inputType = type === 'phone' ? 'tel' : 'email';

  const handleSend = async () => {
    if (!newValue.trim()) {
      toast.error(`Please enter a new ${label}`);
      return;
    }

    try {
      await onSendOtp(type === 'phone' ? { phone: newValue } : { email: newValue });
      setStep('enterOtp');
    } catch {
    }
  };

  const handleVerify = async () => {
    if (!otp.trim()) {
      toast.error('Please enter the OTP');
      return;
    }

    try {
      await onVerifyOtp({ otp });
      setStep('idle');
      setNewValue('');
      setOtp('');
    } catch {
    }
  };

  const cancel = () => {
    setStep('idle');
    setNewValue('');
    setOtp('');
  };

  if (step === 'idle') {
    return (
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <input
            type={inputType}
            value={currentValue || 'Not set'}
            disabled
            className="flex-1 px-3 py-2 text-sm border border-[var(--color-border)] rounded-xl bg-[var(--color-background-light)] text-gray-500 cursor-not-allowed outline-none"
          />
          <button
            type="button"
            onClick={() => setStep('enterNew')}
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary)] text-sm font-semibold hover:bg-[var(--color-primary)] hover:text-white transition-all border border-[var(--color-primary)]/20"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Change
          </button>
        </div>
        {isVerified && <p className="text-xs text-green-600 flex items-center gap-1 ml-1"> Verified</p>}
        {!isVerified && currentValue && <p className="text-xs text-amber-600 ml-1">Not yet verified</p>}
      </div>
    );
  }

  if (step === 'enterNew') {
    return (
      <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
        <p className="text-xs font-semibold text-blue-900">Enter new {label}</p>
        <div className="flex items-center gap-2">
          <input
            type={inputType}
            value={newValue}
            onChange={(event) => setNewValue(event.target.value)}
            placeholder={placeholder}
            autoFocus
            className="flex-1 px-3 py-2 text-sm border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={isSending}
            className="shrink-0 px-3 py-2 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-primary-hover)] disabled:opacity-50 transition"
          >
            {isSending ? 'Sending…' : 'Send OTP'}
          </button>
          <button type="button" onClick={cancel} className="shrink-0 text-gray-400 hover:text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 rounded-xl bg-green-50/60 border border-green-200 space-y-2">
      <p className="text-xs font-semibold text-green-900">
        OTP sent to <span className="font-bold">{newValue}</span>
      </p>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={otp}
          onChange={(event) => setOtp(event.target.value)}
          placeholder="Enter 6-digit OTP"
          maxLength={6}
          autoFocus
          className="flex-1 px-3 py-2 text-sm border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none tracking-widest"
        />
        <button
          type="button"
          onClick={handleVerify}
          disabled={isVerifying}
          className="shrink-0 px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
        >
          {isVerifying ? 'Verifying…' : 'Verify'}
        </button>
        <button type="button" onClick={cancel} className="shrink-0 text-gray-400 hover:text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <p className="text-xs text-green-700">OTP valid for 3 minutes.</p>
    </div>
  );
}
