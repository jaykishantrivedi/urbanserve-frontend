import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuery"

export const providerApi = createApi({
    reducerPath: "providerApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['ProviderProfile'],
    endpoints: (builder) => ({
        createProviderProfile: builder.mutation({
            query: (providerData) => ({
                url: "/service-providers/createServiceProvider",
                method: "POST",
                body: providerData
            }),
            invalidatesTags: ['ProviderProfile']
        }),
        getProviderProfile: builder.query({
            query: () => "/service-providers/getServiceProviderProfile",
            providesTags: (result) => result ? [{ type: 'ProviderProfile', id: 'MINE' }] : []
        }),
        getServiceProviderById: builder.query({
            query: (id) => `/service-providers/getServiceProviderById/${id}`,
            providesTags: (result, error, id) => result ? [{ type: 'ProviderProfile', id }] : []
        }),
        updateProviderProfile: builder.mutation({
            query: (profileData) => ({
                url: "/service-providers/updateServiceProviderProfile",
                method: "PUT",
                body: profileData
            }),
            invalidatesTags: [{ type: 'ProviderProfile', id: 'MINE' }]
        })
    })
})

export const {
    useCreateProviderProfileMutation,
    useGetProviderProfileQuery,
    useGetServiceProviderByIdQuery,
    useUpdateProviderProfileMutation
} = providerApi
