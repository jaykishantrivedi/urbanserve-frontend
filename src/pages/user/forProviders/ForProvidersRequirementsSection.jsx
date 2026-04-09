import { ArrowRight, FileCheck } from 'lucide-react'

export default function ForProvidersRequirementsSection({ requirements, ctaLabel, onJoin }) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">What you'll need</h2>
          <p className="text-gray-500 mb-6">Basic requirements to get verified and start receiving bookings.</p>
          <ul className="space-y-3">
            {requirements.map((req) => (
              <li key={req} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <FileCheck className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
          <h3 className="font-bold text-gray-900 text-lg mb-2">Ready to join?</h3>
          <p className="text-gray-500 text-sm mb-6">
            Create your provider profile in minutes. Our team will verify your documents and get you live quickly.
          </p>
          <button
            onClick={onJoin}
            className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-md shadow-blue-500/25 cursor-pointer"
          >
            {ctaLabel} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
