import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuery"

export const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Payment'],
    endpoints: (builder) => ({

        createPaymentOrder: builder.mutation({
            query: (bookingId) => ({
                url: `/payments/createPaymentOrder/${bookingId}`,
                method: "POST"
            }),
            invalidatesTags: ['Payment']
        }),

        verifyRazorpayPayment: builder.mutation({
            query: ({ bookingId, ...body }) => ({
                url: `/payments/verifyRazorpayPayment/${bookingId}`,
                method: "POST",
                body
            }),
            invalidatesTags: ['Payment']
        }),

        createCashPayment: builder.mutation({
            query: (bookingId) => ({
                url: `/payments/createCashPayment/${bookingId}`,
                method: "POST"
            }),
            invalidatesTags: ['Payment']
        }),

        getUserPayments: builder.query({
            query: () => "/payments/getUserPayments",
            providesTags: ['Payment']
        }),

        getProviderPayments: builder.query({
            query: () => "/payments/getProviderPayments",
            providesTags: ['Payment']
        }),

        getPaymentById: builder.query({
            query: (paymentId) => `/payments/getPaymentById/${paymentId}`,
            providesTags: ['Payment']
        })

    })
})

export const {
    useCreatePaymentOrderMutation,
    useVerifyRazorpayPaymentMutation,
    useCreateCashPaymentMutation,
    useGetUserPaymentsQuery,
    useGetProviderPaymentsQuery,
    useGetPaymentByIdQuery
} = paymentApi
