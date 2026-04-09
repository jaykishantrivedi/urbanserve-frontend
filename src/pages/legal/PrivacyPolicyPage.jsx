import { useState, useEffect, useRef } from "react"
import { Shield, Mail, ChevronUp } from "lucide-react"

const sections = [
  { id: "introduction",        title: "Introduction",                  number: "1" },
  { id: "information-we-collect", title: "Information We Collect",    number: "2" },
  { id: "how-we-use",          title: "How We Use Your Information",   number: "3" },
  { id: "sharing",             title: "Sharing of Information",        number: "4" },
  { id: "data-security",       title: "Data Security",                 number: "5" },
  { id: "cookies",             title: "Cookies & Tracking",            number: "6" },
  { id: "user-rights",         title: "User Rights",                   number: "7" },
  { id: "data-retention",      title: "Data Retention",                number: "8" },
  { id: "third-party",         title: "Third-Party Services",          number: "9" },
  { id: "children",            title: "Children's Privacy",            number: "10" },
  { id: "international",       title: "International Data Transfers",  number: "11" },
  { id: "changes",             title: "Changes to This Policy",        number: "12" },
  { id: "liability",           title: "Limitation of Liability",       number: "13" },
  { id: "contact",             title: "Contact Us",                    number: "14" },
]

// ─── Sub-components ──────────────────────────────────────────────────────────
const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-28">
    <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">{title}</h2>
    <div className="space-y-3 text-gray-600 leading-relaxed">{children}</div>
  </section>
)

const Subsection = ({ title, children }) => (
  <div className="mt-4">
    <h3 className="text-sm font-semibold text-gray-800 mb-2">{title}</h3>
    {children}
  </div>
)

const BulletList = ({ items }) => (
  <ul className="space-y-1.5 ml-1">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2.5 text-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 mt-2 shrink-0" />
        {item}
      </li>
    ))}
  </ul>
)

const Callout = ({ children, variant = "info" }) => (
  <div className={`mt-4 rounded-xl px-5 py-4 text-sm border ${
    variant === "warning"
      ? "bg-red-50 border-red-100 text-gray-800"
      : "bg-indigo-50 border-indigo-100 text-gray-800"
  }`}>
    {children}
  </div>
)

// ─── Page ────────────────────────────────────────────────────────────────────
export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("introduction")
  const [showScrollTop, setShowScrollTop]   = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)

      const offsets = sections.map(({ id }) => {
        const el = document.getElementById(id)
        return { id, top: el ? el.getBoundingClientRect().top : Infinity }
      })
      const active = offsets.reduce(
        (closest, curr) => (curr.top <= 120 && curr.top > closest.top ? curr : closest),
        { id: "introduction", top: -Infinity }
      )
      setActiveSection(active.id)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50">
            <Shield className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Privacy Policy</h1>
            <p className="text-xs text-gray-400">Last Updated: April 1, 2026</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10 flex gap-10">
        {/* Sidebar */}
        <nav className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Table of Contents</p>
            <ul className="space-y-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => scrollTo(s.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      activeSection === s.id
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-xs opacity-50 mr-2">{s.number}.</span>
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Content */}
        <main ref={contentRef} className="flex-1 min-w-0 max-w-3xl">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12 space-y-12">

            <Section id="introduction" title="1. Introduction">
              <p>Welcome to <strong>UrbanServe</strong> ("Platform", "we", "our", "us"). We value your privacy and are committed to protecting your personal information.</p>
              <p>This Privacy Policy explains how we collect, use, store, and protect your data when you use our platform.</p>
              <p>By using UrbanServe, you agree to the practices described in this policy.</p>
            </Section>

            <Section id="information-we-collect" title="2. Information We Collect">
              <p>We collect the following types of information:</p>
              <Subsection title="2.1 Personal Information">
                <BulletList items={["Name", "Email address", "Phone number", "Profile information", "Location (if shared)"]} />
              </Subsection>
              <Subsection title="2.2 Account Information">
                <BulletList items={["Login credentials (encrypted)", "Authentication details (including Google Auth via Firebase)"]} />
              </Subsection>
              <Subsection title="2.3 Usage Data">
                <BulletList items={["Services you browse or book", "Interaction history", "Device and browser information", "IP address"]} />
              </Subsection>
              <Subsection title="2.4 Transaction Data">
                <BulletList items={["Booking details", "Payment status", "Transaction history"]} />
              </Subsection>
              <Callout>We do <strong>NOT</strong> store sensitive payment details like card numbers.</Callout>
            </Section>

            <Section id="how-we-use" title="3. How We Use Your Information">
              <p>We use your information to:</p>
              <BulletList items={[
                "Provide and manage services",
                "Process bookings and payments",
                "Facilitate communication between users and providers",
                "Send notifications and updates",
                "Improve platform performance and user experience",
                "Ensure security and prevent fraud",
              ]} />
            </Section>

            <Section id="sharing" title="4. Sharing of Information">
              <p>We may share your information with:</p>
              <Subsection title="4.1 Service Providers">
                <p>To complete bookings and service requests.</p>
              </Subsection>
              <Subsection title="4.2 Payment Gateways">
                <p>To process transactions securely.</p>
              </Subsection>
              <Subsection title="4.3 Third-Party Services">
                <BulletList items={[
                  "Authentication providers (e.g., Firebase for Google login)",
                  "Email services (e.g., Nodemailer)",
                ]} />
              </Subsection>
              <Callout variant="warning">We do <strong>NOT</strong> sell or rent your personal data to third parties.</Callout>
            </Section>

            <Section id="data-security" title="5. Data Security">
              <p>We take appropriate security measures to protect your data, including:</p>
              <BulletList items={[
                "Encryption of sensitive information",
                "Secure authentication systems (JWT, Firebase)",
                "Controlled access to data",
              ]} />
              <p className="text-gray-400 text-sm mt-3">However, no system is 100% secure, and we cannot guarantee absolute security.</p>
            </Section>

            <Section id="cookies" title="6. Cookies & Tracking Technologies">
              <p>We may use cookies and similar technologies to:</p>
              <BulletList items={[
                "Improve user experience",
                "Remember user preferences",
                "Analyze platform usage",
              ]} />
              <p>You can control or disable cookies through your browser settings.</p>
            </Section>

            <Section id="user-rights" title="7. User Rights">
              <p>You have the right to:</p>
              <BulletList items={[
                "Access your personal data",
                "Update or correct your information",
                "Request deletion of your account and data",
                "Withdraw consent (where applicable)",
              ]} />
              <p>To exercise these rights, contact us at the email provided below.</p>
            </Section>

            <Section id="data-retention" title="8. Data Retention">
              <p>We retain your information only as long as necessary to:</p>
              <BulletList items={[
                "Provide services",
                "Comply with legal obligations",
                "Resolve disputes",
              ]} />
              <p>After that, your data may be securely deleted.</p>
            </Section>

            <Section id="third-party" title="9. Third-Party Services">
              <p>UrbanServe uses third-party services, including:</p>
              <BulletList items={[
                "Firebase – for Google authentication",
                "Nodemailer – for email communication",
                "Razorpay – for payment processing",
                "Twilio (optional) – for SMS services",
              ]} />
              <p>These services have their own privacy policies, and we encourage you to review them.</p>
            </Section>

            <Section id="children" title="10. Children's Privacy">
              <p>UrbanServe is not intended for individuals under the age of 18.</p>
              <p>We do not knowingly collect personal information from children.</p>
            </Section>

            <Section id="international" title="11. International Data Transfers">
              <p>Your data may be stored or processed in servers located outside your country. By using our platform, you consent to such transfers.</p>
            </Section>

            <Section id="changes" title="12. Changes to This Privacy Policy">
              <p>We may update this Privacy Policy from time to time.</p>
              <p>Any changes will be posted on this page with an updated "Last Updated" date.</p>
            </Section>

            <Section id="liability" title="13. Limitation of Liability">
              <p>UrbanServe is not responsible for:</p>
              <BulletList items={[
                "Data breaches caused by third-party services",
                "Misuse of information by service providers",
                "Loss or unauthorized access beyond our control",
              ]} />
            </Section>

            <Section id="contact" title="14. Contact Us">
              <p>If you have any questions or concerns about this Privacy Policy, please contact us:</p>
              <div className="mt-4 flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-4 border border-gray-100">
                <Mail className="w-5 h-5 text-indigo-600 shrink-0" />
                <a href="mailto:support@urbanserve.com" className="text-indigo-600 font-medium hover:underline">
                  support@urbanserve.com
                </a>
              </div>
            </Section>

          </div>
        </main>
      </div>

      {/* Scroll-to-top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-11 h-11 rounded-full bg-indigo-600 text-white shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-all z-30"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
