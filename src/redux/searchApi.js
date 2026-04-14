import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuery"

export const searchApi = createApi({
    reducerPath: "searchApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({

        searchProviders: builder.query({
            query: ({ service, city, minPrice, maxPrice, priceType, minRating, experience, sort }) => {
                const params = new URLSearchParams()
                if (service) params.set("service", service)
                if (city) params.set("city", city)
                if (minPrice) params.set("minPrice", minPrice)
                if (maxPrice) params.set("maxPrice", maxPrice)
                if (priceType) params.set("priceType", priceType)
                if (minRating) params.set("minRating", minRating)
                if (experience) params.set("experience", experience)
                if (sort) params.set("sort", sort)
                return `/search/providers?${params.toString()}`
            }
        }),

        searchCities: builder.query({
            query: (q) => `/search/cities?q=${encodeURIComponent(q)}`
        }),

    })
})

export const {
    useSearchProvidersQuery,
    useSearchCitiesQuery,
} = searchApi