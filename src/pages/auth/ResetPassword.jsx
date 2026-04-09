import { useState } from "react"
import { useResetPasswordMutation } from "../../redux/authApi"
import { useNavigate, Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import eyeOpen1 from "../../assets/eyeOpen1.svg"
import eyeClose1 from "../../assets/eyeClose1.svg"

const ResetPassword = () => {

    const [resetPassword, { isLoading }] = useResetPasswordMutation()
    const navigate = useNavigate()

    const {token} = useParams()

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match. Enter correct confirm Password!")
            return
        }

        try {
            const res = await resetPassword({ token, newPassword }).unwrap()

            toast.success("Password reset successful. Please login using new password.")
            navigate("/signin")
        } catch (error) {
            toast.error(error?.data?.message || error.error || "Something went wrong!")
        }
    }

    return (
        <div className="bg-slate-200 min-h-screen flex items-center justify-center px-4">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-md p-8">
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                    Reset your password
                </h2>

                <p className="text-sm text-gray-500 text-center mt-2 mb-8">
                    Create a new password to regain access to your account.
                </p>

                <form onSubmit={handleSubmit}>
                    {/* New Password */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="">New password</label>
                        <div className="relative">
                            <input
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition placeholder-gray-400 text-gray-700 text-sm bg-white focus:border-transparent"
                                type={showPassword ? "text" : "password"}
                                placeholder="Choose a strong password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required />
                            <button
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 hover:cursor-pointer transition-all"
                                onClick={() => setShowPassword(!showPassword)}
                                type="button">
                                <img
                                    className="h-5 w-5"
                                    src={showPassword ? eyeClose1 : eyeOpen1}
                                    alt="toggle-password" />
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="">Confirm password</label>
                        <div className="relative">
                            <input
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition placeholder-gray-400 text-gray-700 text-sm bg-white focus:border-transparent"
                                type={showPassword ? "text" : "password"}
                                placeholder="Choose a strong password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required />
                            <button
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 hover:cursor-pointer transition-all"
                                onClick={() => setShowPassword(!showPassword)}
                                type="button">
                                <img
                                    className="h-5 w-5"
                                    src={showPassword ? eyeClose1 : eyeOpen1}
                                    alt="toggle-password" />
                            </button>
                        </div>

                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all disabled:opacity-60"
                    >
                        {isLoading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-500 mt-6">
                    Remember your password?{" "}
                    <Link
                        to="/signin"
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </div>

        </div>
    )
}

export default ResetPassword
