import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {
    useChangePasswordMutation,
    useLogoutMutation,
    useSendEmailChangeOtpMutation,
    useSendPhoneOtpMutation,
    useVerifyEmailChangeOtpMutation,
    useVerifyPhoneOtpMutation,
} from "../../redux/authApi"
import { logout as logoutAction } from "../../redux/authSlice"
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "../../redux/userApi"
import { uploadToCloudinary } from "../../utils/cloudinary"
import ProfileAccountTab from "./profile/ProfileAccountTab"
import ProfileEditTab from "./profile/ProfileEditTab"
import ProfilePageLoading from "./profile/ProfilePageLoading"
import ProfileOverviewTab from "./profile/ProfileOverviewTab"
import ProfileSecurityTab from "./profile/ProfileSecurityTab"
import ProfileTabsNav from "./profile/ProfileTabsNav"

const ProfilePage = () => {
    const dispatch = useDispatch()
    const { data, isLoading, refetch } = useGetUserProfileQuery()
    const [updateProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation()
    const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation()
    const [sendPhoneOtp, { isLoading: isSendingPhoneOtp }] = useSendPhoneOtpMutation()
    const [verifyPhoneOtp, { isLoading: isVerifyingPhoneOtp }] = useVerifyPhoneOtpMutation()
    const [sendEmailChangeOtp, { isLoading: isSendingEmailOtp }] = useSendEmailChangeOtpMutation()
    const [verifyEmailChangeOtp, { isLoading: isVerifyingEmailOtp }] = useVerifyEmailChangeOtpMutation()
    const [logoutApi] = useLogoutMutation()

    const [activeTab, setActiveTab] = useState("overview")
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
    const [editForm, setEditForm] = useState({ name: "", address: "", city: "" })
    const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmNewPassword: "" })
    const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false })
    const fileInputRef = useRef(null)

    const user = data?.user
    const stats = data?.stats

    useEffect(() => {
        if (user) {
            setEditForm({
                name: user.name || "",
                address: user.address || "",
                city: user.city || "",
            })
        }
    }, [user])

    const handleEditSubmit = async (event) => {
        event.preventDefault()
        try {
            await updateProfile(editForm).unwrap()
            toast.success("Profile updated successfully")
            refetch()
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update profile")
        }
    }

    const handlePasswordSubmit = async (event) => {
        event.preventDefault()
        if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
            toast.error("New passwords do not match")
            return
        }
        try {
            await changePassword(passwordForm).unwrap()
            toast.success("Password changed successfully")
            setPasswordForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" })
        } catch (error) {
            toast.error(error?.data?.message || "Failed to change password")
        }
    }

    const handleLogout = async () => {
        try {
            await logoutApi().unwrap()
            dispatch(logoutAction())
            window.location.href = "/"
        } catch {
            toast.error("Logout failed")
        }
    }

    const handleSendPhoneOtp = async (payload) => {
        try {
            await sendPhoneOtp(payload).unwrap()
            toast.success("OTP sent to your new mobile number")
        } catch (error) {
            toast.error(error?.data?.message || "Failed to send OTP")
            throw error
        }
    }

    const handleVerifyPhoneOtp = async (payload) => {
        try {
            await verifyPhoneOtp(payload).unwrap()
            toast.success("Mobile number updated and verified!")
            refetch()
        } catch (error) {
            toast.error(error?.data?.message || "Failed to verify OTP")
            throw error
        }
    }

    const handleSendEmailOtp = async (payload) => {
        try {
            await sendEmailChangeOtp(payload).unwrap()
            toast.success("OTP sent to your new email address")
        } catch (error) {
            toast.error(error?.data?.message || "Failed to send OTP")
            throw error
        }
    }

    const handleVerifyEmailOtp = async (payload) => {
        try {
            await verifyEmailChangeOtp(payload).unwrap()
            toast.success("Email updated and verified!")
            refetch()
        } catch (error) {
            toast.error(error?.data?.message || "Failed to verify OTP")
            throw error
        }
    }

    const handleImageUpload = async (event) => {
        const file = event.target.files?.[0]
        if (!file) return
        setIsUploadingPhoto(true)
        try {
            const url = await uploadToCloudinary(file, "LocalEase/Profiles")
            await updateProfile({ pfpUrl: url }).unwrap()
            toast.success("Profile photo updated successfully")
            refetch()
        } catch (error) {
            toast.error(error.message || "Failed to upload photo")
        } finally {
            setIsUploadingPhoto(false)
        }
    }

    if (isLoading) {
        return <ProfilePageLoading />
    }

    return (
        <div className="min-h-screen bg-[var(--color-background-light)] pt-[var(--height-navbar)] pb-12">
            <div className="max-w-5xl mx-auto px-4">
                <ProfileTabsNav activeTab={activeTab} onTabChange={setActiveTab} />

                <div className="space-y-6">
                    {activeTab === "overview" && (
                        <ProfileOverviewTab user={user} stats={stats} onEditProfile={() => setActiveTab("edit")} />
                    )}

                    {activeTab === "edit" && (
                        <ProfileEditTab
                            user={user}
                            editForm={editForm}
                            setEditForm={setEditForm}
                            handleEditSubmit={handleEditSubmit}
                            isUpdating={isUpdating}
                            fileInputRef={fileInputRef}
                            handleImageUpload={handleImageUpload}
                            isUploadingPhoto={isUploadingPhoto}
                            handleSendPhoneOtp={handleSendPhoneOtp}
                            handleVerifyPhoneOtp={handleVerifyPhoneOtp}
                            isSendingPhoneOtp={isSendingPhoneOtp}
                            isVerifyingPhoneOtp={isVerifyingPhoneOtp}
                            handleSendEmailOtp={handleSendEmailOtp}
                            handleVerifyEmailOtp={handleVerifyEmailOtp}
                            isSendingEmailOtp={isSendingEmailOtp}
                            isVerifyingEmailOtp={isVerifyingEmailOtp}
                        />
                    )}

                    {activeTab === "security" && (
                        <ProfileSecurityTab
                            user={user}
                            onGoToEdit={() => setActiveTab("edit")}
                            passwordForm={passwordForm}
                            setPasswordForm={setPasswordForm}
                            handlePasswordSubmit={handlePasswordSubmit}
                            isChangingPassword={isChangingPassword}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />
                    )}

                    {activeTab === "account" && <ProfileAccountTab onLogout={handleLogout} />}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
