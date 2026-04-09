import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
    useGetAdminProvidersQuery,
    useApproveProviderMutation,
    useToggleProviderBlockMutation,
    useDeleteProviderMutation,
} from "../../redux/adminDashboardApi"
import { toast } from "react-toastify"
import ProvidersControls from "./providers/ProvidersControls"
import ProvidersKpiCards from "./providers/ProvidersKpiCards"
import ProvidersPageHeader from "./providers/ProvidersPageHeader"
import ProvidersPagination from "./providers/ProvidersPagination"
import ProvidersTable from "./providers/ProvidersTable"

const ITEMS_PER_PAGE = 10

// ── Main Page ──────────────────────────────────────────────────────────
export function AdminProvidersPage() {
    const navigate = useNavigate()

    const [search, setSearch]             = useState("")
    const [debouncedSearch, setDebounced] = useState("")
    const [statusFilter, setStatus]       = useState("all")
    const [page, setPage]                 = useState(1)
    const [loadingId, setLoadingId]       = useState(null)

    // 350ms debounce
    useEffect(() => {
        const t = setTimeout(() => setDebounced(search), 350)
        return () => clearTimeout(t)
    }, [search])

    useEffect(() => { setPage(1) }, [debouncedSearch, statusFilter])

    const { data, isLoading, isFetching } = useGetAdminProvidersQuery({
        page,
        limit: ITEMS_PER_PAGE,
        search: debouncedSearch,
        status: statusFilter,
    })

    const [approveProvider]      = useApproveProviderMutation()
    const [toggleProviderBlock]  = useToggleProviderBlockMutation()
    const [deleteProvider]       = useDeleteProviderMutation()

    const providers  = data?.providers  || []
    const pagination = data?.pagination || { total: 0, totalPages: 1 }
    const kpis       = data?.kpis       || {}

    const { total, totalPages } = pagination
    const startIndex = (page - 1) * ITEMS_PER_PAGE + 1
    const endIndex   = Math.min(page * ITEMS_PER_PAGE, total)

    const handleAction = async (action, providerId) => {
        setLoadingId(providerId)
        try {
            let res
            if (action === "approve") res = await approveProvider(providerId).unwrap()
            if (action === "block")   res = await toggleProviderBlock(providerId).unwrap()
            if (action === "delete")  res = await deleteProvider(providerId).unwrap()
            toast.success(res?.message || "Action successful")
        } catch {
            toast.error("Action failed. Please try again.")
        } finally {
            setLoadingId(null)
        }
    }

    const getPageNumbers = () => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
        const pages = new Set([1, totalPages, page, page - 1, page + 1])
        return [...pages].filter(p => p >= 1 && p <= totalPages).sort((a, b) => a - b)
    }

    return (
        <div className="p-5 sm:p-6 space-y-6">
            <ProvidersPageHeader />

            <ProvidersKpiCards isLoading={isLoading} kpis={kpis} />

            <ProvidersControls
                search={search}
                onSearchChange={setSearch}
                statusFilter={statusFilter}
                onStatusChange={setStatus}
                onOpenPending={() => navigate("/admin/providers/pending")}
                pendingCount={kpis.pendingProviders ?? 0}
            />

            <ProvidersTable
                providers={providers}
                isLoading={isLoading}
                isFetching={isFetching}
                itemsPerPage={ITEMS_PER_PAGE}
                navigate={navigate}
                onAction={handleAction}
                loadingId={loadingId}
            >
                <ProvidersPagination
                    isLoading={isLoading}
                    total={total}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    page={page}
                    totalPages={totalPages}
                    pageNumbers={getPageNumbers()}
                    onPrevious={() => setPage(p => Math.max(p - 1, 1))}
                    onNext={() => setPage(p => Math.min(p + 1, totalPages))}
                    onSetPage={setPage}
                />
            </ProvidersTable>
        </div>
    )
}
