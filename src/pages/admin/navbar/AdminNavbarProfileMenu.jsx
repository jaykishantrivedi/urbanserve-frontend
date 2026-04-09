import { ChevronDown, LogOut, User } from "lucide-react"

export function AdminNavbarProfileMenu({
    dropdownRef,
    isDropdownOpen,
    onToggleDropdown,
    userData,
    adminName,
    adminEmail,
    initials,
    onGoToProfile,
    onLogout,
}) {
    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={onToggleDropdown}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
                <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                    {userData?.user?.pfpUrl ? (
                        <img
                            src={userData.user.pfpUrl}
                            alt={adminName}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <span className="text-white text-xs font-bold">{initials}</span>
                    )}
                </div>
                <div className="text-left hidden sm:block">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">{adminName}</p>
                    <p className="text-xs text-gray-400">{adminEmail}</p>
                </div>
                <ChevronDown
                    size={15}
                    className={`text-gray-400 transition-transform duration-200 hidden sm:block ${isDropdownOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                    <button
                        onClick={onGoToProfile}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <div className="w-7 h-7 bg-indigo-50 rounded-lg flex items-center justify-center">
                            <User size={14} className="text-indigo-600" />
                        </div>
                        <div className="text-left">
                            <p className="font-medium text-gray-900 text-sm">My Profile</p>
                        </div>
                    </button>

                    <div className="my-1 border-t border-gray-100" />

                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <div className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center">
                            <LogOut size={14} className="text-red-500" />
                        </div>
                        <div className="text-left">
                            <p className="font-medium text-red-700 text-sm">Logout</p>
                        </div>
                    </button>
                </div>
            )}
        </div>
    )
}
