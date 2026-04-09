import { useLocation } from "react-router-dom"
import { AdminSidebarBackdrop } from "./sidebar/AdminSidebarBackdrop"
import { AdminSidebarFooter } from "./sidebar/AdminSidebarFooter"
import { AdminSidebarHeader } from "./sidebar/AdminSidebarHeader"
import { AdminSidebarNav } from "./sidebar/AdminSidebarNav"

export function AdminSidebar({ isOpen, onClose, onToggle }) {
    const location = useLocation()

    return (
        <>
            <AdminSidebarBackdrop isOpen={isOpen} onClose={onClose} />

            <aside
                style={{ willChange: "transform" }}
                className={`w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-30 transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <AdminSidebarHeader onToggle={onToggle} onClose={onClose} />

                <AdminSidebarNav pathname={location.pathname} onClose={onClose} />

                <AdminSidebarFooter />
            </aside>
        </>
    )
}
