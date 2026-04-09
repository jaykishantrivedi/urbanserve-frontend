import UserBookingCard from './UserBookingCard'

export default function UserBookingsList({ bookings, cancellingId, onCancel, onViewDetails }) {
  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <UserBookingCard
          key={booking._id}
          booking={booking}
          cancellingId={cancellingId}
          onCancel={() => onCancel(booking._id)}
          onViewDetails={() => onViewDetails(booking._id)}
        />
      ))}
    </div>
  )
}
