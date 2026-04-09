import { Bell, Building2, CheckCheck, Clock } from "lucide-react"

export function AdminNavbarNotifications({
    bellRef,
    isBellOpen,
    onToggleBell,
    unreadCount,
    alerts,
    onMarkAll,
    onAlertClick,
    onViewAll,
    formatTimeAgo,
}) {
    return (
        <div className="relative" ref={bellRef}>
            <button
                onClick={onToggleBell}
                className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label="Notifications"
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 min-w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-[9px] font-bold leading-none px-0.5">
                            {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                    </span>
                )}
                {unreadCount === 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gray-300 rounded-full" />
                )}
            </button>

            {isBellOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
                        <div className="flex items-center gap-2">
                            <Bell className="w-4 h-4 text-indigo-600" />
                            <span className="text-sm font-semibold text-gray-900">Notifications</span>
                            {unreadCount > 0 && (
                                <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                                    {unreadCount} new
                                </span>
                            )}
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={onMarkAll}
                                className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                            >
                                <CheckCheck className="w-3.5 h-3.5" />
                                Mark all read
                            </button>
                        )}
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                        {alerts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center px-6">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                    <Bell className="w-5 h-5 text-gray-400" />
                                </div>
                                <p className="text-sm font-medium text-gray-500">No notifications yet</p>
                                <p className="text-xs text-gray-400 mt-1">New provider requests will appear here</p>
                            </div>
                        ) : (
                            alerts.map((alert) => (
                                <button
                                    key={alert._id}
                                    onClick={() => onAlertClick(alert)}
                                    className={`w-full flex items-start gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors ${
                                        !alert.isRead ? "bg-indigo-50/40" : ""
                                    }`}
                                >
                                    <div className="shrink-0 w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                                        <Building2 className="w-4 h-4 text-indigo-600" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p
                                            className={`text-sm leading-snug ${
                                                !alert.isRead
                                                    ? "font-semibold text-gray-900"
                                                    : "font-medium text-gray-700"
                                            }`}
                                        >
                                            {alert.title}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
                                            {alert.message}
                                        </p>
                                        <div className="flex items-center gap-1 mt-1.5">
                                            <Clock className="w-3 h-3 text-gray-400" />
                                            <span className="text-[11px] text-gray-400">{formatTimeAgo(alert.createdAt)}</span>
                                        </div>
                                    </div>

                                    {!alert.isRead && (
                                        <span className="shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-1.5" />
                                    )}
                                </button>
                            ))
                        )}
                    </div>

                    <div className="border-t border-gray-100 px-4 py-2.5 bg-gray-50">
                        <button
                            onClick={onViewAll}
                            className="w-full text-xs text-center text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                        >
                            View all pending providers {">"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
