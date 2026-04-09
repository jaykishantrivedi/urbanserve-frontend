import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuery"

export const adminDashboardApi = createApi({
    reducerPath: "adminDashboardApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["AdminDashboard", "AdminUsers", "AdminProviders", "AdminServices", "AdminCategories", "AdminBookings", "AdminPayments", "AdminReviews", "AdminNotifications", "AdminSettings", "AdminAlerts"],

    endpoints: (builder) => ({
        getDashboardKPIs: builder.query({
            query: () => "/admin/dashboard/kpis",
            providesTags: ["AdminDashboard"],
        }),
        getBookingTrends: builder.query({
            query: (variant = "currentMonth") => `/admin/dashboard/booking-trends?variant=${variant}`,
            providesTags: ["AdminDashboard"],
        }),
        getRevenueTrends: builder.query({
            query: (variant = "currentMonth") => `/admin/dashboard/revenue-trends?variant=${variant}`,
            providesTags: ["AdminDashboard"],
        }),
        getProviderStatusDistribution: builder.query({
            query: () => "/admin/dashboard/provider-status",
            providesTags: ["AdminDashboard"],
        }),
        getBookingStatusDistribution: builder.query({
            query: () => "/admin/dashboard/booking-status",
            providesTags: ["AdminDashboard"],
        }),
        getCategoryPopularity: builder.query({
            query: () => "/admin/dashboard/category-popularity",
            providesTags: ["AdminDashboard"],
        }),
        // ── User Management ──────────────────────────────────────────────
        getAdminUsers: builder.query({
            query: ({ page = 1, limit = 10, search = "", status = "all" } = {}) => {
                const params = new URLSearchParams({ page, limit, search, status })
                return `/admin/dashboard/users?${params}`
            },
            providesTags: ["AdminUsers"],
        }),
        toggleUserBlock: builder.mutation({
            query: (userId) => ({
                url: `/admin/dashboard/users/${userId}/block`,
                method: "PATCH",
            }),
            invalidatesTags: ["AdminUsers"],
        }),
        getAdminUserById: builder.query({
            query: (userId) => `/admin/dashboard/users/${userId}`,
            providesTags: (result, error, userId) => [{ type: "AdminUsers", id: userId }],
        }),
        // ── Provider Management ──────────────────────────────────────────
        getAdminProviders: builder.query({
            query: ({ page = 1, limit = 10, search = "", status = "all" } = {}) => {
                const params = new URLSearchParams({ page, limit, search, status })
                return `/admin/dashboard/providers?${params}`
            },
            providesTags: ["AdminProviders"],
        }),
        getAdminProviderById: builder.query({
            query: (providerId) => `/admin/dashboard/providers/${providerId}`,
            providesTags: (result, error, id) => [{ type: "AdminProviders", id }],
        }),
        approveProvider: builder.mutation({
            query: (providerId) => ({ url: `/admin/dashboard/providers/${providerId}/approve`, method: "PATCH" }),
            invalidatesTags: ["AdminProviders"],
        }),
        toggleProviderBlock: builder.mutation({
            query: (providerId) => ({ url: `/admin/dashboard/providers/${providerId}/block`, method: "PATCH" }),
            invalidatesTags: ["AdminProviders"],
        }),
        deleteProvider: builder.mutation({
            query: (providerId) => ({ url: `/admin/dashboard/providers/${providerId}`, method: "DELETE" }),
            invalidatesTags: ["AdminProviders"],
        }),
        rejectProvider: builder.mutation({
            query: (providerId) => ({ url: `/admin/dashboard/providers/${providerId}/reject`, method: "PATCH" }),
            invalidatesTags: ["AdminProviders"],
        }),
        getAdminProviderServices: builder.query({
            query: (providerId) => `/admin/dashboard/providers/${providerId}/services`,
            providesTags: (result, error, id) => [{ type: "AdminProviders", id }],
        }),
        // ── Service Management ────────────────────────────────────────────
        getAdminServices: builder.query({
            query: ({ page = 1, limit = 10, search = "", status = "all", category = "all" } = {}) => {
                const params = new URLSearchParams({ page, limit, search, status, category })
                return `/admin/dashboard/services?${params}`
            },
            providesTags: ["AdminServices"],
        }),
        getAdminServiceCategories: builder.query({
            query: () => "/admin/dashboard/services/categories",
            providesTags: ["AdminServices"],
        }),
        toggleServiceActive: builder.mutation({
            query: (serviceId) => ({ url: `/admin/dashboard/services/${serviceId}/toggle-active`, method: "PATCH" }),
            invalidatesTags: ["AdminServices"],
        }),
        adminDeleteService: builder.mutation({
            query: (serviceId) => ({ url: `/admin/dashboard/services/${serviceId}`, method: "DELETE" }),
            invalidatesTags: ["AdminServices"],
        }),
        // Create service (multipart — uses existing service route)
        adminCreateService: builder.mutation({
            query: (formData) => ({
                url: "/services/createService",
                method: "POST",
                body: formData,
                // Don't set Content-Type; browser adds multipart boundary automatically
                formData: true,
            }),
            invalidatesTags: ["AdminServices"],
        }),
        // Get single service by ID
        getAdminServiceById: builder.query({
            query: (serviceId) => `/admin/dashboard/services/${serviceId}`,
            providesTags: (result, error, id) => [{ type: "AdminServices", id }],
        }),
        // Update service (JSON body — name, description, category, isActive)
        adminUpdateService: builder.mutation({
            query: ({ serviceId, ...body }) => ({
                url: `/admin/dashboard/services/${serviceId}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["AdminServices"],
        }),
        // ── Category Management ────────────────────────────────────────────
        getAdminCategories: builder.query({
            query: ({ page = 1, limit = 10, search = "", status = "all" } = {}) => {
                const params = new URLSearchParams({ page, limit, search, status })
                return `/admin/dashboard/categories?${params}`
            },
            providesTags: ["AdminCategories"],
        }),
        getAdminCategoryById: builder.query({
            query: (categoryId) => `/admin/dashboard/categories/${categoryId}`,
            providesTags: (result, error, id) => [{ type: "AdminCategories", id }],
        }),
        adminCreateCategory: builder.mutation({
            query: (formData) => ({
                url: "/admin/dashboard/categories",
                method: "POST",
                body: formData,
                formData: true,
            }),
            invalidatesTags: ["AdminCategories"],
        }),
        adminUpdateCategory: builder.mutation({
            query: ({ categoryId, formData }) => ({
                url: `/admin/dashboard/categories/${categoryId}`,
                method: "PUT",
                body: formData,
                formData: true,
            }),
            invalidatesTags: ["AdminCategories"],
        }),
        toggleCategoryActive: builder.mutation({
            query: (categoryId) => ({ url: `/admin/dashboard/categories/${categoryId}/toggle-active`, method: "PATCH" }),
            invalidatesTags: ["AdminCategories"],
        }),
        adminDeleteCategory: builder.mutation({
            query: (categoryId) => ({ url: `/admin/dashboard/categories/${categoryId}`, method: "DELETE" }),
            invalidatesTags: ["AdminCategories"],
        }),
        // ── Booking Management ────────────────────────────────────────────
        getAdminBookings: builder.query({
            query: ({ page = 1, limit = 10, search = "", status = "all" } = {}) => {
                const params = new URLSearchParams({ page, limit, search, status })
                return `/admin/dashboard/bookings?${params}`
            },
            providesTags: ["AdminBookings"],
        }),
        getAdminBookingById: builder.query({
            query: (bookingId) => `/admin/dashboard/bookings/${bookingId}`,
            providesTags: (result, error, id) => [{ type: "AdminBookings", id }],
        }),
        adminCancelBooking: builder.mutation({
            query: (bookingId) => ({ url: `/admin/dashboard/bookings/${bookingId}/cancel`, method: "PATCH" }),
            invalidatesTags: ["AdminBookings"],
        }),
        adminMarkCompleted: builder.mutation({
            query: (bookingId) => ({ url: `/admin/dashboard/bookings/${bookingId}/complete`, method: "PATCH" }),
            invalidatesTags: ["AdminBookings"],
        }),
        // ── Payment Management ────────────────────────────────────────────
        getAdminPayments: builder.query({
            query: ({ page = 1, limit = 10, search = "", status = "all", method = "all" } = {}) => {
                const params = new URLSearchParams({ page, limit, search, status, method })
                return `/admin/dashboard/payments?${params}`
            },
            providesTags: ["AdminPayments"],
        }),
        adminRefundPayment: builder.mutation({
            query: (paymentId) => ({ url: `/admin/dashboard/payments/${paymentId}/refund`, method: "PATCH" }),
            invalidatesTags: ["AdminPayments"],
        }),
        adminFailPayment: builder.mutation({
            query: (paymentId) => ({ url: `/admin/dashboard/payments/${paymentId}/fail`, method: "PATCH" }),
            invalidatesTags: ["AdminPayments"],
        }),
        // ── Review Management ─────────────────────────────────────────────
        getAdminReviews: builder.query({
            query: ({ page = 1, limit = 10, search = "", rating = "all" } = {}) => {
                const params = new URLSearchParams({ page, limit, search, rating })
                return `/admin/dashboard/reviews?${params}`
            },
            providesTags: ["AdminReviews"],
        }),
        adminDeleteReview: builder.mutation({
            query: (reviewId) => ({ url: `/admin/dashboard/reviews/${reviewId}`, method: "DELETE" }),
            invalidatesTags: ["AdminReviews", "AdminDashboard"], // Deleting a review might impact global metrics
        }),
        // ── Notification Management ───────────────────────────────────────
        getAdminNotifications: builder.query({
            query: ({ page = 1, limit = 10, search = "", type = "all", status = "all" } = {}) => {
                const params = new URLSearchParams({ page, limit, search, type, status })
                return `/admin/dashboard/notifications?${params}`
            },
            providesTags: ["AdminNotifications"],
        }),
        adminToggleNotificationStatus: builder.mutation({
            query: (notificationId) => ({ url: `/admin/dashboard/notifications/${notificationId}/toggle`, method: "PATCH" }),
            invalidatesTags: ["AdminNotifications"],
        }),
        adminDeleteNotification: builder.mutation({
            query: (notificationId) => ({ url: `/admin/dashboard/notifications/${notificationId}`, method: "DELETE" }),
            invalidatesTags: ["AdminNotifications", "AdminDashboard"],
        }),
        // ── Settings Management ───────────────────────────────────────────
        getAdminSettings: builder.query({
            query: () => "/admin-settings",
            providesTags: ["AdminSettings"],
        }),
        updateAdminSettings: builder.mutation({
            query: (settingsData) => ({
                url: "/admin-settings",
                method: "POST",
                body: settingsData,
            }),
            invalidatesTags: ["AdminSettings"],
        }),
        // ── Admin Alert Management (bell icon) ───────────────────────────
        getAdminAlerts: builder.query({
            query: () => "/admin/dashboard/alerts",
            providesTags: ["AdminAlerts"],
            // Poll every 30 seconds to pick up new provider registrations
            keepUnusedDataFor: 30,
        }),
        markAdminAlertRead: builder.mutation({
            query: (alertId) => ({
                url: `/admin/dashboard/alerts/${alertId}/read`,
                method: "PATCH"
            }),
            invalidatesTags: ["AdminAlerts"]
        }),
        markAllAdminAlertsRead: builder.mutation({
            query: () => ({
                url: "/admin/dashboard/alerts/mark-all-read",
                method: "PATCH"
            }),
            invalidatesTags: ["AdminAlerts"]
        }),
    })
});

export const {
    useGetDashboardKPIsQuery,
    useGetBookingTrendsQuery,
    useGetRevenueTrendsQuery,
    useGetProviderStatusDistributionQuery,
    useGetBookingStatusDistributionQuery,
    useGetCategoryPopularityQuery,
    useGetAdminUsersQuery,
    useToggleUserBlockMutation,
    useGetAdminUserByIdQuery,
    useGetAdminProvidersQuery,
    useGetAdminProviderByIdQuery,
    useApproveProviderMutation,
    useToggleProviderBlockMutation,
    useDeleteProviderMutation,
    useRejectProviderMutation,
    useGetAdminProviderServicesQuery,
    useGetAdminServicesQuery,
    useGetAdminServiceCategoriesQuery,
    useToggleServiceActiveMutation,
    useAdminDeleteServiceMutation,
    useAdminCreateServiceMutation,
    useGetAdminServiceByIdQuery,
    useAdminUpdateServiceMutation,
    useGetAdminCategoriesQuery,
    useGetAdminCategoryByIdQuery,
    useAdminCreateCategoryMutation,
    useAdminUpdateCategoryMutation,
    useToggleCategoryActiveMutation,
    useAdminDeleteCategoryMutation,
    useGetAdminBookingsQuery,
    useGetAdminBookingByIdQuery,
    useAdminCancelBookingMutation,
    useAdminMarkCompletedMutation,
    useGetAdminPaymentsQuery,
    useAdminRefundPaymentMutation,
    useAdminFailPaymentMutation,
    useGetAdminReviewsQuery,
    useAdminDeleteReviewMutation,
    useGetAdminNotificationsQuery,
    useAdminToggleNotificationStatusMutation,
    useAdminDeleteNotificationMutation,
    useGetAdminSettingsQuery,
    useUpdateAdminSettingsMutation,
    useGetAdminAlertsQuery,
    useMarkAdminAlertReadMutation,
    useMarkAllAdminAlertsReadMutation,
} = adminDashboardApi
