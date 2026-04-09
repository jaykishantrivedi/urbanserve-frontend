import { CheckCircle } from "lucide-react"

export function EditCategoryActionsBar({ isSubmitting, onCancel }) {
    return (
        <div className="flex items-center justify-end gap-3 pt-2">
            <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...
                    </>
                ) : (
                    <>
                        <CheckCircle className="w-4 h-4" /> Save Changes
                    </>
                )}
            </button>
        </div>
    )
}
