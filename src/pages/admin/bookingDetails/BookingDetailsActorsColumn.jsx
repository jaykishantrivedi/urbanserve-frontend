import { Briefcase, User } from "lucide-react"
import { BookingDetailsActorCard } from "./BookingDetailsActorCard"

export function BookingDetailsActorsColumn({ user, provider, onNavigate }) {
    return (
        <div className="space-y-6">
            <BookingDetailsActorCard
                title="Customer"
                name={user?.name}
                email={user?.email}
                profilePath={`/admin/users/${user?._id}`}
                initial={user?.name?.charAt(0)?.toUpperCase()}
                watermarkIcon={User}
                avatarClass="bg-indigo-100 text-indigo-600"
                onNavigate={onNavigate}
                buttonLabel="View Customer Profile"
            />

            <BookingDetailsActorCard
                title="Service Provider"
                name={provider?.businessName}
                email={provider?.email}
                profilePath={`/admin/providers/${provider?._id}`}
                initial={provider?.businessName?.charAt(0)?.toUpperCase()}
                watermarkIcon={Briefcase}
                avatarClass="bg-sky-100 text-sky-600"
                onNavigate={onNavigate}
                buttonLabel="View Provider Profile"
            />
        </div>
    )
}
