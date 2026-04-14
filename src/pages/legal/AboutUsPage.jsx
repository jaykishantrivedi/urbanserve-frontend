import {
  Building2, Target, Rocket, Lightbulb, Shield, Globe, Users, Mail,
  Search, CalendarCheck, ClipboardList, BadgeCheck, CreditCard, Star, Bell,
  FileCheck, BarChart3, MessageSquare
} from "lucide-react"

//  Reusable sub-components 
const SectionTitle = ({ icon: Icon, children, center = false }) => (
  <div className={`flex items-center gap-3 mb-6 ${center ? "justify-center" : ""}`}>
    {Icon && <Icon className="w-7 h-7 text-indigo-600 shrink-0" />}
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{children}</h2>
  </div>
)

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="group rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6 text-indigo-600" />
    </div>
    <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
  </div>
)

const TeamCard = ({ name, role }) => (
  <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
    <div className="w-16 h-16 rounded-full bg-indigo-50 mx-auto mb-4 flex items-center justify-center">
      <Users className="w-7 h-7 text-indigo-600" />
    </div>
    <h3 className="font-semibold text-gray-900">{name}</h3>
    <p className="text-sm text-gray-500 mt-1">{role}</p>
  </div>
)

//  Page 
export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/*  Hero  */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-500">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-white/20">
            <Building2 className="w-4 h-4" />
            Our Story
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
            About UrbanServe
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            Connecting users with trusted local service providers — making everyday services simpler, faster, and more reliable.
          </p>
        </div>
      </section>

      {/*  Who We Are  */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <SectionTitle icon={Building2}>Who We Are</SectionTitle>
        <p className="text-gray-500 leading-relaxed max-w-3xl text-lg">
          UrbanServe is a modern local service platform designed to connect users with trusted and verified service providers.
          Our goal is to simplify everyday service needs by providing a seamless and reliable experience — from discovering
          the right professional to completing a booking in minutes.
        </p>
      </section>

      {/*  Our Mission  */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <SectionTitle icon={Target}>Our Mission</SectionTitle>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Search,  text: "Make local services easily accessible to everyone" },
              { icon: Shield,  text: "Ensure quality and trust between users and providers" },
              { icon: Rocket,  text: "Empower service providers with better opportunities" },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <item.icon className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-gray-700 font-medium leading-snug">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  What We Do  */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <SectionTitle icon={Rocket}>What We Do</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" /> For Users
            </h3>
            <ul className="space-y-4">
              {[
                { icon: Search,        text: "Discover various local services" },
                { icon: CalendarCheck, text: "Book trusted professionals" },
                { icon: ClipboardList, text: "Track and manage their bookings" },
              ].map((f) => (
                <li key={f.text} className="flex items-center gap-3 text-gray-500">
                  <f.icon className="w-5 h-5 text-indigo-500 shrink-0" />
                  {f.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" /> For Providers
            </h3>
            <ul className="space-y-4">
              {[
                { icon: BadgeCheck, text: "Register and get verified" },
                { icon: Lightbulb,  text: "Offer their services to nearby customers" },
                { icon: BarChart3,  text: "Manage bookings and grow their business" },
              ].map((f) => (
                <li key={f.text} className="flex items-center gap-3 text-gray-500">
                  <f.icon className="w-5 h-5 text-indigo-500 shrink-0" />
                  {f.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/*  Why Choose Us  */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <SectionTitle icon={Lightbulb}>Why Choose UrbanServe</SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={BadgeCheck}    title="Verified Providers"        description="All service providers go through a thorough verification process." />
            <FeatureCard icon={CalendarCheck} title="Easy Booking"              description="Book services in just a few taps with our streamlined process." />
            <FeatureCard icon={CreditCard}    title="Secure Payments"           description="Your transactions are protected with industry-grade security." />
            <FeatureCard icon={Star}          title="Reviews & Ratings"         description="Transparent feedback system to help you choose the best." />
            <FeatureCard icon={Bell}          title="Real-time Notifications"   description="Stay updated on bookings, confirmations, and more." />
            <FeatureCard icon={Shield}        title="Safety First"              description="We put safety at the core of every interaction on the platform." />
          </div>
        </div>
      </section>

      {/*  Trust & Safety  */}
      <section className="bg-indigo-50/60">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <SectionTitle icon={Shield}>Trust &amp; Safety</SectionTitle>
          <p className="text-gray-500 mb-8 text-lg max-w-3xl">
            We prioritize safety and reliability by:
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: FileCheck,      title: "Document Verification", desc: "Verifying provider documents for authenticity." },
              { icon: BarChart3,      title: "Quality Monitoring",    desc: "Continuously monitoring service quality standards." },
              { icon: MessageSquare,  title: "User Feedback",         desc: "Allowing user feedback and ratings to maintain trust." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm border border-indigo-100">
                <item.icon className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  Our Vision  */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20 text-center">
        <SectionTitle icon={Globe} center>Our Vision</SectionTitle>
        <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-3xl mx-auto font-medium">
          We aim to become a leading platform for local services, making everyday tasks easier and more efficient for users
          while supporting service providers in growing their businesses.
        </p>
      </section>

      {/*  Our Team  */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <SectionTitle icon={Users}>Our Team</SectionTitle>
          <p className="text-gray-500 mb-8 text-lg">
            UrbanServe is built by passionate developers focused on creating a modern and scalable service platform.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            <TeamCard name="Alex Johnson"  role="Founder & CEO" />
            <TeamCard name="Sarah Chen"    role="Lead Developer" />
            <TeamCard name="Mike Rivera"   role="Product Designer" />
            <TeamCard name="Priya Sharma"  role="Operations Lead" />
          </div>
        </div>
      </section>

      {/*  Contact  */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20 text-center">
        <SectionTitle icon={Mail} center>Contact Us</SectionTitle>
        <p className="text-gray-500 text-lg mb-6">Have questions or need support? We'd love to hear from you.</p>
        <a
          href="https://mail.google.com/mail/?view=cm&to=support@urbanserve.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-white font-semibold shadow-md shadow-indigo-500/25 transition-all"
        >
          <Mail className="w-5 h-5" />
          support@urbanserve.com
        </a>
      </section>

    </div>
  )
}
