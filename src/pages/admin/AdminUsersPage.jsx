import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useGetAdminUsersQuery, useToggleUserBlockMutation } from "../../redux/adminDashboardApi"
import { toast } from "react-toastify"
import UsersControls from "./users/UsersControls"
import UsersKpiCards from "./users/UsersKpiCards"
import UsersPageHeader from "./users/UsersPageHeader"
import UsersPagination from "./users/UsersPagination"
import UsersTable from "./users/UsersTable"

const ITEMS_PER_PAGE = 10

export function AdminUsersPage() {
    const navigate = useNavigate()

    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [page, setPage] = useState(1)
    const [blockingId, setBlockingId] = useState(null)

    useEffect(() => {
        const timeoutId = setTimeout(() => setDebouncedSearch(search), 350)
        return () => clearTimeout(timeoutId)
    }, [search])

    useEffect(() => {
        setPage(1)
    }, [debouncedSearch, statusFilter])

    const { data, isLoading, isFetching } = useGetAdminUsersQuery({
        page,
        limit: ITEMS_PER_PAGE,
        search: debouncedSearch,
        status: statusFilter,
    })

    const [toggleBlock] = useToggleUserBlockMutation()

    const users = data?.users || []
    const pagination = data?.pagination || { total: 0, page: 1, limit: ITEMS_PER_PAGE, totalPages: 1 }
    const kpis = data?.kpis || {}

    const { totalPages, total } = pagination
    const startIndex = total > 0 ? (page - 1) * ITEMS_PER_PAGE + 1 : 0
    const endIndex = Math.min(page * ITEMS_PER_PAGE, total)

    const newPctLabel = kpis.newPctChange
        ? { value: `${Math.abs(kpis.newPctChange)}% from last month`, isPositive: Number(kpis.newPctChange) >= 0 }
        : undefined

    const handleToggleBlock = async (userId) => {
        setBlockingId(userId)
        try {
            const response = await toggleBlock(userId).unwrap()
            toast.success(response.message)
        } catch {
            toast.error("Action failed. Please try again.")
        } finally {
            setBlockingId(null)
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
            <UsersPageHeader />

            <UsersKpiCards isLoading={isLoading} kpis={kpis} newPctLabel={newPctLabel} />

            <UsersControls
                search={search}
                onSearchChange={setSearch}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
            />

            <UsersTable
                users={users}
                isLoading={isLoading}
                isFetching={isFetching}
                itemsPerPage={ITEMS_PER_PAGE}
                onToggleBlock={handleToggleBlock}
                blockingId={blockingId}
                navigate={navigate}
            >
                <UsersPagination
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
            </UsersTable>
        </div>
    )
}
