import { Calendar, CheckCircle2, CreditCard, Edit2, Mail, MapPin, Phone, Shield } from "lucide-react"

export default function ProfileOverviewTab({ user, stats, onEditProfile }) {
    return (
        <div className="animate-fade-in-up stagger">
            <div className="auth-card overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] relative">
                    <div className="absolute -bottom-12 left-8 border-4 border-white rounded-full bg-white shadow-md">
                        {user?.pfpUrl ? (
                            <img src={user.pfpUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center text-[var(--color-primary)] text-3xl font-bold">
                                {user?.name?.[0]?.toUpperCase()}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={onEditProfile}
                        className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
                    >
                        <Edit2 className="w-4 h-4" /> Edit Profile
                    </button>
                </div>
                <div className="pt-16 pb-8 px-8">
                    <h1 className="text-2xl font-bold text-[var(--color-foreground)]">{user?.name}</h1>
                    <p className="text-[var(--color-muted)] flex items-center gap-2 mt-1">
                        <Mail className="w-4 h-4" /> {user?.email}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-4">
                        {user?.isVerified && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-200">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Email Verified
                            </span>
                        )}
                        {user?.isPhoneVerified && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-200">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Mobile Verified
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
                            <Phone className="w-4 h-4 text-[var(--color-primary)]" />
                            {user?.phone || "No phone number added"}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
                            <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
                            {user?.city ? `${user.address}, ${user.city}` : "No location added"}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
                            <Calendar className="w-4 h-4 text-[var(--color-primary)]" />
                            Member since {new Date(user?.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="auth-card p-6 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition duration-300">
                    <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                        <CreditCard className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold text-[var(--color-foreground)]">{stats?.totalBookings || 0}</h3>
                    <p className="text-[var(--color-muted)] text-sm font-medium mt-1">Total Bookings</p>
                </div>
                <div className="auth-card p-6 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition duration-300">
                    <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold text-[var(--color-foreground)]">{stats?.completedBookings || 0}</h3>
                    <p className="text-[var(--color-muted)] text-sm font-medium mt-1">Completed</p>
                </div>
                <div className="auth-card p-6 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition duration-300">
                    <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold text-[var(--color-foreground)]">{stats?.loyaltyPoints || 0}</h3>
                    <p className="text-[var(--color-muted)] text-sm font-medium mt-1">Loyalty Points</p>
                </div>
            </div>
        </div>
    )
}
