import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    useGetAdminPaymentsQuery,
    useAdminRefundPaymentMutation,
    useAdminFailPaymentMutation,
} from "../../redux/adminDashboardApi"
import { toast } from "react-toastify"
import PaymentsControls from "./payments/PaymentsControls"
import PaymentsKpiCards from "./payments/PaymentsKpiCards"
import PaymentsPageHeader from "./payments/PaymentsPageHeader"
import PaymentsPagination from "./payments/PaymentsPagination"
import PaymentsTable from "./payments/PaymentsTable"

const ITEMS_PER_PAGE = 10

export function AdminPaymentsPage() {
    const navigate = useNavigate()

    const [searchQuery, setSearchQuery]   = useState("")
    const [debouncedSearch, setDebounced] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [methodFilter, setMethodFilter] = useState("all")
    const [page, setPage]                 = useState(1)
    const [loadingId, setLoadingId]       = useState(null)

    // Debounce search
    useEffect(() => {
        const t = setTimeout(() => setDebounced(searchQuery), 400)
        return () => clearTimeout(t)
    }, [searchQuery])

    // Reset pagination
    useEffect(() => { setPage(1) }, [debouncedSearch, statusFilter, methodFilter])

    const { data, isLoading, isFetching } = useGetAdminPaymentsQuery({
        page, limit: ITEMS_PER_PAGE,
        search: debouncedSearch,
        status: statusFilter,
        method: methodFilter,
    })

    const [refundPayment] = useAdminRefundPaymentMutation()
    const [failPayment]   = useAdminFailPaymentMutation()

    const payments   = data?.payments   || []
    const pagination = data?.pagination || { total: 0, totalPages: 1 }
    const kpis       = data?.kpis       || {}

    const { total, totalPages } = pagination
    const startIndex = total > 0 ? (page - 1) * ITEMS_PER_PAGE + 1 : 0
    const endIndex   = Math.min(page * ITEMS_PER_PAGE, total)

    const handleAction = async (action, id) => {
        setLoadingId(id)
        try {
            if (action === "refund") await refundPayment(id).unwrap()
            if (action === "fail")   await failPayment(id).unwrap()
            toast.success("Action applied successfully")
        } catch (err) {
            toast.error(err?.data?.message || "Failed to alter payment")
        } finally {
            setLoadingId(null)
        }
    }

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case "paid":     return "bg-green-100 text-green-700"
            case "pending":  return "bg-yellow-100 text-yellow-700"
            case "failed":   return "bg-red-100 text-red-700"
            case "refunded": return "bg-purple-100 text-purple-700"
            default:         return "bg-gray-100 text-gray-700"
        }
    }

    const getMethodBadgeColor = (method) => {
        switch ((method || "").toLowerCase()) {
            case "upi":        return "bg-blue-50 text-blue-700 border border-blue-200"
            case "card":       return "bg-indigo-50 text-indigo-700 border border-indigo-200"
            case "netbanking": return "bg-cyan-50 text-cyan-700 border border-cyan-200"
            case "wallet":     return "bg-purple-50 text-purple-700 border border-purple-200"
            case "cash":       return "bg-green-50 text-green-700 border border-green-200"
            default:           return "bg-gray-50 text-gray-700 border border-gray-200"
        }
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A"
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric",
            hour: "2-digit", minute: "2-digit",
        })
    }

    const getPageNumbers = () => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
        const pages = new Set([1, totalPages, page, page - 1, page + 1])
        return [...pages].filter(p => p >= 1 && p <= totalPages).sort((a, b) => a - b)
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <PaymentsPageHeader />
            </div>

            <PaymentsKpiCards isLoading={isLoading} kpis={kpis} />

            <PaymentsControls
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                methodFilter={methodFilter}
                onMethodChange={setMethodFilter}
            />

            <PaymentsTable
                payments={payments}
                isLoading={isLoading}
                isFetching={isFetching}
                itemsPerPage={ITEMS_PER_PAGE}
                navigate={navigate}
                onAction={handleAction}
                loadingId={loadingId}
                getMethodBadgeColor={getMethodBadgeColor}
                getStatusBadgeColor={getStatusBadgeColor}
                formatDate={formatDate}
            >
                <PaymentsPagination
                    isLoading={isLoading}
                    total={total}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    page={page}
                    totalPages={totalPages}
                    pageNumbers={getPageNumbers()}
                    onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
                    onNext={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    onSetPage={setPage}
                />
            </PaymentsTable>
        </div>
    )
}
