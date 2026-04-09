import { ArrowRight } from 'lucide-react'

export default function ForProvidersFinalCtaSection({ ctaLabel, onJoin }) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 md:py-20 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Start growing today</h2>
      <p className="text-gray-500 mb-8 max-w-lg mx-auto">
        Join the UrbanServe provider community and reach more customers than ever before.
      </p>
      <button
        onClick={onJoin}
        className="inline-flex items-center justify-center gap-2 h-12 px-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
      >
        {ctaLabel} <ArrowRight size={18} />
      </button>
    </section>
  )
}
