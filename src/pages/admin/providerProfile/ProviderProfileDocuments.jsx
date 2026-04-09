import { FileText } from "lucide-react"

export function ProviderProfileDocuments({ documents }) {
    if (!documents?.length) return null

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Documents</h2>
            <div className="flex flex-wrap gap-3">
                {documents.map((doc, index) => (
                    <a
                        key={index}
                        href={doc}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-colors"
                    >
                        <FileText size={14} />
                        Document {index + 1}
                    </a>
                ))}
            </div>
        </div>
    )
}
