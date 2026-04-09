import { Search, Calendar, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Choose Service',
    description: 'Browse and select from our wide range of professional services',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Calendar,
    number: '02',
    title: 'Book Appointment',
    description: 'Pick your preferred date, time, and service provider',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: CheckCircle,
    number: '03',
    title: 'Get Work Done',
    description: 'Relax while our verified professionals complete the job',
    color: 'from-green-500 to-green-600',
  },
]

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get your work done in three simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

          {/* Connection Line (Desktop only) */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-linear-to-r from-blue-200 via-purple-200 to-green-200 -z-10" />

          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div key={step.number} className="relative">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">

                  {/* Number Badge */}
                  <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-linear-to-r ${step.color} text-white flex items-center justify-center font-bold text-lg shadow-lg`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-linear-to-r ${step.color} mb-6`}>
                    <Icon className="text-white" size={32} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>

                </div>

                {/* Mobile Connection Line */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center py-4">
                    <div className="w-0.5 h-8 bg-linear-to-b from-blue-200 to-purple-200" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default HowItWorksSection