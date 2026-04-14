import { Lock } from "lucide-react";

export default function ChangePasswordSection({
  currentPassword,
  newPassword,
  confirmPassword,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  isUpdatingPassword,
  onUpdatePassword,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
        <div className="p-2 bg-amber-50 rounded-lg">
          <Lock className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
          <p className="text-sm text-gray-500">Update your password to keep your account secure</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="current-password" className="text-sm font-medium text-gray-700 block mb-1">
            Current Password
          </label>
          <div className="relative max-w-2xl">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(event) => onCurrentPasswordChange(event.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Enter current password"
              disabled={isUpdatingPassword}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="new-password" className="text-sm font-medium text-gray-700 block mb-1">
            New Password
          </label>
          <div className="relative max-w-2xl">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(event) => onNewPasswordChange(event.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Enter new password (min 8 characters)"
              disabled={isUpdatingPassword}
            />
          </div>
          <p className="text-xs text-gray-500">
            Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700 block mb-1">
            Confirm New Password
          </label>
          <div className="relative max-w-2xl">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) => onConfirmPasswordChange(event.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Confirm new password"
              disabled={isUpdatingPassword}
            />
          </div>
          {newPassword && confirmPassword && newPassword !== confirmPassword && (
            <p className="text-xs text-red-600 font-medium mt-1">Passwords do not match</p>
          )}
          {newPassword && confirmPassword && newPassword === confirmPassword && (
            <p className="text-xs text-green-600 font-medium mt-1">Passwords match </p>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onUpdatePassword}
          disabled={isUpdatingPassword}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center gap-2"
        >
          {isUpdatingPassword ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Updating...
            </>
          ) : (
            "Update Password"
          )}
        </button>
      </div>
    </div>
  );
}
