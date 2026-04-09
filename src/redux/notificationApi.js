import { createApi } from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from './baseQuery';

export const notificationApi = createApi({
    reducerPath: 'notificationApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Notification'],
    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: () => '/notifications/gotNotification',
            providesTags: ['Notification']
        }),
        markAsRead: builder.mutation({
            query: (id) => ({
                url: `/notifications/markNotificationAsRead/${id}`,
                method: 'GET' // As per backend routes
            }),
            invalidatesTags: ['Notification']
        }),
        markAllAsRead: builder.mutation({
            query: () => ({
                url: '/notifications/markAllNotificationsAsRead',
                method: 'GET'
            }),
            invalidatesTags: ['Notification']
        })
    })
});

export const {
    useGetNotificationsQuery,
    useMarkAsReadMutation,
    useMarkAllAsReadMutation
} = notificationApi;
