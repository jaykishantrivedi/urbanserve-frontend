import { Home, Menu } from "lucide-react"

export function AdminNavbarLeftSection({ isSidebarOpen, onToggleSidebar, onVisitWebsite }) {
    return (
        <div className="flex items-center gap-3">
            {!isSidebarOpen && (
                <button
                    onClick={onToggleSidebar}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                    <Menu className="w-5 h-5" />
                </button>
            )}
            <div>
                <h2 className="text-sm font-semibold text-gray-700 hidden sm:block">Admin Dashboard</h2>
            </div>
            <button
                onClick={onVisitWebsite}
                title="Go to website home"
                className="flex items-center gap-1.5 ml-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 transition-colors"
            >
                <Home className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Visit Website</span>
            </button>
        </div>
    )
}
