import { ArrowLeft } from "lucide-react"

export function AddCategoryPageHeader({ onBack, onGoToCategories }) {
    return (
        <div className="space-y-3">
            <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Categories
            </button>

            <div>
                <h2 className="text-2xl font-bold text-gray-900">Add Service Category</h2>
                <p className="text-sm text-gray-500 mt-1">Create and structure your platform's service hierarchy</p>
            </div>

            <nav className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <span>Dashboard</span>
                <span>/</span>
                <button type="button" onClick={onGoToCategories} className="hover:text-indigo-600 transition-colors">
                    Service Categories
                </button>
                <span>/</span>
                <span className="text-gray-900">Add Category</span>
            </nav>
        </div>
    )
}
