import { useState } from "react"
import { useForgotPasswordMutation } from "../../redux/authApi"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const ForgotPassword = () => {

  const [forgetPassword, { isLoading }] = useForgotPasswordMutation()

  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await forgetPassword({ email }).unwrap()
      toast.success(`Reset Password link has been sent to ${email}`)
    } catch (error) {
      toast.error(error?.data?.message || error.error || "Something went wrong. Please try again later.")
    }
  }

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col justify-center items-center">
      <div className="mb-8 px-6">
        <p className="text-xl font-medium">Don't worry, we've got your back</p>
      </div>

      <form
        className="bg-white rounded-lg shadow-md p-10 w-full max-w-md"
        onSubmit={handleSubmit}>

        <div className="mt-5">
          <label
            className="block mb-3 text-sm font-semibold text-gray-700"
          >Email</label>

          <input
            type="email"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm text-gray-900 font-normal" placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-8 py-3 text-base font-medium bg-indigo-600 cursor-pointer rounded-lg text-white hover:bg-indigo-700 mb-5"
        >
          {isLoading ? "Sending reset link via Email" : "Reset Password"}
        </button>

        <div
          className="text-center">
          <Link
            to="/signin"
            className="mt-5 text-center text-base font-medium hover:text-indigo-600 cursor-pointer">
            Return to login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword
