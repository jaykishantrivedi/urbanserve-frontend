import { LogOut, Trash2 } from "lucide-react"

export default function ProfileAccountTab({ onLogout }) {
    return (
        <div className="animate-fade-in-up space-y-6">
            <div className="auth-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                        <LogOut className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[var(--color-foreground)]">Sign Out</h3>
                        <p className="text-[var(--color-muted)] text-sm">Sign out from your account on this device.</p>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="px-6 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-gray-300 hover:bg-gray-50 transition w-full md:w-auto text-center shrink-0"
                >
                    Sign Out
                </button>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-400"></div>
                <div className="flex gap-4 items-start pl-2">
                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                        <Trash2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-red-900 mb-1">Delete Account</h3>
                        <p className="text-red-700/80 text-sm leading-relaxed max-w-xl">
                            This will permanently deactivate your account and wipe out your data details from our active platform. Your completed booking history is securely retained for providers regarding payments validation. <br />
                            <strong className="text-red-800">This action cannot be undone.</strong>
                        </p>
                    </div>
                </div>
                <button className="px-6 py-2.5 rounded-xl border border-red-300 text-red-600 bg-white font-semibold text-sm hover:bg-red-50 transition w-full md:w-auto text-center shrink-0">
                    I want to delete my account
                </button>
            </div>
        </div>
    )
}
