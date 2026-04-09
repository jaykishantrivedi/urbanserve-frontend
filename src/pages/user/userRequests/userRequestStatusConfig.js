export const REQUEST_STATUS_STYLES = {
    open: 'bg-amber-100 text-amber-700',
    accepted: 'bg-green-100 text-green-700',
    completed: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-red-100 text-red-700',
};

export function getRequestStatusClass(status) {
    return REQUEST_STATUS_STYLES[status] || 'bg-red-100 text-red-700';
}
