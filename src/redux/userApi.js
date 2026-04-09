import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuery"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["UserProfile"],
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: () => "/users/profile",
            providesTags: ["UserProfile"]
        }),
        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: "/users/profile",
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["UserProfile"]
        })
    })
})

export const {
    useGetUserProfileQuery,
    useUpdateUserProfileMutation
} = userApi
