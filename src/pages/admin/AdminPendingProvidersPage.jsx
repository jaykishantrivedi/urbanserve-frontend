import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
    useGetAdminProvidersQuery,
    useApproveProviderMutation,
    useRejectProviderMutation,
} from "../../redux/adminDashboardApi"
import { ProviderDetailModal } from "./ProviderDetailModal"
import { toast } from "react-toastify"
import PendingProvidersFilters from "./pendingProviders/PendingProvidersFilters"
import PendingProvidersHeader from "./pendingProviders/PendingProvidersHeader"
import PendingProvidersPagination from "./pendingProviders/PendingProvidersPagination"
import PendingProvidersTable from "./pendingProviders/PendingProvidersTable"

const ITEMS_PER_PAGE = 10

export function AdminPendingProvidersPage() {
    const navigate = useNavigate()

    const [search, setSearch] = useState("")
    const [cityFilter, setCityFilter] = useState("all")
    const [page, setPage] = useState(1)
    const [modalId, setModalId] = useState(null)
    const [processing, setProcessing] = useState(false)

    const { data, isLoading, isFetching } = useGetAdminProvidersQuery({
        page: 1,
        limit: 500,
        status: "pending",
    })

    const [approveProvider] = useApproveProviderMutation()
    const [rejectProvider] = useRejectProviderMutation()

    const allProviders = data?.providers || []

    const cities = useMemo(() => {
        const citySet = new Set(allProviders.map((p) => p.city).filter(Boolean))
        return [...citySet].sort()
    }, [allProviders])

    const filtered = useMemo(() => {
        return allProviders.filter((provider) => {
            const query = search.toLowerCase()
            const matchesSearch =
                !query ||
                provider.businessName?.toLowerCase().includes(query) ||
                provider.email?.toLowerCase().includes(query)
            const matchesCity = cityFilter === "all" || provider.city === cityFilter
            return matchesSearch && matchesCity
        })
    }, [allProviders, search, cityFilter])

    useEffect(() => {
        setPage(1)
    }, [search, cityFilter])

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
    const startIdx = (page - 1) * ITEMS_PER_PAGE
    const paginated = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE)

    const handleAction = async (action, providerId) => {
        setProcessing(true)
        try {
            const mutation = action === "approve" ? approveProvider : rejectProvider
            const response = await mutation(providerId).unwrap()
            toast.success(response?.message || `Provider ${action}d successfully`)
            setModalId(null)
        } catch {
            toast.error("Action failed. Please try again.")
        } finally {
            setProcessing(false)
        }
    }

    const getPageNumbers = () => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }
        const pages = new Set([1, totalPages, page, page - 1, page + 1])
        return [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b)
    }

    return (
        <div className="p-5 sm:p-6 space-y-6">
            <PendingProvidersHeader
                onBack={() => navigate("/admin/providers")}
                pendingCount={allProviders.length}
                isLoading={isLoading}
            />

            <PendingProvidersFilters
                search={search}
                onSearchChange={setSearch}
                cityFilter={cityFilter}
                onCityFilterChange={setCityFilter}
                cities={cities}
            />

            <PendingProvidersTable
                isLoading={isLoading}
                filtered={filtered}
                paginated={paginated}
                isFetching={isFetching}
                processing={processing}
                onView={setModalId}
                onApprove={(id) => handleAction("approve", id)}
                onReject={(id) => handleAction("reject", id)}
                search={search}
                cityFilter={cityFilter}
            >
                <PendingProvidersPagination
                    isLoading={isLoading}
                    filteredCount={filtered.length}
                    startIndex={startIdx + 1}
                    endIndex={Math.min(startIdx + ITEMS_PER_PAGE, filtered.length)}
                    page={page}
                    totalPages={totalPages}
                    pageNumbers={getPageNumbers()}
                    onPrevious={() => setPage((p) => Math.max(p - 1, 1))}
                    onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
                    onSetPage={setPage}
                />
            </PendingProvidersTable>

            <ProviderDetailModal
                providerId={modalId}
                open={!!modalId}
                onClose={() => setModalId(null)}
                onApprove={(id) => handleAction("approve", id)}
                onReject={(id) => handleAction("reject", id)}
                processing={processing}
            />
        </div>
    )
}
