import { Menu, X } from "lucide-react"

export function AdminSidebarHeader({ onToggle, onClose }) {
    return (
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
                <button
                    onClick={onToggle}
                    className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Toggle sidebar"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-indigo-600 leading-tight">UrbanServe</h1>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-0.5">Admin Panel</p>
                </div>
            </div>
            <button
                onClick={onClose}
                className="lg:hidden p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    )
}
