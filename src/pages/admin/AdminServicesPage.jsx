import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
    useGetAdminServicesQuery,
    useGetAdminServiceCategoriesQuery,
    useToggleServiceActiveMutation,
    useAdminDeleteServiceMutation,
} from "../../redux/adminDashboardApi"
import { toast } from "react-toastify"
import ServicesControls from "./services/ServicesControls"
import ServicesKpiCards from "./services/ServicesKpiCards"
import ServicesPageHeader from "./services/ServicesPageHeader"
import ServicesPagination from "./services/ServicesPagination"
import ServicesTable from "./services/ServicesTable"

const ITEMS_PER_PAGE = 10

// ── Main Page ──────────────────────────────────────────────────────────
export function AdminServicesPage() {
    const navigate = useNavigate()

    const [search, setSearch]           = useState("")
    const [debouncedSearch, setDebounced] = useState("")
    const [statusFilter, setStatus]     = useState("all")
    const [categoryFilter, setCategory] = useState("all")
    const [page, setPage]               = useState(1)
    const [loadingId, setLoadingId]     = useState(null)

    // 350 ms debounce on search
    useEffect(() => {
        const t = setTimeout(() => setDebounced(search), 350)
        return () => clearTimeout(t)
    }, [search])

    // Reset to page 1 when filters change
    useEffect(() => { setPage(1) }, [debouncedSearch, statusFilter, categoryFilter])

    const { data, isLoading, isFetching } = useGetAdminServicesQuery({
        page,
        limit: ITEMS_PER_PAGE,
        search: debouncedSearch,
        status: statusFilter,
        category: categoryFilter,
    })

    const { data: catData } = useGetAdminServiceCategoriesQuery()

    const [toggleServiceActive] = useToggleServiceActiveMutation()
    const [adminDeleteService]  = useAdminDeleteServiceMutation()

    const services   = data?.services   || []
    const pagination = data?.pagination || { total: 0, totalPages: 1 }
    const kpis       = data?.kpis       || {}
    const categories = catData?.categories || []

    const { total, totalPages } = pagination
    const startIndex = total > 0 ? (page - 1) * ITEMS_PER_PAGE + 1 : 0
    const endIndex   = Math.min(page * ITEMS_PER_PAGE, total)

    const handleAction = async (action, serviceId) => {
        setLoadingId(serviceId)
        try {
            let res
            if (action === "toggle") res = await toggleServiceActive(serviceId).unwrap()
            if (action === "delete") res = await adminDeleteService(serviceId).unwrap()
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
            <ServicesPageHeader />

            <ServicesKpiCards isLoading={isLoading} kpis={kpis} />

            <ServicesControls
                search={search}
                onSearchChange={setSearch}
                categoryFilter={categoryFilter}
                onCategoryChange={setCategory}
                statusFilter={statusFilter}
                onStatusChange={setStatus}
                categories={categories}
                onAddService={() => navigate("/admin/services/add")}
            />

            <ServicesTable
                services={services}
                isLoading={isLoading}
                isFetching={isFetching}
                itemsPerPage={ITEMS_PER_PAGE}
                loadingId={loadingId}
                navigate={navigate}
                onAction={handleAction}
            >
                <ServicesPagination
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
            </ServicesTable>
        </div>
    )
}
