import { useState } from "react"
import {
    useGetDashboardKPIsQuery,
    useGetBookingTrendsQuery,
    useGetRevenueTrendsQuery,
    useGetProviderStatusDistributionQuery,
    useGetBookingStatusDistributionQuery,
    useGetCategoryPopularityQuery,
} from "../../redux/adminDashboardApi"
import { DashboardBookingTrendsCard } from "./dashboard/DashboardBookingTrendsCard"
import { DashboardCategoryPopularityCard } from "./dashboard/DashboardCategoryPopularityCard"
import { DashboardKpiSection } from "./dashboard/DashboardKpiSection"
import { DashboardRevenueOverviewCard } from "./dashboard/DashboardRevenueOverviewCard"
import { DashboardStatusPieRow } from "./dashboard/DashboardStatusPieRow"

export function AdminDashboard() {
    const [bookingVariant, setBookingVariant] = useState("currentMonth")
    const [revenueVariant, setRevenueVariant] = useState("currentMonth")

    const { data: kpiData, isLoading: kpiLoading } = useGetDashboardKPIsQuery()
    const { data: bookingTrends, isLoading: btLoading } = useGetBookingTrendsQuery(bookingVariant)
    const { data: revenueTrends, isLoading: rtLoading } = useGetRevenueTrendsQuery(revenueVariant)
    const { data: providerStatus, isLoading: psLoading } = useGetProviderStatusDistributionQuery()
    const { data: bookingStatus, isLoading: bsLoading } = useGetBookingStatusDistributionQuery()
    const { data: categoryData, isLoading: catLoading } = useGetCategoryPopularityQuery()

    const k = kpiData?.kpis

    return (
        <div className="p-5 sm:p-6 space-y-6">
            <DashboardKpiSection kpis={k} isLoading={kpiLoading} />

            <DashboardBookingTrendsCard
                variant={bookingVariant}
                onVariantChange={setBookingVariant}
                isLoading={btLoading}
                data={bookingTrends?.data}
            />

            <DashboardRevenueOverviewCard
                variant={revenueVariant}
                onVariantChange={setRevenueVariant}
                isLoading={rtLoading}
                data={revenueTrends?.data}
            />

            <DashboardStatusPieRow
                providerStatusData={providerStatus?.data}
                bookingStatusData={bookingStatus?.data}
                isProviderStatusLoading={psLoading}
                isBookingStatusLoading={bsLoading}
            />

            <DashboardCategoryPopularityCard
                isLoading={catLoading}
                data={categoryData?.data}
            />
        </div>
    )
}
