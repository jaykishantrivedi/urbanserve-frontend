export function getNotificationStatusBadgeColor(status) {
    switch (status) {
        case "unread":
            return "bg-yellow-100 text-yellow-800 border-yellow-200"
        case "read":
            return "bg-green-100 text-green-700 border-green-200"
        default:
            return "bg-gray-100 text-gray-700 border-gray-200"
    }
}

export function getNotificationTypeBadgeColor(type) {
    switch (type) {
        case "Service Request":
            return "bg-blue-50 text-blue-700 border border-blue-200"
        case "Provider Response":
            return "bg-indigo-50 text-indigo-700 border border-indigo-200"
        case "Booking Confirmed":
            return "bg-green-50 text-green-700 border border-green-200"
        case "Service Completed":
            return "bg-teal-50 text-teal-700 border border-teal-200"
        case "Payment Received":
            return "bg-emerald-50 text-emerald-700 border border-emerald-200"
        case "New Review":
            return "bg-amber-50 text-amber-700 border border-amber-200"
        default:
            return "bg-gray-50 text-gray-700 border border-gray-200"
    }
}

export function formatNotificationDate(dateStr) {
    if (!dateStr) return "-"

    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

export function truncateNotificationMessage(text, maxLength = 60) {
    if (!text) return "-"
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
}

export function getNotificationPageNumbers(page, totalPages) {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages = new Set([1, totalPages, page, page - 1, page + 1])
    return [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b)
}
