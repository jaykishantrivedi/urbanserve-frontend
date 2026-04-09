import { useNavigate, useParams } from "react-router-dom"
import {
    useGetAdminBookingByIdQuery,
    useAdminCancelBookingMutation,
    useAdminMarkCompletedMutation,
} from "../../redux/adminDashboardApi"
import { toast } from "react-toastify"
import { BookingDetailsActorsColumn } from "./bookingDetails/BookingDetailsActorsColumn"
import { BookingDetailsCancelledNotice } from "./bookingDetails/BookingDetailsCancelledNotice"
import { BookingDetailsErrorState } from "./bookingDetails/BookingDetailsErrorState"
import { BookingDetailsFinancialsCard } from "./bookingDetails/BookingDetailsFinancialsCard"
import { BookingDetailsHeader } from "./bookingDetails/BookingDetailsHeader"
import { BookingDetailsLoadingState } from "./bookingDetails/BookingDetailsLoadingState"
import { BookingDetailsLogisticsCard } from "./bookingDetails/BookingDetailsLogisticsCard"

export function AdminBookingDetailsPage() {
    const { bookingId } = useParams()
    const navigate = useNavigate()

    const { data, isLoading, isError } = useGetAdminBookingByIdQuery(bookingId)

    const [adminCancel] = useAdminCancelBookingMutation()
    const [adminComplete] = useAdminMarkCompletedMutation()

    const booking = data?.booking

    if (isLoading) {
        return <BookingDetailsLoadingState />
    }

    if (isError || !booking) {
        return <BookingDetailsErrorState onBack={() => navigate("/admin/bookings")} />
    }

    const {
        user, provider, service, serviceRequest,
        status, price, finalPrice, priceType, hoursWorked, isPaid,
        serviceDate, serviceTime, cancelledBy, startOTP, completionOTP,
        location, createdAt, _id
    } = booking

    const canCancel   = ["open", "accepted"].includes(status)
    const isAccepted  = status === "accepted"

    const handleCancel = async () => {
        if (!confirm("Are you sure you want to cancel this booking?")) return
        try {
            const res = await adminCancel(_id).unwrap()
            toast.success(res.message)
        } catch (e) {
            toast.error(e?.data?.message || "Failed to cancel")
        }
    }

    const handleComplete = async () => {
        if (!confirm("Force complete this booking? This should only be used administratively.")) return
        try {
            const res = await adminComplete(_id).unwrap()
            toast.success(res.message)
        } catch (e) {
            toast.error(e?.data?.message || "Failed to complete")
        }
    }

    const formatDt = (d, t) => {
        if (!d) return "-"
        const dateStr = new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        return t ? `${dateStr} at ${t}` : dateStr
    }

    const showPrice = (val) => (val == null ? "-" : `$${val.toFixed(2)}`)

    return (
        <div className="p-5 sm:p-6 space-y-6 max-w-6xl mx-auto">
            <BookingDetailsHeader
                bookingId={_id}
                status={status}
                createdAt={createdAt}
                canCancel={canCancel}
                isAccepted={isAccepted}
                onBack={() => navigate("/admin/bookings")}
                onCancel={handleCancel}
                onComplete={handleComplete}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <BookingDetailsLogisticsCard
                        serviceDate={serviceDate}
                        serviceTime={serviceTime}
                        service={service}
                        location={location}
                        serviceRequest={serviceRequest}
                        formatDt={formatDt}
                    />

                    <BookingDetailsFinancialsCard
                        price={price}
                        finalPrice={finalPrice}
                        priceType={priceType}
                        hoursWorked={hoursWorked}
                        isPaid={isPaid}
                        status={status}
                        startOTP={startOTP}
                        completionOTP={completionOTP}
                        showPrice={showPrice}
                    />

                    {status === "cancelled" && (
                        <BookingDetailsCancelledNotice cancelledBy={cancelledBy} />
                    )}
                </div>

                <BookingDetailsActorsColumn
                    user={user}
                    provider={provider}
                    onNavigate={navigate}
                />
            </div>
        </div>
    )
}
