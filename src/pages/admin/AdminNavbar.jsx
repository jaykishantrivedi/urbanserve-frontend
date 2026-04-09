import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/authSlice"
import { persistor } from "../../redux/store"
import { useLogoutMutation } from "../../redux/authApi"
import {
    useGetAdminAlertsQuery,
    useMarkAdminAlertReadMutation,
    useMarkAllAdminAlertsReadMutation
} from "../../redux/adminDashboardApi"
import { AdminNavbarLeftSection } from "./navbar/AdminNavbarLeftSection"
import { AdminNavbarNotifications } from "./navbar/AdminNavbarNotifications"
import { AdminNavbarProfileMenu } from "./navbar/AdminNavbarProfileMenu"
import { adminNavbarTimeAgo } from "./navbar/adminNavbarUtils"

export function AdminNavbar({ isSidebarOpen, onToggleSidebar }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isBellOpen, setIsBellOpen] = useState(false)
    const dropdownRef = useRef(null)
    const bellRef = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userData } = useSelector((state) => state.auth)
    const adminName  = userData?.user?.name  || "Admin"
    const adminEmail = userData?.user?.email || "admin@urbanserve.com"
    const initials   = adminName.slice(0, 2).toUpperCase()

    // ── Alerts ──────────────────────────────────────────────────────────
    const { data: alertData, refetch } = useGetAdminAlertsQuery(undefined, {
        pollingInterval: 30000
    })
    const [markRead]    = useMarkAdminAlertReadMutation()
    const [markAllRead] = useMarkAllAdminAlertsReadMutation()

    const alerts      = alertData?.alerts      || []
    const unreadCount = alertData?.unreadCount || 0

    // ── Close dropdowns on outside click ───────────────────────────────
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target))
                setIsDropdownOpen(false)
            if (bellRef.current && !bellRef.current.contains(e.target))
                setIsBellOpen(false)
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    const [logoutApi] = useLogoutMutation()

    const handleLogout = async () => {
        if (confirm("Are you sure you want to logout?")) {
            try {
                await logoutApi().unwrap()  // tells the backend to clear cookies
            } catch (err) {
                console.log("Logout API error:", err)
            } finally {
                dispatch(logout())          // clear Redux auth state
                await persistor.purge()     // clear persisted storage
                navigate("/signin", { replace: true })
                setIsDropdownOpen(false)
            }
        }
    }

    const handleAlertClick = async (alert) => {
        if (!alert.isRead) {
            await markRead(alert._id)
        }
        setIsBellOpen(false)
        navigate("/admin/providers")
    }

    const handleMarkAll = async () => {
        await markAllRead()
        refetch()
    }

    return (
        <header
            className={`bg-white border-b border-gray-200 h-16 fixed top-0 right-0 z-10 transition-all duration-300 ${
                isSidebarOpen ? "left-64" : "left-0"
            }`}
        >
            <div className="h-full px-5 flex items-center justify-between">
                <AdminNavbarLeftSection
                    isSidebarOpen={isSidebarOpen}
                    onToggleSidebar={onToggleSidebar}
                    onVisitWebsite={() => navigate("/")}
                />

                <div className="flex items-center gap-3">
                    <AdminNavbarNotifications
                        bellRef={bellRef}
                        isBellOpen={isBellOpen}
                        onToggleBell={() => setIsBellOpen((prev) => !prev)}
                        unreadCount={unreadCount}
                        alerts={alerts}
                        onMarkAll={handleMarkAll}
                        onAlertClick={handleAlertClick}
                        onViewAll={() => {
                            setIsBellOpen(false)
                            navigate("/admin/providers")
                        }}
                        formatTimeAgo={adminNavbarTimeAgo}
                    />

                    <AdminNavbarProfileMenu
                        dropdownRef={dropdownRef}
                        isDropdownOpen={isDropdownOpen}
                        onToggleDropdown={() => setIsDropdownOpen((prev) => !prev)}
                        userData={userData}
                        adminName={adminName}
                        adminEmail={adminEmail}
                        initials={initials}
                        onGoToProfile={() => {
                            navigate("/admin/profile")
                            setIsDropdownOpen(false)
                        }}
                        onLogout={handleLogout}
                    />
                </div>
            </div>
        </header>
    )
}
