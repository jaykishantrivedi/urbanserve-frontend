import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuery"

export const providerResponseApi = createApi({
    reducerPath: "providerResponseApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['ProviderResponse', 'ServiceRequest'],
    endpoints: (builder) => ({
        
        getAcceptedResponsesForRequest: builder.query({
            query: (requestId) => `/provider-responses/getAcceptedResponsesForRequest/${requestId}`,
            providesTags: ['ProviderResponse']
        }),

        chooseProvider: builder.mutation({
            query: (responseId) => ({
                url: `/provider-responses/chooseProvider/${responseId}`,
                method: "POST"
            }),
            invalidatesTags: ['ProviderResponse', 'ServiceRequest'] // Invalidates both so Request UI refreshes to "Closed"
        }),

        getProviderRequests: builder.query({
            query: () => "/provider-responses/getProviderRequests",
            providesTags: ['ProviderResponse']
        }),

        acceptServiceRequest: builder.mutation({
            query: ({ responseId, ...body }) => ({
                url: `/provider-responses/acceptServiceRequest/${responseId}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ['ProviderResponse']
        }),

        rejectServiceRequest: builder.mutation({
            query: (responseId) => ({
                url: `/provider-responses/rejectServiceRequest/${responseId}`,
                method: "PUT"
            }),
            invalidatesTags: ['ProviderResponse']
        }),

        declineProviderQuote: builder.mutation({
            query: (responseId) => ({
                url: `/provider-responses/declineProviderQuote/${responseId}`,
                method: "PUT"
            }),
            invalidatesTags: ['ProviderResponse']
        })

    })
})

export const {
    useGetAcceptedResponsesForRequestQuery,
    useChooseProviderMutation,
    useGetProviderRequestsQuery,
    useAcceptServiceRequestMutation,
    useRejectServiceRequestMutation,
    useDeclineProviderQuoteMutation
} = providerResponseApi
