import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuery"

export const walletApi = createApi({
    reducerPath: "walletApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Wallet'],
    endpoints: (builder) => ({
        getWalletDetails: builder.query({
            query: () => "/wallet",
            providesTags: ['Wallet']
        }),
        createWalletOrder: builder.mutation({
            query: (amountConfig) => ({
                url: "/wallet/add-money/create-order",
                method: "POST",
                body: amountConfig
            })
        }),
        verifyWalletPayment: builder.mutation({
            query: (paymentData) => ({
                url: "/wallet/add-money/verify",
                method: "POST",
                body: paymentData
            }),
            invalidatesTags: ['Wallet'] // Refresh wallet after verification
        }),
        debitWallet: builder.mutation({
            query: (debitData) => ({
                url: "/wallet/debit",
                method: "POST",
                body: debitData
            }),
            invalidatesTags: ['Wallet'] // Refresh wallet after debit
        })
    })
})

export const {
    useGetWalletDetailsQuery,
    useCreateWalletOrderMutation,
    useVerifyWalletPaymentMutation,
    useDebitWalletMutation
} = walletApi
