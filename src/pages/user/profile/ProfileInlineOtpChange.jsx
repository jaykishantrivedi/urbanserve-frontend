import { useState } from "react"
import { toast } from "react-toastify"
import { CheckCircle2, Pencil, RefreshCw, X } from "lucide-react"

export default function ProfileInlineOtpChange({
    type,
    currentValue,
    isVerified,
    onSendOtp,
    onVerifyOtp,
    isSending,
    isVerifying,
    onCancel,
}) {
    const [step, setStep] = useState("idle")
    const [newValue, setNewValue] = useState("")
    const [otp, setOtp] = useState("")

    const label = type === "phone" ? "Mobile Number" : "Email Address"
    const placeholder = type === "phone" ? "Enter new mobile number" : "Enter new email address"
    const inputType = type === "phone" ? "tel" : "email"

    const handleSend = async () => {
        if (!newValue.trim()) {
            toast.error(`Please enter a new ${label.toLowerCase()}`)
            return
        }

        try {
            const payload = type === "phone" ? { phone: newValue } : { email: newValue }
            await onSendOtp(payload)
            setStep("enterOtp")
        } catch {
            // Parent handles toast messaging.
        }
    }

    const handleVerify = async () => {
        if (!otp.trim()) {
            toast.error("Please enter the OTP")
            return
        }

        try {
            await onVerifyOtp({ otp })
            setStep("idle")
            setNewValue("")
            setOtp("")
        } catch {
            // Parent handles toast messaging.
        }
    }

    const handleLocalCancel = () => {
        setStep("idle")
        setNewValue("")
        setOtp("")
        onCancel?.()
    }

    if (step === "idle") {
        return (
            <div>
                <div className="flex items-center gap-3">
                    <input
                        type={inputType}
                        className="form-input bg-gray-50 text-gray-500 cursor-not-allowed flex-1"
                        value={currentValue || "Not set"}
                        disabled
                    />
                    <button
                        type="button"
                        onClick={() => setStep("enterNew")}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary)] text-sm font-semibold hover:bg-[var(--color-primary)] hover:text-white transition-all shrink-0"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                        Change
                    </button>
                </div>
                {isVerified && (
                    <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                    </p>
                )}
                {!isVerified && currentValue && (
                    <p className="text-xs text-amber-600 mt-1.5">Not yet verified</p>
                )}
            </div>
        )
    }

    if (step === "enterNew") {
        return (
            <div className="space-y-3 p-4 rounded-xl bg-blue-50/60 border border-blue-200">
                <p className="text-sm font-semibold text-blue-900">Enter new {label.toLowerCase()}</p>
                <div className="flex items-center gap-2">
                    <input
                        type={inputType}
                        className="form-input flex-1 !py-2 !text-sm"
                        value={newValue}
                        onChange={(event) => setNewValue(event.target.value)}
                        placeholder={placeholder}
                        autoFocus
                    />
                    <button
                        type="button"
                        onClick={handleSend}
                        disabled={isSending}
                        className="shrink-0 px-4 py-2 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-primary-hover)] disabled:opacity-50 transition"
                    >
                        {isSending ? "Sending..." : "Send OTP"}
                    </button>
                    <button
                        type="button"
                        onClick={handleLocalCancel}
                        className="shrink-0 text-gray-400 hover:text-gray-600 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-xs text-blue-700">An OTP will be sent to verify your new {label.toLowerCase()}.</p>
            </div>
        )
    }

    return (
        <div className="space-y-3 p-4 rounded-xl bg-green-50/60 border border-green-200">
            <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-green-900">
                    Enter the OTP sent to <span className="font-bold">{newValue}</span>
                </p>
                <button
                    type="button"
                    onClick={() => setStep("enterNew")}
                    className="text-xs text-green-700 hover:text-green-900 flex items-center gap-1 underline"
                >
                    <RefreshCw className="w-3 h-3" /> Wrong number?
                </button>
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    className="form-input flex-1 !py-2 !text-sm tracking-widest"
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
                <button
                    type="button"
                    onClick={handleLocalCancel}
                    className="shrink-0 text-gray-400 hover:text-gray-600 transition"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
            <p className="text-xs text-green-700">OTP is valid for 3 minutes.</p>
        </div>
    )
}
