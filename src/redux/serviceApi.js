import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuery"

export const serviceApi = createApi({
    reducerPath: "serviceApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({

        getAllServices: builder.query({
            query: () => "/services/getAllService"
        }),

        getServiceBySlug: builder.query({
            query: (slug) => `/services/getServiceBySlug/${slug}`
        }),

        getServicesByCategory: builder.query({
            query: (slug) => `/services/getServicesByCategory/${slug}`
        }),

        searchService: builder.query({
            query: (q) => `/services/searchService?q=${q}`
        }),

    })
})

export const {
    useGetAllServicesQuery,
    useGetServiceBySlugQuery,
    useGetServicesByCategoryQuery,
    useSearchServiceQuery
} = serviceApi