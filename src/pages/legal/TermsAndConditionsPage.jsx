import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FileText, Mail } from "lucide-react"

const sections = [
  { id: "introduction", number: 1, title: "Introduction" },
  { id: "about", number: 2, title: "About UrbanServe" },
  { id: "eligibility", number: 3, title: "Eligibility" },
  { id: "accounts", number: 4, title: "User Accounts" },
  { id: "providers", number: 5, title: "Service Providers" },
  { id: "bookings", number: 6, title: "Bookings" },
  { id: "payments", number: 7, title: "Payments" },
  { id: "cancellations", number: 8, title: "Cancellations & Refunds" },
  { id: "reviews", number: 9, title: "Reviews & Feedback" },
  { id: "prohibited", number: 10, title: "Prohibited Activities" },
  { id: "notifications", number: 11, title: "Notifications" },
  { id: "ip", number: 12, title: "Intellectual Property" },
  { id: "liability", number: 13, title: "Limitation of Liability" },
  { id: "disclaimer", number: 14, title: "Disclaimer" },
  { id: "suspension", number: 15, title: "Account Suspension & Termination" },
  { id: "modifications", number: 16, title: "Modifications to Terms" },
  { id: "third-party", number: 17, title: "Third-Party Services" },
  { id: "privacy", number: 18, title: "Privacy" },
  { id: "governing-law", number: 19, title: "Governing Law" },
  { id: "contact", number: 20, title: "Contact Us" },
]

const SectionHeading = ({ id, number, title }) => (
  <h2 id={id} className="text-xl font-bold text-gray-900 pt-8 pb-3 scroll-mt-24">
    {number}. {title}
  </h2>
)

const Paragraph = ({ children }) => (
  <p className="text-gray-500 leading-7 mb-4">{children}</p>
)

const BulletList = ({ items }) => (
  <ul className="list-disc list-inside space-y-2 text-gray-500 leading-7 mb-4 ml-2">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
)

const Divider = () => <div className="border-b border-gray-100 my-2" />

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState("introduction")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) setActiveSection(visible[0].target.id)
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0.1 }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-4"
          >
            <div className="p-3 rounded-xl bg-indigo-50">
              <FileText className="w-7 h-7 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Terms &amp; Conditions
              </h1>
              <p className="text-gray-500 mt-2 text-sm">Last Updated: April 1, 2026</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 py-10 flex gap-10">

        {/* Sidebar TOC — desktop only */}
        <aside className="hidden lg:block w-56 shrink-0">
          <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Table of Contents
            </p>
            <ul className="space-y-1">
              {sections.map(({ id, number, title }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`block text-sm py-1.5 px-3 rounded-md transition-colors ${activeSection === id
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                  >
                    {number}. {title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="min-w-0 flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12"
        >
          <SectionHeading id="introduction" number={1} title="Introduction" />
          <Paragraph>Welcome to UrbanServe ("Platform", "we", "our", "us"). These Terms and Conditions govern your use of our platform, including our website and related services.</Paragraph>
          <Paragraph>By accessing or using UrbanServe, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our services.</Paragraph>
          <Divider />

          <SectionHeading id="about" number={2} title="About UrbanServe" />
          <Paragraph>UrbanServe is a local service management platform that connects users with service providers. We act as an intermediary platform and do not directly provide services.</Paragraph>
          <Paragraph>All services listed on the platform are provided by independent third-party service providers.</Paragraph>
          <Divider />

          <SectionHeading id="eligibility" number={3} title="Eligibility" />
          <Paragraph>To use UrbanServe, you must:</Paragraph>
          <BulletList items={["Be at least 18 years old", "Provide accurate and complete information", "Comply with all applicable laws and regulations"]} />
          <Paragraph>We reserve the right to suspend or terminate accounts that do not meet these requirements.</Paragraph>
          <Divider />

          <SectionHeading id="accounts" number={4} title="User Accounts" />
          <Paragraph>To access certain features, you must create an account. You agree to:</Paragraph>
          <BulletList items={["Maintain the confidentiality of your login credentials", "Be responsible for all activities under your account", "Notify us immediately of any unauthorized access"]} />
          <Paragraph>We are not responsible for any loss resulting from unauthorized use of your account.</Paragraph>
          <Divider />

          <SectionHeading id="providers" number={5} title="Service Providers" />
          <Paragraph>Service providers listed on UrbanServe are independent individuals or businesses. They are responsible for:</Paragraph>
          <BulletList items={["Delivering services professionally", "Maintaining quality and safety", "Complying with applicable laws"]} />
          <Paragraph>UrbanServe does not guarantee the quality, safety, or legality of services provided by third-party providers.</Paragraph>
          <Divider />

          <SectionHeading id="bookings" number={6} title="Bookings" />
          <BulletList items={["Users can request services through the platform", "Service providers may accept or reject requests", "A booking is confirmed only after mutual agreement"]} />
          <Paragraph>UrbanServe reserves the right to cancel or modify bookings in certain situations.</Paragraph>
          <Divider />

          <SectionHeading id="payments" number={7} title="Payments" />
          <BulletList items={["Payments may be processed through third-party payment gateways", "Users agree to pay all applicable charges for services", "UrbanServe may charge a commission on transactions"]} />
          <Paragraph>We do not store sensitive payment information such as card details.</Paragraph>
          <Divider />

          <SectionHeading id="cancellations" number={8} title="Cancellations & Refunds" />
          <BulletList items={["Cancellation policies may vary depending on the service provider", "Refunds, if applicable, are subject to the provider's policy", "UrbanServe may assist in resolving disputes but is not responsible for refund decisions"]} />
          <Divider />

          <SectionHeading id="reviews" number={9} title="Reviews & Feedback" />
          <Paragraph>Users may submit reviews and ratings after completing a service. You agree that:</Paragraph>
          <BulletList items={["Reviews must be honest and respectful", "You will not post abusive, defamatory, or misleading content"]} />
          <Paragraph>UrbanServe reserves the right to remove any content that violates these guidelines.</Paragraph>
          <Divider />

          <SectionHeading id="prohibited" number={10} title="Prohibited Activities" />
          <Paragraph>You agree NOT to:</Paragraph>
          <BulletList items={["Use the platform for illegal purposes", "Post false or misleading information", "Attempt to hack, disrupt, or damage the platform", "Harass or abuse other users or service providers", "Engage in fraudulent activities"]} />
          <Paragraph>Violation of these rules may result in account suspension or termination.</Paragraph>
          <Divider />

          <SectionHeading id="notifications" number={11} title="Notifications" />
          <Paragraph>UrbanServe may send notifications related to:</Paragraph>
          <BulletList items={["Bookings", "Payments", "Account updates", "System alerts"]} />
          <Paragraph>These notifications are system-generated and for informational purposes only.</Paragraph>
          <Divider />

          <SectionHeading id="ip" number={12} title="Intellectual Property" />
          <Paragraph>All content on UrbanServe, including logos, design, and software, is the property of UrbanServe or its licensors.</Paragraph>
          <Paragraph>You may not copy, modify, or distribute any part of the platform without prior written permission.</Paragraph>
          <Divider />

          <SectionHeading id="liability" number={13} title="Limitation of Liability" />
          <Paragraph>To the maximum extent permitted by law:</Paragraph>
          <BulletList items={["UrbanServe is not liable for any damages arising from the use of the platform", "We are not responsible for disputes between users and service providers", "We do not guarantee uninterrupted or error-free service"]} />
          <Divider />

          <SectionHeading id="disclaimer" number={14} title="Disclaimer" />
          <Paragraph>UrbanServe is provided on an "as is" and "as available" basis. We do not make any warranties regarding:</Paragraph>
          <BulletList items={["Service quality", "Accuracy of information", "Availability of services"]} />
          <Divider />

          <SectionHeading id="suspension" number={15} title="Account Suspension & Termination" />
          <Paragraph>We reserve the right to suspend or terminate your account if:</Paragraph>
          <BulletList items={["You violate these Terms", "You engage in suspicious or fraudulent activity", "You misuse the platform"]} />
          <Paragraph>Termination may occur without prior notice.</Paragraph>
          <Divider />

          <SectionHeading id="modifications" number={16} title="Modifications to Terms" />
          <Paragraph>We may update or modify these Terms at any time.</Paragraph>
          <Paragraph>Continued use of the platform after changes implies acceptance of the updated Terms.</Paragraph>
          <Divider />

          <SectionHeading id="third-party" number={17} title="Third-Party Services" />
          <Paragraph>UrbanServe integrates with third-party services such as:</Paragraph>
          <BulletList items={["Payment gateways", "Authentication providers (e.g., Firebase)", "Email services (e.g., Nodemailer)"]} />
          <Paragraph>We are not responsible for the practices or policies of third-party services.</Paragraph>
          <Divider />

          <SectionHeading id="privacy" number={18} title="Privacy" />
          <Paragraph>Your use of UrbanServe is also governed by our Privacy Policy, which explains how we collect and use your data.</Paragraph>
          <Divider />

          <SectionHeading id="governing-law" number={19} title="Governing Law" />
          <Paragraph>These Terms shall be governed by and interpreted in accordance with the laws of your country/region.</Paragraph>
          <Divider />

          <SectionHeading id="contact" number={20} title="Contact Us" />
          <Paragraph>If you have any questions about these Terms, you can contact us at:</Paragraph>
          <div className="flex items-center gap-2 text-indigo-700 bg-indigo-50 px-4 py-3 rounded-lg w-fit border border-indigo-100">
            <Mail className="w-4 h-4" />
            <span className="font-medium text-sm">support@urbanserve.com</span>
          </div>

          <div className="h-20" />
        </motion.article>
      </div>
    </div>
  )
}
