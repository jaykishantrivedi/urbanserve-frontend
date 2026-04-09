import {
  BadgeCheck,
  TrendingUp,
  Wallet,
  Star,
  Bell,
  ClipboardList,
  UserPlus,
  ShieldCheck,
  Search,
  CalendarCheck,
  DollarSign,
} from 'lucide-react'

export const benefits = [
  { icon: BadgeCheck, title: 'Build your reputation', desc: 'Get verified, collect reviews and grow your client base on a platform users trust.' },
  { icon: TrendingUp, title: 'Grow your business', desc: 'Access thousands of customers actively looking for your exact services in your area.' },
  { icon: Wallet, title: 'Earn on your terms', desc: "Set your own pricing, availability and service radius. You're in full control." },
  { icon: Star, title: 'Reviews & ratings', desc: 'Transparent feedback system that lets you showcase your quality and build social proof.' },
  { icon: Bell, title: 'Real-time notifications', desc: 'Instant alerts for new booking requests so you never miss an opportunity.' },
  { icon: ClipboardList, title: 'Easy booking management', desc: 'Accept, track and close bookings - all from one clean dashboard.' },
]

export const steps = [
  { number: '01', icon: UserPlus, title: 'Create your provider profile', desc: 'Sign up or log in, then submit your business name, services, city, address and identity documents for verification.' },
  { number: '02', icon: ShieldCheck, title: 'Get verified by admin', desc: 'Our team reviews your documents and approves your profile, usually within 24 hours.' },
  { number: '03', icon: Search, title: 'Customers discover you', desc: 'Your services appear in search results when customers in your area look for what you offer.' },
  { number: '04', icon: CalendarCheck, title: 'Accept bookings & deliver', desc: 'Receive booking requests in real time, confirm them and deliver great service.' },
  { number: '05', icon: DollarSign, title: 'Get paid', desc: 'Payments are processed securely through the platform and reflected in your wallet.' },
]

export const requirements = [
  'Be at least 18 years old',
  'Have a valid government-issued ID',
  'Provide relevant certificates or proof of skill',
  'Maintain a wallet balance above the platform minimum to stay active',
  "Accept the platform's Terms of Service and Code of Conduct",
]

export const faqs = [
  { q: 'Is it free to join as a provider?', a: 'Yes, registration is completely free. The platform charges a small commission on completed bookings.' },
  { q: 'How long does verification take?', a: "Typically within 24-48 hours after you submit your documents. We'll notify you once approved." },
  { q: 'Can I set my own service area?', a: "Yes. You define the radius (in km) from your location that you're willing to serve." },
  { q: 'What happens if a booking is cancelled?', a: 'Cancellation policies are covered in the Terms of Service. Disputed cases are handled by our support team.' },
  { q: 'Can I offer multiple services?', a: "Absolutely. You can add as many services as you like across any categories you're qualified for." },
]
