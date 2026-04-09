import { Link } from "react-router-dom"
import {
    Bell,
    Briefcase,
    Calendar,
    CreditCard,
    FolderTree,
    LayoutDashboard,
    Package,
    Settings,
    Star,
    Users,
} from "lucide-react"

const NAV_ITEMS = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: Briefcase, label: "Providers", href: "/admin/providers" },
    { icon: Package, label: "Services", href: "/admin/services" },
    { icon: FolderTree, label: "Categories", href: "/admin/categories" },
    { icon: Calendar, label: "Bookings", href: "/admin/bookings" },
    { icon: CreditCard, label: "Payments", href: "/admin/payments" },
    { icon: Star, label: "Reviews", href: "/admin/reviews" },
    { icon: Bell, label: "Notifications", href: "/admin/notifications" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export function AdminSidebarNav({ pathname, onClose }) {
    return (
        <nav className="flex-1 p-3 overflow-y-auto">
            <ul className="space-y-0.5">
                {NAV_ITEMS.map((item, index) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href !== "/admin" && pathname.startsWith(item.href))

                    return (
                        <li key={index}>
                            <Link
                                to={item.href}
                                onClick={() => {
                                    if (window.innerWidth < 1024) onClose()
                                }}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                                    isActive
                                        ? "bg-indigo-50 text-indigo-600 shadow-sm"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                            >
                                <item.icon
                                    className={`w-4.5 h-4.5 shrink-0 ${
                                        isActive ? "text-indigo-600" : "text-gray-400"
                                    }`}
                                    size={18}
                                />
                                <span>{item.label}</span>
                                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
