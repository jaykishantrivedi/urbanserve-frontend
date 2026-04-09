export default function UserProviderResponsesLoadingState() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-16">
      <span className="animate-spin text-4xl mb-4 text-blue-500">🌀</span>
      <p className="text-gray-500 font-medium">Loading responses...</p>
    </div>
  )
}
