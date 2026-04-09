import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import {
    useApproveProviderMutation,
    useGetAdminProviderByIdQuery,
    useGetAdminProviderServicesQuery,
    useToggleProviderBlockMutation,
} from "../../redux/adminDashboardApi"
import { ProviderProfileBusinessDetails } from "./providerProfile/ProviderProfileBusinessDetails"
import { ProviderProfileDocuments } from "./providerProfile/ProviderProfileDocuments"
import { ProviderProfileErrorState } from "./providerProfile/ProviderProfileErrorState"
import { ProviderProfileHero } from "./providerProfile/ProviderProfileHero"
import { ProviderProfileLoadingState } from "./providerProfile/ProviderProfileLoadingState"
import { ProviderProfilePendingNotice } from "./providerProfile/ProviderProfilePendingNotice"
import { ProviderProfileServicesSection } from "./providerProfile/ProviderProfileServicesSection"
import { ProviderProfileStatsGrid } from "./providerProfile/ProviderProfileStatsGrid"

export function AdminProviderProfilePage() {
    const { providerId } = useParams()
    const navigate = useNavigate()

    const [approving, setApproving] = useState(false)
    const [blocking, setBlocking] = useState(false)

    const { data, isLoading, isError } = useGetAdminProviderByIdQuery(providerId)
    const [approveProvider] = useApproveProviderMutation()
    const [toggleProviderBlock] = useToggleProviderBlockMutation()
    const { data: servicesData, isLoading: isServicesLoading } = useGetAdminProviderServicesQuery(providerId)

    const provider = data?.provider
    const stats = data?.bookingStats
    const providerServices = servicesData?.services || []

    const handleApprove = async () => {
        setApproving(true)
        try {
            const response = await approveProvider(providerId).unwrap()
            toast.success(response.message || "Provider approved")
        } catch {
            toast.error("Failed to approve provider. Please try again.")
        } finally {
            setApproving(false)
        }
    }

    const handleToggleBlock = async () => {
        setBlocking(true)
        try {
            const response = await toggleProviderBlock(providerId).unwrap()
            toast.success(response.message || "Status updated")
        } catch {
            toast.error("Failed to update block status. Please try again.")
        } finally {
            setBlocking(false)
        }
    }

    if (isLoading) {
        return <ProviderProfileLoadingState />
    }

    if (isError || !provider) {
        return <ProviderProfileErrorState onBack={() => navigate("/admin/providers")} />
    }

    const isBlocked = provider.status === "blocked"
    const isPending = provider.status === "pending"

    return (
        <div className="p-5 sm:p-6 space-y-6 max-w-4xl">
            <ProviderProfileHero
                provider={provider}
                isPending={isPending}
                isBlocked={isBlocked}
                approving={approving}
                blocking={blocking}
                onBack={() => navigate("/admin/providers")}
                onApprove={handleApprove}
                onToggleBlock={handleToggleBlock}
            />

            {isPending && <ProviderProfilePendingNotice />}

            <ProviderProfileStatsGrid stats={stats} />

            <ProviderProfileBusinessDetails provider={provider} />

            <ProviderProfileDocuments documents={provider.documents} />

            <ProviderProfileServicesSection
                isServicesLoading={isServicesLoading}
                providerServices={providerServices}
            />
        </div>
    )
}
