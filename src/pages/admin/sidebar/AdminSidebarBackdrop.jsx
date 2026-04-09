export function AdminSidebarBackdrop({ isOpen, onClose }) {
    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 bg-black/30 z-20 lg:hidden"
            onClick={onClose}
        />
    )
}
