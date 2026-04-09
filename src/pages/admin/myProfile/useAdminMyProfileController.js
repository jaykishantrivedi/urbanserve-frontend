import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "../../../redux/userApi"
import {
    useChangePasswordMutation,
    useSendEmailChangeOtpMutation,
    useSendPhoneOtpMutation,
    useVerifyEmailChangeOtpMutation,
    useVerifyPhoneOtpMutation,
} from "../../../redux/authApi"
import { uploadToCloudinary } from "../../../utils/cloudinary"

export function useAdminMyProfileController() {
    const { data: profileData, isLoading, refetch } = useGetUserProfileQuery()

    const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateUserProfileMutation()
    const [changePassword, { isLoading: isUpdatingPassword }] = useChangePasswordMutation()
    const [sendPhoneOtp, { isLoading: isSendingPhoneOtp }] = useSendPhoneOtpMutation()
    const [verifyPhoneOtp, { isLoading: isVerifyingPhoneOtp }] = useVerifyPhoneOtpMutation()
    const [sendEmailChangeOtp, { isLoading: isSendingEmailOtp }] = useSendEmailChangeOtpMutation()
    const [verifyEmailChangeOtp, { isLoading: isVerifyingEmailOtp }] = useVerifyEmailChangeOtpMutation()

    const [name, setName] = useState("")
    const [isUploadingPfp, setIsUploadingPfp] = useState(false)
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
        if (profileData?.user) {
            setName(profileData.user.name || "")
        }
    }, [profileData])

    const user = profileData?.user
    const accountCreated = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"
    const lastLogin = user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Recently"

    const handleSaveProfile = async () => {
        if (!name.trim()) {
            toast.error("Name is required!")
            return
        }

        try {
            await updateProfile({ name }).unwrap()
            toast.success("Profile updated successfully!")
            refetch()
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update profile")
        }
    }

    const handlePfpUpload = async (event) => {
        const file = event.target.files?.[0]
        if (!file) return

        setIsUploadingPfp(true)
        try {
            const url = await uploadToCloudinary(file, "LocalEase/Profiles")
            await updateProfile({ pfpUrl: url }).unwrap()
            toast.success("Profile picture updated!")
            refetch()
        } catch (error) {
            toast.error(error?.message || error?.data?.message || "Upload failed")
        } finally {
            setIsUploadingPfp(false)
            event.target.value = ""
        }
    }

    const handleUpdatePassword = async () => {
        if (!currentPassword) {
            toast.error("Current password is required!")
            return
        }
        if (!newPassword) {
            toast.error("New password is required!")
            return
        }
        if (newPassword.length < 8) {
            toast.error("New password must be at least 8 characters!")
            return
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!")
            return
        }

        try {
            await changePassword({
                currentPassword,
                newPassword,
                confirmNewPassword: confirmPassword,
            }).unwrap()
            toast.success("Password updated successfully!")
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update password")
        }
    }

    const handleSendPhoneOtp = async (payload) => {
        try {
            await sendPhoneOtp(payload).unwrap()
            toast.success("OTP sent to your new phone number")
        } catch (error) {
            toast.error(error?.data?.message || "Failed to send OTP")
            throw error
        }
    }

    const handleVerifyPhoneOtp = async (payload) => {
        try {
            await verifyPhoneOtp(payload).unwrap()
            toast.success("Phone number updated and verified!")
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

    return {
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
    }
}
