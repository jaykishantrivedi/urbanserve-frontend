import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { benefits, faqs, requirements, steps } from './forProviders/forProvidersData'
import ForProvidersHeroSection from './forProviders/ForProvidersHeroSection'
import ForProvidersBenefitsSection from './forProviders/ForProvidersBenefitsSection'
import ForProvidersStepsSection from './forProviders/ForProvidersStepsSection'
import ForProvidersRequirementsSection from './forProviders/ForProvidersRequirementsSection'
import ForProvidersFaqSection from './forProviders/ForProvidersFaqSection'
import ForProvidersFinalCtaSection from './forProviders/ForProvidersFinalCtaSection'

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function ForProvidersPage() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.auth)

  const handleJoin = () => {
    if (userData?.user?.role === 'provider') navigate('/provider/dashboard')
    else if (userData) navigate('/become-provider')
    else navigate('/signup')
  }

  const ctaLabel = userData?.user?.role === 'provider'
    ? 'Go to Dashboard'
    : userData ? 'Complete Your Profile' : 'Get Started — It\'s Free'

  return (
    <div className="min-h-screen bg-white">
      <ForProvidersHeroSection ctaLabel={ctaLabel} onJoin={handleJoin} />

      <ForProvidersBenefitsSection benefits={benefits} />

      <ForProvidersStepsSection steps={steps} />

      <ForProvidersRequirementsSection requirements={requirements} ctaLabel={ctaLabel} onJoin={handleJoin} />

      <ForProvidersFaqSection faqs={faqs} />

      <ForProvidersFinalCtaSection ctaLabel={ctaLabel} onJoin={handleJoin} />

    </div>
  )
}
