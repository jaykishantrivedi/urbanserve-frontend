import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuery"

export const serviceRequestApi = createApi({
    reducerPath: "serviceRequestApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['ServiceRequest'],
    endpoints: (builder) => ({

        createServiceRequest: builder.mutation({
            query: (body) => ({
                url: "/service-requests/createServiceRequest",
                method: "POST",
                body
            }),
            invalidatesTags: ['ServiceRequest']
        }),

        sendRequestToProviders: builder.mutation({
            query: ({ requestId, providerId }) => {
                const url = providerId
                    ? `/provider-responses/sendRequestToProviders/${requestId}?providerId=${providerId}`
                    : `/provider-responses/sendRequestToProviders/${requestId}`
                return { url, method: "POST" }
            },
            invalidatesTags: ['ServiceRequest']
        }),

        // Correct URL matching backend route
        getUserRequests: builder.query({
            query: () => "/service-requests/getAllServiceRequest",
            providesTags: ['ServiceRequest']
        }),

        cancelServiceRequest: builder.mutation({
            query: (id) => ({
                url: `/service-requests/cancelServiceRequest/${id}`,
                method: "PUT"  // backend now uses PUT
            }),
            invalidatesTags: ['ServiceRequest']
        })

    })
})

export const {
    useCreateServiceRequestMutation,
    useSendRequestToProvidersMutation,
    useGetUserRequestsQuery,
    useCancelServiceRequestMutation
} = serviceRequestApi