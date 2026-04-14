import { useState, useRef, useEffect } from 'react'
import { Menu, X, User, CalendarDays, ClipboardList, CreditCard, LogOut, ChevronDown, Bell } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { logout } from '../../redux/authSlice'
import { useLogoutMutation } from '../../redux/authApi'
import { useGetNotificationsQuery } from '../../redux/notificationApi'
import { persistor } from '../../redux/store'
import Button from '../ui/Button'

const navLinks = [
  { name: 'Home',         href: '#home' },
  { name: 'Categories',   href: '#categories' },
  { name: 'How It Works', href: '#how-it-works' },
]

const dropdownItems = [
  { icon: User,          label: 'My Profile',  path: '/profile' },
  { icon: CalendarDays,  label: 'My Bookings', path: '/bookings' },
  { icon: ClipboardList, label: 'My Requests', path: '/requests' },
  { icon: CreditCard,    label: 'My Payments', path: '/payments' },
]

//  Avatar 
const Avatar = ({ pfpUrl, name, size = "md" }) => {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-9 h-9 text-sm" }

  if (pfpUrl) {
    return (
      <img
        src={pfpUrl}
        alt={name}
        referrerPolicy="no-referrer"
        className={`${sizes[size]} rounded-full object-cover ring-2 ring-blue-100`}
      />
    )
  }

  const initial = name?.charAt(0)?.toUpperCase() || "U"
  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-semibold ring-2 ring-blue-100`}>
      {initial}
    </div>
  )
}

//  Navbar 
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen]         = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const desktopDropdownRef = useRef(null)
  const mobileDropdownRef  = useRef(null)

  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const location  = useLocation()

  const isHome = location.pathname === '/'

  const { userData } = useSelector((state) => state.auth)
  const user = userData?.user

  // Compute the role-aware CTA link shown after static nav links
  const ctaLink = (() => {
    if (!user) return { name: 'Become a Provider', href: '#provider', isAnchor: true }
    if (user.role === 'admin')    return { name: 'Go to Dashboard', to: '/admin',    isAnchor: false }
    if (user.role === 'provider') return { name: 'Go to Dashboard', to: '/provider/dashboard', isAnchor: false }
    return { name: 'Become a Provider', to: '/become-provider', isAnchor: false }
  })()

  // Set up 30-second polling pollingInterval
  const { data: notifData } = useGetNotificationsQuery(undefined, {
    skip: !user,
    pollingInterval: 30000 
  })
  const unreadCount = notifData?.unreadCount || 0
  const notifications = notifData?.notifications || []
  
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const notifRef = useRef(null)

  const [logoutApi] = useLogoutMutation()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(e.target) &&
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false)
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setIsDropdownOpen(false)
    setIsNotifOpen(false)
  }, [location.pathname])

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap()
    } catch (error) {
      console.log("Logout API error:", error)
    } finally {
      dispatch(logout())
      persistor.purge()
      setIsDropdownOpen(false)
      setIsMenuOpen(false)
      navigate('/signin')
    }
  }

  const handleDropdownNavigate = (path) => {
    navigate(path)
    setIsDropdownOpen(false)
    setIsMenuOpen(false)
  }

  const getRoleBasedPath = (path) => {
    return `/${user?.role || 'user'}${path}`
  }

  //  Dropdown Menu 
  const DropdownMenu = () => {
    // Admins only see My Profile — not Bookings, Requests, Payments
    const visibleItems = user?.role === 'admin'
      ? dropdownItems.filter(item => item.label === 'My Profile')
      : dropdownItems

    return (
      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
        </div>

        {visibleItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              onClick={() => handleDropdownNavigate(getRoleBasedPath(item.path))}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 cursor-pointer"
            >
              <Icon size={16} />
              {item.label}
            </button>
          )
        })}

        <div className="border-t border-gray-100 mt-1 pt-1">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors duration-150 cursor-pointer"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    )
  }

  //  Auth Section (shared between home and slim) 
  const AuthSection = ({ size = "md" }) => (
    userData ? (
      <div className="flex items-center gap-4">
        {/* Notification Bell — hidden for admins */}
        {user?.role !== 'admin' && (
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-full cursor-pointer relative"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                <p className="font-semibold text-gray-900">Notifications</p>
                {unreadCount > 0 && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{unreadCount} New</span>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map((notif, idx) => (
                    <div key={idx} className={`px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer ${!notif.isRead ? 'bg-blue-50/40' : ''}`} onClick={() => { setIsNotifOpen(false); navigate(getRoleBasedPath('/notifications')) }}>
                      <p className={`text-sm ${!notif.isRead ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{notif.title}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{notif.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-sm text-gray-500">No recent notifications</div>
                )}
              </div>
              <div className="border-t border-gray-100 pt-1">
                <button
                  onClick={() => { setIsNotifOpen(false); navigate(getRoleBasedPath('/notifications')); }}
                  className="w-full px-4 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>
        )}

        {/* User Profile Dropdown */}
        <div className="relative" ref={desktopDropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer pl-2 border-l border-gray-200"
          >
            <Avatar pfpUrl={user?.pfpUrl} name={user?.name} size={size} />
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {isDropdownOpen && <DropdownMenu />}
        </div>
      </div>
    ) : (
      <div className="flex items-center gap-2">
        <Link to="/signin">
          <Button variant="ghost" size="md">Login</Button>
        </Link>
        <Link to="/signup">
          <Button variant="primary" size="md">Sign Up</Button>
        </Link>
      </div>
    )
  )

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent shrink-0"
          >
            UrbanServe
          </a>

          {/*  HOME navbar  */}
          {isHome && (
            <>
              {/* Desktop nav links */}
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                ))}
                {/* Role-aware CTA */}
                {ctaLink.isAnchor ? (
                  <a href={ctaLink.href} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
                    {ctaLink.name}
                  </a>
                ) : (
                  <Link to={ctaLink.to} className="text-sm font-medium text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
                    {ctaLink.name}
                  </Link>
                )}
                <AuthSection />
              </div>

              {/* Mobile right side */}
              <div className="md:hidden flex items-center gap-3">
                {userData && (
                  <div className="relative" ref={mobileDropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center cursor-pointer"
                    >
                      <Avatar pfpUrl={user?.pfpUrl} name={user?.name} size="sm" />
                    </button>
                    {isDropdownOpen && <DropdownMenu />}
                  </div>
                )}
                <button
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </>
          )}

          {/*  SLIM navbar (all other pages)  */}
          {!isHome && (
            <div className="flex items-center gap-3">
              <AuthSection />
            </div>
          )}

        </div>

        {/* Mobile Nav Links — home only  */}
        {isHome && isMenuOpen && (
          <div className="md:hidden py-4 space-y-1 border-t border-gray-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            {/* Role-aware CTA */}
            {ctaLink.isAnchor ? (
              <a
                href={ctaLink.href}
                className="block text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {ctaLink.name}
              </a>
            ) : (
              <Link
                to={ctaLink.to}
                className="block text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {ctaLink.name}
              </Link>
            )}

            {!userData && (
              <div className="pt-3 space-y-2">
                <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" fullWidth>Login</Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" fullWidth>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar