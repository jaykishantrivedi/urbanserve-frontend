// import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
// import { data } from "react-router-dom"

// export const authApi = createApi({
//     baseQuery : fetchBaseQuery({
//         baseUrl : "http://localhost:8080/api/auth",
//         credentials:"include"
//     }),
//     endpoints:(builder)=>({
//         signUp:builder.mutation({
//             query:(data)=>({
//                 url:"/signup",
//                 method:"POST",
//                 body:data
//             })
//         }),
//         signIn:builder.mutation({
//             query:(data)=>({
//                 url:"/signin",
//                 method:"POST",
//                 body:data
//             })
//         }),
//         verifyEmail:builder.mutation({
//             query:(data)=>({
//                 url:"/verifyOTP-email",
//                 method:"POST",
//                 body:data
//             })
//         }),
//         resendEmailOtp:builder.mutation({
//             query:(data)=>({
//                 url:"/resendOTP-email",
//                 method:"POST",
//                 body:data
//             })
//         }),
//         forgotPassword:builder.mutation({
//             query:(data)=>({
//                 url:"/forgot-password",
//                 method:"POST",
//                 body:data
//             })
//         }),
//         resetPassword:builder.mutation({
//             query:(data)=>({
//                 url:"/reset-password",
//                 method:"POST",
//                 body:data
//             })
//         }),
//         googleAuth:builder.mutation({
//             query:(data)=>({
//                 url: "/googleAuth",
//                 method: "POST",
//                 body: data
//             })
//         })
//     })
// })

// export const { useSignUpMutation, useSignInMutation, useVerifyEmailMutation, useResendEmailOtpMutation, useForgotPasswordMutation, useResetPasswordMutation, useGoogleAuthMutation } = authApi

import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuery.js"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (data) => ({
                url: "/auth/signup",
                method: "POST",
                body: data
            })
        }),
        signIn: builder.mutation({
            query: (data) => ({
                url: "/auth/signin",
                method: "POST",
                body: data
            })
        }),
        verifyEmail: builder.mutation({
            query: (data) => ({
                url: "/auth/verifyOTP-email",
                method: "POST",
                body: data
            })
        }),
        resendEmailOtp: builder.mutation({
            query: (data) => ({
                url: "auth/resendOTP-email",
                method: "POST",
                body: data
            })
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: data
            })
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: data
            })
        }),
        googleAuth: builder.mutation({
            query: (data) => ({
                url: "/auth/googleAuth",
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST"
            })
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: "/auth/changePassword",
                method: "POST",
                body: data
            })
        }),
        sendPhoneOtp: builder.mutation({
            query: (data) => ({
                url: "/auth/sendPhoneOtp",
                method: "POST",
                body: data
            })
        }),
        verifyPhoneOtp: builder.mutation({
            query: (data) => ({
                url: "/auth/verifyPhoneOtp",
                method: "POST",
                body: data
            })
        }),
        deleteAccount: builder.mutation({
            query: () => ({
                url: "/auth/delete-account",
                method: "DELETE"
            })
        }),
        sendEmailChangeOtp: builder.mutation({
            query: (data) => ({
                url: "/auth/sendEmailChangeOtp",
                method: "POST",
                body: data
            })
        }),
        verifyEmailChangeOtp: builder.mutation({
            query: (data) => ({
                url: "/auth/verifyEmailChangeOtp",
                method: "POST",
                body: data
            })
        })
    })
})

export const {
    useSignUpMutation,
    useSignInMutation,
    useVerifyEmailMutation,
    useResendEmailOtpMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useGoogleAuthMutation,
    useLogoutMutation,
    useChangePasswordMutation,
    useSendPhoneOtpMutation,
    useVerifyPhoneOtpMutation,
    useDeleteAccountMutation,
    useSendEmailChangeOtpMutation,
    useVerifyEmailChangeOtpMutation
} = authApi
