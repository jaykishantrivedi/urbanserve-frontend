import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuery"

export const bookingApi = createApi({
    reducerPath: "bookingApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Booking'],
    endpoints: (builder) => ({

        getUserBookings: builder.query({
            query: () => "/bookings/getUserBookings",
            providesTags: ['Booking']
        }),

        getProviderBookings: builder.query({
            query: () => "/bookings/getProviderBookings",
            providesTags: ['Booking']
        }),

        getSingleBooking: builder.query({
            query: (bookingId) => `/bookings/getSingleBooking/${bookingId}`,
            providesTags: ['Booking']
        }),

        cancelBooking: builder.mutation({
            query: (bookingId) => ({
                url: `/bookings/cancelBooking/${bookingId}`,
                method: "PUT"
            }),
            invalidatesTags: ['Booking']
        }),

        verifyStartOTP: builder.mutation({
            query: ({ bookingId, otp }) => ({
                url: `/bookings/verifyStartOTP/${bookingId}`,
                method: "POST",
                body: { otp }
            }),
            invalidatesTags: ['Booking']
        }),

        updateBookingStatus: builder.mutation({
            query: ({ bookingId, status }) => ({
                url: `/bookings/updateBookingStatus/${bookingId}`,
                method: "PUT",
                body: { status }
            }),
            invalidatesTags: ['Booking']
        }),

        generateCompletionOTP: builder.mutation({
            query: (bookingId) => ({
                url: `/bookings/generateCompletionOTP/${bookingId}`,
                method: "POST"
            }),
            invalidatesTags: ['Booking']
        }),

        verifyCompletionOTP: builder.mutation({
            query: ({ bookingId, otp }) => ({
                url: `/bookings/verifyCompletionOTP/${bookingId}`,
                method: "POST",
                body: { otp }
            }),
            invalidatesTags: ['Booking']
        }),

        setHoursWorked: builder.mutation({
            query: ({ bookingId, hoursWorked }) => ({
                url: `/bookings/setHoursWorked/${bookingId}`,
                method: "PATCH",
                body: { hoursWorked }
            }),
            invalidatesTags: ['Booking']
        }),

        setInspectionPrice: builder.mutation({
            query: ({ bookingId, finalPrice }) => ({
                url: `/bookings/setInspectionPrice/${bookingId}`,
                method: "PATCH",
                body: { finalPrice }
            }),
            invalidatesTags: ['Booking']
        })

    })
})

export const {
    useGetUserBookingsQuery,
    useGetProviderBookingsQuery,
    useGetSingleBookingQuery,
    useCancelBookingMutation,
    useVerifyStartOTPMutation,
    useUpdateBookingStatusMutation,
    useGenerateCompletionOTPMutation,
    useVerifyCompletionOTPMutation,
    useSetHoursWorkedMutation,
    useSetInspectionPriceMutation
} = bookingApi
