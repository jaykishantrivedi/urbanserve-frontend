import { CheckCircle } from "lucide-react"

export default function BecomeProviderProgressBar({ steps, step }) {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200/60 shadow-sm px-4 py-4 sm:px-8">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        {steps.map((label, idx) => {
          const stepNum = idx + 1
          const isActive = step === stepNum
          const isCompleted = stepNum < step

          return (
            <div key={label} className="flex flex-col items-center flex-1 relative">
              {idx !== steps.length - 1 && (
                <div
                  className={`absolute top-[14px] left-[50%] right-[-50%] h-[2px] ${
                    isCompleted ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                />
              )}

              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold relative z-10 border-2 transition-colors duration-300
                    ${
                      isActive
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : isCompleted
                          ? "bg-white border-indigo-600 text-indigo-600"
                          : "bg-gray-100 border-gray-200 text-gray-400"
                    }
                  `}
              >
                {isCompleted ? <CheckCircle size={14} className="text-indigo-600" /> : stepNum}
              </div>
              <span
                className={`text-[11px] font-bold mt-2 hidden sm:block uppercase tracking-wider ${
                  isActive ? "text-indigo-600" : isCompleted ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
