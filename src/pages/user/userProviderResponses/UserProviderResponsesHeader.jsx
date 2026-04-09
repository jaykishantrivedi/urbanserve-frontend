export default function UserProviderResponsesHeader({ onBack }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-gray-500 hover:text-blue-600 font-medium text-sm transition-colors">
          Back to Requests
        </button>
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Provider Quotes</h1>
      <p className="text-gray-500 mt-2 mb-8">
        Review the competing quotes from providers for your service enquiry and choose the best one.
      </p>
    </>
  )
}
