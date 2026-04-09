import UserProviderResponseCard from './UserProviderResponseCard'

export default function UserProviderResponsesGrid({ responses, isChoosing, isDeclining, onReject, onAccept }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {responses.map((resp) => (
        <UserProviderResponseCard
          key={resp._id}
          resp={resp}
          isChoosing={isChoosing}
          isDeclining={isDeclining}
          onReject={(e) => onReject(resp._id, e)}
          onAccept={(e) => onAccept(resp._id, e)}
        />
      ))}
    </div>
  )
}
