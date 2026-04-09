import {
    Award,
    Briefcase,
    Building2,
    Calendar,
    FileText,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    Star,
} from "lucide-react"
import { ProviderProfileInfoRow } from "./ProviderProfileInfoRow"

export function ProviderProfileBusinessDetails({ provider }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Business Details</h2>
            <ProviderProfileInfoRow icon={Building2} label="Business Name" value={provider.businessName} />
            <ProviderProfileInfoRow icon={Mail} label="Email" value={provider.email} />
            <ProviderProfileInfoRow icon={Phone} label="Phone" value={provider.phone} />
            <ProviderProfileInfoRow icon={MapPin} label="City" value={provider.city} />
            <ProviderProfileInfoRow icon={MapPin} label="Address" value={provider.address} />
            <ProviderProfileInfoRow
                icon={Briefcase}
                label="Experience"
                value={provider.experience ? `${provider.experience} years` : null}
            />
            <ProviderProfileInfoRow icon={Award} label="Certifications" value={provider.certifications} />
            <ProviderProfileInfoRow icon={FileText} label="Description" value={provider.description} />
            <ProviderProfileInfoRow
                icon={Star}
                label="Average Rating"
                value={provider.rating > 0 ? `${provider.rating.toFixed(1)} / 5` : null}
            />
            <ProviderProfileInfoRow
                icon={ShieldCheck}
                label="Services Completed"
                value={provider.totalServicesCompleted?.toString()}
            />
            <ProviderProfileInfoRow
                icon={Calendar}
                label="Joined"
                value={
                    provider.createdAt
                        ? new Date(provider.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })
                        : null
                }
            />
        </div>
    )
}
