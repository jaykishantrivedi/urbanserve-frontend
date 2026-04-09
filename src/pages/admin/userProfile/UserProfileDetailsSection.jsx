import { Calendar, Mail, MapPin, Phone, User } from "lucide-react"
import { UserProfileInfoRow } from "./UserProfileInfoRow"

export function UserProfileDetailsSection({ user }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Profile Details</h2>
            <UserProfileInfoRow icon={User} label="Full Name" value={user.name} />
            <UserProfileInfoRow icon={Mail} label="Email" value={user.email} />
            <UserProfileInfoRow icon={Phone} label="Phone" value={user.phone} />
            <UserProfileInfoRow icon={MapPin} label="City" value={user.city} />
            <UserProfileInfoRow icon={MapPin} label="Address" value={user.address} />
            <UserProfileInfoRow
                icon={Calendar}
                label="Joined"
                value={new Date(user.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })}
            />
            <UserProfileInfoRow
                icon={Calendar}
                label="Last Login"
                value={user.lastLogin ? new Date(user.lastLogin).toLocaleString("en-IN") : null}
            />
        </div>
    )
}
