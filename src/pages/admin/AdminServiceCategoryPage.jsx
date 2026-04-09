import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
    useGetAdminCategoriesQuery,
    useToggleCategoryActiveMutation,
    useAdminDeleteCategoryMutation,
} from "../../redux/adminDashboardApi"
import { toast } from "react-toastify"
import ServiceCategoriesControls from "./serviceCategories/ServiceCategoriesControls"
import ServiceCategoriesKpiCards from "./serviceCategories/ServiceCategoriesKpiCards"
import ServiceCategoriesPageHeader from "./serviceCategories/ServiceCategoriesPageHeader"
import ServiceCategoriesPagination from "./serviceCategories/ServiceCategoriesPagination"
import ServiceCategoriesTable from "./serviceCategories/ServiceCategoriesTable"

const ITEMS_PER_PAGE = 10

export function AdminServiceCategoryPage() {
    const navigate = useNavigate()

    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [page, setPage] = useState(1)
    const [loadingId, setLoadingId] = useState(null)

    useEffect(() => {
        const timeoutId = setTimeout(() => setDebouncedSearch(search), 350)
        return () => clearTimeout(timeoutId)
    }, [search])

    useEffect(() => {
        setPage(1)
    }, [debouncedSearch, statusFilter])

    const { data, isLoading, isFetching } = useGetAdminCategoriesQuery({
        page,
        limit: ITEMS_PER_PAGE,
        search: debouncedSearch,
        status: statusFilter,
    })

    const [toggleCategoryActive] = useToggleCategoryActiveMutation()
    const [adminDeleteCategory] = useAdminDeleteCategoryMutation()

    const categories = data?.categories || []
    const pagination = data?.pagination || { total: 0, totalPages: 1 }
    const kpis = data?.kpis || {}

    const { total, totalPages } = pagination
    const startIndex = total > 0 ? (page - 1) * ITEMS_PER_PAGE + 1 : 0
    const endIndex = Math.min(page * ITEMS_PER_PAGE, total)

    const handleAction = async (action, categoryId) => {
        setLoadingId(categoryId)
        try {
            let response
            if (action === "toggle") {
                response = await toggleCategoryActive(categoryId).unwrap()
            }
            if (action === "delete") {
                response = await adminDeleteCategory(categoryId).unwrap()
            }
            toast.success(response?.message || "Action successful")
        } catch (err) {
            toast.error(err?.data?.message || "Action failed. Please try again.")
        } finally {
            setLoadingId(null)
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
            <ServiceCategoriesPageHeader />

            <ServiceCategoriesKpiCards isLoading={isLoading} kpis={kpis} />

            <ServiceCategoriesControls
                search={search}
                onSearchChange={setSearch}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                onAddCategory={() => navigate("/admin/categories/add")}
            />

            <ServiceCategoriesTable
                categories={categories}
                isLoading={isLoading}
                isFetching={isFetching}
                itemsPerPage={ITEMS_PER_PAGE}
                loadingId={loadingId}
                navigate={navigate}
                onAction={handleAction}
            >
                <ServiceCategoriesPagination
                    isLoading={isLoading}
                    total={total}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    page={page}
                    totalPages={totalPages}
                    pageNumbers={getPageNumbers()}
                    onPrevious={() => setPage((p) => Math.max(p - 1, 1))}
                    onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
                    onSetPage={setPage}
                />
            </ServiceCategoriesTable>
        </div>
    )
}
