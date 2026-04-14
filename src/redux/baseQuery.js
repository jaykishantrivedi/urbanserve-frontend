import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { persistor } from "./store";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    credentials: "include",
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    //  If token expired (and this is not the refresh call itself)
    if (result?.error?.status === 401 && args.url !== "/auth/refresh-token") {

        console.log("[baseQuery] Access token expired → refreshing...");

        const refreshResult = await baseQuery(
            {
                url: "/auth/refresh-token",
                method: "POST",
            },
            api,
            extraOptions
        );

        if (refreshResult?.data) {
            console.log("[baseQuery] Token refreshed  — retrying original request");

            //  Retry original request (cookie is now updated by the server)
            result = await baseQuery(args, api, extraOptions);
        } else {
            console.log("[baseQuery] Refresh failed  — logging out");

            //  Clear Redux state and persisted storage
            api.dispatch({ type: "auth/logout" });
            await persistor.purge();
        }
    }

    return result;
};