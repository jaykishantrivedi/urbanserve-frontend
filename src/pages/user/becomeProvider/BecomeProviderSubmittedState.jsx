import { CheckCircle } from "lucide-react"

export default function BecomeProviderSubmittedState() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-lg w-full text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="stroke-[2.5]" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Application Submitted!</h2>
        <p className="text-gray-500 leading-relaxed max-w-sm mb-6">
          Our team will review and verify your profile within 24 hours. You'll receive a notification once approved.
        </p>
        <button
          onClick={() => {
            window.location.href = "/"
          }}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  )
}
