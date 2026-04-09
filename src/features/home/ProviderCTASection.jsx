import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BadgeCheck, TrendingUp, Wallet, ArrowRight } from 'lucide-react'
import Button from "../../components/ui/Button"

const perks = [
  {
    icon: BadgeCheck,
    title: "Build your reputation",
    description: "Get verified, collect reviews and grow your client base"
  },
  {
    icon: TrendingUp,
    title: "Grow your business",
    description: "Access thousands of customers actively looking for your services"
  },
  {
    icon: Wallet,
    title: "Earn on your terms",
    description: "Set your own pricing, availability and service area"
  }
]

const ProviderCTASection = () => {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.auth)

  const handleProviderClick = () => {
    if (userData && userData.user?.role === "provider") {
      navigate('/provider/dashboard')
    } else if (userData) {
      navigate('/become-provider')
    } else {
      navigate('/signup')
    }
  }

  return (
    <section id="provider" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-linear-to-br from-blue-600 to-blue-700 rounded-3xl overflow-hidden">

          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />

          <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left — Text */}
              <div>
                <span className="inline-block px-4 py-1.5 bg-white/10 text-white/90 text-sm font-semibold rounded-full mb-6 border border-white/20">
                  For Service Providers
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Turn your skills into a{' '}
                  <span className="text-blue-200">
                    thriving business
                  </span>
                </h2>

                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                  Join hundreds of professionals already growing their business on UrbanServe. Get discovered, get booked, get paid.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleProviderClick}
                    className="inline-flex items-center justify-center gap-2 h-11 px-8 rounded-xl text-base font-medium bg-white text-blue-600 hover:bg-blue-50 transition-all duration-150 shadow-xl cursor-pointer"
                  >
                    Join as a Provider
                    <ArrowRight size={18} />
                  </button>
                  <button
                    onClick={() => navigate('/for-providers')}
                    className="inline-flex items-center justify-center gap-2 h-11 px-8 rounded-xl text-base font-medium text-white hover:bg-white/10 transition-all duration-150 cursor-pointer"
                  >
                    Learn More
                  </button>
                </div>
              </div>

              {/* Right — Perks */}
              <div className="space-y-4">
                {perks.map((perk) => {
                  const Icon = perk.icon
                  return (
                    <div
                      key={perk.title}
                      className="flex items-start gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-colors duration-200"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                        <Icon className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">{perk.title}</h3>
                        <p className="text-blue-100 text-sm leading-relaxed">{perk.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProviderCTASection