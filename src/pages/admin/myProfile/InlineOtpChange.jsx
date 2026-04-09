import { useState } from "react";
import { Pencil, X, RefreshCw, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";

export default function InlineOtpChange({
  type,
  currentValue,
  isVerified,
  onSendOtp,
  onVerifyOtp,
  isSending,
  isVerifying,
}) {
  const [step, setStep] = useState("idle");
  const [newValue, setNewValue] = useState("");
  const [otp, setOtp] = useState("");

  const label = type === "phone" ? "phone number" : "email address";
  const placeholder = type === "phone" ? "Enter new phone number" : "Enter new email address";
  const inputType = type === "phone" ? "tel" : "email";

  const handleSend = async () => {
    if (!newValue.trim()) {
      toast.error(`Please enter a new ${label}`);
      return;
    }

    try {
      const payload = type === "phone" ? { phone: newValue } : { email: newValue };
      await onSendOtp(payload);
      setStep("enterOtp");
    } catch {
      // Parent handles API errors and toasts.
    }
  };

  const handleVerify = async () => {
    if (!otp.trim()) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      await onVerifyOtp({ otp });
      setStep("idle");
      setNewValue("");
      setOtp("");
    } catch {
      // Parent handles API errors and toasts.
    }
  };

  const handleCancel = () => {
    setStep("idle");
    setNewValue("");
    setOtp("");
  };

  if (step === "idle") {
    return (
      <div className="space-y-1">
        <div className="flex items-center gap-2 max-w-2xl">
          <input
            type={inputType}
            value={currentValue || "Not set"}
            disabled
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 outline-none cursor-not-allowed"
          />
          <button
            type="button"
            onClick={() => setStep("enterNew")}
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-semibold hover:bg-indigo-600 hover:text-white transition-all border border-indigo-200"
          >
            <Pencil className="w-3.5 h-3.5" /> Change
          </button>
        </div>
        {isVerified && (
          <p className="text-xs text-green-600 flex items-center gap-1 ml-1">
            <CheckCircle2 className="w-3 h-3" /> Verified
          </p>
        )}
        {!isVerified && currentValue && <p className="text-xs text-amber-600 ml-1">Not yet verified</p>}
      </div>
    );
  }

  if (step === "enterNew") {
    return (
      <div className="max-w-2xl p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-3">
        <p className="text-sm font-semibold text-indigo-900">Enter new {label}</p>
        <div className="flex items-center gap-2">
          <input
            type={inputType}
            className="w-full px-3 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            value={newValue}
            onChange={(event) => setNewValue(event.target.value)}
            placeholder={placeholder}
            autoFocus
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={isSending}
            className="shrink-0 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            {isSending ? "Sending..." : "Send OTP"}
          </button>
          <button type="button" onClick={handleCancel} className="shrink-0 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-indigo-700">An OTP will be sent to your new {label}.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl p-4 rounded-xl bg-green-50/60 border border-green-200 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-green-900">
          OTP sent to <span className="font-bold">{newValue}</span>
        </p>
        <button
          type="button"
          onClick={() => setStep("enterNew")}
          className="text-xs text-green-700 hover:text-green-900 flex items-center gap-1 underline"
        >
          <RefreshCw className="w-3 h-3" /> Wrong?
        </button>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm tracking-widest"
          value={otp}
          onChange={(event) => setOtp(event.target.value)}
          placeholder="Enter 6-digit OTP"
          maxLength={6}
          autoFocus
        />
        <button
          type="button"
          onClick={handleVerify}
          disabled={isVerifying}
          className="shrink-0 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </button>
        <button type="button" onClick={handleCancel} className="shrink-0 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>
      <p className="text-xs text-green-700">OTP is valid for 3 minutes.</p>
    </div>
  );
}
