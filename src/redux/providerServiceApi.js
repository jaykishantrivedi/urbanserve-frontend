import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuery"

export const providerServiceApi = createApi({
    reducerPath: "providerServiceApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['ProviderService'],
    endpoints: (builder) => ({
        createProviderService: builder.mutation({
            query: (serviceData) => ({
                url: "/provider-services/createProviderService",
                method: "POST",
                body: serviceData
            }),
            invalidatesTags: ['ProviderService']
        }),
        getAllProviderService: builder.query({
            query: () => "/provider-services/getAllProviderService",
            providesTags: ['ProviderService']
        }),
        updateProviderService: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/provider-services/updateProviderService/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['ProviderService']
        }),
        deleteProviderService: builder.mutation({
            query: (id) => ({
                url: `/provider-services/deleteProviderService/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['ProviderService']
        }),
        toggleProviderServiceStatus: builder.mutation({
            query: (id) => ({
                url: `/provider-services/toggleProviderServiceStatus/${id}`,
                method: "PUT"
            }),
            invalidatesTags: ['ProviderService']
        }),
        getAllProviderServiceForUser: builder.query({
            query: (providerId) => `/provider-services/getAllProviderServiceForUser/${providerId}`,
            providesTags: ['ProviderService']
        })
    })
})

export const {
    useCreateProviderServiceMutation,
    useGetAllProviderServiceQuery,
    useUpdateProviderServiceMutation,
    useDeleteProviderServiceMutation,
    useToggleProviderServiceStatusMutation,
    useGetAllProviderServiceForUserQuery
} = providerServiceApi;
