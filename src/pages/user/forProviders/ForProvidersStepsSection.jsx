export default function ForProvidersStepsSection({ steps }) {
  return (
    <section id="how-it-works" className="bg-gray-50 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">How it works</h2>
          <p className="text-gray-500 max-w-xl mx-auto">From sign-up to first booking in 5 simple steps.</p>
        </div>
        <div className="space-y-4">
          {steps.map(({ number, icon: Icon, title, desc }, i) => (
            <div key={number} className="flex items-start gap-5 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/25">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                {i < steps.length - 1 && <div className="w-px h-4 bg-blue-100" />}
              </div>
              <div className="pt-1">
                <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">Step {number}</span>
                <h3 className="font-semibold text-gray-900 mt-0.5 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
