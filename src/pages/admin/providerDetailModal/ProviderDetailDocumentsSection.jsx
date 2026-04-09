export function ProviderDetailDocumentsSection({ documents }) {
    if (!documents?.length) return null

    return (
        <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Documents</p>
            <div className="flex flex-wrap gap-2">
                {documents.map((doc, index) => (
                    <a
                        key={index}
                        href={doc}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-semibold hover:bg-indigo-100 transition-colors"
                    >
                        Doc {index + 1} {"↗"}
                    </a>
                ))}
            </div>
        </div>
    )
}
