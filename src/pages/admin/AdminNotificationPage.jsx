import { useState, useEffect } from "react"
import {
    useGetAdminNotificationsQuery,
    useAdminToggleNotificationStatusMutation,
    useAdminDeleteNotificationMutation
} from "../../redux/adminDashboardApi"
import { toast } from "react-toastify"
import NotificationsControls from "./notifications/NotificationsControls"
import NotificationsKpiCards from "./notifications/NotificationsKpiCards"
import NotificationsPageHeader from "./notifications/NotificationsPageHeader"
import NotificationsPagination from "./notifications/NotificationsPagination"
import NotificationsTable from "./notifications/NotificationsTable"
import {
    formatNotificationDate,
    getNotificationPageNumbers,
    getNotificationStatusBadgeColor,
    getNotificationTypeBadgeColor,
    truncateNotificationMessage,
} from "./notifications/notificationsUtils"

const ITEMS_PER_PAGE = 10

export function AdminNotificationPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [debouncedSearch, setDebounced] = useState("")
    const [typeFilter, setTypeFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")
    const [page, setPage] = useState(1)
    const [loadingId, setLoadingId] = useState(null)

    useEffect(() => {
        const t = setTimeout(() => setDebounced(searchQuery), 400)
        return () => clearTimeout(t)
    }, [searchQuery])

    useEffect(() => { setPage(1) }, [debouncedSearch, typeFilter, statusFilter])

    const { data, isLoading, isFetching } = useGetAdminNotificationsQuery({
        page,
        limit: ITEMS_PER_PAGE,
        search: debouncedSearch,
        type: typeFilter,
        status: statusFilter
    })

    const [toggleStatus] = useAdminToggleNotificationStatusMutation()
    const [deleteNotification] = useAdminDeleteNotificationMutation()

    const notifications = data?.notifications || []
    const pagination = data?.pagination || { total: 0, totalPages: 1 }
    const kpis = data?.kpis || {
        totalNotifications: 0, unreadNotifications: 0, userNotifications: 0, providerNotifications: 0
    }

    const { total, totalPages } = pagination
    const startIndex = total > 0 ? (page - 1) * ITEMS_PER_PAGE + 1 : 0
    const endIndex = Math.min(page * ITEMS_PER_PAGE, total)

    const handleToggle = async (id) => {
        setLoadingId(id)
        try {
            await toggleStatus(id).unwrap()
            toast.success("Notification status updated")
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update notification")
        } finally {
            setLoadingId(null)
        }
    }

    const handleDelete = async (id) => {
        setLoadingId(id)
        try {
            const res = await deleteNotification(id).unwrap()
            toast.success(res.message || "Notification deleted")
        } catch (error) {
            toast.error(error?.data?.message || "Failed to delete notification")
        } finally {
            setLoadingId(null)
        }
    }

    const pageNumbers = getNotificationPageNumbers(page, totalPages)

    return (
        <div className="p-6 space-y-6">
            <NotificationsPageHeader />

            <NotificationsKpiCards isLoading={isLoading} kpis={kpis} />

            <NotificationsControls
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                typeFilter={typeFilter}
                onTypeFilterChange={setTypeFilter}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
            />

            <NotificationsTable
                notifications={notifications}
                isLoading={isLoading}
                isFetching={isFetching}
                itemsPerPage={ITEMS_PER_PAGE}
                getTypeBadgeColor={getNotificationTypeBadgeColor}
                getStatusBadgeColor={getNotificationStatusBadgeColor}
                formatDate={formatNotificationDate}
                truncateMessage={truncateNotificationMessage}
                loadingId={loadingId}
                onToggle={handleToggle}
                onDelete={handleDelete}
            >
                <NotificationsPagination
                    isLoading={isLoading}
                    total={total}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    page={page}
                    totalPages={totalPages}
                    pageNumbers={pageNumbers}
                    onPrevious={() => setPage(p => Math.max(p - 1, 1))}
                    onNext={() => setPage(p => Math.min(p + 1, totalPages))}
                    onSetPage={setPage}
                />
            </NotificationsTable>
        </div>
    )
}
