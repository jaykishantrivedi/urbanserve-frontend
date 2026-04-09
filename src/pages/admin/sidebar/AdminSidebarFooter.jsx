export function AdminSidebarFooter() {
    return (
        <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-2.5 px-2 py-1.5">
                <div className="w-7 h-7 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">AD</span>
                </div>
                <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">Admin User</p>
                    <p className="text-[10px] text-gray-400 truncate">admin@urbanserve.com</p>
                </div>
            </div>
        </div>
    )
}
