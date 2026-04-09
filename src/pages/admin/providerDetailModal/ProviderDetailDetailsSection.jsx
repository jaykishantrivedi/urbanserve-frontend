import {
    Award,
    Briefcase,
    Clock,
    FileText,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
} from "lucide-react"
import { ProviderDetailInfoRow } from "./ProviderDetailInfoRow"

export function ProviderDetailDetailsSection({ provider }) {
    return (
        <div className="bg-gray-50 rounded-xl px-4 py-1">
            <ProviderDetailInfoRow icon={Mail} label="Email" value={provider.email} />
            <ProviderDetailInfoRow icon={Phone} label="Phone" value={provider.phone} />
            <ProviderDetailInfoRow icon={MapPin} label="City" value={provider.city} />
            <ProviderDetailInfoRow icon={MapPin} label="Address" value={provider.address} />
            <ProviderDetailInfoRow
                icon={Briefcase}
                label="Experience"
                value={provider.experience ? `${provider.experience} years` : null}
            />
            <ProviderDetailInfoRow icon={Award} label="Certifications" value={provider.certifications} />
            <ProviderDetailInfoRow icon={FileText} label="Description" value={provider.description} />
            <ProviderDetailInfoRow
                icon={Clock}
                label="Services Done"
                value={provider.totalServicesCompleted?.toString()}
            />
            <ProviderDetailInfoRow
                icon={ShieldCheck}
                label="Member Since"
                value={
                    provider.createdAt
                        ? new Date(provider.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })
                        : null
                }
            />
        </div>
    )
}
