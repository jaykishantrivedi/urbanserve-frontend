import { CheckCircle2, Eye, EyeOff, Lock, Mail, Phone } from "lucide-react"

export default function ProfileSecurityTab({
    user,
    onGoToEdit,
    passwordForm,
    setPasswordForm,
    handlePasswordSubmit,
    isChangingPassword,
    showPassword,
    setShowPassword,
}) {
    return (
        <div className="animate-fade-in-up space-y-6">
            <div className="auth-card p-6 md:p-8">
                <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-6">Verification Status</h3>
                <div className="space-y-4">
                    <div className={`p-4 rounded-xl border flex items-center justify-between ${user?.isVerified ? "border-green-200 bg-green-50/50" : "border-gray-200"}`}>
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${user?.isVerified ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-[var(--color-foreground)] text-sm">Email</p>
                                <p className="text-[var(--color-muted)] text-sm">{user?.email}</p>
                            </div>
                        </div>
                        {user?.isVerified ? (
                            <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                                Verified <CheckCircle2 className="w-4 h-4" />
                            </span>
                        ) : (
                            <button onClick={onGoToEdit} className="text-[var(--color-primary)] text-sm font-semibold hover:underline">
                                Verify
                            </button>
                        )}
                    </div>

                    <div className={`p-4 rounded-xl border flex items-center justify-between ${user?.isPhoneVerified ? "border-green-200 bg-green-50/50" : "border-gray-200"}`}>
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${user?.isPhoneVerified ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-[var(--color-foreground)] text-sm">Mobile</p>
                                <p className="text-[var(--color-muted)] text-sm">{user?.phone || "Not provided"}</p>
                            </div>
                        </div>
                        {user?.isPhoneVerified ? (
                            <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                                Verified <CheckCircle2 className="w-4 h-4" />
                            </span>
                        ) : (
                            <button onClick={onGoToEdit} className="text-[var(--color-primary)] text-sm font-semibold hover:underline">
                                Verify
                            </button>
                        )}
                    </div>
                </div>
                <p className="text-xs text-[var(--color-muted)] mt-4">
                    To update or re-verify your email or phone, go to the{" "}
                    <button className="text-[var(--color-primary)] font-semibold hover:underline" onClick={onGoToEdit}>
                        Edit Profile
                    </button>{" "}
                    tab.
                </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="auth-card p-6 md:p-8">
                <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-6">Change Password</h3>
                <div className="space-y-5">
                    <div className="relative">
                        <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">Current Password</label>
                        <input
                            type={showPassword.current ? "text" : "password"}
                            className="form-input"
                            required
                            value={passwordForm.currentPassword}
                            onChange={(event) => setPasswordForm({ ...passwordForm, currentPassword: event.target.value })}
                            placeholder="Enter current password"
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-10 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                        >
                            {showPassword.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">New Password</label>
                        <input
                            type={showPassword.new ? "text" : "password"}
                            className="form-input"
                            required
                            value={passwordForm.newPassword}
                            onChange={(event) => setPasswordForm({ ...passwordForm, newPassword: event.target.value })}
                            placeholder="Enter new password"
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-10 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                        >
                            {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">Confirm New Password</label>
                        <input
                            type={showPassword.confirm ? "text" : "password"}
                            className="form-input"
                            required
                            value={passwordForm.confirmNewPassword}
                            onChange={(event) => setPasswordForm({ ...passwordForm, confirmNewPassword: event.target.value })}
                            placeholder="Confirm new password"
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-10 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                        >
                            {showPassword.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                <div className="mt-8">
                    <button type="submit" disabled={isChangingPassword} className="btn-primary w-full md:w-auto md:px-8">
                        <Lock className="w-4 h-4" />
                        {isChangingPassword ? "Updating Password..." : "Update Password"}
                    </button>
                </div>
            </form>
        </div>
    )
}
