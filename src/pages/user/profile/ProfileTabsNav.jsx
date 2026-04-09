import { Edit2, Settings, Shield, User } from "lucide-react"

const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "edit", label: "Edit Profile", icon: Edit2 },
    { id: "security", label: "Security", icon: Shield },
    { id: "account", label: "Account", icon: Settings },
]

export default function ProfileTabsNav({ activeTab, onTabChange }) {
    return (
        <div className="auth-card p-2 mb-8 flex overflow-x-auto no-scrollbar gap-2 -top-24 z-10">
            {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                            activeTab === tab.id
                                ? "bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                                : "text-[var(--color-muted)] hover:bg-gray-100 hover:text-[var(--color-foreground)]"
                        }`}
                    >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                )
            })}
        </div>
    )
}
