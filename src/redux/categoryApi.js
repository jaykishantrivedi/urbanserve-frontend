import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuery"

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({

        getAllCategories: builder.query({
            query: () => "/service-categories/getAllCategories"
        }),

        getCategoryBySlug: builder.query({
            query: (slug) => `/service-categories/getCategoryBySlug/${slug}`
        }),

    })
})

export const {
    useGetAllCategoriesQuery,
    useGetCategoryBySlugQuery,
} = categoryApi