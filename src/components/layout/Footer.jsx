import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const footerLinks = {
  company: [
    { name: 'About Us', to: '/about' },
    { name: 'Careers', href: '#careers' },
    { name: 'Blog', href: '#blog' },
  ],
  support: [
    { name: 'Privacy Policy', to: '/privacy' },
    { name: 'Terms of Service', to: '/terms' },
  ],
  services: [
    { name: 'For Customers', href: '#customers' },
    { name: 'For Providers', href: '#providers' },
    { name: 'Pricing', href: '#pricing' }
  ],
}

const socialLinks = [
  { icon: Facebook,  href: '#', label: 'Facebook' },
  { icon: Twitter,   href: '#', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/jayytrivedi_/', label: 'Instagram' }
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a
              href="#home"
              className="text-2xl font-bold bg-linear-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-4 inline-block"
            >
              UrbanServe
            </a>
            <p className="text-gray-400 mb-6 max-w-sm">
              Your trusted platform for booking local services. Connecting homeowners with verified professionals.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-blue-400 shrink-0" />
                <a
                  href="https://mail.google.com/mail/?view=cm&to=support@urbanserve.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-blue-400 transition-colors duration-200"
                >
                  support@urbanserve.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-blue-400 shrink-0" />
                <span className="text-sm">1-800-URBANSERVE</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-blue-400 shrink-0" />
                <span className="text-sm">Serving nationwide</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © {currentYear} UrbanServe. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>

          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer