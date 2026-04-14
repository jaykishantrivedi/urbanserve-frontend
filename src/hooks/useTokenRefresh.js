import { useEffect, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/authSlice"
import { persistor } from "../redux/store"

// Refresh 2 minutes before the 15-minute token expires
const REFRESH_INTERVAL_MS = 13 * 60 * 1000  // 13 minutes

// Tab-focus refresh only fires if the token hasn't been refreshed in the last 5 minutes.
const TAB_FOCUS_COOLDOWN_MS = 5 * 60 * 1000  // 5 minutes

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080/api"

const useTokenRefresh = () => {
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.auth.userData)
    const isLoggedIn = !!userData

    const intervalRef = useRef(null)
    // Prevents parallel refresh calls from firing simultaneously
    const isRefreshingRef = useRef(false)
    // Tracks when we last successfully refreshed (or mounted)
    const lastRefreshedAtRef = useRef(Date.now())

    //  Core refresh function 
    const refreshToken = useCallback(async () => {
        if (isRefreshingRef.current) return
        isRefreshingRef.current = true

        try {
            const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
                method: "POST",
                credentials: "include",  // sends the httpOnly refreshToken cookie
            })

            if (!response.ok) {
                // Refresh token is expired or invalid → log the user out
                dispatch(logout())
                await persistor.purge()
            } else {
                lastRefreshedAtRef.current = Date.now()
            }
        } catch (err) {
            console.error("Error during refresh:", err)
        } finally {
            isRefreshingRef.current = false
        }
    }, [dispatch])

    //  Scheduled proactive refresh 
    useEffect(() => {
        if (!isLoggedIn) {
            // Clear any existing interval when the user logs out
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
            return
        }

        // Kick off an interval that refreshes every 13 minutes
        intervalRef.current = setInterval(() => {
            refreshToken()
        }, REFRESH_INTERVAL_MS)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [isLoggedIn, refreshToken])

    //  Tab-focus / visibility refresh 
    useEffect(() => {
        if (!isLoggedIn) return

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                const timeSinceLastRefresh = Date.now() - lastRefreshedAtRef.current

                // Only refresh if we haven't done so in the last 5 minutes.
                // This prevents unnecessary requests when quickly switching tabs.
                if (timeSinceLastRefresh < TAB_FOCUS_COOLDOWN_MS) return

                refreshToken()
            }
        }

        document.addEventListener("visibilitychange", handleVisibilityChange)

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
    }, [isLoggedIn, refreshToken])
}

export default useTokenRefresh
