import { Phone, Mail } from "lucide-react";
import InlineOtpChange from "./InlineOtpChange";

export default function ContactDetailsSection({
  user,
  onSendEmailOtp,
  onVerifyEmailOtp,
  onSendPhoneOtp,
  onVerifyPhoneOtp,
  isSendingEmailOtp,
  isVerifyingEmailOtp,
  isSendingPhoneOtp,
  isVerifyingPhoneOtp,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Phone className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Contact Details</h3>
          <p className="text-sm text-gray-500">Update your email or phone. An OTP will be sent to verify any change.</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 block mb-1 flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-400" /> Email Address
        </label>
        <InlineOtpChange
          type="email"
          currentValue={user?.email}
          isVerified={user?.isVerified}
          onSendOtp={onSendEmailOtp}
          onVerifyOtp={onVerifyEmailOtp}
          isSending={isSendingEmailOtp}
          isVerifying={isVerifyingEmailOtp}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 block mb-1 flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-400" /> Phone Number
        </label>
        <InlineOtpChange
          type="phone"
          currentValue={user?.phone}
          isVerified={user?.isPhoneVerified}
          onSendOtp={onSendPhoneOtp}
          onVerifyOtp={onVerifyPhoneOtp}
          isSending={isSendingPhoneOtp}
          isVerifying={isVerifyingPhoneOtp}
        />
      </div>
    </div>
  );
}
