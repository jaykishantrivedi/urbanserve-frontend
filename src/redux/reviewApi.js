import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuery"

export const reviewApi = createApi({
    reducerPath: "reviewApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Review'],
    endpoints: (builder) => ({

        createReview: builder.mutation({
            query: ({ bookingId, ...body }) => ({
                url: `/reviews/createReview/${bookingId}`,
                method: "POST",
                body
            }),
            invalidatesTags: ['Review']
        }),

        getUserReviews: builder.query({
            query: () => "/reviews/getUserReviews",
            providesTags: ['Review']
        }),

        getMyReviewForBooking: builder.query({
            query: (bookingId) => `/reviews/getMyReviewForBooking/${bookingId}`,
            providesTags: ['Review']
        }),

        getProviderReviews: builder.query({
            query: (providerId) => `/reviews/getProviderReviews/${providerId}`,
            providesTags: ['Review']
        })

    })
})

export const {
    useCreateReviewMutation,
    useGetUserReviewsQuery,
    useGetMyReviewForBookingQuery,
    useGetProviderReviewsQuery
} = reviewApi
