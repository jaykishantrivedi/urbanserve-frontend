import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useGetAdminUserByIdQuery, useToggleUserBlockMutation } from "../../redux/adminDashboardApi"
import { UserProfileDetailsSection } from "./userProfile/UserProfileDetailsSection"
import { UserProfileErrorState } from "./userProfile/UserProfileErrorState"
import { UserProfileHero } from "./userProfile/UserProfileHero"
import { UserProfileLoadingState } from "./userProfile/UserProfileLoadingState"
import { UserProfileStatsGrid } from "./userProfile/UserProfileStatsGrid"

export function AdminUserProfilePage() {
    const { userId } = useParams()
    const navigate = useNavigate()
    const [blocking, setBlocking] = useState(false)

    const { data, isLoading, isError } = useGetAdminUserByIdQuery(userId)
    const [toggleBlock] = useToggleUserBlockMutation()

    const user = data?.user
    const stats = data?.bookingStats

    const handleToggleBlock = async () => {
        setBlocking(true)
        try {
            const res = await toggleBlock(userId).unwrap()
            toast.success(res.message)
        } catch {
            toast.error("Action failed. Please try again.")
        } finally {
            setBlocking(false)
        }
    }

    if (isLoading) {
        return <UserProfileLoadingState />
    }

    if (isError || !user) {
        return <UserProfileErrorState onBack={() => navigate("/admin/users")} />
    }

    const isBlocked = user.status === "blocked"

    return (
        <div className="p-5 sm:p-6 space-y-6 max-w-4xl">
            <UserProfileHero
                user={user}
                isBlocked={isBlocked}
                blocking={blocking}
                onBack={() => navigate("/admin/users")}
                onToggleBlock={handleToggleBlock}
            />

            <UserProfileStatsGrid stats={stats} />

            <UserProfileDetailsSection user={user} />
        </div>
    )
}
