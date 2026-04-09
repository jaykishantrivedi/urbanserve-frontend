import { useState } from "react"
import { Outlet } from "react-router-dom"
import { AdminSidebar } from "./AdminSidebar"
import { AdminNavbar } from "./AdminNavbar"

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Sidebar */}
            <AdminSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onToggle={() => setSidebarOpen(prev => !prev)}
            />

            {/* Main area: margin snaps instantly (no transition) so Recharts ResizeObserver
                 doesn't fire on every animation frame and lag the charts */}
            <div className={sidebarOpen ? "lg:ml-64" : "ml-0"}>
                {/* Navbar */}
                <AdminNavbar
                    isSidebarOpen={sidebarOpen}
                    onToggleSidebar={() => setSidebarOpen(prev => !prev)}
                />

                {/* Page Content */}
                <main className="pt-16 min-h-screen">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
