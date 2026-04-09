import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useGetAdminReviewsQuery, useAdminDeleteReviewMutation } from "../../redux/adminDashboardApi"
import { toast } from "react-toastify"
import RatingDistributionCard from "./reviews/RatingDistributionCard"
import ReviewsControls from "./reviews/ReviewsControls"
import ReviewsKpiCards from "./reviews/ReviewsKpiCards"
import ReviewsPageHeader from "./reviews/ReviewsPageHeader"
import ReviewsPagination from "./reviews/ReviewsPagination"
import ReviewsTable from "./reviews/ReviewsTable"

const ITEMS_PER_PAGE = 10

export function AdminReviewsPage() {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState("")
    const [debouncedSearch, setDebounced] = useState("")
    const [ratingFilter, setRatingFilter] = useState("all")
    const [page, setPage] = useState(1)
    const [loadingId, setLoadingId] = useState(null)

    // Debounce search
    useEffect(() => {
        const t = setTimeout(() => setDebounced(searchQuery), 400)
        return () => clearTimeout(t)
    }, [searchQuery])

    // Reset pagination on filter change
    useEffect(() => { setPage(1) }, [debouncedSearch, ratingFilter])

    const { data, isLoading, isFetching } = useGetAdminReviewsQuery({
        page,
        limit: ITEMS_PER_PAGE,
        search: debouncedSearch,
        rating: ratingFilter
    })

    const [deleteReview] = useAdminDeleteReviewMutation()

    const reviews = data?.reviews || []
    const pagination = data?.pagination || { total: 0, totalPages: 1 }
    const kpis = data?.kpis || {
        totalReviews: 0, averageRating: "0.0", fiveStarReviews: 0, lowRatings: 0,
        ratingDistribution: []
    }

    const { total, totalPages } = pagination
    const startIndex = total > 0 ? (page - 1) * ITEMS_PER_PAGE + 1 : 0
    const endIndex = Math.min(page * ITEMS_PER_PAGE, total)

    const handleDelete = async (id) => {
        setLoadingId(id)
        try {
            const res = await deleteReview(id).unwrap()
            toast.success(res.message || "Review deleted")
        } catch (error) {
            toast.error(error?.data?.message || "Failed to delete review")
        } finally {
            setLoadingId(null)
        }
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return "—"
        const date = new Date(dateStr)
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })
    }

    const truncateReview = (text) => {
        if (!text) return "—"
        return text.length > 50 ? text.substring(0, 50) + "..." : text
    }

    const getPageNumbers = () => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
        const pages = new Set([1, totalPages, page, page - 1, page + 1])
        return [...pages].filter(p => p >= 1 && p <= totalPages).sort((a, b) => a - b)
    }

    return (
        <div className="p-6 space-y-6">
            <ReviewsPageHeader />

            <ReviewsKpiCards isLoading={isLoading} kpis={kpis} />

            <RatingDistributionCard ratingDistribution={kpis.ratingDistribution || []} />

            <ReviewsControls
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                ratingFilter={ratingFilter}
                onRatingFilterChange={setRatingFilter}
            />

            <ReviewsTable
                reviews={reviews}
                isLoading={isLoading}
                isFetching={isFetching}
                itemsPerPage={ITEMS_PER_PAGE}
                truncateReview={truncateReview}
                formatDate={formatDate}
                loadingId={loadingId}
                onDelete={handleDelete}
                navigate={navigate}
            >
                <ReviewsPagination
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
            </ReviewsTable>
        </div>
    )
}
