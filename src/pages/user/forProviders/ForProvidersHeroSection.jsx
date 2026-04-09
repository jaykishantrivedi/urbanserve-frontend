import { ArrowRight } from 'lucide-react'

export default function ForProvidersHeroSection({ ctaLabel, onJoin }) {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block px-4 py-1.5 bg-white/10 text-white/90 text-sm font-semibold rounded-full mb-6 border border-white/20">
          For Service Providers
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
          Turn your skills into a <span className="text-blue-200">thriving business</span>
        </h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          Join hundreds of professionals already growing their income on UrbanServe. Get discovered, get booked, get
          paid - on your terms.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onJoin}
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl text-base font-semibold bg-white text-blue-600 hover:bg-blue-50 transition-all shadow-xl cursor-pointer"
          >
            {ctaLabel}
            <ArrowRight size={18} />
          </button>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl text-base font-medium text-white border border-white/25 hover:bg-white/10 transition-all cursor-pointer"
          >
            See how it works
          </a>
        </div>
      </div>
    </section>
  )
}
