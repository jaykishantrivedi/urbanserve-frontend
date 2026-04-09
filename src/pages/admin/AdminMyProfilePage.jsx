import AccountInformationSection from "./myProfile/AccountInformationSection"
import ChangePasswordSection from "./myProfile/ChangePasswordSection"
import ContactDetailsSection from "./myProfile/ContactDetailsSection"
import EditProfileSection from "./myProfile/EditProfileSection"
import ProfileOverviewCard from "./myProfile/ProfileOverviewCard"
import ProfilePageHeader from "./myProfile/ProfilePageHeader"
import { useAdminMyProfileController } from "./myProfile/useAdminMyProfileController"

export default function AdminMyProfilePage() {
  const {
    isLoading,
    user,
    accountCreated,
    lastLogin,
    name,
    setName,
    isUploadingPfp,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isUpdatingProfile,
    isUpdatingPassword,
    isSendingPhoneOtp,
    isVerifyingPhoneOtp,
    isSendingEmailOtp,
    isVerifyingEmailOtp,
    handleSaveProfile,
    handlePfpUpload,
    handleUpdatePassword,
    handleSendPhoneOtp,
    handleVerifyPhoneOtp,
    handleSendEmailOtp,
    handleVerifyEmailOtp,
  } = useAdminMyProfileController()

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <ProfilePageHeader />

      <ProfileOverviewCard
        user={user}
        name={name}
        isUploadingPfp={isUploadingPfp}
        onPfpUpload={handlePfpUpload}
      />

      <EditProfileSection
        name={name}
        onNameChange={setName}
        isUpdatingProfile={isUpdatingProfile}
        onSaveProfile={handleSaveProfile}
      />

      <ContactDetailsSection
        user={user}
        onSendEmailOtp={handleSendEmailOtp}
        onVerifyEmailOtp={handleVerifyEmailOtp}
        onSendPhoneOtp={handleSendPhoneOtp}
        onVerifyPhoneOtp={handleVerifyPhoneOtp}
        isSendingEmailOtp={isSendingEmailOtp}
        isVerifyingEmailOtp={isVerifyingEmailOtp}
        isSendingPhoneOtp={isSendingPhoneOtp}
        isVerifyingPhoneOtp={isVerifyingPhoneOtp}
      />

      <ChangePasswordSection
        currentPassword={currentPassword}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        onCurrentPasswordChange={setCurrentPassword}
        onNewPasswordChange={setNewPassword}
        onConfirmPasswordChange={setConfirmPassword}
        isUpdatingPassword={isUpdatingPassword}
        onUpdatePassword={handleUpdatePassword}
      />

      <AccountInformationSection accountCreated={accountCreated} lastLogin={lastLogin} />
    </div>
  )
}
