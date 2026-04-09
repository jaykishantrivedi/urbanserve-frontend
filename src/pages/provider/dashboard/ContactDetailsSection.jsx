import {
  useSendEmailChangeOtpMutation,
  useSendPhoneOtpMutation,
  useVerifyEmailChangeOtpMutation,
  useVerifyPhoneOtpMutation,
} from '../../../redux/authApi';
import { useGetUserProfileQuery } from '../../../redux/userApi';
import { toast } from 'react-toastify';
import InlineOtpChange from './InlineOtpChange';

export default function ContactDetailsSection() {
  const { data: userProfileData, refetch } = useGetUserProfileQuery();
  const [sendPhoneOtp, { isLoading: isSendingPhone }] = useSendPhoneOtpMutation();
  const [verifyPhoneOtp, { isLoading: isVerifyingPhone }] = useVerifyPhoneOtpMutation();
  const [sendEmailChangeOtp, { isLoading: isSendingEmail }] = useSendEmailChangeOtpMutation();
  const [verifyEmailChangeOtp, { isLoading: isVerifyingEmail }] = useVerifyEmailChangeOtpMutation();

  const user = userProfileData?.user;

  const handleSendPhone = async (payload) => {
    try {
      await sendPhoneOtp(payload).unwrap();
      toast.success('OTP sent to new phone');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to send OTP');
      throw error;
    }
  };

  const handleVerifyPhone = async (payload) => {
    try {
      await verifyPhoneOtp(payload).unwrap();
      toast.success('Phone updated and verified!');
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to verify OTP');
      throw error;
    }
  };

  const handleSendEmail = async (payload) => {
    try {
      await sendEmailChangeOtp(payload).unwrap();
      toast.success('OTP sent to new email');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to send OTP');
      throw error;
    }
  };

  const handleVerifyEmail = async (payload) => {
    try {
      await verifyEmailChangeOtp(payload).unwrap();
      toast.success('Email updated and verified!');
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to verify OTP');
      throw error;
    }
  };

  return (
    <div className="auth-card p-6 sm:p-8 animate-fade-in-up" style={{ animationDelay: '120ms' }}>
      <h3 className="text-lg font-bold mb-1 flex items-center text-[var(--color-foreground)]">
        <svg className="w-5 h-5 mr-3 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Account Contact Details
      </h3>
      <p className="text-xs text-[var(--color-muted)] mb-5 ml-8">
        Update your login email or phone number. An OTP will verify every change.
      </p>

      <div className="space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-2 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Address
          </p>
          <InlineOtpChange
            type="email"
            currentValue={user?.email}
            isVerified={user?.isVerified}
            onSendOtp={handleSendEmail}
            onVerifyOtp={handleVerifyEmail}
            isSending={isSendingEmail}
            isVerifying={isVerifyingEmail}
          />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-2 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Phone Number
          </p>
          <InlineOtpChange
            type="phone"
            currentValue={user?.phone}
            isVerified={user?.isPhoneVerified}
            onSendOtp={handleSendPhone}
            onVerifyOtp={handleVerifyPhone}
            isSending={isSendingPhone}
            isVerifying={isVerifyingPhone}
          />
        </div>
      </div>
    </div>
  );
}
