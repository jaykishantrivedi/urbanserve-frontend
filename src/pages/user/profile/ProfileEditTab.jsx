import { Camera } from "lucide-react"
import ProfileInlineOtpChange from "./ProfileInlineOtpChange"

export default function ProfileEditTab({
    user,
    editForm,
    setEditForm,
    handleEditSubmit,
    isUpdating,
    fileInputRef,
    handleImageUpload,
    isUploadingPhoto,
    handleSendPhoneOtp,
    handleVerifyPhoneOtp,
    isSendingPhoneOtp,
    isVerifyingPhoneOtp,
    handleSendEmailOtp,
    handleVerifyEmailOtp,
    isSendingEmailOtp,
    isVerifyingEmailOtp,
}) {
    return (
        <div className="animate-fade-in-up space-y-6">
            <div className="auth-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                    <div
                        className="w-32 h-32 rounded-full border-2 border-dashed border-[var(--color-border)] flex flex-col items-center justify-center text-[var(--color-muted)] bg-gray-50 overflow-hidden cursor-pointer hover:border-[var(--color-primary)] transition"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {isUploadingPhoto ? (
                            <div className="flex flex-col items-center">
                                <span className="animate-pulse mb-2 text-gray-400">Loading</span>
                                <span className="text-xs font-semibold">Uploading...</span>
                            </div>
                        ) : user?.pfpUrl ? (
                            <img src={user.pfpUrl} alt="Upload" className="w-full h-full object-cover" />
                        ) : (
                            <>
                                <Camera className="w-8 h-8 mb-2 text-gray-400" />
                                <span className="text-xs font-semibold">Click / Drag</span>
                            </>
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/png, image/jpeg"
                        onChange={handleImageUpload}
                        disabled={isUploadingPhoto}
                    />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-2">Profile Photo</h3>
                    <p className="text-[var(--color-muted)] text-sm leading-relaxed max-w-md">
                        A profile photo helps providers recognise you when they arrive. Use a clear, well-lit photo. JPG or PNG, max 5 MB.
                    </p>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploadingPhoto}
                        className="mt-4 text-[var(--color-primary)] font-semibold text-sm hover:underline flex items-center gap-1 disabled:opacity-50"
                    >
                        {isUploadingPhoto ? "Uploading Photo..." : "Upload Photo"}
                    </button>
                </div>
            </div>

            <form onSubmit={handleEditSubmit} className="auth-card p-6 md:p-8">
                <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-6">Personal Details</h3>
                <div className="grid gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">Full Name</label>
                        <input
                            type="text"
                            className="form-input"
                            value={editForm.name}
                            onChange={(event) => setEditForm({ ...editForm, name: event.target.value })}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">City</label>
                            <input
                                type="text"
                                className="form-input"
                                value={editForm.city}
                                onChange={(event) => setEditForm({ ...editForm, city: event.target.value })}
                                placeholder="e.g. Navsari"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">Address</label>
                            <input
                                type="text"
                                className="form-input"
                                value={editForm.address}
                                onChange={(event) => setEditForm({ ...editForm, address: event.target.value })}
                                placeholder="Street address or area"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button type="submit" disabled={isUpdating} className="btn-primary md:w-auto px-8">
                        {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>

            <div className="auth-card p-6 md:p-8">
                <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-1">Contact Details</h3>
                <p className="text-sm text-[var(--color-muted)] mb-6">
                    Update your email or phone number. A one-time password (OTP) will be sent to verify any changes.
                </p>
                <div className="grid gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">Mobile Number</label>
                        <ProfileInlineOtpChange
                            type="phone"
                            currentValue={user?.phone}
                            isVerified={user?.isPhoneVerified}
                            onSendOtp={handleSendPhoneOtp}
                            onVerifyOtp={handleVerifyPhoneOtp}
                            isSending={isSendingPhoneOtp}
                            isVerifying={isVerifyingPhoneOtp}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">Email Address</label>
                        <ProfileInlineOtpChange
                            type="email"
                            currentValue={user?.email}
                            isVerified={user?.isVerified}
                            onSendOtp={handleSendEmailOtp}
                            onVerifyOtp={handleVerifyEmailOtp}
                            isSending={isSendingEmailOtp}
                            isVerifying={isVerifyingEmailOtp}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
