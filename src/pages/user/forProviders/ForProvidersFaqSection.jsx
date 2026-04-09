import ForProvidersFAQItem from './ForProvidersFAQItem'

export default function ForProvidersFaqSection({ faqs }) {
  return (
    <section className="bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Frequently asked questions</h2>
          <p className="text-gray-500 text-sm">
            Still have questions? Email us at{' '}
            <a
              href="https://mail.google.com/mail/?view=cm&to=support@urbanserve.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              support@urbanserve.com
            </a>
          </p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <ForProvidersFAQItem key={faq.q} {...faq} />
          ))}
        </div>
      </div>
    </section>
  )
}
