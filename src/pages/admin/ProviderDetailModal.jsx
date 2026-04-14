import { useEffect } from "react"
import { useGetAdminProviderByIdQuery } from "../../redux/adminDashboardApi"
import { ProviderDetailDetailsSection } from "./providerDetailModal/ProviderDetailDetailsSection"
import { ProviderDetailDocumentsSection } from "./providerDetailModal/ProviderDetailDocumentsSection"
import { ProviderDetailModalFooter } from "./providerDetailModal/ProviderDetailModalFooter"
import { ProviderDetailModalHeader } from "./providerDetailModal/ProviderDetailModalHeader"
import { ProviderDetailProfileSection } from "./providerDetailModal/ProviderDetailProfileSection"

export function ProviderDetailModal({ providerId, open, onClose, onApprove, onReject, processing }) {
    const { data, isLoading } = useGetAdminProviderByIdQuery(providerId, { skip: !open || !providerId })

    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose() }
        if (open) document.addEventListener("keydown", handler)
        return () => document.removeEventListener("keydown", handler)
    }, [open, onClose])

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [open])

    if (!open) return null

    const provider = data?.provider
    const stats = data?.bookingStats
    const isPending = provider?.status === "pending" || (!provider?.isApproved && !provider?.isBlocked)

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <div className="relative z-50 w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
                <ProviderDetailModalHeader
                    isLoading={isLoading}
                    providerName={provider?.businessName}
                    onClose={onClose}
                />

                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-16">
                            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
                        </div>
                    ) : !provider ? (
                        <div className="py-12 text-center text-gray-400">Provider not found</div>
                    ) : (
                        <>
                            <ProviderDetailProfileSection provider={provider} stats={stats} />

                            <ProviderDetailDetailsSection provider={provider} />

                            <ProviderDetailDocumentsSection documents={provider.documents} />
                        </>
                    )}
                </div>

                {!isLoading && isPending && (
                    <ProviderDetailModalFooter
                        providerId={providerId}
                        processing={processing}
                        onApprove={onApprove}
                        onReject={onReject}
                    />
                )}
            </div>
        </div>
    )
}
